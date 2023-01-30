const Auth = require('../../http/middleware/Auth')
const Admin = require('../../http/middleware/Admin')
const router = require('express').Router();

const transaction = require("../../http/controllers/TransactionController");
const Async_error = require('../../http/middleware/Async_error');

//var router = require('express').Router();

router.get('/', [Auth,Admin], Async_error(transaction.allTransactions));


router.get('/:id', [Auth,Admin], Async_error(transaction.getTransaction));
router.delete('/delete/:id', [Auth,Admin], Async_error(transaction.deleteTransaction));

module.exports = router
