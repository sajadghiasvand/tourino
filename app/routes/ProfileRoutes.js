const router = require('express').Router();
const jwt = require('jsonwebtoken');
const db = require('../models');
const Auth = require("../http/middleware/Auth");
const user = require("../http/controllers/UserController");

const multer = require("multer");
var storage = multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
                cb(null,  Date.now()+"-"+file.originalname)
        }
})
const upload = multer({storage:storage})
//var router = require('express').Router();




        router.get('/', [Auth], user.getMe);
        router.post('/', [Auth], user.setMe);
        router.post('/pic', [Auth,upload.single('pic')], user.setPic);



module.exports = router
