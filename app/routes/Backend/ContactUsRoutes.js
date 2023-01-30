const Auth = require('../../http/middleware/Auth')
const Admin = require('../../http/middleware/Admin')
const router = require('express').Router();
const contactus = require("../../http/controllers/ContactUsController");
const Async_error = require('../../http/middleware/Async_error');

//var router = require('express').Router();

router.get('/', [Auth,Admin], Async_error(contactus.allContactUs));
router.get('/:id', [Auth,Admin], Async_error(contactus.getContactUs));
router.delete('/delete/:id', [Auth,Admin], Async_error(contactus.deleteContactUs));

module.exports = router
