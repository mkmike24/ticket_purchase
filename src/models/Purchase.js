const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    tickets: [{ category: String, quantity: Number }],
    purchaseDate: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('Purchase', PurchaseSchema);