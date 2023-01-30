module.exports = (sequelize, Sequelize) => {
    class Productitem extends Sequelize.Model { }
    Productitem.init({


        type: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.STRING
        },
        offprice: {
            type: Sequelize.STRING
        },
        qty: {
            type: Sequelize.INTEGER
        },
        totalPrice: {
            type: Sequelize.VIRTUAL,
            get() {
                return this.offprice ? this.offprice : this.price;
            }
        }
    }, {
        sequelize,
        tableName: "productitems"
    })

    return Productitem;
};
