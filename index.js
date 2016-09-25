var express = require('express');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var config = require('./config.js');
var twilio = require('twilio');

var app = express();

const models = require('./models');
mongoose.connect('mongodb://localhost:27017/turnapp');


//Initialize Twilio client.
var clientTwilio = new twilio.RestClient(config.Twilio.SID, config.Twilio.authToken);

app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'landing'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.render('landingpage', {title: "Landing Page"});
});
app.get('/login', function (req, res) {
    res.render('login', {title: "Login", layout: "main" });
});
app.get('/registry', function (req, res) {
  res.render('registry', {title: "Registry", layout: "main"});
});

//Twilio sms form
app.get('/sms', function(req, res,next){
  var message = "Hello from the awesome app!";
  res.render('sms', {title: 'SMS Form', msg: message});
});

//Twilio Send SMS
app.post('/sms', function (req, res, next) {
  var to = req.query.to; // Receiving from client side.

  if (!to) {
    return res.status(400).send(
      'Please provide an number in the "to" query string parameter.');
}

  twilio.sendMessage({
    to: to,
    from: config.Twilio.number,
    body: 'Hello from Turn.App'
  }, function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).send('Message sent.');
  });
});

app.listen(3000);
