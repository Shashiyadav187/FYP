var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    course_id: String,
    duration: String,
    title: String,
    college: String,
    sector: String,
    points: String,
    quickSearch: String
});

var Course = mongoose.model('Course', courseSchema);

module.exports = Course;
