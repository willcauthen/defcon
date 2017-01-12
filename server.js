var express = require('express'),
    app = express();

var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');



// middleware
app.engine('hbs', hbs({defaultLayout: 'main'}));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  saveUnitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 60 * 60 * 1000 }
}));
require('./controllers/users')(app);

app.use(express.static('public'));
mongoose.connect('mongodb://localhost/defcon');
var User = require('./models/user.js');




// homepage
app.get('/', function(req, res){
  res.render('splash');
});

app.get('/choice', function( req, res) {
  res.render('choice');
});

app.get('/nice', function(req, res) {
  res.render('nice');
});

app.get('/mean', function(req, res) {
  res.render('mean');
});

// listen to port as defined or default 5000
var port = process.env.PORT || 5000;

app.listen(port);

console.log('Server is running on port ', port);