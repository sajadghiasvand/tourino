const db = require('../../models');
const Setting = db.setting;

const Op = db.Sequelize.Op;
const { getPagination, getPagingData2 } = require("../../helper/methods");

class SettingController {

    async updateSetting(req, res) {
        const id = 1;

        const setting = await Setting.findByPk(id);
        !setting && throwError('موردی یافت نشد', 400)

        let result = await setting.update({ ...req.body });


        !result && throwError('مشکلی در بروزرسانی رخ داده است !')

        return res.send({
            message: 'update successfull'
        })




    };


    async getSetting(req, res) {
        const id = 1;

        const data = await Setting.findByPk(id)
        !result && throwError('موردی یافت نشد', 400)
        return res.send(data)

    };

    async getAboutUs(req, res) {
        const id = 1;

        const data = await Setting.findByPk(id)
        !result && throwError('موردی یافت نشد', 400)
        return res.send(data.aboutus)
    }

    async getContactUs(req, res) {
        const id = 1;

        const data = await Setting.findByPk(id)
        !result && throwError('موردی یافت نشد', 400)
        return res.send(data.contactus)
    }

    async getGhesti(req, res) {
        const id = 1;

        const data = await Setting.findByPk(id)
        !result && throwError('موردی یافت نشد', 400)
        return res.send(data.ghesti)
    }

    async getStatus(req, res) {
        const id = 1;

        const data = await Setting.findByPk(id)
        !result && throwError('موردی یافت نشد', 400)
        return res.send(data.status)
    }

}

module.exports = new SettingController();



