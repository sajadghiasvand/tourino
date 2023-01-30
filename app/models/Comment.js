const moment = require("moment-jalaali");

module.exports = (sequelize, Sequelize) => {

    const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;

    class Comment extends Sequelize.Model {
        getCommentable(options) {
            if (!this.commentableType) return Promise.resolve(null);
            const mixinMethodName = `get${uppercaseFirst(this.commentableType)}`;
            return thus[mixinMethodName](options);
        }
    }

    Comment.init({
        rate: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.INTEGER
        },
        desc: {
            type: Sequelize.STRING(220)
        },
        commentableId: Sequelize.INTEGER,
        commentableType: Sequelize.STRING,
        commentable: Sequelize.VIRTUAL,
        jalaliDate: {
            type: Sequelize.VIRTUAL,
            get() {
                return `${moment(this.createdAt).format('jYYYY/jMM/jDD')}`;
            }
        },
        jalaliDateTime: {
            type: Sequelize.VIRTUAL,
            get() {
                return `${moment(this.createdAt).format('jYYYY/jMM/jDD HH:mm:ss')}`;
            }
        }

    }, {
        sequelize,
        tableName: "comments"
    })

    Comment.addHook("afterFind", findResult => {
        if (findResult !== null) {
            if (!Array.isArray(findResult)) findResult = [findResult];

            for (const instance of findResult) {
                if (instance.commentableType === "Product" && instance.Product !== undefined) {
                    instance.commentable = instance.Product;
                }

                delete instance.Product;
                delete instance.dataValues.Product;
            }
        }

    });

    return Comment;
};
