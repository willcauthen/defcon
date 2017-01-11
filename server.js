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


app.use(express.static('public'));
mongoose.connect('mongodb://localhost/defcon');
var User = require('./models/user.js');

// CRUD functions
// show
// TODO fix bug with MIME types that prevents JS and CSS scripts from being successfully injected for whatever reason
app.get("/users/:id", function(req, res) {
  User.findById(req.params.id).exec(function(err, user) {
    if (err) { console.log("error showing user", err); }
    res.render("user", {user: user});
  });
});
// index
app.get('/users', function(req, res) {
  User.find().exec(function(err, users) {
    if (err) { console.log(err); } 
    res.render("index", {users: users});
  });
});

// new
app.get("/signup", function(req, res) {
  res.render('create');
});

// create
app.post("/users", function(req, res) {
  var user = req.body;
  console.log("POST request sent", user);
  User.createSecure(user.name, user.password, function(err, user) {
    if (err) { console.log("Error creating user: ", err); }
    req.session.userId = user._id;
    req.session.user = user;
    res.status(200).json({user: user, msg: 'User Created.'});
  });
});

// login
app.get('/login', function(req, res) {
  res.render('login');
});

// check login
app.get('/current-user', function(req, res) {
  res.json({ user: req.session.user });
});

// delete
app.delete('/users/:id', function(req, res) {
  User.findById(req.params.id).exec(function (err, user) {
    if (err) { console.log(err); }
    user.remove();
    res.status(200).json({});
  });
});

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