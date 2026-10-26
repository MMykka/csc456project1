const Product = require('../models/product.model');
const Category = require('../models/category.model');

// CREATE
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL (replace category ids with the full categories)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('categories');
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('categories');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE (also remove the product id from every category)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    await Category.updateMany({}, { $pull: { products: req.params.id } });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// LINK product and category (save the id on both sides)
exports.addCategoryToProduct = async (req, res) => {
  try {
    const { productId, categoryId } = req.params;
    const product = await Product.findById(productId);
    const category = await Category.findById(categoryId);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (!category) return res.status(404).json({ error: 'Category not found' });

    // Only add the ids if they are not already there
    if (!product.categories.includes(categoryId)) product.categories.push(categoryId);
    if (!category.products.includes(productId)) category.products.push(productId);

    await product.save();
    await category.save();
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UNLINK product and category (remove the id from both sides)
exports.removeCategoryFromProduct = async (req, res) => {
  try {
    const { productId, categoryId } = req.params;
    const product = await Product.findById(productId);
    const category = await Category.findById(categoryId);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (!category) return res.status(404).json({ error: 'Category not found' });

    product.categories.pull(categoryId);
    category.products.pull(productId);

    await product.save();
    await category.save();
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
