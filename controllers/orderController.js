const db = require('../config/mysql');

exports.createOrder = async (req, res) => {
  try {
    const { customer_id, total, status } = req.body;
    const promiseDb = db.promise();

    const [result] = await promiseDb.query('INSERT INTO orders (customer_id, total, status) VALUES (?, ?, ?)', [customer_id, total || 0, status || 'pending']);

    res.status(201).json({ success: true, message: 'Order created', orderId: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const promiseDb = db.promise();
    const [result] = await promiseDb.query('DELETE FROM orders WHERE order_id = ?', [id]);

    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Order not found' });

    res.status(200).json({ success: true, message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { total, status } = req.body;
    const orderId = req.params.id;
    const promiseDb = db.promise();

    const [result] = await promiseDb.query('UPDATE orders SET total = ?, status = ? WHERE order_id = ?', [total, status, orderId]);

    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Order not found' });

    res.status(200).json({ success: true, message: 'Order updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const promiseDb = db.promise();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;

    const [rows] = await promiseDb.query('SELECT * FROM orders WHERE CAST(order_id AS CHAR) LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?', [`%${search}%`, limit, offset]);
    const [[{ total }]] = await promiseDb.query('SELECT COUNT(*) AS total FROM orders WHERE CAST(order_id AS CHAR) LIKE ?', [`%${search}%`]);

    res.status(200).json({ success: true, data: rows, page, limit, total, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getSingleOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const promiseDb = db.promise();
    const [rows] = await promiseDb.query('SELECT * FROM orders WHERE order_id = ?', [id]);

    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Order not found' });

    res.status(200).json({ success: true, order: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
