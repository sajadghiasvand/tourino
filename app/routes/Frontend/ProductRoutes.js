const Auth = require('../../http/middleware/Auth')
const Admin = require('../../http/middleware/Admin')
const router = require('express').Router();
const product = require('../../http/controllers/ProductController.js');
const comment = require("../../http/controllers/CommentController");
const Async_error = require('../../http/middleware/Async_error');

//var router = require('express').Router();

router.get('/', [], Async_error(product.allProductsFront));
router.get('/byCat', [], Async_error(product.allProductsByCat));
router.get('/:id', [], Async_error(product.getProduct));
router.get('/:id/comments', [], Async_error(comment.getCommentByProduct));
router.post('/:id/comments', [Auth], Async_error(product.createComment));


module.exports = router
