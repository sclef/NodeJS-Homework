var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  username: 'string',
  password: 'string'
});

module.exports = mongoose.model('User', UserSchema); 