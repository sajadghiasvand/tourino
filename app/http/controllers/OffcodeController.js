const db = require('../../models');
const Offcode = db.offcodes;
const OrderOffcode = db.order_offcodes;
const Op = db.Sequelize.Op;
const { getPagination, getPagingData2 } = require("../../helper/methods");

class OffcodeController {

    async checkOrderOffcode(code, user) {

        try {

            const c = await Offcode.findOne({
                where: {
                    code: code
                }
            })
            if (c) {
                const d = await OrderOffcode.count({
                    where: {
                        UserId: user.id,
                        OffcodeId: c.id,
                        status: 1
                    }
                })
                if (d > 0) {
                    return false;
                } else {
                    return c;
                }
            }
        } catch (err) {
            return false
        }

    }

    async checkOffcode(req, res) {
        const code = req.body.code;
        try {

            const c = await Offcode.findOne({
                where: {
                    code: code
                }
            })
            if (c) {
                const d = await OrderOffcode.count({
                    where: {
                        UserId: req.user.id,
                        OffcodeId: c.id,
                        status: 1
                    }
                })
                if (d > 0) {
                    return res.status(400).send({
                        'message': 'offcode used'
                    });
                } else {
                    return res.send(c);
                }
            }
            return res.status(400).send({
                'message': 'offcode not found'
            });
        } catch (err) {
            return res.status(500).send({
                'message': err.message
            })
        }

    }

    async allOffcodes(req, res) {
        const { page, size, title } = req.query;
        var condition = title ? { code: { [Op.like]: `%${title}%` } } : null;
        const { limit, offset } = getPagination(page, size)
        const data = await Offcode.findAndCountAll({ order: [['id', 'DESC']], where: condition, limit, offset })
        const resp = getPagingData2(data, page, limit)
        return res.send(resp)

    }


    async createOffcode(req, res) {


        const data = await Offcode.create(req.body)
        !result && throwError('مشکلی در ثبت رخ داده است !')
        return res.send(data)


    };


    async updateOffcode(req, res) {
        const id = req.params.id;

        const item = await Offcode.findByPk(id);
        !item && throwError('موردی یافت نشد', 400)
        const result = await item.update(req.body)
        !result && throwError('مشکلی در بروزرسانی رخ داده است !')
        return res.send({
            message: 'update successfull'
        })

    };

    async deleteOffcode(req, res) {
        const id = req.params.id;
        const data = await Offcode.destroy({
            where: { id: id }
        })
        !data && throwError('مشکلی در حذف رخ داده است !')
        return res.send({
            message: 'delete successfull'
        })

    };

    async getOffcode(req, res) {
        const id = req.params.id;
        const data = await Offcode.findByPk(id)
        !data && throwError('موردی یافت نشد', 400)
        return res.send(data)

    };

}

module.exports = new OffcodeController();



