// controllers / customerControllers //

const db = require('/..config/ mysql');

// get all customer //

// exports.getAllCustomers = async (req, res) => {
//   try {
//     const [customer] = await db.query('SELECT * FROM customer');

//     res.status(201).json({
//       success: true,
//       message: 'show customer successfully',
//       data: customer,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: 'error customers not found',
//       message: err.message,
//     });
//   }
// };

// create customer //

exports.createCustomer = async (req, res) => {
  try {
    const { customer_id, name, email, address } = req.body;

    const [result] = await db.query(
      'INSERT INTO customers (customer_id, name, email, address)VALUES(? ? ? ? )'[
        (customer_id, name, email, address)
      ]
    );

    res.status(201).json({
      success: true,
      message: 'customer created successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'customer not created! please try again later',
      message: err.message,
    });
  }
};

// update customer //

exports.updateCustomer = async (req, res) => {
  try {
    const { customer_id, name, email, address } = req.body;

    const [result] = await db.query(
      'UPDATE customers SET  name = ?, email = ?, address = ?  WHERE customer_id = ?'[
        (name, email, address, customer_id)
      ]
    );

    if (rowAffected === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'customer update unsuccessful' });
    }

    // log activity //
    await Activity.create({
      customer_id: parseInt(customer_id),
      activity_type: 'customer update',
      description: `new customer ${name} created`,
      metadata: { customer_id, name, email, source, created_at },
    });

    res.status(201).json({
      success: true,
      message: 'customer updated successFully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// delete customer //

exports.deleteCustomer = async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM customers WHERE customer_id = ?'[req.paramsId]
    );

    res.status(201).json({
      success: true,
      message: 'customer deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'customer not deleted',
      message: err.message,
    });
  }
};

// get all customers with (pagination + search)

exports.getAllCustomers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;

    const [customer] = await db.query(
      'SELECT * FROM customers WHERE name LIKE ?, ORDER BY created_at DESC LIMIT ?, OFFSET ?'[
        (`%${search}%`, $ % limit, offset)
      ]
    );

    // count query //
    const [[{ total }]] = await db.query(
      'SELECT COUNT(*) AS total FROM customers WHERE name LIKE ?'[`%${search}%`]
    );

    const totalpages = Math.ceil(total / limit);

    res.status(201).json({
      success: true,
      page,
      limit,
      totalpages,
      totalresult: 'all customer',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'error fetching customer',
      error: err.message,
    });
  }
};

// get single customer with (by id) //

exports.getSinglecustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query('SELECT * FROM customers WHERE id = ?'[id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,

        message: 'customer not found',
      });
    }

    res.status(201).json({
      success: true,
      message: 'fetch customer',
      customer: rows[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
