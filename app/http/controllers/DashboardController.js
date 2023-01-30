const db = require('../../models');
const Productitem = db.productitems;
const Product = db.products;
const ProductCat = db.productcat;
const Cat = db.cats;
const User = db.users;
const Comment = db.comments;
const Cart = db.carts;
const Op = db.Sequelize.Op;
const { getPagination, getPagingData } = require("../../helper/methods");

class DashboardController {

    async getSearch(req, res) {

        try {
            const q = req.query?.q;
            if (q?.length > 0 && q != '') {


                const product = await Product.findAll({
                    order: [['id', 'DESC']],
                    include: [{ model: Productitem, as: 'pi' }, { model: Cat, attributes: ['name'], through: { attributes: [] } }],
                    where: { title: { [Op.like]: `%${q}%` } },
                    attributes: ['title', 'pic', 'slug']
                });
                const productList = product.map(x => {
                    let xx = JSON.parse(JSON.stringify(x));
                    xx['type'] = 'product'
                    return xx;
                })

                let result = [...productList];
                return res.send(result);
            } else {
                return res.send([])
            }

        } catch (err) {
            return res.status(500).send({
                'message': err.message
            })
        }
    }

    async getHeader(req, res) {

        try {
            const cats = await Cat.findAll();
            let cart = 0;
            if (req.user) {
                cart = await Cart.count({ where: { userId: req.user.id } });
            }


            const header = { cats, cart };


            return res.send(header)
        } catch (err) {
            return res.status(500).send({
                'message': err.message
            })
        }
    }

    async getLanding(req, res) {

        try {
            const cats = await Cat.findAll();
            let cp = [];
            cats.forEach(async c => {

                const p = await c.getProducts({
                    limit: 6,
                    include: [
                        {
                            model: Productitem, as: 'pi', where: {
                                offprice: { [Op.eq]: null }
                            }
                        },
                    ]

                })
                cp.push({ ...c.dataValues, Products: p })

            });



            const specials = await Product.findAll({
                limit: 6,
                include: [{
                    model: Productitem,
                    as: 'pi',
                    where: { offprice: { [Op.gt]: 0 } }
                }]
            });

            const data = {
                // header,
                catproducts:cp,
                cats,
                specials
            }
            return res.send(data)
        } catch (err) {
            return res.status(500).send({
                'message': err.message
            })
        }
    }

    async getData(req, res) {

        try {
            const users = await User.count();

            const comments = await Comment.count({
                where: {
                    status: 0
                }
            });
            const booksoti = await Productitem.count({
                where: {
                    type: 1
                }
            });
            const bookmatni = await Productitem.count({
                where: {
                    type: 2
                }
            });
            const bookpysic = await Productitem.count({
                where: {
                    type: 3
                }
            });



            const data = {
                users,
                comments,
                booksoti,
                bookmatni,
                bookpysic,
            }
            return res.send(data)
        } catch (err) {
            return res.status(500).send({
                'message': err.message
            })
        }


    }

}

module.exports = new DashboardController();



