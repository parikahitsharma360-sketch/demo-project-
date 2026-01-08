// controllers/reviewController.js

const Review = require('../models/Review');

exports.getCustomerReview = async (req, res) => {
  try {
    const customerId = parseInt(req.params.customer_id);
    const reviews = await Review.find({ costumer_id: customerId }).sort({ timestamp: -1 });
    res.status(200).json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addReview = async (req, res) => {
  try {
    // accept either customer_id or costumer_id, normalize to model field names
    const { product_id, customer_id, costumer_id, customer_name, costumer_name, rating, review_text, helpful_count, timestamp } = req.body;
    const payload = {
      product_id: product_id,
      costumer_id: costumer_id || customer_id,
      costumer_name: costumer_name || customer_name,
      rating,
      review_text,
      helpful_count,
      timestamp,
    };

    const created = await Review.create(payload);
    res.status(201).json({ success: true, message: 'Review created', data: created });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const reviews = await Review.find().sort({ timestamp: -1 }).skip(skip).limit(limit);
    const total = await Review.countDocuments();

    res.status(200).json({ success: true, data: reviews, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const deleted = await Review.findByIdAndDelete(reviewId);
    if (!deleted) return res.status(404).json({ success: false, message: 'Review not found' });
    res.status(200).json({ success: true, message: 'Review deleted', data: deleted });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { review_text, rating, helpful_count } = req.body;
    const updated = await Review.findByIdAndUpdate(reviewId, { review_text, rating, helpful_count }, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Review not found' });
    res.status(200).json({ success: true, message: 'Review updated', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getSingleReview = async (req, res) => {
  try {
    const { review_id } = req.params;
    const review = await Review.findById(review_id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    res.status(200).json({ success: true, data: review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
