import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

describe('Titles API Endpoints', () => {
  let firstTitleId = null;

  test('GET /api/titles returns paginated titles list', async () => {
    const res = await request(app).get('/api/titles');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
    assert.ok(res.body.data.length > 0);
    assert.ok(res.body.pagination);
    assert.equal(res.body.pagination.page, 1);

    firstTitleId = res.body.data[0].id;
    assert.ok(firstTitleId, 'Expected title to have an ID');
  });

  test('GET /api/titles with type filter (movie)', async () => {
    const res = await request(app).get('/api/titles?type=movie');
    assert.equal(res.status, 200);
    assert.ok(res.body.data.length > 0);
    res.body.data.forEach(t => assert.equal(t.type, 'movie'));
  });

  test('GET /api/titles with type filter (tv)', async () => {
    const res = await request(app).get('/api/titles?type=tv');
    assert.equal(res.status, 200);
    assert.ok(res.body.data.length > 0);
    res.body.data.forEach(t => assert.equal(t.type, 'tv'));
  });

  test('GET /api/titles with genre filter', async () => {
    const res = await request(app).get('/api/titles?genre=Sci-Fi');
    assert.equal(res.status, 200);
    assert.ok(res.body.data.length > 0);
    res.body.data.forEach(t => {
      assert.ok(t.genres.includes('Sci-Fi'));
    });
  });

  test('GET /api/titles with mood filter', async () => {
    const res = await request(app).get('/api/titles?mood=mind-bending');
    assert.equal(res.status, 200);
    assert.ok(res.body.data.length > 0);
    res.body.data.forEach(t => {
      assert.ok(t.moodTags.includes('mind-bending'));
    });
  });

  test('GET /api/titles with invalid type returns 400', async () => {
    const res = await request(app).get('/api/titles?type=podcast');
    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.equal(res.body.error.code, 'INVALID_TYPE_FILTER');
  });

  test('GET /api/titles/:id returns title details', async () => {
    assert.ok(firstTitleId, 'firstTitleId should be present from previous test');
    const res = await request(app).get(`/api/titles/${firstTitleId}`);
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.id, firstTitleId);
    assert.ok(res.body.data.title);
    assert.ok(res.body.data.synopsis);
  });

  test('GET /api/titles/:id with non-existent ID returns 404', async () => {
    const res = await request(app).get('/api/titles/664000000000000000000099');
    assert.equal(res.status, 404);
    assert.equal(res.body.success, false);
    assert.equal(res.body.error.code, 'TITLE_NOT_FOUND');
  });
});
