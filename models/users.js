const mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  website: String, 
  phoneNumber: String,
  specialization: String,

  schedule: {
    hours: {open: String, close: String}
  },

  address: {
    line: [],
    city: String,
    state: {type: String, default: "PR"},
    zipcode: String,
    maps: String
  },
  issurance: []

});

module.exports = mongoose.model('users', usersSchema);
