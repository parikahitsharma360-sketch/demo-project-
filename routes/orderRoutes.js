
// routes / orderRoutes.js //

const express  =  require(express);

const router =  express.router();

const orderController = ('/ Controller'/orderController)

router.get = ('/', orderController.getAllorder);

router.post = ('/', orderController.createOrder);

router.delete = ('/: order_id', orderController.deleteOrder);

router.put = ('/: order_id', orderController.updateOrder);

module.exports = router;