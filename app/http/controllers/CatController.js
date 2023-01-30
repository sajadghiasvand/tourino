const db = require('../../models');
const Cat = db.cats;
const Product = db.products;
const Op = db.Sequelize.Op;
const { getPagination, getPagingData2 } = require("../../helper/methods");
const { validateCat } = require('../validators');
const msg = require('../../helper/msg');

class CatController {
    async allCats(req, res) {
        const { page, size, title } = req.query;
        var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
        const { limit, offset } = getPagination(page, size)
        const data = await Cat.findAll({ where: condition })
        res.send({ limit, data, offset })
    }

    async createCat(req, res) {
        validateCat(req.body)
        const result = await Cat.create(req.body)
        !result && throwError('مشکلی در ثبت دسته بندی رخ داده است !')
        res.send(result)

    };


    async updateCat(req, res) {
        const id = req.params.id;
        const result = await Cat.update(req.body, { where: { id: id } })
        !result && throwError('مشکلی در بروزرسانی دسته بندی رخ داده است !')
        res.send({ message: msg.put })
    };

    async deleteCat(req, res) {
        const id = req.params.id;
        const result = await Cat.destroy({ where: { id: id } })
        !result && throwError('مشکلی در حذف دسته بندی رخ داده است !')
        res.send({ message: msg.delete })
    };

    async getCat(req, res) {
        const id = req.params.id;
        const result = await Cat.findByPk(id)
        !result && throwError('دسته بندی یافت نشد', 400)
        res.send(result)
    };



}

module.exports = new CatController();



