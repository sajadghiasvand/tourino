const moment = require("moment-jalaali");
module.exports = (sequelize, Sequelize) => {
    class User extends Sequelize.Model {
    }

    User.init({
        name: {
            type: Sequelize.STRING
        },
        family: {
            type: Sequelize.STRING
        },
        mobile: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING
        },
        pic: {
            type: Sequelize.TEXT,
            get() {
                return process.env.BASEURL + this.getDataValue('pic');
            }
        },
        vcode: {
            type: Sequelize.INTEGER
        },
        vcodetime: Sequelize.STRING,
        fcode: {
            type: Sequelize.INTEGER
        },
        fullName: {
            type: Sequelize.VIRTUAL,
            get() {
                return this.name + " " + this.family;
            }
        },
        jalaliDate: {
            type: Sequelize.VIRTUAL,
            get() {
                return `${moment(this.createdAt).format('jYYYY/jMM/jDD HH:mm:ss')}`;
            }
        }
    }, {
        sequelize,
        tableName: "users",
        defaultScope: {
            attributes: {
                exclude: ['password']
            }
        }
    })


    return User;
};
