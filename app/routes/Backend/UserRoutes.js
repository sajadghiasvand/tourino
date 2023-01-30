const Auth = require('../../http/middleware/Auth')
const Admin = require('../../http/middleware/Admin')
const router = require('express').Router();
const user = require('../../http/controllers/UserController.js');
const Async_error = require('../../http/middleware/Async_error');
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const upload = multer({ storage: storage })

router.get('/', [Auth, Admin], Async_error(user.allUsers));
router.post('/store', [Auth, Admin, upload.single('file')], Async_error(user.createUser));
router.put('/update/:id', [Auth, Admin, upload.single('file')], Async_error(user.updateUser));
router.get('/:id', [Auth, Admin], Async_error(user.getUser));
router.delete('/delete/:id', [Auth, Admin], Async_error(user.deleteUser));


module.exports = router
