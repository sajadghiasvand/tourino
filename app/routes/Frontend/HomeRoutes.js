const Auth = require('../../http/middleware/Auth')
const Admin = require('../../http/middleware/Admin')
const router = require('express').Router();
const dashboard = require('../../http/controllers/DashboardController.js');
const Async_error = require('../../http/middleware/Async_error');


//var router = require('express').Router();

router.get('/getData', [], Async_error(dashboard.getLanding))
router.get('/getHeader', [], Async_error(dashboard.getHeader))
router.get('/getSearch', [], Async_error(dashboard.getSearch))





module.exports = router
