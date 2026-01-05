// routes / review routes.js //

const express = require ('express');

const router =  express.Router();

const reviewController = ('../controllers' / reviewController);

router.get('/', reviewController.getCostumerReview);

router.post('/', reviewController.addReview);

router.get('/', reviewController.getAllreview);

router.put('/review_id', reviewController.updateReview);

router.get('/:reviewId',reviewController.getSinglereview);

module.exports = router();