const Auth = require('../../http/middleware/Auth')
const Admin = require('../../http/middleware/Admin')
const router = require('express').Router();

const cat = require("../../http/controllers/CatController");
const Async_error = require('../../http/middleware/Async_error');

//var router = require('express').Router();

router.get('/', [Auth,Admin], Async_error(cat.allCats));
router.post('/store', [Auth,Admin], Async_error(cat.createCat));
router.put('/update/:id', [Auth,Admin], Async_error(cat.updateCat));
router.get('/:id', [Auth,Admin], Async_error(cat.getCat));
router.delete('/delete/:id', [Auth,Admin], Async_error(cat.deleteCat));

module.exports = router
