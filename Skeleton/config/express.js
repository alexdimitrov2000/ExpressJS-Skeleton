const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const handlebars = require('express-handlebars');
const config = require('./config');

module.exports = (app) => {
    app.engine('hbs', handlebars({
        layoutsDir: 'views',
        defaultLayout: '_layout',
        partialsDir: 'views/partials',
        extname: 'hbs'
    }));

    app.set('view engine', 'hbs');

    app.use(express.static(path.resolve(__basedir, 'static')));

    app.set('views', path.resolve(__basedir, 'views'));

    app.use(cookieParser());

    app.use(bodyParser.urlencoded({ extended: false }));

    app.use((req, res, next) => {
        res.locals.isLoggedIn = req.cookies[config.authCookie] !== undefined;
        res.locals.username = req.cookies["username"];

        next();
    })
}