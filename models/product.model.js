const mongoose = require('mongoose');

// Many-to-many: a product can be in many categories
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, min: 0, default: 0 },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
