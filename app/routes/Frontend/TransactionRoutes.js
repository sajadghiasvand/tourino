const Auth = require('../../http/middleware/Auth')
const Admin = require('../../http/middleware/Admin')
const router = require('express').Router();
const transaction = require('../../http/controllers/TransactionController.js');
const Async_error = require('../../http/middleware/Async_error');

//var router = require('express').Router();

router.get('/', [Auth], Async_error(transaction.allUserTransactions));

module.exports = router
