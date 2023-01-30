const moment = require("moment-jalaali");

module.exports = (sequelize,Sequelize) => {
    class Cat extends Sequelize.Model{ }
    Cat.init({
        name: {
            type : Sequelize.STRING
        },
        slug: {
            type : Sequelize.STRING,
            allowNull: false,
            unique: false
        },
        desc: {
            type : Sequelize.TEXT
        },
        pic: {
            type : Sequelize.TEXT,
            get(){
                return process.env.BASEURL+this.getDataValue('pic')
            }
        },
        status : {
            type : Sequelize.STRING
        },

        jalaliDate:{
            type:Sequelize.VIRTUAL,
            get(){
                return `${moment(this.createdAt).format('jYYYY/jMM/jDD HH:mm:ss')}`;
            }
        }
    },{
        sequelize,
        tableName:"cats"
    })

  return Cat;
};
