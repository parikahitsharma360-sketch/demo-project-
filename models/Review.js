const { default: mongoose } = require('mongoose');

const reviewSchema = new mongoose.Schema({
  costumer_id: {
    type: Number,
    require: true,
  },
  product_id: {
    type: Number,
    require: true,
  },

  costumer_name: {
    type: String,
    require: true,
  },

  rating: {
    type: Number,
    require: true,
  },

  review_text: {
    type: String,
    require: true,
  },

  helpful_count: {
    type: String,
    require: true,
  },

  timestamp: {
    type: Date,
    default: Date.now(),
    require: true,
  },
});

module.exports = mongoose.model('Review', reviewSchema);