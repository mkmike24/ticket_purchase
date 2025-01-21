const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  tickets: [
    {
      category: { type: String, required: true },
      price: { type: Number, required: true },
      availability: { type: Number, required: true },
    },
  ],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Event', EventSchema);