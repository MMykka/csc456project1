const mongoose = require('mongoose');

// Many-to-one: many orders belong to one user
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  totalPrice: { type: Number, min: 0 },
  status: { type: String, default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
