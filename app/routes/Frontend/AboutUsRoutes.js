const Auth = require('../../http/middleware/Auth')
const Admin = require('../../http/middleware/Admin')
const router = require('express').Router();
const setting = require('../../http/controllers/SettingController.js');
const Async_error = require('../../http/middleware/Async_error');

//var router = require('express').Router();

router.get('/', [], Async_error(setting.getAboutUs));


module.exports = router
