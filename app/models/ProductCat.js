const moment = require("moment-jalaali");

module.exports = (sequelize, Sequelize) => {
    class ProductCat extends Sequelize.Model { }
    ProductCat.init({
        

    }, {
        sequelize,
        tableName: "product_cat"
    })

    return ProductCat;
};
