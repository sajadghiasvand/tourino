const db = require('../../models');
const Cart = db.carts;
const {throwError} = require("../../helper/throwError");

const Productitem = db.productitems;
const Product = db.products;
const Op = db.Sequelize.Op;
const { getPagination, getPagingData } = require("../../helper/methods");

class CartController {
    async getCart(req, res) {


        const result = await Cart.findAll({
            where: { userId: req.user.id },
            include: [
                {
                    model: Productitem,
                    include: [
                        {
                            model: Product,
                            required: true
                        }
                    ]
                }
            ]
        });
        !result && throwError('موردی یافت نشد', 400)
        return res.send(result)


    }


    async addToCart(req, res) {




        let id = req.body.id


        let model = await Productitem.findByPk(id)
        !model && throwError('موردی یافت نشد', 400)

        const cart = await Cart.findOne({
            where: {
                cartableId: model.id,
                cartableType: 'Productitem',
                UserId: req.user.id
            },
            include: [Productitem]
        })
        if (cart) {
            const result = await cart.update({ qty: cart.qty + 1 })
            !result && throwError('مشکلی در بروزرسانی رخ داده است !')
        } else {
            const result = await model.createCart({ qty: 1, UserId: req.user.id, type: 0, })
            !result && throwError('مشکلی در ثبت رخ داده است !')
        }

        return res.send({ message: 'added to cart' });


    };

    async delFromCart(req, res) {

        const id = req.body.id;

        //var condition = mobile ? {mobile : {[Op.like]: `%${mobile}%`}} : null;
        const cart = await Cart.findOne({
            where: {
                id: id,
                UserId: req.user.id
            },
        })
        !cart && throwError('موردی یافت نشد', 400)

        if (cart.qty > 1) {
            const result = await cart.update({ qty: cart.qty - 1 });
            !result && throwError('مشکلی در بروزرسانی رخ داده است !')
        } else {
            const result = await cart.destroy()
            !result && throwError('مشکلی در حذف رخ داده است !')
        }

        return res.send({

            message: 'cart del successfull'
        })



    };

    async delAll(req, res) {



        //var condition = mobile ? {mobile : {[Op.like]: `%${mobile}%`}} : null;
        const result = await Cart.destroy({
            where: { UserId: req.user.id }
        })
        !result && throwError('مشکلی در حذف رخ داده است !')
        return res.send({

            message: 'cart del successfull'
        })



    };


}

module.exports = new CartController();



