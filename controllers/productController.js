const db = require('../config/mysql');

// Get all products (with optional pagination + search)
exports.getAllProducts = async (req, res) => {
  try {
    const promiseDb = db.promise();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;

    const [rows] = await promiseDb.query(
      'SELECT * FROM products WHERE product_name LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [`%${search}%`, limit, offset]
    );

    const [[{ total }]] = await promiseDb.query(
      'SELECT COUNT(*) AS total FROM products WHERE product_name LIKE ?',
      [`%${search}%`]
    );

    res.status(200).json({ success: true, data: rows, page, limit, total, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// create products //
exports.createProduct = async (req, res) => {
  try {
    const { product_name, description, price, stock_quantity, category_id, url_image } = req.body;
    const promiseDb = db.promise();

    const [result] = await promiseDb.query(
      'INSERT INTO products (product_name, description, price, stock_quantity, category_id, url_image) VALUES (?, ?, ?, ?, ?, ?)',
      [product_name, description, price, stock_quantity, category_id, url_image]
    );

    res.status(201).json({ success: true, message: 'Product created', productId: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// customer review in product //
exports.reviewProduct = async (req, res) => {
  try {
    const { customer_id, product_id, rating, comment } = req.body;
    const promiseDb = db.promise();

    await promiseDb.query(
      'INSERT INTO reviews (customer_id, product_id, rating, comment) VALUES (?, ?, ?, ?)',
      [customer_id, product_id, rating || null, comment || null]
    );

    res.status(201).json({ success: true, message: 'Review submitted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// update product //
exports.updateProduct = async (req, res) => {
  try {
    const { product_name, description, price, stock_quantity, category_id, url_image } = req.body;
    const productId = req.params.id;
    const promiseDb = db.promise();

    const [result] = await promiseDb.query(
      'UPDATE products SET product_name = ?, description = ?, price = ?, stock_quantity = ?, category_id = ?, url_image = ? WHERE product_id = ?',
      [product_name, description, price, stock_quantity, category_id, url_image, productId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// delete product //
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const promiseDb = db.promise();

    const [result] = await promiseDb.query('DELETE FROM products WHERE product_id = ?', [productId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// get single product / by id //
exports.getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const promiseDb = db.promise();
    const [rows] = await promiseDb.query('SELECT * FROM products WHERE product_id = ?', [id]);

    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Product not found' });

    res.status(200).json({ success: true, product: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
