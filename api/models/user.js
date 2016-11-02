var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    facebookID: String,
    firstName:String,
    lastName: String,
    email:    String,
    password: String,
    admin: {type: Boolean, default: false}
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);

User.getUserById = function(id, callback) {
    User.findById(id, callback);
};

module.exports = User;

