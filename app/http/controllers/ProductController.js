const db = require('../../models');
const Product = db.products;
const Productitem = db.productitems;
const Productgallery = db.productgalleries;
const Productfield = db.productfields;
const Cat = db.cats;
const Cart = db.carts;
const User = db.users;
const Op = db.Sequelize.Op;
const _ = require('lodash');
const { getPagination, getPagingData } = require("../../helper/methods");

class ProductController {

    async allProductsFront(req, res) {
        const { page, size, title } = req.query;
        var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
        const { limit, offset } = getPagination(page, size)
        const count = await Product.count({ where: condition })
        const data = await Product.findAll({
            order: [['id', 'DESC']],
            include: [{ model: Productitem, as: "pi" }],
            where: condition,
            limit,
            offset
        })
        const resp = getPagingData(data, count, page, limit)
        return res.send(resp)

    }

    async allProducts(req, res) {
        const { page, size, title } = req.query;
        var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
        const { limit, offset } = getPagination(page, size)
        const count = await Product.count({ where: condition })
        const data = await Product.findAll({
            order: [['id', 'DESC']],
            include: [Cat, { model: Productitem, as: "pi" }],
            where: condition,
            limit,
            offset
        })
        const resp = getPagingData(data, count, page, limit)
        return res.send(resp)

    }

    async allProductsByCat(req, res) {
        const { page, size, title, cat } = req.query;
        var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
        const { limit, offset } = getPagination(page, size)

        const count = await Product.count({
            include: {
                model: Cat, where: { id: cat }
            }, where: condition, limit, offset
        })
        const data = await Product.findAll({
            order: [['id', 'DESC']],
            include: [{
                model: Cat, where: { id: cat }
            }, { model: Productitem, as: "pi" }], where: condition, limit, offset
        })
        const resp = getPagingData(data, count, page, limit)
        return res.send(resp)



    }

    async createProduct(req, res) {

        const slugcount = await Product.count({
            where: {
                slug: req.body.slug
            }
        });
        let product;
        if (slugcount > 0) {
            let slug = req.body.slug + "-1";
            product = await Product.create({ ...req.body, pic: req.files.pic[0].path, slug });
        } else {
            product = await Product.create({ ...req.body, pic: req.files.pic[0].path });
        }
        !product && throwError('مشکلی در ثبت رخ داده است !')
        await product.addCats(req.body.catId);
        return res.send(product)
    };


    async createProductgallery(req, res) {

        const id = req.params.id;

        const product = await Product.findOne({ where: { id: id } });
        !product && throwError('موردی یافت نشد', 400)
        const result = await product.createProductgallery({ url: req.file.path })
        !result && throwError('مشکلی در بروزرسانی رخ داده است !')
        return res.send({
            message: 'create gallery successfull'
        })

    };

    async createProductitem(req, res) {



        if (!req.body.pid) {
            const id = req.params.id;
            const product = await Product.findOne({ where: { id: id } });
            !product && throwError('موردی یافت نشد', 400)
            const result = await product.createProductitem({
                ...req.body
            })
            !result && throwError('مشکلی در ثبت رخ داده است !')
            return res.send({
                message: 'create item successfull'
            })
        } else {
            const id = req.body.pid;
            const product = await Productitem.findOne({ where: { id: id } });
            !product && throwError('موردی یافت نشد', 400)
            const result = await product.update({
                ...req.body
            })
            !result && throwError('مشکلی در بروزرسانی رخ داده است !')
            return res.send({
                message: 'update item successfull'
            })
        }

    };

    async createProductfield(req, res) {



        if (!req.params.pid) {
            const id = req.params.id;
            const product = await Product.findOne({ where: { id: id } });
            !product && throwError('موردی یافت نشد', 400)
            const result = await product.createProductfield({ ..._.pick(req.body, ['key', 'value']) })

            !result && throwError('مشکلی در ثبت رخ داده است !')

            return res.send({
                message: 'create field successfull'
            })

        } else {
            const id = req.params.pid;
            const product = await Productfield.findOne({ where: { id: id } });
            !product && throwError('موردی یافت نشد', 400)
            const result = await product.update({ ..._.pick(req.body, ['key', 'value']) })

            !result && throwError('مشکلی در بروزرسانی رخ داده است !')

            return res.send({
                message: 'update field successfull'
            })

        }




    };


    async updateProduct(req, res) {

        const id = req.params.id;
        const cat = req.body.catId

        const product = await Product.findOne({ where: { id: id } });
        !product && throwError('موردی یافت نشد', 400)


        let result;

        if (req.body.slug) {
            const slugcount = await Product.count({
                where: {
                    slug: req.body.slug
                }
            });

            if (slugcount > 1) {
                let slug = req.body.slug + "-1";
                result = await product.update({
                    ...req.body,
                    pic: req.files.pic != undefined ? req.files.pic[0].path : product.getDataValue('pic'),
                    slug
                })
            } else {
                result = await product.update({
                    ...req.body,
                    pic: req.files.pic != undefined ? req.files.pic[0].path : product.getDataValue('pic'),
                })
            }
        } else {
            result = await product.update({
                ...req.body,
                pic: req.files.pic != undefined ? req.files.pic[0].path : product.getDataValue('pic'),
            })
        }


        !result && throwError('مشکلی در بروزرسانی رخ داده است !')
        const cats = await product.getCats();
        const cids = cats.map(x => x.id)
        await product.removeCats(cids)
        await product.addCats(cat);


        return res.send({
            message: 'update successfull'
        })




    };

    async deleteProductgallery(req, res) {
        const id = req.params.id;

        const result = await Productgallery.destroy({ where: { id: id } });
        !result && throwError('مشکلی در حذف رخ داده است !')
        return res.send({
            message: 'delete successfull'
        });



    }

    async deleteProductitem(req, res) {
        const id = req.params.id;

        const result = await Productitem.destroy({ where: { id: id } });
        !result && throwError('مشکلی در حذف رخ داده است !')
        return res.status(200).send({

            message: 'delete successfull'
        });

    }

    async deleteProductfield(req, res) {
        const id = req.params.id;

        const result = await Productfield.destroy({ where: { id: id } });
        !result && throwError('مشکلی در بروزرسانی رخ داده است !')
        return res.status(200).send({

            message: 'delete successfull'
        });



    }

    async deleteProduct(req, res) {
        const id = req.params.id;

        const data = await Product.destroy({
            where: { id: id }
        })
        !data && throwError('مشکلی در حذف رخ داده است !')
        let ids = await Productitem.findAll({
            where: {
                ProductId: id
            }
        }).map(x => x.id);
        await Productitem.destroy({
            where: {
                ProductId: id
            }
        })
        await Cart.destroy({
            where: {
                cartableId: {
                    [Op.in]: ids
                },
                cartableType: 'Productitem'
            }
        })
        return res.send({
            message: 'delete successfull'
        })



    };


    async createComment(req, res) {
        const id = req.params.id

        const product = await Product.findByPk(id)
        !product && throwError('موردی یافت نشد', 400)
        const data = await product.createComment({ status: 0, desc: req.body.desc, rate: req.body.rate, UserId: req.user.id })
        !data && throwError('مشکلی در ثبت رخ داده است !')
        return res.send(data)


    };


    async getProduct(req, res) {
        const id = req.params.id;
        let x;
        if (!isNaN(id)) {

            x = await Product.findByPk(id, {
                include: [{ model: Productitem, as: "pi" }, Productitem, Productgallery, Productfield, Cat],

            });
        } else {

            x = await Product.findOne({
                where: { slug: id },
                include: [{ model: Productitem, as: "pi" }, Productitem, Productgallery, Productfield, Cat],

            })
        }
        !x && throwError('موردی یافت نشد', 400)

        return res.send(x)

    };



}

module.exports = new ProductController();



