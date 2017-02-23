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

//Instantiating the Model - An instance of Model represents a mongodb document/*
/*
var q1 = new Question({
    title: "Would you like to work in an office?",
    options: [
        {
            option: "Yes", weight:[10,2,4,10,2] ,
        },{
            option: "No", weight:[0,8,6,0,8],
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
            option: "Yes", weight:[3,8,6,8,8] ,
        },{
            option: "No", weight:[7,2,4,2,2],
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
            option: "Yes", weight:[4,10,8,2,4] ,
        },{
            option: "No", weight:[6,0,2,8,6],
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
            option: "Yes", weight:[3,2,2,1,10],
        },{
            option: "No", weight:[7,8,8,9,0],
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
            option: "Yes", weight:[3,1,4,8,8] ,
        },{
            option: "No", weight:[7,9,6,2,2],
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
            option: "Yes", weight:[8,7,2,6,2] ,
        },{
            option: "No", weight:[2,3,8,4,8],
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
            option: "Yes", weight:[10,8,5,8,2],
        },{
            option: "No", weight:[0,2,5,2,8],
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
            option: "Yes", weight:[2,6,10,4,2] ,
        },{
            option: "No", weight:[8,4,0,6,8],
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
            option: "Yes", weight:[10,8,4,7,2],
        },{
            option: "No", weight:[0,2,6,3,8],
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
            option: "Yes", weight:[2,0,2,6,10],
        },{
            option: "No", weight:[8,8,6,4,0],
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
            option: "Yes", weight:[3,10,2,2,4],
        },{
            option: "No", weight:[7,0,8,8,6],
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
            option: "Yes", weight:[10,2,4,7,0],
        },{
            option: "No", weight:[0,8,6,3,10],
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
            option: "Yes", weight:[10,6,4,8,2] ,
        },{
            option: "No", weight:[0,4,6,2,8],
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
            option: "Yes", weight:[7,5,4,10,2],
        },{
            option: "No", weight:[3,5,6,0,8],
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
            option: "Yes", weight:[2,0,4,10,8],
        },{
            option: "No", weight:[8,10,6,0,2],
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
            option: "Yes", weight:[0,0,10,0,0],
        },{
            option: "No", weight:[10,10,0,10,10],
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
            option: "Yes", weight:[7,3,7,8,0],
        },{
            option: "No", weight:[3,7,3,2,10],
        }],
    type: "text",
    selected: null
});
q17.save(function(err, res){
    if (err)
        console.log(err);
    console.log(res, 'question2 created');
});
var q18 = new Question({
    title: "Do you cope well under pressure?",
    options: [
        {
            option: "Yes", weight:[4,2,9,5,8],
        },{
            option: "No", weight:[6,8,1,5,2],
        }],
    type: "text",
    selected: null
});
q18.save(function(err, res){
    if (err)
        console.log(err);
    console.log(res, 'question2 created');
});
var q19 = new Question({
    title: "Are you good at overlooking others?",
    options: [
        {
            option: "Yes", weight:[2,5,5,9,1],
        },{
            option: "No", weight:[8,5,5,1,2],
        }],
    type: "text",
    selected: null
});
q19.save(function(err, res){
    if (err)
        console.log(err);
    console.log(res, 'question2 created');
});
var q20 = new Question({
    title: "Do you want to start up your own business?",
    options: [
        {
            option: "Yes", weight:[8,8,2,10,5],
        },{
            option: "No", weight:[2,2,8,2,5],
        }],
    type: "text",
    selected: null
});
q20.save(function(err, res){
    if (err)
        console.log(err);
    console.log(res, 'question20 created');
});

*/


/*var question10 = new Question({
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
});*/

/*var test1 = new Test({
    name:"Careers Test",
    duration: null,
    testId: 'careers1234',
    questions: {
        question: [q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12,q13,q14,q15,q16,q17,q18,q19,q20]
    }
});

//Saving the model instance to the DB
test1.save(function(err, res){
    if (err)
        console.log(err);
    console.log(res, 'ec test created');
});*/


/*,q7,q8,q9,q10,q11,q12,q13,q14,q15,q16,q17*!/


Test.findOne({}).populate('questions').exec(function(err, Test) {
    if(err)
        res.send(err);
    res.json({ status: 200, message: 'test created'});
});*/



module.exports = router;
