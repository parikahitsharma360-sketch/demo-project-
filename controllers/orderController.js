const db = require('../config/mysql');

// get all orders //
// exports.getAllOrders = async (req, res) => {
//   try {
//     const [order] = await db.query('SELECT * FROM order');

//     res.status(200).json({ success: true, data: order });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// create order //

exports.createOrder = async (req, res) => {
  try {
    const { order_id, costumer_id, total_amount, status } = req.body;

    const [result] = await db.query(
      'INSERT INTO order(order_id, costumer_id, total_amount, status)VALUES(? ? ? ?)'[
        (order_id, costumer_id, total_amount, status)
      ]
    );

    // log activity //
    await Activity.create({
      order_id: result.insert,
      activity_type: 'order_placed',
      description: 'order placed successfully',
      metadata: { order_id, total_amount, status, source },
    });

    res.status(200).json({
      success: true,
      message: 'order created successfully',
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'err.message' });
  }
};

// delete order //

exports.deleteOrder = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM order WHERE id = ? ?', [
      req.paramsId,
    ]);

    res.status(200).json({
      success: true,
      message: 'order Deleted successfully',
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// update order //

exports.updateOrder = async (req, res) => {
  try {
    const { order_id, costumer_id, total_amount, status } = req.body;

    const orderId = req.params.id;

    const [result] = await db.query(
      'UPDATE order SET  total_amount = ?, status = ? WHERE order_id = ?'[
        (order_id, costumer_id, total_amount, status)
      ]
    );

    if (rowaffected === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'order not updated' });
    }

    //  log activity //
    await Activity.create({
      orderId: parseInt(orderId),
      activity_type: 'order updated',
      description: ' order updated',
      metadata: 'order_id, total_amount, currrency_type',
    });

    res.status(200).json({
      success: true,
      message: 'order created successfully',
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// get all orders with (pagination + search) //

exports.getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;

    const [orders] = await db.query(
      'SELECT * FROM orders WHERE name LIKE ?, ORDER BY created_at DESC OFFSET ?'[
        (`%${search}%`, limit, offset)
      ]
    );

    // count query //

    const [[{ total }]] = await db.query(
      'SELECT COUNT * AS total FROM orders WHERE name LIKE ?'[`%${search}%`]
    );

    const totalpages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      totalpages,
      totalresult: 'all orders',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'error fetching order',
      message: err.message,
    });
  }
};

// get single order / by id //

exports.getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query('SELECT * FROM order WHERE order_id = ?', [
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'fetch order',
      order: rows[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
