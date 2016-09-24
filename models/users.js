const mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    name: String
});

exports.Users = mongoose.model('users', usersSchema);
