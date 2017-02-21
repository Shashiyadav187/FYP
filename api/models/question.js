var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    title:   String,
    options:[
        {
            option: String,
            weight: [Number]
        },{
            option: String,
            weight: [Number]
        },{
            option: String,
            weight: [Number]
        },{
            option: String,
            weight: [Number]
        }],
    type: String,
    answer: {type: Boolean, default: false},
    selected: {type: Number, default: null}
});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;
