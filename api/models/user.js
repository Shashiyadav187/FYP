var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    //test: {type: mongoose.Schema.Types.ObjectId, ref: 'Test'},
    created_at: Date,
    updated_at: Date
});

var User = mongoose.model('User', userSchema);

module.exports = User;

