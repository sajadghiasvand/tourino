const Auth = require('../../http/middleware/Auth')
const Admin = require('../../http/middleware/Admin')
const router = require('express').Router();
const comment = require('../../http/controllers/CommentController');
const Async_error = require('../../http/middleware/Async_error');

//var router = require('express').Router();

router.get('/', [Auth,Admin], Async_error(comment.allComments));
router.put('/update/:id', [Auth,Admin], Async_error(comment.updateComment));
router.get('/:id', [Auth,Admin], Async_error(comment.getComment));
router.delete('/delete/:id', [Auth,Admin], Async_error(comment.deleteComment));


module.exports = router
