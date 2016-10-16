var express = require('express');
// const router = express.Router();
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




  // app.use(express.static('public'));
  // app.use(express.cookieParser());
  // app.use(express.bodyParser());
  // app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  // app.use(app.router);


//Use passport-local
passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("woLking");
    models.Users.findOne({
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

const hbs = exphbs({
  defaultLayout: 'landing'
});

// const hbs = exphbs.create({
//   helpers : require('./helpers.js'),
// });

app.engine('handlebars', hbs);
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

//Login submit to server
app.post('/', function(req, res){
  passport.authenticate('local', {
    successRedirect: '/sms',
    failureRedirect: '/',
    failureFlash: true
  });
});

// app.get('/login', function(req, res) {
//   res.render('login', {
//     title: "Login",
//     layout: "main"
//   });
// });

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

    res.render('sms-success', {
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
  const patient = req.body.data;
  models.Users.create(patient, function(err, data) {
    if(err) console.log(err);;
    res.render('register-success', {
      title: "Registered"
    });
  });
});

require('./routes')(app)


app.listen(3000);
