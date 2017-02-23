var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resultSchema = new Schema({
    testName:   String,
    score: {type: Number, default: null},
    recommend: {type: String, default: null},
    timeStamp: {type: Date}
});

var Result = mongoose.model('Result', resultSchema);

module.exports = Result;
