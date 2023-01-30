const login = require('./AuthRoutes')
const me = require('./ProfileRoutes')
const payment = require('./PaymentRoutes')
const admin = require('./BackendRoutes')
const front = require('./FrontendRoutes')

const router = require('express').Router();

    router.use('/me', me);
    router.use('/payment', payment);
    router.use('/login', login);
    router.use('/admin', admin);
    
    router.use('/front', front);


    module.exports = router;

