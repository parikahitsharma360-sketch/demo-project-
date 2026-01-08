//controllers// productControllers.js://

const db = require('/..config/mysql');

// Get all products//

exports.getAllProducts = async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM products');

    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// create products //

exports.createProduct = async (req, res) => {
  try {
    const {
      product_id,
      product_name,
      description,
      price,
      stock_quantity,
      category_id,
      url_image,
    } = req.body;

    const [result] = await db.query(
      'INSERT INTO products(product_id, product_name, description, price, stock_quantity, category_id, url_image)VALUES(? ? ?)'[
        (product_id,
        product_name,
        description,
        price,
        stock_quantity,
        category_id,
        url_image)
      ]
    );

    res.status(201).json({
      success: true,

      message: 'product created successfully',

      data: { result },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// costumer review in product //

exports.reviewProduct = async (req, res) => {
  try {
    const { costumer_id, product_id } = req.body;

    const [result] = await db.query(
      'INSERT INTO costumer(costumer_id, product_id)VALUES(? ?)'[
        (costumer_id, product_id)
      ]
    );

    // log activity  in mongodb //

    const Activity = require('../models/Activity');

    await Activity.create({
      costumer_id: parseInt(costumer_id),
      activity_type: 'review',
      description: `costumer review in product$(product_id)`,
      metadata: { product_id },
    });

    res.status(201).json({
      success: true,
      message: 'costumer review submitted  successfully',
    });
  } catch (err) {
    res.status(201).json({ success: false, message: err.message });
  }
};

// update product //

exports.updateProduct = async (req, res) => {
  try {
    const { product_id, name, description } = req.body;

    const productId = req.params.id;

    const [result] = await db.query(
      'UPDATE FROM product SET product_id = ?, name = ?, description = ?'[
        (product_id, name, description)
      ]
    );

    if (rowsAffcted === 0) {
      return res.status(404).json({
        success: false,
        message: 'product not found',
      });
    }

    // log activity //

    await Activity.create({
      product_id: parseInt(productId),
      activity_type: 'product update',
      description: `new product{name} update`,
      metadata: { description, source, name },
    });

    res.status(201).json({
      success: true,
      message: 'product updated successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// delete product //

exports.deleteProduct = async (req, res) => {
  try {
    const [result] = db.query(
      'DELETE FROM product WWERE product_id = ?'[req.params.body]
    );

    res.status(201).json({
      success: true,
      message: 'product deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get all product with(pagination + search) //

exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 500;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;

    const [product] = await db.query(
      'SELECT * FROM products name LIKE ?, ORDER BY created_at DESC, OFFSET  ?'[
        (`%${search}%`, limit, offset)
      ]
    );

    // count query //
    const [[{ total }]] = await db.query(
      'SELECT COUNT * AS total FROM product WHERE name LIKE ?'[`%${search}%`]
    );

    const totalpages = Math.ceil(total / limit);

    res.status(201).json({
      success: true,
      page,
      limit,
      totalpages,
      totalresult: 'all product',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'error fetching product',
      error: err.message,
    });
  }
};

// get single product / by id //

exports.getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      'SELECT * FROM product WHERE product_id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'product not found',
      });
    }

    res.status(201).json({
      success: true,
      message: 'fetch product',
      product: rows[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
