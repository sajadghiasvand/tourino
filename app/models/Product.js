var moment = require('moment-jalaali')
module.exports = (sequelize, Sequelize) => {
    class Product extends Sequelize.Model {

    }
    Product.init({
        title: {
            type: Sequelize.STRING
        },
        slug: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: false
        },
        pic: {
            type: Sequelize.TEXT,
            get() {
                return process.env.BASEURL + this.getDataValue('pic')
            }
        },
        desc: {
            type: Sequelize.TEXT
        },
        cash: {
            type: Sequelize.FLOAT
        },
        ghesti: {
            type: Sequelize.TEXT
        },
        summery: {
            type: Sequelize.TEXT
        },
        item: {
            type: Sequelize.VIRTUAL,
        },
        jalaliDate: {
            type: Sequelize.VIRTUAL,
            get() {
                return `${moment(this.createdAt).format('jYYYY/jMM/jDD HH:mm:ss')}`;
            }
        }
    }, {
        
        sequelize,
        tableName: "products"
    })

    Product.addHook("afterFind", (findResult, ee) => {
        if (findResult !== null) {
            if (!Array.isArray(findResult)) findResult = [findResult];

            for (const instance of findResult) {


                if (instance.pi !== undefined) {
                    if (instance.pi[instance.pi.length - 1] !== undefined) {
                        if (instance.pi.filter(x => x.qty == 0).length == instance.pi.length) {
                            instance.item = null
                        }
                        else {
                            let x = instance.pi.sort((a, b) => {
                                if (b.offprice && a.offprice) {
                                    return b.offprice - a.offprice
                                }
                                else if (b.offprice && !a.offprice) {
                                    return b.offprice - a.price
                                }
                                else if (!b.offprice && a.offprice) {
                                    return b.price - a.offprice
                                }
                                else {
                                    return b.price - a.price
                                }

                            })[instance.pi.length - 1];
                            instance.item = { price: x.price, offprice: x.offprice }

                        }
                    }
                    else {
                        instance.item = null
                    }
                }
                else {
                    instance.item = null
                }

                delete instance.pi;
                delete instance.dataValues.pi;


            }
        }

    });

    return Product;
};


