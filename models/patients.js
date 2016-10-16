const mongoose = require('mongoose');

var patientSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    recordNumber: String,

    appointments: [{
      date: { type: String },
      hour: { type: String }
    }]
});

module.exports = mongoose.model('patient', patientSchema);
