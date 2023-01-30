
module.exports = (sequelize, Sequelize) => {
    const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;


    class Orderproduct extends Sequelize.Model {
        getOrderable(options) {
            if (!this.orderableType) return Promise.resolve(null);
            const mixinMethodName = `get${uppercaseFirst(this.orderableType)}`;
            return thus[mixinMethodName](options);
        }
    }
    Orderproduct.init({
        type: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.TEXT
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
        total_price: {
            type: Sequelize.STRING
        },
        orderableId: Sequelize.INTEGER,
        orderableType: Sequelize.STRING,
        orderable: Sequelize.VIRTUAL

    }, {
        sequelize,
        tableName: "orderproducts"
    })

    Orderproduct.addHook("afterFind", findResult => {
        if (findResult !== null) {
            if (!Array.isArray(findResult)) findResult = [findResult];

            for (const instance of findResult) {
                if (instance.orderableType === "Productitem" && instance.Productitem !== undefined) {
                    instance.orderable = instance.Productitem;
                }


                delete instance.Productitem;
                delete instance.dataValues.Productitem;

            }
        }

    });

    return Orderproduct;
};
