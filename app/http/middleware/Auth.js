const jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {
    var bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, process.env.JWTSECRET, (err, result) => {
            if (err) {
                console.log('user not found')
                res.sendStatus(401)
            } else {

                req.user = result.data ?? result.user;
                next()
            }
        })
    } else {
        console.log('not auth')
        res.sendStatus(401)
    }
}
