const moment = require("moment-jalaali");

module.exports = (sequelize,Sequelize) => {
    class OrderOffcode extends Sequelize.Model{ }
    OrderOffcode.init({
        code: {
            type : Sequelize.STRING
        },
        total: {
            type : Sequelize.STRING
        },
        status: {
            type : Sequelize.INTEGER
        },

    },{
        sequelize,
        tableName:"order_offcodes"
    })

  return OrderOffcode;
};
