// routes / costumerRoutes.js //

const express = require (express);

const router = express.router();

const costumerController = ('/..controller'/costumer/costumerController);

router.get('/', costumerController.getAllCostumer);

router.post('/', costumerController.createCostumer);

router.put('/:costumer_id', costumerController.updateCostumer);

router.delete('/:costumer_id', costumerController.deleteCostumer);

module.exports = router();