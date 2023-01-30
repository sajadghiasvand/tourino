const Auth = require('../../http/middleware/Auth')
const Admin = require('../../http/middleware/Admin')
const router = require('express').Router();
const cart = require('../../http/controllers/CartController');
const Async_error = require('../../http/middleware/Async_error');

//var router = require('express').Router();

router.get('/', [Auth], Async_error(cart.getCart));
router.post('/addToCart', [Auth], Async_error(cart.addToCart));
router.post('/delFromCart', [Auth], Async_error(cart.delFromCart));
router.post('/delAll', [Auth], Async_error(cart.delAll));


module.exports = router
