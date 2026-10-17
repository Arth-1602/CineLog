import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

describe('Health and System Endpoints', () => {
  test('GET / returns root API index and documentation', async () => {
    const res = await request(app).get('/');
    assert.equal(res.status, 200);
    assert.equal(res.body.name, 'CineLog REST API');
    assert.ok(res.body.endpoints);
  });

  test('GET /api/health returns healthy status and service metrics', async () => {
    const res = await request(app).get('/api/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.status, 'healthy');
    assert.ok(res.body.uptime >= 0);
    assert.ok(res.body.database);
    assert.ok(res.body.database.status);
    assert.ok(res.body.tmdbIntegration);
  });

  test('GET /api/unknown-endpoint returns standard 404 JSON', async () => {
    const res = await request(app).get('/api/unknown-endpoint');
    assert.equal(res.status, 404);
    assert.equal(res.body.success, false);
    assert.equal(res.body.error.code, 'ROUTE_NOT_FOUND');
  });
});
