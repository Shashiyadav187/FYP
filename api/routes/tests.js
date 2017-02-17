var express = require('express');
var config = require('../../config')();
var Test = require('../models/test');
var Question = require('../models/question');


var router = express.Router();

module.exports = router;


// Define the test api middleware
router.use(function(req, res, next) {
    next();
});


router.route('/')
// Get All Tests
    .get(function(req, res){
        Test.find(function(err, tests) {
            if (err)
                res.send(err);
            res.json(tests);
        });
    })
    // Create a new Test
    .post(function(req, res) {
        var test = new Test();
        test.name = req.body.name;
        test.duration = req.body.duration;
        test.result = req.body.result;
        /*req.Question = Question;
        test.question = req.Question;*/

        test.save(function(err) {
            if (err)
                res.send(err);
            Test.find().populate('questions').exec(function(err, Test){
            if(err)
                res.send(err);
            res.json({ status: 200, message: 'test created'});
        });
            /*res.json({ status:200, message: 'test created!' });*/
        });
    });

router.route('/name/:testName')
    .get(function (req, res) {
        console.log("BEMI NAME");
        Test.findOne({'name' : req.params.testName}, function(err, test){
            if(err)
                res.send(err);
            res.json(test);
        });
    });

router.route('/id/:testId')
// Get a single test by id
    .get(function(req, res) {
        Test.findOne({'testId' : req.params.testId}, function(err, test) {
            if (err)
                res.send(err);

            res.json(test);
        })
    });

    //Get and remove one test
    // .get(function(req, res) {
    //     Test.findById(req.params.id , function(err, test) {
    //         if (err)
    //             res.send(err);
    //
    //         test.remove(function(err) {
    //             if (err)
    //                 res.send(err);
    //
    //             res.json({ status:200, message: 'tests deleted!'});
    //         });
    //     });
    // });


router.route('/current')
    .get(function(req, res){
        console.log(req.test+' hello');
        res.json( { test: req.test });
    });

//Instantiating the Model - An instance of Model represents a mongodb document
/*var q1 = new Question({
    title: "Would you like to work in an office?",
    options: [
 {
 option: "Yes", weight:[5,1,2,5,2],
 },{
 option: "No", weight:[0,4,3,0,3],
 }],
    selected: null,
    type: "text"
});
q1.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question1 created');
});
var q2 = new Question({
    title: "Do you want to work with people?",
    options: [
 {
 option: "Yes", weight:[2,4,3,4,4],
 },{
 option: "No", weight:[3,1,2,1,1],
 }],
    type: "text",
    selected: null
});
q2.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question2 created');
});
var q3 = new Question({
    title: "Do you enjoy and working with your hands?",
    options: [
 {
 option: "Yes", weight:[2,5,4,1,2],
 },{
 option: "No", weight:[3,0,1,4,3],
 }],
    type: "text",
    selected: null
});
q3.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question2 created');
});
var q4 = new Question({
    title: "Are you creative, artistic and/or musical?",
    options: [
 {
 option: "Yes", weight:[1,1,1,0,5],
 },{
 option: "No", weight:[4,4,4,5,0],
 }],
    type: "text",
    selected: null
});
q4.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question2 created');
});
var q5 = new Question({
    title: "Do you like to hold presentations and to inform others?",
    options: [
 {
 option: "Yes", weight:[1,0,2,4,4],
 },{
 option: "No", weight:[4,5,3,1,1],
 }],
    type: "text",
    selected: null
});
q5.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question2 created');
});
var q6 = new Question({
    title: "Do you like to work with numbers?",
    options: [
 {
 option: "Yes", weight:[5,3,1,4,1],
 },{
 option: "No", weight:[0,2,4,1,4],
 }],
    type: "text",
    selected: null
});
q6.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question2 created');
});
var q7 = new Question({
    title: "Do you like to understand how things work?",
    options: [
 {
 option: "Yes", weight:[5,4,2,4,1],
 },{
 option: "No", weight:[0,1,3,1,4],
 }],
    type: "text",
    selected: null
});
q7.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question2 created');
});
var q8 = new Question({
    title: "Do you like helping people?",
    options: [
 {
 option: "Yes", weight:[1,3,5,2,1],
 },{
 option: "No", weight:[4,2,0,3,4],
 }],
    type: "text",
    selected: null
});
q8.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question2 created');
});
var q9 = new Question({
    title: "Do you like planning, organising and creating structure?",
    options: [
 {
 option: "Yes", weight:[5,4,2,3,1],
 },{
 option: "No", weight:[0,1,3,2,4],
 }],
    type: "text",
    selected: null
});
q9.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question2 created');
});
var q10 = new Question({
    title: "Do you enjoy reading, going to the theatre and museums etc?",
    options: [
 {
 option: "Yes", weight:[1,0,1,3,5],
 },{
 option: "No", weight:[4,4,3,2,0],
 }],
    type: "text",
    selected: null
});
q10.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question2 created');
});
var q11 = new Question({
    title: "Do you enjoy building things?",
    options: [
 {
 option: "Yes", weight:[2,5,1,1,2] ,
 },{
 option: "No", weight:[3,0,4,4,3],
 }],
    type: "text",
    selected: null
});
q11.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question2 created');
});
var q12 = new Question({
    title: "Can you easily explain complex situations to people?",
    options: [
 {
 option: "Yes", weight:[5,1,2,3,0],
 },{
 option: "No", weight:[0,4,3,2,5],
 }],
    type: "text",
    selected: null
});
q12.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question2 created');
});
var q13 = new Question({
    title: "Do you enjoy working with computers?",
    options: [
 {
 option: "Yes", weight:[5,3,2,4,1],
 },{
 option: "No", weight:[0,2,3,1,4],
 }],
    type: "text",
    selected: null
});
q13.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question2 created');
});
var q14 = new Question({
    title: "Are you passionate about information and communication?",
    options: [
 {
 option: "Yes", weight:[3,2,2,5,1],
 },{
 option: "No", weight:[2,2,3,0,4],
 }],
    type: "text",
    selected: null
});
q14.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question2 created');
});
var q15 = new Question({
    title: "Do you like to write?",
    options: [
 {
 option: "Yes", weight:[1,0,2,5,4],
 },{
 option: "No", weight:[4,5,3,0,1],
 }],
    type: "text",
    selected: null
});
q15.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question2 created');
});
var q16 = new Question({
    title: "Are you interested in the human body?",
    options: [
 {
 option: "Yes", weight:[0,0,5,0,0],
 },{
 option: "No", weight:[5,5,0,5,5],
 }],
    type: "text",
    selected: null
});
q16.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question2 created');
});
var q17 = new Question({
    title: "Do you like researching things?",
    options: [
 {
 option: "Yes", weight:[4,2,4,4,0],
 },{
 option: "No", weight:[1,3,1,1,5],
 }],
    type: "text",
    selected: null
});
q17.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question2 created');
});*/
/*var q10 = new Question({
    title: "Do you enjoy reading, going to the theatre and museums etc?",
    options: [
 {
 option: "Yes", weight:[1,0,1,3,5],
 },{
 option: "No", weight:[4,4,3,2,0],
 }],
    type: "text",
    selected: null
});
q10.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question2 created');
});*/


/*
var question10 = new Question({
    title: "https://www.123test.com/spatial-reasoning-test/items//item10/uitgevouwen.png",
    options: [
        {
            option: "https://www.123test.com/spatial-reasoning-test/items/item10/fout.png",
        }, {
            option: "https://www.123test.com/spatial-reasoning-test/items/item10/goed1.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item10/goed2.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item10/goed3.png",
        }],
    answer: null,
    selected: null,
    type: "image"
});
question10.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q10 created');
});
 */

/* var test1 = new Test({
    name:"Careers Test",
    duration: null,
    questions: {
        question: [q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12,q13,q14,q15,q16,q17]
    }
});

//Saving the model instance to the DB
test1.save(function(err, res){
    if (err)
        console.log(err);
    console.log(res, 'careers test created');
});*/




/*Test.findOne({}).populate('questions').exec(function(err, Test) {
    if(err)
        res.send(err);
    res.json({ status: 200, message: 'test created'});
});*/



module.exports = router;