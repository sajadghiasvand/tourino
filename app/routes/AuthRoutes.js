const router = require('express').Router();
const jwt = require('jsonwebtoken');
const db = require('../models');
const msg = require('../helper/msg');
const User = db.users;
var https = require("https");


router.post('/otp', async (req, res) => {
    let pattern = 'code';
    let api = '53716F6F5647687548766E3042456837546E6131333469516D7146513039636770432F64314B7A303244413D'
    let mobile = req.body.mobile;
    let code = Math.floor(Math.random() * 899999 + 100000);
    let url = `https://api.kavenegar.com/v1/${api}/verify/lookup.json?receptor=${mobile}&token=${code}&template=${pattern}`
    const user = await User.findOne({
        where: {
            mobile: mobile
        }
    })

    if (user.vcodetime != '' && (Date.now() - user.vcodetime < 60000)) {


        return res.send({ status: false, message: 60000 - Math.round((Date.now() - user.vcodetime)) })
    }
    else {
        if (user) {
            await user.update({
                vcode: code,
            });
            var req = https.request(url, function (res) {

                res.setEncoding('utf8');
                res.on('data', async function (chunk) {
                    await user.update({
                        vcodetime: Date.now()
                    });
                });
            });
            req.on('error', function (e) {

                return res.status(400).send({
                    message: msg.sms
                })

            });
            req.end();
            return res.send({ status: true, message: "کد تایید ارسال شد." })
        } else {
            await User.create({
                mobile: req.body.mobile,
                vcode: code,
                password: 123456,
                pic: 'uploads/avatar.png',
                role: 'user'
            });
            var req = https.request(url, function (res) {

                res.setEncoding('utf8');
                res.on('data', async function (chunk) {
                    await user.update({
                        vcodetime: Date.now()
                    });
                });
            });
            req.on('error', function (e) {

                return res.status(400).send({
                    message: msg.sms
                })

            });
            req.end();
            return res.send({ status: true, message: "کد تایید ارسال شد." })
        }
    }





})

router.post('/', async (req, res) => {

    let p_username = req.body.mobile;
    let p_code = req.body.code;

    try {

        //console.log(process.env)
        const user = await User.findOne({
            where: {
                mobile: p_username,
                vcode: p_code
            }
        });

        if (!user) {
            return res.status(400).send({
                message: msg.wrongcode
            })
        }

        jwt.sign(
            { user },
            process.env.JWTSECRET,
            (err, token) => {

                return res.send({
                    ok: true,
                    message: 'login ok',
                    token,
                    data: user
                })
            }
        )


    } catch (err) {
        return res.status(500).send({
            message: 'err'
        })

    }

});


module.exports = router
