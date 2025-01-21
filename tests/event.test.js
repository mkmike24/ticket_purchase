const request = require('supertest');
const app = require('../src/app');

describe('Event APIs', () => {
  test('Should create an event', async () => {
    const res = await request(app)
      .post('/api/events')
      .send({ name: 'Concert', date: '2025-01-25', time: '19:00', venue: 'Stadium', tickets: [] })
      .set('Authorization', 'Bearer <token>');
    expect(res.statusCode).toBe(201);
  });

  test('Should fetch events', async () => {
    const res = await request(app).get('/api/events');
    expect(res.statusCode).toBe(200);
  });
});