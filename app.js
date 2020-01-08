const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash')
const session = require('express-session');
const path = require('path');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const router = require('./routes/router');

const app = express();
const db = 'mongodb://localhost:27017/ftdb'

mongoose.connect(process.env.MONGODB_URI || db, { useMongoClient: true }, () => {
    console.log('Connected to MongoDB.');
});


app.use(express.static(path.resolve(__dirname, 'client/build')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


app.use('/api', router);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

module.exports = app;