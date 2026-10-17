import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

describe('Search API Endpoints', () => {
  test('GET /api/search?q=Dune finds Dune title', async () => {
    const res = await request(app).get('/api/search?q=Dune');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.length >= 1);
    assert.ok(res.body.data.some(t => t.title.includes('Dune')));
  });

  test('GET /api/search?q=Nolan finds titles directed by Christopher Nolan', async () => {
    const res = await request(app).get('/api/search?q=Nolan');
    assert.equal(res.status, 200);
    assert.ok(res.body.data.length >= 1);
    assert.ok(res.body.data.some(t => t.director.includes('Nolan')));
  });

  test('GET /api/search with combined filters (q=Bear&type=tv)', async () => {
    const res = await request(app).get('/api/search?q=Bear&type=tv');
    assert.equal(res.status, 200);
    assert.ok(res.body.data.length >= 1);
    assert.equal(res.body.data[0].type, 'tv');
    assert.ok(res.body.data[0].title.includes('Bear'));
  });

  test('GET /api/search with empty query returns all titles paginated', async () => {
    const res = await request(app).get('/api/search?q=');
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body.data));
  });

  test('GET /api/search with no matches returns empty list', async () => {
    const res = await request(app).get('/api/search?q=xyzUnmatchedTitle9999');
    assert.equal(res.status, 200);
    assert.equal(res.body.data.length, 0);
    assert.equal(res.body.pagination.total, 0);
  });
});
