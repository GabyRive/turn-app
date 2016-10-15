var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var config = require('./config.js');
var twilio = require('twilio');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect('mongodb://localhost:27017/turnapp');
var models = require('./models');

//Initialize Twilio client.
var clientTwilio = new twilio.RestClient(config.Twilio.accountSID, config.Twilio.authToken);

app.use(express.static('public'));
app.engine('handlebars', exphbs({
    defaultLayout: 'landing'
}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render('landingpage', {
        title: "Landing Page"
    });
});
app.get('/login', function(req, res) {
    res.render('login', {
        title: "Login",
        layout: "main"
    });
});
app.get('/registry', function(req, res) {
    res.render('registry', {
        title: "Registry",
        layout: "main"
    });
});

//Twilio sms form
app.get('/sms', function(req, res, next) {
    var message = "Hello from Turn.App!";
    res.render('sms', {
        title: 'SMS Form',
        msg: message,
        layout: "main"
    });
});

//Twilio Send SMS
app.post('/sms', function(req, res, next) {
  // req.body('sms', {
  // JSON.parse({
  //   recordPatient: 'record',
  //   smsBody: 'smsBody'
  //});
  //}
    console.log(req.body);
    var recordPatient = req.body.record;
    var smsBody = req.body.smsBody;
    models.Users.findOne({
        recordNumber: recordPatient
    }, {firstName: true, phoneNumber: true}, function(err, to) {
      if(err){
        throw err;
      }
      console.log(to);
        if (to === {}) {
            return res.status(400).send(
                'Please provide an number in the "to" query string parameter.');
        };

        res.render('success', {
            title: 'SMS Success',
            layout: 'main',
            patient: to
        })

        // clientTwilio.messages.create({
        //     to: to.phoneNumber,
        //     from: config.Twilio.tester.number,
        //     body: smsBody
        // }, function(err, message) {
        //     if (err) {
        //         console.log(err.message);
        //         return next(err);
        //     }
        //     res.render('success', {
        //         title: 'SMS Success',
        //         layout: 'main',
        //         patient: to
        //     })
        // });
    });
});

app.listen(3000);
