let usersService = require('../services/usersService')
let controller = {};

controller.findUser = function (userName, password, cb) {
    usersService.getUser(userName, password)
        .then((user) => {
            if (!user) { return cb(null, false); }
            if (user.password != password) { return cb(null, false); }
            return cb(null, user);
        });
}

controller.registerUser = function (req, res, next) {
    usersService.createUser(req.body.username, req.body.password)
        .then(() => {
            res.status(200).send('User registered');
        });
}

module.exports = controller