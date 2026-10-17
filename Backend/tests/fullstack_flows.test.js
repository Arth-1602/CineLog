import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

describe('Full-Stack Integration Flows (1 to 10)', () => {
  let sampleTitleId = null;

  // Flow 1: Load Discover Page Data
  test('Flow 1: Load Discover Page Catalog (/api/titles)', async () => {
    const res = await request(app).get('/api/titles');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.length > 0, 'Catalog should contain titles');
    sampleTitleId = res.body.data[0].id;
    assert.ok(sampleTitleId, 'First title must have valid id');
  });

  // Flow 2: Search for a title
  test('Flow 2: Search for a title (q=Interstellar)', async () => {
    const res = await request(app).get('/api/search?q=Interstellar');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.length >= 1);
    assert.ok(res.body.data.some(t => t.title.toLowerCase().includes('interstellar')));
  });

  // Flow 3: Apply multiple filters together
  test('Flow 3: Apply multiple filters together (type=movie, genre=Sci-Fi, mood=mind-bending)', async () => {
    const res = await request(app).get('/api/titles?type=movie&genre=Sci-Fi&mood=mind-bending');
    assert.equal(res.status, 200);
    assert.ok(res.body.data.length > 0);
    res.body.data.forEach(t => {
      assert.equal(t.type, 'movie');
      assert.ok(t.genres.includes('Sci-Fi'));
      assert.ok(t.moodTags.includes('mind-bending'));
    });
  });

  // Flow 4: Open title details
  test('Flow 4: Open title details (/api/titles/:id)', async () => {
    const res = await request(app).get(`/api/titles/${sampleTitleId}`);
    assert.equal(res.status, 200);
    assert.equal(res.body.data.id, sampleTitleId);
    assert.ok(res.body.data.title);
    assert.ok(res.body.data.synopsis);
    assert.ok(res.body.data.releaseYear);
  });

  // Flow 5: Add title to watchlist
  const visitorA = 'visitor-alpha-test-111';
  test('Flow 5: Add title to watchlist (POST /api/watchlist)', async () => {
    const res = await request(app)
      .post('/api/watchlist')
      .set('x-visitor-id', visitorA)
      .send({ titleId: sampleTitleId });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.visitorId, visitorA);
    assert.equal(res.body.data.titleId, sampleTitleId);
  });

  // Flow 6: Refresh & confirm persistence in watchlist
  test('Flow 6: Confirm title remains saved after refresh (GET /api/watchlist)', async () => {
    const res = await request(app)
      .get('/api/watchlist')
      .set('x-visitor-id', visitorA);

    assert.equal(res.status, 200);
    assert.equal(res.body.count, 1);
    assert.equal(res.body.data[0].title.id, sampleTitleId);
  });

  // Flow 7: Remove title and confirm removal persists
  test('Flow 7: Remove title and confirm removal persists (DELETE /api/watchlist/:id)', async () => {
    const delRes = await request(app)
      .delete(`/api/watchlist/${sampleTitleId}`)
      .set('x-visitor-id', visitorA);
    assert.equal(delRes.status, 200);
    assert.equal(delRes.body.removedId, sampleTitleId);

    // Confirm watchlist is now empty
    const checkRes = await request(app)
      .get('/api/watchlist')
      .set('x-visitor-id', visitorA);
    assert.equal(checkRes.status, 200);
    assert.equal(checkRes.body.count, 0);
  });

  // Flow 8: Empty results
  test('Flow 8: Empty results for unmatched search', async () => {
    const res = await request(app).get('/api/search?q=NonExistentMovie99999');
    assert.equal(res.status, 200);
    assert.equal(res.body.data.length, 0);
    assert.equal(res.body.pagination.total, 0);
  });

  // Flow 9: Backend errors and invalid IDs
  test('Flow 9: Backend errors for missing visitor, invalid ID, duplicate addition', async () => {
    // 1. Missing visitor
    const noVisitor = await request(app).get('/api/watchlist');
    assert.equal(noVisitor.status, 400);
    assert.equal(noVisitor.body.error.code, 'MISSING_VISITOR_ID');

    // 2. Non-existent title ID
    const notFound = await request(app).get('/api/titles/664000000000000000000099');
    assert.equal(notFound.status, 404);
    assert.equal(notFound.body.error.code, 'TITLE_NOT_FOUND');

    // 3. Duplicate addition
    await request(app).post('/api/watchlist').set('x-visitor-id', visitorA).send({ titleId: sampleTitleId });
    const duplicate = await request(app).post('/api/watchlist').set('x-visitor-id', visitorA).send({ titleId: sampleTitleId });
    assert.equal(duplicate.status, 409);
    assert.ok(duplicate.body.error.message.includes('already in your watchlist'));

    // Clean up
    await request(app).delete(`/api/watchlist/${sampleTitleId}`).set('x-visitor-id', visitorA);
  });

  // Flow 10: Verify different visitor IDs have separate watchlists
  test('Flow 10: Verify different visitor IDs have completely separate watchlists', async () => {
    const userOne = 'visitor-isolation-user-01';
    const userTwo = 'visitor-isolation-user-02';

    // Fetch two different titles
    const titles = await request(app).get('/api/titles');
    const id1 = titles.body.data[0].id;
    const id2 = titles.body.data[1].id;

    // Add id1 to userOne
    await request(app).post('/api/watchlist').set('x-visitor-id', userOne).send({ titleId: id1 });

    // Add id2 to userTwo
    await request(app).post('/api/watchlist').set('x-visitor-id', userTwo).send({ titleId: id2 });

    // Verify userOne has only id1
    const resOne = await request(app).get('/api/watchlist').set('x-visitor-id', userOne);
    assert.equal(resOne.body.count, 1);
    assert.equal(resOne.body.data[0].title.id, id1);

    // Verify userTwo has only id2
    const resTwo = await request(app).get('/api/watchlist').set('x-visitor-id', userTwo);
    assert.equal(resTwo.body.count, 1);
    assert.equal(resTwo.body.data[0].title.id, id2);
  });
});
