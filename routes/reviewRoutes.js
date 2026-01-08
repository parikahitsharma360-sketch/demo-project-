// routes / review routes.js //
const express = require('express');
const router =  express.Router();

const reviewController = require('../controllers/reviewController');


router.get('/', reviewController.getAllReviews);

router.post('/', reviewController.addReview);
router.put('/:review_id', reviewController.updateReview);

router.get('/:customer_id', reviewController.getCustomerReview);
router.get('/:review_id',reviewController.getSingleReview);

router.delete('/:review_id', reviewController.deleteReview);

module.exports = router;