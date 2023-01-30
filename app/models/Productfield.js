module.exports = (sequelize, Sequelize) => {
    class Productfield extends Sequelize.Model{ }
    Productfield.init({
        key: {
            type: Sequelize.STRING
        },
        value:{
            type:Sequelize.STRING
        },

    },{
        sequelize,
        tableName:"productfields"
    })

    return Productfield;
};
