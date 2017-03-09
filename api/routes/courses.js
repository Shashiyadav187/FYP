var express = require('express');
var config = require('../../config')();
var Course = require('../models/course');
var router = express.Router();
var Comment = require('../models/comment');

module.exports = router;

// Define the result api middleware
router.use(function(req, res, next) {
    // TODO Sanity check
    next();
});


router.route('/')
// Get All courses
    .get(function(req, res){
        Course.find(function(err, course) {
            if (err)
                res.send(err);

            res.json(course);
        });
    })
    // Create a new Course
    .post(function(req, res) {
        var course = new Course();
        course.title = req.body.title;
        course.course_id = req.body.course_id;
        course.duration = req.body.duration;
        course.college = req.body.college;
        course.sector = req.body.sector;
        course.points = req.body.points;
        course.quickSearch = req.body.quickSearch;

        course.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({ status:200, message: 'course created!'});
            }
        });
    });
/*   .get(function(req, res) {
 User.findOne({'email': req.params.email}, function(err, user) {
 if (err)
 res.send(err);

 res.json(user);
 });
 })*/
router.route('/:sector')
    .get(function(req, res){
        Course.findOne({'sector': req.params.sector}, function(err, course){
            console.log("getting in");
            console.log("check"+ req.params.sector);
            if(err)
                res.send(err);
            res.json(course)
        })
    });
router.route('/currentCourse/:course_id')
    .get(function(req, res){
        Course.findOne({'course_id': req.params.course_id}, function(err, course){
            if(err)
                res.send(err);
            res.json(course)
        })
    });
router.route('/pushCourse/:course_id')
    .post(function(req, res){
        Course.findOne({'course_id': req.params.course_id}, function (err, course) {
            console.log("getting in here");
            if(err)
                res.send(err);

            //console.log(JSON.stringify(req.body.results) + " : r.b.r, " + user + " : just user");
            /*res.send(user);*/

            course.points = req.body.points;
            course.externalLink = req.body.externalLink;
            course.erasmus = req.body.erasmus;
            course.placement = req.body.placement;
            course.portfolio = req.body.portfolio;
            course.thesis = req.body.thesis;
            console.log("here");

            course.save(function(err){
                if(err)
                    res.send(err);

                res.json({message: 'Course updated!'});
            })
        })
    });
router.route('/addComment/:course_id')
    .post(function(req, res){
        Course.findOne({'course_id': req.params.course_id}, function(err, course){
            console.log("getting in");
                course.comments.push(req.body.comments);

            course.save(function(err){
                if(err)
                    res.send(err);

                res.json({message: 'Course updated!'});
            })
        })
    });
/*
 var c1 = new Course({
 title: "Business Computing",
 course_id: "dt354",
 duration: "4",
 college: "Dublin Institute of Technology",
 points: "365"
 });
 c1.save(function(err, res){
 if (err)
 console.log(err);

 console.log(res, 'course created');
 });*/
