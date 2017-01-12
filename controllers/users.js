var User = require('../models/user.js');

module.exports = function(app) {
// login
app.get('/login', function(req, res) {
  res.render('login');
});

// check login
app.get('/current-user', function(req, res) {
  res.json({ user: req.session.user });
});

app.post('/login', function(req, res) {
  var user = req.body;
  User.authenticate(user.name, user.password, function(err, user) {
    if (err) { console.log("Error: ", err); }
    // req.session.userId = user._id;
    req.session.user =  user;
    res.json(user);
  });
});

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
    // req.session.userId = user._id;
    req.session.user = user;
    res.status(200).json({user: user, msg: 'User Created.'});
  });
});


app.get('/logout', function(req, res) {
  req.session.user = null;
  // req.session.userId = null;
  res.json({msg: "User logged out"});
});


// delete
app.delete('/users/:id', function(req, res) {
  User.findById(req.params.id).exec(function (err, user) {
    if (err) { console.log(err); }
    user.remove();
    res.status(200).json({});
  });
});
};