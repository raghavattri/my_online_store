const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authMiddleware } = require('../middleware/authMiddleware');


router.get('/', productController.getProducts);

router.get('/:id', productController.getProductById);

// Create a new product
router.post('/', authMiddleware, productController.createProduct);

// Update a product
router.patch('/:id', authMiddleware, productController.updateProduct);

// Delete a product
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
