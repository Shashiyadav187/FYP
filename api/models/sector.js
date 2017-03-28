var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sectorSchema = new Schema({
    title: String,
    description: String,
    jobLinks : [String],
    searchable: String,
    averagePay: Number,
    jobs:[{
        title: String,
        desc: String,
        salary: Number,
        sal: Number,
        jm: Number,
        fg: Number,
        s: Number,
        wlb: Number
    }]
});

var Sector = mongoose.model('Sector', sectorSchema);

module.exports = Sector;
