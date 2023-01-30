const Auth = require('../../http/middleware/Auth')
const Admin = require('../../http/middleware/Admin')
const router = require('express').Router();
const cat = require('../../http/controllers/CatController.js');
const Async_error = require('../../http/middleware/Async_error');

//var router = require('express').Router();

router.get('/', [], Async_error(cat.allCats));
router.get('/:id', [], Async_error(cat.getCat));


module.exports = router
