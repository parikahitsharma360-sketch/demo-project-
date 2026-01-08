
// routes / orderRoutes.js //
const express  =  require('express');
const router =  express.Router();

const orderController = require('../controllers/orderController');

router.get('/', orderController.getAllOrders);

router.post('/', orderController.createOrder);

router.delete('/:order_id', orderController.deleteOrder);

router.put('/:order_id', orderController.updateOrder);

module.exports = router;