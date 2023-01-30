const moment = require("moment-jalaali");
module.exports = (sequelize, Sequelize) => {
    class Transaction extends Sequelize.Model {
    }

    Transaction.init({
        isSubmit: Sequelize.BOOLEAN,
        isPayed: Sequelize.BOOLEAN,
        isVerified: Sequelize.BOOLEAN,
        isReVerified: Sequelize.BOOLEAN,
        isError: Sequelize.BOOLEAN,
        ip: Sequelize.STRING,
        gateway: {
            type: Sequelize.STRING
        },
        Authority: {
            type: Sequelize.STRING
        },
        Ref: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        total_price: {
            type: Sequelize.STRING
        },
        payment_status: {
            type: Sequelize.STRING
        },
        payedAt: {
            type: Sequelize.STRING
        },
        verifiedAt: {
            type: Sequelize.STRING
        },
        reVerifiedAt: {
            type: Sequelize.STRING
        },
        errorAt: {
            type: Sequelize.STRING
        },
        jalaliDate: {
            type: Sequelize.VIRTUAL,
            get() {
                if(this.payment_status === 1){
                    return `${moment(this.payedAt).format('jYYYY/jMM/jDD HH:mm:ss')}`;
                }
                else{
                    return `${moment(this.createdAt).format('jYYYY/jMM/jDD HH:mm:ss')}`;
                }

            }
        }
    }, {
        sequelize,
        tableName: "transactions"
    })

    return Transaction;
};
