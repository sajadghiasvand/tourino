const db = require('../../models');

const Productitem = db.productitems;
const Prodcut = db.products;
const Order = db.orders;
const Cart = db.carts;
const User = db.users;
const Orderproduct = db.orderproducts;
const Transaction = db.transactions;
const Offcode = db.offcodes;
const OrderOffcode = db.order_offcodes;
const Op = db.Sequelize.Op;
const OffcodeController = require('../controllers/OffcodeController')
const { getPagination, getPagingData2 } = require("../../helper/methods");

class OrderController {

    async allUserOrders(req, res) {
        const { page, size, title } = req.query;
        var condition = title ? {
            Userid: req.user.id,
            [Op.or]: [
                { total_price: { [Op.like]: `%${title}%` } }
            ]
        } : null;
        const { limit, offset } = getPagination(page, size)
        const data = await Order.findAndCountAll({ where: condition, limit, offset, include: [Transaction] })
        const resp = getPagingData2(data, page, limit)
        return res.send(resp)

    }

    async allOrders(req, res) {
        const { page, size, title } = req.query;
        var condition = title ? {
            [Op.or]: [
                { mobile: { [Op.like]: `%${title}%` } },
                { family: { [Op.like]: `%${title}%` } },
                { total_price: { [Op.like]: `%${title}%` } }
            ]
        } : null;
        const { limit, offset } = getPagination(page, size)
        const data = await Order.findAndCountAll({ where: condition, limit, offset, include: [Transaction] })
        const resp = getPagingData2(data, page, limit)
        return res.send(resp)

    }



    async createOrder(req, res) {

        //var condition = mobile ? {mobile : {[Op.like]: `%${mobile}%`}} : null;

        const cart = await Cart.findAll({
            order: [['id', 'DESC']],
            where: {
                UserId: req.user.id
            },
            include: [{ model: Productitem, include: [{ model: Prodcut, required: true }], attributes: ['price', 'offprice', 'totalPrice'] }]
        });
        !cart && throwError('سبد خرید خالی می باشد', 400)
        let products = [];
        let productsprice = 0;
        let shippingprice = 0;
        let offcodeprice = 0;
        let taxprice = 0;
        let total_price = 0;
        let offcode = null;
        cart.map(item => {
            products.push({
                title: item.cartableType == "Productitem" ? item.cartable.Product.title : item.cartable.title,
                price: item.cartable.price,
                offprice: item.cartable.offprice,
                qty: item.qty,
                total_price: item.qty * item.cartable.totalPrice,
                orderableId: item.cartableId,
                orderableType: item.cartableType,
            });
            productsprice += parseInt(item.qty) * parseInt(item.cartable.totalPrice);
        })

        if (req.body.offcode) {
            offcode = await OffcodeController.checkOrderOffcode(req.body.offcode, req.user);
            if (offcode != false) {
                let price = 0;
                if (offcode.type == "percent") {
                    offcodeprice = (offcode.amount * productsprice) / 100;
                    if (offcodeprice > offcode.maxamount) {
                        offcodeprice = offcode.maxamount
                    }
                }
                else {
                    offcodeprice = offcode.amount;
                }

            }
        }

        total_price = productsprice + shippingprice + taxprice - offcodeprice;



        const user = await User.findByPk(req.user.id)
        const order = await Order.create({
            name: user.name,
            family: user.family,
            email: user.email,
            mobile: user.mobile,
            address: req.body.address,
            zipcode: req.body.zipcode,
            os: req.body.os,
            city: req.body.city,
            price: productsprice,
            shipping_price: shippingprice,
            tax: taxprice,
            status: 'register',
            total_price: total_price,
            UserId: req.user.id
        });

        if (offcodeprice > 0) {
            await OrderOffcode.create({
                OrderId: order.id,
                code: offcode.code,
                total: offcodeprice,
                status: 0,
                UserId: req.user.id,
                OffcodeId: offcode.id
            })
        }

        products.map(async item2 => {
            await order.createOrderproduct(item2)
        })
        const url = process.env.BASEURL + 'api/payment/zarinpal/PaymentRequest?oid=' + order.id;
        return res.send(url);


    };


    async updateOrder(req, res) {
        const id = req.params.id;

        const item = await Order.findByPk(id);
        !item && throwError('موردی یافت نشد', 400)
        const result = await Order.update(req.body)
        !result && throwError('مشکلی در بروزرسانی رخ داده است !')
        return res.send({
            message: 'update successfull'
        })

    };

    async deleteOrder(req, res) {
        const id = req.params.id;
        const data = await Order.destroy({
            where: { id: id }
        })
        !data && throwError('مشکلی در حذف رخ داده است !')
        return res.send({
            message: 'delete successfull'
        })

    };

    async getOrder(req, res) {
        const id = req.params.id;
        const data = await Order.findByPk(id, {
            include: [Orderproduct]
        })
        !result && throwError('موردی یافت نشد', 400)
        return res.send(data)

    };

}

module.exports = new OrderController();



