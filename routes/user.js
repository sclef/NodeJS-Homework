var express = require('express');
var router = express.Router();
const passport = require('passport');
const usersController = require('../private/controllers/usersController');

router.get('/login', function (req, res, next) {
    res.render('login.html', { title: 'Login' });
});


router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/news',
        failureRedirect: '/users/login'
    })
);

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

router.get('/register', function (req, res, next) {
    res.render('register.html', { title: 'Register' });
});


router.post('/register', usersController.registerUser);

module.exports = router;
