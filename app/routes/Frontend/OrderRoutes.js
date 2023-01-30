const Auth = require('../../http/middleware/Auth')
const Admin = require('../../http/middleware/Admin')
const router = require('express').Router();
const order = require('../../http/controllers/OrderController.js');
const offcode = require('../../http/controllers/OffcodeController.js');
const {or} = require("sequelize");
const Async_error = require('../../http/middleware/Async_error');

//var router = require('express').Router();

router.get('/', [Auth], Async_error(order.allUserOrders));
router.post('/', [Auth], Async_error(order.createOrder));
router.post('/checkOffcode', [Auth], Async_error(offcode.checkOffcode));


module.exports = router
