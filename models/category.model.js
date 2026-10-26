const mongoose = require('mongoose');

// Many-to-many: a category can have many products
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
