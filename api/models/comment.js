var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    timeStamp : Date,
    text: String,
    user: {type: String, ref: 'User'},
    course: {type: String, ref: 'Course'}
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

