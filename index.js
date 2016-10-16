var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var config = require('./config.js');
var twilio = require('twilio');
var bodyParser = require('body-parser');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var app = express();

mongoose.connect('mongodb://localhost:27017/turnapp');
var models = require('./models');

//Use passport-local
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({
      username: username
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }
));

//Initialize Twilio client.
var clientTwilio = new twilio.RestClient(config.Twilio.accountSID, config.Twilio.authToken);

app.use(express.static('public'));
app.engine('handlebars', exphbs({
  defaultLayout: 'landing'
}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}))

// parse application/json
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.render('landingpage', {
    title: "Landing Page"
  });
});

app.post('/', function(req, res){
  passport.authenticate('local', {
    successRedirect: '/sms',
    failureRedirect: '/',
    failureFlash: true,
    layout: 'main'
  });
});

app.get('/login', function(req, res) {
  res.render('login', {
    title: "Login",
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
  var recordPatient = req.body.record;
  var smsBody = req.body.smsBody;
  models.Patients.findOne({
    recordNumber: recordPatient
  }, function(err, to) {
    if (err) {
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
    });

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

app.get('/register', (req, res, next) => {
  res.render('register', {});
});

app.post('/register', (req, res, next) => {
  console.log(req.body);
  models.Users.create(req.body.data, (err, data) => {
    // if(err) res.send(Error);
    res.render('register-success', {
      title: "Registered"
    });
  });
});


app.listen(3000);
