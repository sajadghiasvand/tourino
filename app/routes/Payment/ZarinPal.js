const Auth = require('../../http/middleware/Auth')
const Admin = require('../../http/middleware/Admin')
const ZarinpalCheckout = require("zarinpal-checkout");
const moment = require('moment');
const db = require('../../models');
const Transaction = db.transactions;
const Order = db.orders
const router = require('express').Router();
const zarinpal = require('../../http/controllers/ZarinPalController');

router.get('/PaymentRequest', zarinpal.PaymentRequest);

router.get('/Validate/:amount/', zarinpal.Validate);

router.get('/PaymentVerification/:amount/:Authority', zarinpal.VerifyRequest);

router.get('/UnverifiedTransactions', zarinpal.UnverifiedTransactions);

router.get('/RefreshAuthority/:expire/:token', zarinpal.RefreshAuthority);

module.exports = router
