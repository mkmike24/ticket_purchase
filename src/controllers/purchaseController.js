const Purchase = require('../models/Purchase');
const Event = require('../models/Event');

exports.purchaseTickets = async (req, res) => {
  try {
    const { eventId, tickets } = req.body;
    const event = await Event.findById(eventId);

    if (!event) return res.status(404).json({ error: 'Event not found' });

    // Check ticket availability
    tickets.forEach((ticket) => {
      const category = event.tickets.find((t) => t.category === ticket.category);
      if (!category || category.availability < ticket.quantity) {
        throw new Error('Insufficient ticket availability');
      }
    });

    // Deduct availability
    tickets.forEach((ticket) => {
      const category = event.tickets.find((t) => t.category === ticket.category);
      if (category) category.availability -= ticket.quantity;
    });

    await event.save();

    const purchase = new Purchase({
      user: req.user.id,
      event: eventId,
      tickets,
    });

    const savedPurchase = await purchase.save();
    res.status(201).json(savedPurchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPurchaseHistory = async (req, res) => {
  try {
    const purchases = await Purchase.find({ user: req.user.id }).populate('event');
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch purchase history' });
  }
};
