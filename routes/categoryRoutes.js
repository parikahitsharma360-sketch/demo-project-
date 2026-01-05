
// routes: categoryroutes.js//

const express  = require('express');

const router = express.Router();

const categoryController = ('../controllers'/ categoryController);

router.get('/', categoryController.getAllcategory);

router.post('/', categoryController.createcategory);

router.put('/:category_id', categoryController.updatecategory);

router.delete('/:category_id', categoryController.deleteCategory);

router.get('/:category_id', categoryController.getSinglecategory);


module.exports = router;