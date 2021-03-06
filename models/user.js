var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    bcrypt = require('bcrypt-node'),
    salt = bcrypt.genSaltSync(10);

var UserSchema = new Schema({
  name:        String,     //{ type: String, unique: true, required: true },
  passwordDigest:  String //{ type: String, required: true }
});


// create new user with hashed password
UserSchema.statics.createSecure = function (username, password, callback) {
  // 'this' references schema
  // store in variable user
  var user = this;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, null, function (err, hash) {
      console.log(hash);

      user.create({
        // email: email,
        name: username,
        passwordDigest: hash
      }, callback);
    });
  });
};

UserSchema.statics.authenticate = function(username, password, callback) {
  console.log("authenticate function. Username, password: ", username, password);
  this.findOne({ name: username }, function(err, user) {
    console.log("user and username: ", user, username);

    if(!user) {
      callback("No user matching that email and/or password", user, null);
    } else if (user.checkPassword(password)) {
      callback(null, user);
    }
  });
};

UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordDigest);
};

var User = mongoose.model('User', UserSchema); 

module.exports = User;