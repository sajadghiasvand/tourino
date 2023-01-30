const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    try {

        const role = req.user.role
        if (role === "admin")
            next()
        else
            res.sendStatus(401);
    } catch (err) {
        console.log(err);
        res.sendStatus(401);
    }
};
