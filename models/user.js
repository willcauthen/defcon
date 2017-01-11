var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    bcrypt = require('bcrypt-node'),
    salt = bcrypt.genSaltSync(10);

var UserSchema = new Schema({
  name: { type: String, unique: true, required: true },
  passwordDigest:{ type: String, required: true }
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


var User = mongoose.model('User', UserSchema); 

module.exports = User;