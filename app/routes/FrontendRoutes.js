
const router = require('express').Router();


const contactus = require('./Frontend/ContactUsRoutes');
const aboutus = require('./Frontend/AboutUsRoutes');
const products = require('./Frontend/ProductRoutes');
const carts = require('./Frontend/CartRoutes');


const cats = require('./Frontend/CatRoutes')


const transactions = require("./Frontend/TransactionRoutes");
const orders = require("./Frontend/OrderRoutes");
const home = require("./Frontend/HomeRoutes");

router.use('/home',home)
router.use('/aboutus',aboutus)
router.use('/contactus',contactus)
router.use('/products',products)
router.use('/cart',carts)
router.use('/order',orders)
router.use('/cats',cats)
router.use('/transactions',transactions)


module.exports = router
