const Auth = require('../../http/middleware/Auth')
const Admin = require('../../http/middleware/Admin')
const router = require('express').Router();
const setting = require("../../http/controllers/SettingController");
const Async_error = require('../../http/middleware/Async_error');

//var router = require('express').Router();

router.get('/', [Auth,Admin], Async_error(setting.getSetting));
router.post('/', [Auth,Admin], Async_error(setting.updateSetting));

module.exports = router
