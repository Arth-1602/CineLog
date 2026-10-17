import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

describe('Watchlist API Endpoints', () => {
  const testVisitor = 'test-visitor-uuid-1234';
  let targetTitleId = null;

  test('GET /api/watchlist without visitor ID returns 400', async () => {
    const res = await request(app).get('/api/watchlist');
    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.equal(res.body.error.code, 'MISSING_VISITOR_ID');
  });

  test('GET /api/watchlist with invalid visitor ID returns 400', async () => {
    const res = await request(app)
      .get('/api/watchlist')
      .set('x-visitor-id', '!!bad@@');
    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.equal(res.body.error.code, 'INVALID_VISITOR_ID');
  });

  test('GET /api/watchlist starts empty for new visitor', async () => {
    const res = await request(app)
      .get('/api/watchlist')
      .set('x-visitor-id', testVisitor);
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.count, 0);
    assert.deepEqual(res.body.data, []);
  });

  test('POST /api/watchlist without titleId returns 400', async () => {
    const res = await request(app)
      .post('/api/watchlist')
      .set('x-visitor-id', testVisitor)
      .send({});
    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.equal(res.body.error.code, 'MISSING_TITLE_ID');
  });

  test('POST /api/watchlist adds title to visitor watchlist', async () => {
    // Fetch a real title ID first
    const titlesRes = await request(app).get('/api/titles');
    targetTitleId = titlesRes.body.data[0].id;
    assert.ok(targetTitleId);

    const res = await request(app)
      .post('/api/watchlist')
      .set('x-visitor-id', testVisitor)
      .send({ titleId: targetTitleId });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.visitorId, testVisitor);
    assert.equal(res.body.data.title.id, targetTitleId);
  });

  test('POST /api/watchlist prevents duplicate addition (returns 409)', async () => {
    const res = await request(app)
      .post('/api/watchlist')
      .set('x-visitor-id', testVisitor)
      .send({ titleId: targetTitleId });

    assert.equal(res.status, 409);
    assert.equal(res.body.success, false);
    assert.ok(res.body.error.message.includes('already in your watchlist'));
  });

  test('GET /api/watchlist returns the saved title', async () => {
    const res = await request(app)
      .get('/api/watchlist')
      .set('x-visitor-id', testVisitor);

    assert.equal(res.status, 200);
    assert.equal(res.body.count, 1);
    assert.equal(res.body.data[0].title.id, targetTitleId);
  });

  test('DELETE /api/watchlist/:titleId removes title from watchlist', async () => {
    const res = await request(app)
      .delete(`/api/watchlist/${targetTitleId}`)
      .set('x-visitor-id', testVisitor);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.removedId, targetTitleId);
  });

  test('DELETE /api/watchlist/:titleId for non-saved title returns 404', async () => {
    const res = await request(app)
      .delete(`/api/watchlist/${targetTitleId}`)
      .set('x-visitor-id', testVisitor);

    assert.equal(res.status, 404);
    assert.equal(res.body.success, false);
  });
});
