const config = require('../config/config');
const models = require('../models');
const jwt = require('../utilities/jwt')

module.exports = {
    get: {
        login: (req, res) => {
            if (req.cookies["username"]) {
                res.redirect('/');
                return;
            }
            res.render('login')
        },
        register: (req, res) => {
            if (req.cookies["username"]) {
                res.redirect('/');
                return;
            }
            res.render('register')
        },
        logout: (req, res) => {
            res.clearCookie(config.authCookie).clearCookie('username').redirect('/');
        }
    },
    post: {
        login: (req, res, next) => {
            const { username, password } = req.body;
            models.User.findOne({ username }).then((user) => Promise.all([user, user.checkPassword(password)])
                .then(([user, match]) => {
                    if (!match) {
                        res.render('login', { message: 'Invalid credentials! '});
                        return;
                    }

                    const token = jwt.createToken({ id: user._id });

                    res.cookie(config.authCookie, token).cookie('username', user.username).redirect('/');
                })).catch(() => {
                    res.render('login', { message: 'Invalid credentials!' });
                });
        },
        register: (req, res, next) => {
            const { username, password, repeatPassword } = req.body;

            if (password !== repeatPassword) {
                res.render('register', { username, message: 'Passwords should match!' });
                return;
            }

            models.User.create({ username, password }).then((user) => {
                res.redirect('/user/login');
            }).catch(console.error)
        }
    }
}