
// routes/productRoutes.js: //

const express = require('express');

const router = express.Router();

const productController = require('../controller/productController')

router.get = ('/', productController.getAllproducts);

router.post = ('/', productController.createProducts);

router.post = ('/:review', productController.reviewProduct);

router.post = ('/: product__id', productController.deleteProduct);

module.exports = router;