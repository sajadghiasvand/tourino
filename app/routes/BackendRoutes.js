
const router = require('express').Router();
const users = require('./Backend/UserRoutes');
const setting = require('./Backend/SettingRoutes');
const contactus = require('./Backend/ContactUsRoutes');
const products = require('./Backend/ProductRoutes');

const comments = require('./Backend/CommentRoutes')

const orders = require('./Backend/OrderRoutes')

const offcodes = require('./Backend/OffcodeRoutes')

const transactions = require('./Backend/TransactionRoutes')
const dashboard = require('./Backend/DashboardRoutes')

router.use('/dashboard', dashboard)
router.use('/users', users)
router.use('/setting', setting)
router.use('/contactus', contactus)
router.use('/products', products)
router.use('/comments', comments)
router.use('/orders', orders)
router.use('/offcodes', offcodes)
router.use('/transactions', transactions)


module.exports = router
