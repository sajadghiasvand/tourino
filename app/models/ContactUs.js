const moment = require("moment-jalaali");

module.exports = (sequelize, Sequelize) => {
    class ContactUs extends Sequelize.Model {
    }

    ContactUs.init({
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        mobile: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.TEXT
        }
    }, {
        sequelize,
        tableName: "contactus"
    })


    return ContactUs;
};
