const db = require('../../models');

const Transaction = db.transactions;
const Order = db.orders;
const Cart = db.carts;
const User = db.users;
const Op = db.Sequelize.Op;


const ZarinpalCheckout = require("zarinpal-checkout");
const moment = require("moment/moment");
/**
 * Initial ZarinPal module.
 * @param {String} 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' [MerchantID]
 * @param {bool} false [toggle `Sandbox` mode]
 */
const zarinpal = ZarinpalCheckout.create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);

class ZarinPalController {


    /**
     * Route: PaymentRequest [module]
     * @return {String} URL [Payement Authority]
     */
    async PaymentRequest(req, res) {
        try {
            const order = await Order.findByPk(req.query.oid)
            const amount = order.total_price;
            const transaction = await Transaction.create({
                OrderId: order.id,
                gateway: 'ZarinPal',
                total_price: amount,
                isSubmit: true,
                UserId: order.UserId,
                //UserId: 1,
                ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
            });
            zarinpal.PaymentRequest({
                Amount: amount,
                CallbackURL: process.env.BASEURL+'api/payment/zarinpal/Validate/' + amount + "/",
                Description: 'ثبت سفارش',
                Email: order.email != null ? order.email : 'info@meslekhorshid.ir',
                Mobile: order.mobile
            }).then(async function (response) {
                if (response.status == 100) {
                    const x = response.url.split('/').pop();
                    await transaction.update({
                        Authority: x,
                        description: transaction.description + " | " + JSON.stringify(response)
                    });
                    //return res.send(response.url)
                    res.redirect(response.url);
                }
            }).catch(function (err) {
                return res.send(err)
            });
        } catch (err) {
            return res.send(err)
        }
    }

    async Validate(req, res) {
        if (req.query.Status === 'OK') {
            const transaction = await Transaction.findOne({
                where: {
                    Authority: req.query.Authority
                }
            });
            await transaction.update({
                isPayed: true,
                payedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            })
            const amount = req.params.amount;
            if (transaction.total_price === amount) {
                const url = '/api/payment/zarinpal/PaymentVerification/' + amount + '/' + req.query.Authority
                return res.redirect(url);
            } else {
                await transaction.update({
                    isError: true,
                    errorAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                    description: transaction.description + " | amount Wrong"
                })
                return res.send({status: false})
            }

        } else {
            const transaction = await Transaction.findOne({
                where: {
                    Authority: req.query.Authority
                }
            });
            await transaction.update({
                isError: true,
                errorAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                description: transaction.description + " | not Payed"
            })
            return res.send({status: false})
        }

    }


    /**
     * Route: PaymentVerification [module]
     * @return {number} RefID [Check Paymenet state]
     */
    async VerifyRequest(req, res) {
        const transaction = await Transaction.findOne({
            where: {
                Authority: req.params.Authority
            }
        });
        zarinpal.PaymentVerification({
            Amount: req.params.amount,
            Authority: req.params.Authority,
        }).then(async function (response) {
            if (response.status == 101) {
                await transaction.update({
                    isReVerified: true,
                    reVerifiedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                    description: transaction.description + " | " + JSON.stringify(response)
                })
                return res.send(response);
            } else {
                await transaction.update({
                    isVerified: true,
                    verifiedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                    Ref: response.RefID,
                    payment_status: 1,
                    description: transaction.description + " | " + JSON.stringify(response)
                })
                const order = await Order.findByPk(transaction.OrderId)
                order.update({
                    payment_status: 1,
                    status: 'submit'
                })
                const user = await User.findByPk(order.UserId);
                const products = await order.getOrderproducts()
                let c = 0;
                products.map(async res => {
                    if (res.orderableType == 'Productitem' && res.type != 3) {
                        c++;
                        await user.addBookitem(res.orderableId);
                    }
                })
                if (c > 0) {
                    await Cart.destroy({
                        where: {
                            UserId: user.id
                        }
                    })
                }

                return res.send(response);
            }
        }).catch(function (err) {
            return res.send(err);
        });


    }


    /**
     * Route: UnverifiedTransactions [module]
     * @return {Object} authorities [List of Unverified transactions]
     */
    async UnverifiedTransactions(req, res) {
        zarinpal.UnverifiedTransactions().then(function (response) {
            if (response.status == 100) {
                console.log(response.authorities);
            }
        }).catch(function (err) {
            console.log(err);
        });
    }


    /**
     * Route: Refresh Authority [module]
     * @param {number} expire [(1800 / 60) = 30min]
     * @return {String} status [Status of Authority]
     */
    async RefreshAuthority(req, res) {
        zarinpal.RefreshAuthority({
            Authority: req.params.token,
            Expire: req.params.expire
        }).then(function (response) {
            if (response.status == 100) {
                res.send('<h2>You can Use: <u>' + req.params.token + '</u> — Expire in: <u>' + req.params.expire + '</u></h2>');
            }
        }).catch(function (err) {
            console.log(err);
        });
    }


}

module.exports = new ZarinPalController();



