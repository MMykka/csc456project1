const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

// Many-to-many: link and unlink a product and a category
router.post('/:productId/categories/:categoryId', productController.addCategoryToProduct);
router.delete('/:productId/categories/:categoryId', productController.removeCategoryFromProduct);

module.exports = router;
