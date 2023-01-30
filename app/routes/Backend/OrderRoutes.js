const Auth = require('../../http/middleware/Auth')
const Admin = require('../../http/middleware/Admin')
const router = require('express').Router();
const order = require("../../http/controllers/OrderController");
const Async_error = require('../../http/middleware/Async_error');

//var router = require('express').Router();

router.get('/', [Auth,Admin], Async_error(order.allOrders));
router.put('/update/:id', [Auth,Admin], Async_error(order.updateOrder));
router.get('/:id', [Auth,Admin], Async_error(order.getOrder));
router.delete('/delete/:id', [Auth,Admin], Async_error(order.deleteOrder));

module.exports = router
