const request = require('supertest');
const app = require('../src/app');

describe('End-to-End Tests for Ticket Purchase API', () => {
  let token;
  let eventId;

  beforeAll(async () => {
    // Register a new user
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'unittestuser@example.com', password: 'password123' });

    // Log in to get a token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'unittestuser@example.com', password: 'password123' });

    token = loginRes.body.token;
  });

  test('Create an event', async () => {
    const res = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Concert Event',
        date: '2025-01-25',
        time: '19:00',
        venue: 'Stadium',
        tickets: [
          { category: 'VIP', price: 100, availability: 50 },
          { category: 'General', price: 50, availability: 100 },
        ],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Concert Event');
    eventId = res.body._id;
  });

  test('Retrieve all events', async () => {
    const res = await request(app)
      .get('/api/events')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('Edit an event', async () => {
    const res = await request(app)
      .put(`/api/events/${eventId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Concert Event' });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Updated Concert Event');
  });

  test('Retrieve all categories by eventId', async () => {
    const res = await request(app)
      .get(`/api/events/${eventId}/tickets`)

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
  });

  test('Purchase tickets', async () => {
    const res = await request(app)
      .post('/api/purchases/purchase')
      .set('Authorization', `Bearer ${token}`)
      .send({
        eventId,
        tickets: [
          { category: 'VIP', quantity: 2 },
          { category: 'General', quantity: 5 },
        ],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.tickets.length).toBe(2);
  });

  test('Retrieve purchase history', async () => {
    const res = await request(app)
      .get('/api/purchases/history')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});