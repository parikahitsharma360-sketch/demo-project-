// controllers/categoryController.js

const db = require('../config/mysql');

exports.getAllCategory = async (req, res) => {
  try {
    const promiseDb = db.promise();
    const [rows] = await promiseDb.query('SELECT * FROM categories');
    res.status(200).json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const promiseDb = db.promise();
    const [result] = await promiseDb.query('INSERT INTO categories (name, description) VALUES (?, ?)', [name, description]);
    res.status(201).json({ success: true, message: 'Category created', categoryId: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const categoryId = req.params.id;
    const promiseDb = db.promise();
    const [result] = await promiseDb.query('UPDATE categories SET name = ?, description = ? WHERE category_id = ?', [name, description, categoryId]);

    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Category not found' });

    res.status(200).json({ success: true, message: 'Category updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const promiseDb = db.promise();
    const [result] = await promiseDb.query('DELETE FROM categories WHERE category_id = ?', [categoryId]);

    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Category not found' });

    res.status(200).json({ success: true, message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const promiseDb = db.promise();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;

    const [rows] = await promiseDb.query('SELECT * FROM categories WHERE name LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?', [`%${search}%`, limit, offset]);
    const [[{ total }]] = await promiseDb.query('SELECT COUNT(*) AS total FROM categories WHERE name LIKE ?', [`%${search}%`]);

    res.status(200).json({ success: true, data: rows, page, limit, total, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getSingleCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const promiseDb = db.promise();
    const [rows] = await promiseDb.query('SELECT * FROM categories WHERE category_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Category not found' });
    res.status(200).json({ success: true, category: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
