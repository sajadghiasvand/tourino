module.exports = (sequelize, Sequelize) => {
    class Productgallery extends Sequelize.Model{ }
    Productgallery.init({
        url: {
            type: Sequelize.TEXT,
            get(){
                return process.env.BASEURL+this.getDataValue('url')
            }
        },


    },{
        sequelize,
        tableName:"productgalleries"
    })

    return Productgallery;
};
