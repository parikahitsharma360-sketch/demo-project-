// controllers / reiewcontrollers.js //

const Review = require('../models/review');

// get all  reviews of customer //

exports.getCustomerReview = async (req, res) => {
  try {
    const review = await Review
      .find({
        customer_id: parseInt(req.params.customer_id),
      })
      .sort({ timestamp: -1 });

    res.status(200).json({ success: true, data: review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// add custom note/review //

exports.addReview = async (req, res) => {
  try {
    const {
      product_id,
      customer_id,
      customer_name,
      rating,
      review_text,
      helpful_count,
      timestamp,
    } = req.body;

    const review = await Review.create({
      product_id,
      customer_id,
      customer_name,
      rating,
      review_text,
      helpful_count,
      timestamp,
    });

    res.status(200).json({
      success: true,
      message: 'customer review successfully',
      data: review,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// get all review (with pagination) //

exports.getAllReviews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const review = await Review
      .find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const total = await review.countDocuments();

    res.status(200).json({
      success: true,
      data: review,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// delete review by id //

exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'review not found',
      });
    }

    await review.findByIdAndDelete(reviewId);

    res.status(200).json({
      success: true,
      message: 'review deleted successfully',
      data: review,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// update review //

exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = ({ review_text, rating, helpful_count } = req.body);

    const updatereview = await Review.findByIdAndUpdate(
      reviewId,
      {
        review_text,
        rating,
        helpfull_count,
      },
      {
        new: true,
        runValidator: true,
      }
    );

    if (!reviewUpdate) {
      return res.status(404).json({
        success: false,
        message: 'review not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'review updated successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get single review / by id //

exports.getSingleReview = async (req, res) => {
  try {
    const { review_id } = req.params;

    const review = await Review.findById(review_id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'review not found',
      });
    }

    res.status(200).json({
      success: true,
      review,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'server error',
      error: err.message,
    });
  }
};
