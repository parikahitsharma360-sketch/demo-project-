// controllers // categoryControllers.js //

const db = require('../config/mysql');

// get all categories //

exports.getAllCategory = async (req, res) => {
  try {
    const [category] = await db.query('SELECT * FROM category');
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// create category //

exports.createCategory = async (req, res) => {
  try {
    const { category_id, name, description } = req.body;
    const [result] = await db.query(
      'INSERT INTO category(category_id, name, description)VALUES(?, ?, ?)',
      [category_id, name, description]
    );

    res.status(200).json({
      success: true,
      message: 'category created successfully',
      data: { result },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// update category //

exports.updateCategory = async (req, res) => {
  try {
    const { category_id, name, description } = req.body;
    const categoryId = req.params.id;

    const [result] = await db.query(
      'UPDATE category SET  name = ?, description = ? WHERE category_id = ?'[
        (category_id, name, description)
      ]
    );

    if (result.rowaffected === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'category not updated' });
    }

    // log activity //
    await Activity.create({
      category_id: parseInt(categoryId),
      activity_type: 'category update',
      description: `new category ${name} update`,
      metadata: { category_id, description, createdBy, source },
    });

    res.status({ success: true, message: 'category updated successfully' });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

// delete category //

exports.deleteCategory = async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM category WHERE category_id = ?',
      [req.params.body]
    );

    res.status(200).json({
      success: true,
      message: 'category deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//  get categories with (paination + search) //

exports.getAllCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;

    const [category] = await db.query(
      'SELECT * FROM category WHERE name LIKE ?, ORDER BY created_at DESC LIMIT ?, OFFSET ?'[
        (`%${search}%`, limit, offset)
      ]
    );

    // count query //
    const [[{ total }]] = await db.query(
      'SELECT COUNT * AS total FROM categories WHERE name LIKE ?'[`%${search}%`]
    );

    const totalpages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      totalpages,
      totalresult: 'total categories',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'error fetching categories',
      error: err.message,
    });
  }
};

// get single category (by id) //

exports.getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      'SELECT * FROM category WHERE category_id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'category not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'fetch category',
      category: rows[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
