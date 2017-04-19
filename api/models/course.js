var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = require('./comment.js');

var courseSchema = new Schema({
    course_id: String,
    duration: String,
    title: String,
    college: String,
    sector: String,
    points: [String],
    quickSearch: String,
    externalLink: String,
    erasmus: Boolean,
    placement: Boolean,
    portfolio: Boolean,
    thesis: Boolean,
    counter: {type: Number, default: 0},
    comments: [{type : Schema.Types.Object, ref: 'Comment'}]
});

var Course = mongoose.model('Course', courseSchema);

module.exports = Course;
