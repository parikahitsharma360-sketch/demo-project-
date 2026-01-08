
// routes/productRoutes.js: //

const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController')

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.post('/:id/review', productController.reviewProduct);
router.get('/:id', productController.getSingleProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;