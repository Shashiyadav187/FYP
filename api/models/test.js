var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Question = require('./question');

var testSchema = new Schema({
    name: String,
    duration: {type: Number, default: null},
    questions: [
        question = {type: Schema.Types.Object, ref: 'Question'}
    ],
    result: Number,
    answers: [Number],
    /*time : { type : Date, default: Date.now }*/
});


var Test = mongoose.model('Test', testSchema);

/*Test.findOne({name: 'Careers'})
    .exec(function(err, test) {
        Test.populate(test, 'questions', function(err, test){
            if(err)
                console.log(err);
            console.log(test);
        });
    });*/

module.exports = Test;

