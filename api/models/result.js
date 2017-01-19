var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resultSchema = new Schema({
    testName:   String,
    score: Number,
    timeStamp: {type: Date, default: Date.now()}
});

var Result = mongoose.model('Result', resultSchema);

module.exports = Result;
