var express = require('express');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');

var app = express();

const models = require('./models');
mongoose.connect('mongodb://localhost:27017/turnapp');

app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'landing'}));
app.set('view engine', 'handlebars');

app.get('/login', function (req, res) {
    res.render('login', {title: "Login", layout: "main" });
});
app.get('/registry', function (req, res) {
  res.render('registry', {title: "Registry", layout: "main"});
});
app.get('/', function (req, res) {
  res.render('landingpage', {title: "Landing Page"});
});


app.listen(3000);
