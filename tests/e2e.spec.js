const { describe, test, expect, beforeAll, afterAll } = require('@jest/globals');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Event = require('../src/models/Event');
const Purchase = require('../src/models/Purchase');
const dotenv = require('dotenv');

dotenv.config();

beforeAll(async () => {
  // Connect to a test database
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Clean up and disconnect the test database
  //await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('User Model Tests', () => {
  test('Should create a new user', async () => {
    const user = new User({ email: 'testuser3@example.com', password: 'password123' });
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe('testuser3@example.com');
  });
});

describe('Event Model Tests', () => {
  let eventId;
  let userId;

  beforeAll(async () => {
    const user = new User({ email: 'eventcreator1@example.com', password: 'password123' });
    const savedUser = await user.save();
    userId = savedUser._id;
  });

  test('Should create a new event', async () => {
    const event = new Event({
      name: 'Concert Event',
      date: '2025-01-25',
      time: '19:00',
      venue: 'Stadium',
      tickets: [
        { category: 'VIP', price: 100, availability: 50 },
        { category: 'General', price: 50, availability: 100 },
      ],
      creator: userId,
    });
    const savedEvent = await event.save();

    eventId = savedEvent._id;
    expect(savedEvent._id).toBeDefined();
    expect(savedEvent.name).toBe('Concert Event');
    expect(savedEvent.creator.toString()).toBe(userId.toString());
  });

  test('Should retrieve an event by ID', async () => {
    const foundEvent = await Event.findById(eventId);
    expect(foundEvent).toBeDefined();
    expect(foundEvent.name).toBe('Concert Event');
  });

  test('Should update an event', async () => {
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { name: 'Updated Concert Event' },
      { new: true }
    );

    expect(updatedEvent.name).toBe('Updated Concert Event');
  });

  test('Should return ticket categories for an event', async () => {
    const categories = await Event.findById(eventId);

    expect(categories).toBeDefined();
  });

  test('Should delete an event', async () => {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    expect(deletedEvent).toBeDefined();
  });
});

describe('Purchase Model Tests', () => {
  let userId, eventId;

  beforeAll(async () => {
    const user = new User({ email: 'buyer1@example.com', password: 'password123' });
    const savedUser = await user.save();
    userId = savedUser._id;

    const event = new Event({
      name: 'Concert Event',
      date: '2025-01-25',
      time: '19:00',
      venue: 'Stadium',
      tickets: [
        { category: 'VIP', price: 100, availability: 50 },
        { category: 'General', price: 50, availability: 100 },
      ],
      creator: userId,
    });
    const savedEvent = await event.save();
    eventId = savedEvent._id;
  });

  test('Should create a new purchase', async () => {
    const purchase = new Purchase({
      user: userId,
      event: eventId,
      tickets: [
        { category: 'VIP', quantity: 2 },
        { category: 'General', quantity: 5 },
      ],
    });
    const savedPurchase = await purchase.save();

    expect(savedPurchase._id).toBeDefined();
    expect(savedPurchase.tickets.length).toBe(2);
    expect(savedPurchase.user.toString()).toBe(userId.toString());
    expect(savedPurchase.event.toString()).toBe(eventId.toString());
  });
});