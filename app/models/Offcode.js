const moment = require("moment-jalaali");

module.exports = (sequelize,Sequelize) => {
    class Offcode extends Sequelize.Model{ }
    Offcode.init({
        code: {
            type : Sequelize.STRING
        },
        expire: {
            type : Sequelize.STRING
        },
        type: {
            type : Sequelize.STRING
        },
        amount: {
            type : Sequelize.STRING
        },
        maxamount: {
            type : Sequelize.STRING
        },
        limit: {
            type : Sequelize.INTEGER
        },
        status: {
            type : Sequelize.INTEGER
        },

    },{
        sequelize,
        tableName:"offcodes"
    })

  return Offcode;
};
