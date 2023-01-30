const moment = require("moment-jalaali");

module.exports = (sequelize, Sequelize) => {
    class Setting extends Sequelize.Model { }
    Setting.init({
        aboutus: {
            type: Sequelize.TEXT
        },
        contactus: {
            type: Sequelize.TEXT
        },
        ghesti: {
            type: Sequelize.TEXT
        },
        status: {
            type: Sequelize.BOOLEAN
        }
    }, {
        sequelize,
        tableName: "settings"
    })


    return Setting;
};
