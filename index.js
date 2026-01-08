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

// Simple placeholder mounts so you can navigate to each API route.
// Replace these with `app.use('/api/products', require('./routes/productRoutes'))`
// once those route files are fixed.
app.use('/api/products', (req, res) => {
  res.json({route: 'products', method: req.method});
});

app.use('/api/orders', (req, res) => {
  res.json({route: 'orders', method: req.method});
});

app.use('/api/categories', (req, res) => {
  res.json({route: 'categories', method: req.method});
});

app.use('/api/customers', (req, res) => {
  res.json({route: 'customers', method: req.method});
});

app.use('/api/reviews', (req, res) => {
  res.json({route: 'reviews', method: req.method});
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});