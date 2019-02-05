const fs = require('fs');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const newsRouter = require('./routes/news');
const userRouter = require('./routes/user');
const createError = require('http-errors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const userController = require('./private/controllers/usersController');
const session = require("express-session");

passport.use(new LocalStrategy(
    function (username, password, cb) {
        return userController.findUser(username, password, cb);
    }));

passport.use(new FacebookStrategy({
    clientID: "",
    clientSecret: "",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        userController.findOrCreate(profile, function (err, user) {
            return cb(err, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});



const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))

app.use(passport.initialize());
app.use(passport.session());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/articles');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('common', {
    stream: fs.createWriteStream('./requests.log', {flags: 'a'})
}));

app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRouter);
app.use('/', indexRouter);
app.use('/news', newsRouter);

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
