var express = require('express');
var config = require('../../config')();
var Course = require('../models/course');
var router = express.Router();

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
