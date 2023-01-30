
module.exports = (sequelize, Sequelize) => {
    // Helper function
    const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;

    class Cart extends Sequelize.Model {
        getCartable(options) {
            if (!this.cartableType) return Promise.resolve(null);
            const mixinMethodName = `get${uppercaseFirst(this.cartableType)}`;
            return this[mixinMethodName](options);
        }
    }
    Cart.init({


        qty: {
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.STRING
        },
        cartableId: Sequelize.INTEGER,
        cartableType: Sequelize.STRING,
        cartable: Sequelize.VIRTUAL

    }, {
        sequelize,
        tableName: "carts"
    })

    Cart.addHook("afterFind", findResult => {
        if (findResult !== null) {
            if (!Array.isArray(findResult)) findResult = [findResult];

            for (const instance of findResult) {
                if (instance.cartableType === "Productitem" && instance.Productitem !== undefined) {
                    instance.cartable = instance.Productitem;
                }

                
                delete instance.Productitem;
                delete instance.dataValues.Productitem;
            }
        }

    });

    return Cart;
};
