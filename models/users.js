const mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    recordNumber: String
});

module.exports = mongoose.model('users', usersSchema);
