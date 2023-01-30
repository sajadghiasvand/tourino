const Auth = require('../../http/middleware/Auth')
const Admin = require('../../http/middleware/Admin')
const router = require('express').Router();
const product = require('../../http/controllers/ProductController');
const Async_error = require('../../http/middleware/Async_error');

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
const multipleupload = upload.fields([{name:'pic',maxCount:1}]);
//var router = require('express').Router();

//router.get('/test', [], book.testBook);
router.get('/', [Auth,Admin], Async_error(product.allProducts));
router.get('/byCat', [Auth,Admin], Async_error(product.allProductsByCat));
router.get('/:id', [Auth,Admin], Async_error(product.getProduct));
router.post('/store', [Auth,Admin,multipleupload], Async_error(product.createProduct));
router.post('/store/:id/gallery', [Auth,Admin,upload.single('file')], Async_error(product.createProductgallery));
router.post('/store/:id/item', [Auth,Admin], Async_error(product.createProductitem));
router.post('/store/:id/field', [Auth,Admin], Async_error(product.createProductfield));
router.put('/update/:id', [Auth,Admin,multipleupload], Async_error(product.updateProduct));
router.delete('/delete/:id/gallery', [Auth,Admin], Async_error(product.deleteProductgallery));
router.delete('/delete/:id/item', [Auth,Admin], Async_error(product.deleteProductitem));
router.delete('/delete/:id/field', [Auth,Admin], Async_error(product.deleteProductfield));
router.delete('/delete/:id', [Auth,Admin], Async_error(product.deleteProduct));


module.exports = router
