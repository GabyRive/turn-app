const mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  website: String,
  phoneNumber: String,
  specialization: String,

  username: { type: String, required: true },
  password: { type: String, required: true },

  schedule: {
    hours: {open: String, close: String}
  },

  address: {
    line: String,
    city: String,
    state: {type: String, default: "PR"},
    zipcode: String,
    maps: String
  },
  issurance: String,

});

module.exports = mongoose.model('users', usersSchema);
