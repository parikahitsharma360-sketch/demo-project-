// routes / review routes.js //
const express = require('express');
const router =  express.Router();

const reviewController = require('../controllers/reviewController');


router.get('/', reviewController.getAllReviews);

router.post('/', reviewController.addReview);

router.get('/customer/:customer_id', reviewController.getCustomerReview);

router.get('/:id', reviewController.getSingleReview);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;