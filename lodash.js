var _ = require('lodash');

var clientData = [{
        'full_name': 'Gabriela Rivera'
    }, {
        'phone_number': '787-216-3425'
    }],
    findData = _.findIndex(clientData, 'phone_number');
console.log(findData);
