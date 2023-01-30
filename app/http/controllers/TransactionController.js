const db = require('../../models');
const Transaction = db.transactions;
const Order = db.orders;
const User = db.users;
const Op = db.Sequelize.Op;
const { getPagination, getPagingData2 } = require("../../helper/methods");

class TransactionController {
    async allTransactions(req, res) {
        const { page, size, title } = req.query;
        var condition = title ? {
            [Op.or]: [
                { Authority: { [Op.like]: `%${title}%` } },
                { Ref: { [Op.like]: `%${title}%` } },
                { total_price: { [Op.like]: `%${title}%` } }
            ]
        } : null;
        const { limit, offset } = getPagination(page, size)
        const data = await Transaction.findAndCountAll({ order: [['id', 'DESC']], where: condition, limit, offset, include: [User, Order] })
        const resp = getPagingData2(data, page, limit)
        return res.send(resp)

    }

    async allUserTransactions(req, res) {
        const { page, size, mobile } = req.query;
        const { limit, offset } = getPagination(page, size)
        const data = await Transaction.findAndCountAll({ order: [['id', 'DESC']], include: [Order], where: { UserId: req.user.id }, limit, offset })
        const resp = getPagingData2(data, page, limit)
        return res.send(resp)

    }

    async createTransaction(req, res) {

        const data = await Transaction.create(req.body)
        !data && throwError('مشکلی در ثبت رخ داده است !')
        return res.send(data)

    };


    async updateTransaction(req, res) {
        const id = req.params.id;

        const item = await Transaction.findByPk(id);
        !item && throwError('موردی یافت نشد', 400)
        const data = await Transaction.update(req.body)
        !data && throwError('مشکلی در بروزرسانی رخ داده است !')
        return res.send({
            message: 'update successfull'
        })

    };

    async deleteTransaction(req, res) {
        const id = req.params.id;

        const data = await Transaction.destroy({
            where: { id: id }
        })
        !data && throwError('مشکلی در حذف رخ داده است !')
        return res.send({
            message: 'delete successfull'
        })

    };

    async getTransaction(req, res) {
        const id = req.params.id;

        const data = await Transaction.findByPk(id)
        !data && throwError('موردی یافت نشد', 400)
        return res.send(data)

    };

}

module.exports = new TransactionController();



