// routes / customerRoutes.js //

const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

router.get('/', customerController.getAllCustomers);

router.post('/', customerController.createCustomer);

router.put('/:customer_id', customerController.updateCustomer);

router.delete('/:customer_id', customerController.deleteCustomer);

module.exports = router;