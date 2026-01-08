// analytics //

const { default: mongoose } = require('mongoose');

const analyticsSchema = new mongoose.schema({
  totalRevenue: Number,

  totalUser: Number,

  totalOrder: Number,

  // daily stats //

  dailyStats: {
    date: Date,
    orders: Number,
    revenue: Number,
  },

  // top products //

  topProducts: [
    {
      productId: mongoose.types.schema.objectId,
      totalSold: Number,
    },
  ],
});

module.exports = mongoose.model('Analytics', analyticsSchema);
