const db = require('../../models');
const User = db.users;
const Ticket = db.tickets;
const Subscribe = db.subscribes;
const Op = db.Sequelize.Op;
const { getPagination, getPagingData2 } = require("../../helper/methods");

class UserController {
    async allUsers(req, res) {
        const { page, size, title } = req.query;
        var condition = title ? {
            [Op.or]: [
                { mobile: { [Op.like]: `%${title}%` } },
                { family: { [Op.like]: `%${title}%` } },
            ]
        } : null;
        const { limit, offset } = getPagination(page, size)
        const data = await User.findAndCountAll({
            order: [['id', 'DESC']],
            where: condition, limit, offset
        });
        const resp = getPagingData2(data, page, limit)
        return res.send(resp);
    }

    async createUser(req, res) {
        validateStoreUser({ ...req.body })
        const phone = await User.findOne({ where: { phone: req.body.phone } })
        phone && throwError('کاربر تکراری می باشد !')
        const user = await User.create({ ...req.body, pic: req.file?.path });
        res.send(user)
    };


    async updateUser(req, res) {
        const id = req.params.id
        validateStoreUser({ ...req.body })
        const user = await User.findByPk(id);
        !user && throwError('کاربری یافت نشد !')
        let result = await user.update({
            ...req.body,
            pic: req.file != undefined ? req.file.path : user.getDataValue('pic')
        });
        !result && throwError('مشکلی در بروزرسانی رخ داده است !')
        res.status(200).send({ message: 'کاربر با موفقیت به روزرسانی شد!' })
    };

    async deleteUser(req, res) {
        const id = req.params.id;
        const result = await User.destroy({ where: { id: id } })
        !result && throwError('مشکلی در حذف کاربر رخ داده است !')
        return res.send({ message: 'حذف با موفقیت انجام شد !' })
    };

    async setPic(req, res) {
        const id = req.user.id;

        const user = await User.findByPk(id);
        !user && throwError('موردی یافت نشد', 400)
        const result = await user.update({
            pic: req.file.path != undefined ? req.file.path : user.getDataValue('pic')
        })
        !result && throwError('مشکلی در بروزرسانی رخ داده است !')


        return res.send({
            message: 'update successfull'
        })

    };

    async setMe(req, res) {
        const id = req.user.id;

        const user = await User.findByPk(id);
        !user && throwError('موردی یافت نشد', 400)
        const result = await user.update({
            ...req.body,
        })
        !result && throwError('مشکلی در بروزرسانی رخ داده است !')


        return res.send({
            message: 'update successfull'
        })

    };

    async getMe(req, res) {
        const id = req.user.id;

        const data = await User.findByPk(id, {
            attributes: ['id', 'name', 'family', 'mobile', 'role', 'pic', 'fullName']
        })
        !data && throwError('موردی یافت نشد', 400)
        
        return res.send({ status: true, data: data })

    };

    async getUser(req, res) {
        const id = req.params.id;

        const data = await User.findByPk(id, {
            attributes: ['id', 'name', 'family', 'mobile', 'role', 'pic', 'fullName']
        })
        !data && throwError('موردی یافت نشد', 400)
        return res.send({ status: true, data: data })

    };

}

module.exports = new UserController();



