const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
    const event = new Event({ ...req.body, creator: req.user.id });
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

exports.getEvents = async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch events' });
    }
};

exports.editEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event || event.creator.toString() !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized to edit this event' });
      }
      Object.assign(event, req.body);
      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } catch (error) {
      res.status(500).json({ error: 'Failed to edit event' });
    }
};
  