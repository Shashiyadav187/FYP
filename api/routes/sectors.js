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

/*
var sector = new Sector({
    title:"Education & Arts",
    description: "Teaching is the process of attending to people’s needs, experiences and feelings, and making specific" +
    " interventions to help them learn particular things. Arts is an expression of emotion which inclu",
    jobLinks: [],
    searchable: "ea",
    averagePay: 0,
    jobs:[{
        title: "Primary School Teacher",
        desc: "Primary School Teachers are knowledgeable about a variety of subjects, as many design lesson plans across " +
        "subjects to teach their students the basics of reading, writing and mathematics. ",
        salary: 54890,
        sal: 5.9,
        jm: 4,
        fg: 8,
        s: 4,
        wlb: 4
    },{
        title: "Health Educator",
        desc: "health educator includes assessing the needs of his or her community; developing effective programs" +
        " or curriculum to address those needs and physically teaching them",
        salary: 51960,
        sal: 5.7,
        jm: 6,
        fg: 4,
        s: 4,
        wlb: 6
    },{
        title: "Art Director",
        desc: "Art Directors produce artwork for advertising campaigns, magazines, television shows, films, websites or" +
        " products, often in charge of a design team to meet clients objectives",
        salary: 89760,
        sal: 7.5,
        jm: 4,
        fg: 4,
        s: 4,
        wlb: 4
    },{
        title: "Actor",
        desc: "An actors job is to interpret a writer's script and portray different characters on the stage or on" +
        " the screen to a watching public",
        salary: 39236,
        sal: 5,
        jm: 4,
        fg: 4,
        s: 4,
        wlb: 4
    }
    ]
});
*/

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

/*
sector.save(function(err, res){
    if (err)
        res.send(err);
    console.log(res, 'sector ecuation and arts created');
});
*/



module.exports = router;