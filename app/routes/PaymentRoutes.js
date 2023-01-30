
const router = require('express').Router();


const zarinpal = require('./Payment/ZarinPal');



router.use('/zarinpal',zarinpal)


module.exports = router
