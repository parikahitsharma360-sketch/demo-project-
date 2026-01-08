
// routes: categoryroutes.js//

const express  = require('express');

const router = express.Router();

const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getAllCategory);

router.post('/', categoryController.createCategory);

router.put('/:category_id', categoryController.updateCategory);

router.delete('/:category_id', categoryController.deleteCategory);

router.get('/:category_id', categoryController.getSingleCategory);

module.exports = router;