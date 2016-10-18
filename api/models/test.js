var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testSchema = new Schema({
    title: String,
    question: String,
    answer: String,
});

var User = mongoose.model('User', userSchema);

module.exports = User;

