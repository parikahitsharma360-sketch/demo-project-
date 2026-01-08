const express = require('express');

require('./config/mongodb');
require('./config/mysql');
require('./models/mysqlModels');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Health & listing
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API running',
    routes: [
      '/api/products',
      '/api/orders',
      '/api/categories',
      '/api/customers',
      '/api/reviews'
    ]
  });
});

// Mount real route modules
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});