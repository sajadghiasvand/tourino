let jwt = require('jsonwebtoken');

module.exports.getPagingData = function (data, count, page, limit) {
    const totalItems = count;
    const items = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return {totalItems, items, totalPages, currentPage};
};

module.exports.getPagingData2 = function (data, page, limit) {
    const {count: totalItems, rows: items} = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);

    return {totalItems, items, totalPages, currentPage};
};

module.exports.getPagination = function (page, size) {
    const limit = size ? +size : 15;
    const offset = page ? (page-1) * limit : 0;
    return {limit, offset};
};
module.exports.checkURL = function (url) {
    return (url.match(/\.(jpeg|jpg|gif|mp4|png)$/) != null);
}