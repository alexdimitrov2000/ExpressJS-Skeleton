const jwt = require('./jwt');
const config = require('../config/config');
const models = require('../models');

function auth(requireRedirect = true) {
    return function (req, res, next) {
        const token = req.cookies[config.authCookie] || '';

        jwt.verifyToken(token).then((data) => {
            models.User.findById(data.id).then(user => {
                req.user = user;
                next();
            });
        }).catch(err => {
            if (!requireRedirect) { next(); return; }

            res.redirect('/user/login');
            next(err);
        });
    };
}

module.exports = auth;