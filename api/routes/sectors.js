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
    title:"Construction & Engineering",
    description: "Engineering is acknowledged as a discipline that opens up opportunities and creates technology and" +
    " products that help make our lives easier.Construction is the process of constructing a building or infrastructure.",
    jobLinks: [],
    searchable: "ce",
    averagePay: 0,
    jobs:[{
        title : "Construction Manager",
        desc : "A construction manager can learn a construction project from a-z from the planning stage with architects and engineers, to the budgeting stage with cost estimators, to the production stage with laborers",
        salary : 87400,
        sal : 7.4,
        jm : 4,
        fg : 6,
        s: 2,
        wlb : 4
    },{
        title : "Electrician",
        desc : "Electricians know the ins and outs of designing lighting systems, installing street lights and intercom systems, ensuring electrical work is up to code and repairing electrical wiring",
        salary : 51880,
        sal : 5.7,
        jm : 6,
        fg : 8,
        s : 4,
        wlb : 4
    },{
        title : "Biomedical Engineer",
        desc : "Biomedical engineering (BME) is the application of engineering principles and design concepts" +
        " to medicine and biology for healthcare purposes",
        salary : 86220,
        sal : 7.3,
        jm : 8,
        fg : 4,
        s: 4,
        wlb : 6
    },{
        title: "Civil Engineer",
        desc: "Civil Engineers look after the design and maintenance of public works such as roads, bridges, water " +
        "and energy systems as well as public facilities like ports, railways and airports.",
        salary: 82220,
        sal: 7.2,
        jm: 4,
        fg: 6,
        s: 6,
        wlb: 4
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
    console.log(res, 'sector construction & engineering created');
});*/



module.exports = router;