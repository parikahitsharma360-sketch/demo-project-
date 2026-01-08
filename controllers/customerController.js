// controllers/customerController.js

const db = require('../config/mysql');

exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const promiseDb = db.promise();
    const [result] = await promiseDb.query('INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)', [name, email, phone]);
    res.status(201).json({ success: true, message: 'Customer created', customerId: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const customerId = req.params.id;
    const promiseDb = db.promise();
    const [result] = await promiseDb.query('UPDATE customers SET name = ?, email = ?, phone = ? WHERE customer_id = ?', [name, email, phone, customerId]);

    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Customer not found' });

    res.status(200).json({ success: true, message: 'Customer updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const promiseDb = db.promise();
    const [result] = await promiseDb.query('DELETE FROM customers WHERE customer_id = ?', [id]);

    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Customer not found' });

    res.status(200).json({ success: true, message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const promiseDb = db.promise();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;

    const [rows] = await promiseDb.query('SELECT * FROM customers WHERE name LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?', [`%${search}%`, limit, offset]);
    const [[{ total }]] = await promiseDb.query('SELECT COUNT(*) AS total FROM customers WHERE name LIKE ?', [`%${search}%`]);

    res.status(200).json({ success: true, data: rows, page, limit, total, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getSingleCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const promiseDb = db.promise();
    const [rows] = await promiseDb.query('SELECT * FROM customers WHERE customer_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Customer not found' });
    res.status(200).json({ success: true, customer: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
