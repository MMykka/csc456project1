const Category = require('../models/category.model');
const Product = require('../models/product.model');

// CREATE
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE (replace product ids with the full products)
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('products');
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE (also remove the category id from every product)
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    await Product.updateMany({}, { $pull: { categories: req.params.id } });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
