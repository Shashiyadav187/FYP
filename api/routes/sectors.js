var express = require('express');
var config = require('../../config')();
var Sector = require('../models/sector');
var router = express.Router();


// Define the sector api middleware
router.use(function(req, res, next) {
    // TODO Sanity check
    next();
});


router.route('/')
// Get All Sectors
    .get(function(req, res){
        Sector.find(function(err, sector) {
            if (err)
                res.send(err);

            res.json(sector);
        });
    })
    // Create a new Sector
    .post(function(req, res) {
        var sector = new Sector();
        sector.title = req.body.title;
        sector.description = req.body.description;
        sector.jobLinks.push(req.body.jobLinks);
        sector.jobDescription = req.body.jobDescription;
        sector.searchable = req.body.searchable;

        sector.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({ status:200, message: 'sector created!'});
            }
        });
    });
/*
 * var sectorSchema = new Schema({
 title: String,
 description: String,
 jobLinks : [String],
 searchable: String,
 jobs:[{
 title: String,
 desc: String,
 salary: Number,
 sal: Number,
 jm: Number,
 fg: Number,
 stress: Number,
 wlb: Number
 }]
 });*/

/*var sector = new Sector({
 title:"Computer Science",
 description: "Computer Science is the study of computers and computational systems. Unlike electrical and computer" +
 " engineers, computer scientists deal mostly with software and software systems; this includes their theory, design," +
 " development, and application.",
 jobLinks: [],
 searchable: "cs",
 averagePay: 0,
 jobs:[{
 title: "Network Architect",
 desc: "These professionals design, build and maintain a variety of data communication networks, from expansive" +
 " cloud infrastructures to smaller intranets",
 salary: 100240,
 sal: 7.9,
 jm: 4,
 fg: 6,
 s: 4,
 wlb: 4
 },{
 title: "Database Administrator",
 desc: "Database administrators are relied on as the guardians of data, implementing security measures to ensure" +
 " sensitive data is safe",
 salary: 81710,
 sal: 7.1,
 jm: 6,
 fg: 6,
 s: 4,
 wlb: 6
 },{
 title: "IT Manager",
 desc: "IT Managers deliver short- and long-term visions for the company's technology needs and goals.",
 salary: 131600,
 sal: 9.1,
 jm: 6,
 fg: 6,
 s: 2,
 wlb: 4
 },{
 title: "Software Developer",
 desc: "IT Managers deliver short- and long-term visions for the company's technology needs and goals.",
 salary: 98260,
 sal: 7.8,
 jm: 6,
 fg: 8,
 s: 6,
 wlb: 8
 }
 ]
 });*/

/*var sector = new Sector({
 title:"Computer Science",
 description: "",
 jobLinks: ["",""],
 searchable: "cs",
 averagePay: 0,
 jobs:[{
 title: "",
 desc: "",
 salalary: 0,
 sal: 0,
 jm: 0,
 fg: 0,
 s: 0,
 wlb: 0
 }]
 });*/

/*sector.save(function(err, res){
 if (err)
 res.send(err);
 console.log(res, 'sector created');
 });*/



module.exports = router;