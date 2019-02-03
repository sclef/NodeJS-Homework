const User = require('../models/user');

var service = {};

service.getUser = async function(username, password) {
    return await User.findOne({username: username, password: password}, function(err, user) {
        if (err) {
            next(err);
        }

        return user;
    });
}

service.createUser = async function(username, password) {
    const user = new User({username: username, password: password});

    await user.save(function(err){
        if (err) {
            next(err);
        }
    });
}

module.exports = service;