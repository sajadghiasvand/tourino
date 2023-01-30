const db = require('../../models');
const ContactUs = db.contactus;
const Op = db.Sequelize.Op;
const { getPagination, getPagingData2 } = require("../../helper/methods");
const { throwError } = require('../../helper/throwError');

class ContactUsController {

    async allContactUs(req, res) {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size)
        const data = await ContactUs.findAndCountAll({ limit, offset });
        const resp = getPagingData2(data, page, limit)
        return res.send(resp)

    }

    async createContactUs(req, res) {
        const result = await ContactUs.create({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            content: req.body.content,
        })
        !result && throwError('مشکلی در ثبت رخ داده است !')
        return res.send(result)
    };


    async updateContactUs(req, res) {
        const id = req.params.id;
        const item = await ContactUs.findByPk(id);
        !item && throwError('موردی یافت نشد', 400);
        const result = await item.update(req.body)
        !result && throwError('مشکلی در بروزرسانی رخ داده است !')
        return res.send({
            message: 'update successfull'
        })

    };

    async deleteContactUs(req, res) {
        const id = req.params.id;
        //var condition = mobile ? {mobile : {[Op.like]: `%${mobile}%`}} : null;
        const result = await ContactUs.destroy({
            where: { id: id }
        })
        !result && throwError('مشکلی در حذف رخ داده است !')
        return res.send({
            message: 'delete successfull'
        })

    };

    async getContactUs(req, res) {
        const id = req.params.id;
        //var condition = mobile ? {mobile : {[Op.like]: `%${mobile}%`}} : null;
        const data = await ContactUs.findByPk(id);
        !data && throwError('موردی یافت نشد',400)
        return res.send(data)

    };

}

module.exports = new ContactUsController();



