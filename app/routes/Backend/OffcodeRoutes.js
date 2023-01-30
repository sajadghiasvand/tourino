const Auth = require('../../http/middleware/Auth')
const Admin = require('../../http/middleware/Admin')
const router = require('express').Router();
const offcode = require("../../http/controllers/OffcodeController");
const Async_error = require('../../http/middleware/Async_error');

//var router = require('express').Router();

router.get('/', [Auth,Admin], Async_error(offcode.allOffcodes));
router.post('/store', [Auth,Admin], Async_error(offcode.createOffcode));
router.put('/update/:id', [Auth,Admin], Async_error(offcode.updateOffcode));
router.get('/:id', [Auth,Admin], Async_error(offcode.getOffcode));
router.delete('/delete/:id', [Auth,Admin], Async_error(offcode.deleteOffcode));


module.exports = router
