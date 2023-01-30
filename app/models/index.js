const dbConfig = require('../../config/db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    define:{
        charset: 'utf8',
        collate: 'utf8_general_ci',
    },
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
});





const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.setting = require('./Setting.js')(sequelize, Sequelize);
db.contactus = require('./ContactUs.js')(sequelize, Sequelize);
db.products = require('./Product.js')(sequelize, Sequelize);
db.productitems = require('./Productitem.js')(sequelize, Sequelize);
db.productfields = require('./Productfield.js')(sequelize, Sequelize);
db.productgalleries = require('./Productgallery.js')(sequelize, Sequelize);
db.productcat = require('./ProductCat')(sequelize, Sequelize);
db.carts = require('./Cart.js')(sequelize, Sequelize);
db.cats = require('./Cat.js')(sequelize, Sequelize);
db.comments = require('./Comment.js')(sequelize, Sequelize);
db.orders = require('./Order.js')(sequelize, Sequelize);
db.orderproducts = require('./Orderproduct.js')(sequelize, Sequelize);
db.transactions = require('./Transaction.js')(sequelize, Sequelize);
db.users = require('./User.js')(sequelize, Sequelize);
db.offcodes = require('./Offcode.js')(sequelize, Sequelize);
db.order_offcodes = require('./OrderOffcode.js')(sequelize, Sequelize);
/*carts*/
db.users.hasMany(db.carts);
db.carts.belongsTo(db.users);



db.productitems.hasMany(db.carts, {
    foreignKey: 'cartableId',
    constraints: false,
    scope: {
        cartableType: 'Productitem'
    }
});
db.carts.belongsTo(db.productitems,{
    foreignKey: 'cartableId' , constraints : false
});
/*comments*/
db.users.hasMany(db.comments);
db.comments.belongsTo(db.users);



db.products.hasMany(db.comments, {
    foreignKey: 'commentableId',
    constraints: false,
    scope: {
        commentableType: 'Product'
    }
});
db.comments.belongsTo(db.products,{
    foreignKey: 'commentableId' , constraints : false
});



db.transactions.belongsTo(db.users);
db.users.hasMany(db.transactions);

db.transactions.belongsTo(db.orders);
db.orders.hasMany(db.transactions);

db.users.hasMany(db.orders);
db.orders.belongsTo(db.users);

db.orders.hasMany(db.order_offcodes);
db.order_offcodes.belongsTo(db.orders);

db.users.hasMany(db.order_offcodes);
db.order_offcodes.belongsTo(db.users);

db.offcodes.hasMany(db.order_offcodes);
db.order_offcodes.belongsTo(db.offcodes);

db.orders.hasMany(db.orderproducts);
db.orderproducts.belongsTo(db.orders);


db.productitems.hasMany(db.orderproducts, {
    foreignKey: 'orderableId',
    constraints: false,
    scope: {
        orderableType: 'Productitem'
    }
});
db.orderproducts.belongsTo(db.productitems,{
    foreignKey: 'orderableId' , constraints : false
});

db.cats.belongsTo(db.cats, {as: 'parent'});
db.cats.hasMany(db.cats, {as: 'children'});

db.cats.belongsToMany(db.products, {through: 'product_cat'})
db.products.belongsToMany(db.cats, {through: 'product_cat'})


db.productitems.belongsTo(db.products)
db.products.hasMany(db.productitems)
db.products.hasMany(db.productitems,{as:'pi'})
db.products.hasMany(db.productfields)
db.products.hasMany(db.productgalleries)



module.exports = db;
