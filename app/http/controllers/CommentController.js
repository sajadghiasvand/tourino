const db = require('../../models');
const Comment = db.comments;

const Product = db.products;
const User = db.users;
const Op = db.Sequelize.Op;
const { getPagination, getPagingData2 } = require("../../helper/methods");
const { throwError } = require('../../helper/throwError');


class CommentController {
    async allComments(req, res) {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size)
        const data = await Comment.findAndCountAll({ limit, offset, })
        const resp = getPagingData2(data, page, limit)
        res.send(resp)
    }



    async getCommentByProduct(req, res) {
        const { page, size } = req.query;
        const id = req.params.id;
        const { limit, offset } = getPagination(page, size)
        const data = await Comment.findAndCountAll({ order: [['id', 'DESC']], where: { commentableId: id, commentableType: 'Product' }, include: [User], limit, offset })
        const resp = getPagingData2(data, page, limit)
        return res.send(resp)
    }

    async createComment(req, res) {
        console.log(req.user)
        const id = req.params.id
        validateStoreComment({ ...req.body, UserId: req.user.id })
        const product = await Product.findByPk(id)
        !product && throwError('محصولی یاقت نشد !')
        const result = await product.createComment({ ...req.body, UserId: req.user.id })
        !result && throwError('مشکلی در ثبت کامنت رخ داده است !')
        res.send({ message: 'نظر شما با موفقیت ثبت شد!' })
    };


    async updateComment(req, res) {
        const id = req.params.id;
        const com = await Comment.findByPk(id);
        !com && throwError('کامنتی یاقت نشد !')
        const result = await com.update(req.body)
        !result && throwError('مشکلی در بروزرسانی کامنت رخ داده است !')
        res.send({ message: 'بروزرسانی نظر با موفقیت انجام شد !' })
    }

    async deleteComment(req, res) {
        const id = req.params.id;
        const result = await Comment.destroy({ where: { id: id } })
        !result && throwError('مشکلی در حذف نظر رخ داده است !')
        res.send({ message: 'حذف نظر با موفقیت انجام شد !' })
    };

    async getComment(req, res) {
        const id = req.params.id;
        //var condition = mobile ? {mobile : {[Op.like]: `%${mobile}%`}} : null;
        const data = await Comment.findByPk(id, { include: [Product] });
        !data && throwError('کامنت یافت نشد', 400)
        return res.send(data)

    };

}

module.exports = new CommentController();



