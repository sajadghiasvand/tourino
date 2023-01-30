const Auth = require('../../http/middleware/Auth')
const Admin = require('../../http/middleware/Admin')
const router = require('express').Router();
const contact = require('../../http/controllers/ContactUsController.js');
const setting = require('../../http/controllers/SettingController');
const Async_error = require('../../http/middleware/Async_error');

//var router = require('express').Router();
router.get('/', [], Async_error(setting.getContactUs));
router.post('/', [], Async_error(contact.createContactUs));


module.exports = router
