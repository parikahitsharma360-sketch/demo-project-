
// routes/productRoutes.js: //

const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController')

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.post('/:review', productController.reviewProduct);
router.get('/:product_id', productController.getSingleProduct); 
router.put('/:product_id', productController.updateProduct);
router.delete('/:product_id', productController.deleteProduct);

module.exports = router;