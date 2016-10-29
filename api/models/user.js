var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    facebookID: String,
    firstName:String,
    lastName: String,
    email:    String,
    password: String,
    admin: Boolean,
    created_at: Date,
    updated_at: Date
});

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password){
    return ( this.password === password );
};

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);

User.getUserById = function(id, callback) {
    User.findById(id, callback);
};

module.exports = User;

