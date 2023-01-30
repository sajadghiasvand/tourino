const moment = require("moment-jalaali");

module.exports = (sequelize,Sequelize) => {
    class Order extends Sequelize.Model{ }
    Order.init({
        name: {
            type : Sequelize.STRING
        },
        family: {
            type : Sequelize.STRING
        },
        email:{
            type:Sequelize.STRING
        },
        mobile:{
            type:Sequelize.STRING
        },
        address:{
            type:Sequelize.TEXT
        },
        zipcode:{
            type:Sequelize.STRING
        },
        os:{
            type:Sequelize.STRING
        },
        city:{
            type:Sequelize.STRING
        },
        price : {
            type : Sequelize.STRING
        },
        shipping_price : {
            type : Sequelize.STRING
        },
        tax : {
            type : Sequelize.STRING
        },
        total_price : {
            type : Sequelize.STRING
        },
        payment_status : {
            type : Sequelize.STRING
        },
        status:{
            type:Sequelize.STRING
        },
        jalaliDate:{
            type:Sequelize.VIRTUAL,
            get(){
                return `${moment(this.createdAt).format('jYYYY/jMM/jDD HH:mm:ss')}`;
            }
        }
    },{
        sequelize,
        tableName:"orders"
    })

  return Order;
};
