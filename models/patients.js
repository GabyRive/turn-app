const mongoose = require('mongoose');

var patientSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    recordNumber: String,

    appointments: []
});

module.exports = mongoose.model('patient', patientSchema);
