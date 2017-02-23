var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');
var passportLocalMongoose = require('passport-local-mongoose');
var Result = require('./result.js');
var Course = require('./course.js');

var userSchema = new Schema({
    profiler: {type: String, default: "https://www.iconexperience.com/_img/o_collection_png/green_dark_grey/512x512/plain/user.png"},
    backgroundPhoto: {type: String, default: "http://www.planwallpaper.com/static/images/recycled_texture_background_by_sandeep_m-d6aeau9_PZ9chud.jpg"},
    facebookID: String,
    firstName:String,
    lastName: String,
    email:    String,
    password: String,
    admin: {type: Boolean, default: false},
    results: [{type: Schema.Types.Object, ref: 'Result'}],
    courses: [{type: Schema.Types.Object, ref: 'Course'}]
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

