var express = require('express');
var config = require('../../config')();
var Test = require('../models/test');
var Question = require('../models/question');


var router = express.Router();



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

/*

var q1 = new Question({
    title: "42 40 38 35 33 31 28",
    options: [
        {
            option: "25 22",
        }, {
            option: "26 23",
        },{
            option: "26 24",
        },{
            option: "25 23",
        }],
    answer: null,
    selected: null,
    type: "text"
});
q1.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q10 created');
});
var q2 = new Question({
    title: "6 10 14 18 22 26 30",
    options: [
        {
            option: "34 38",
        }, {
            option: "34 36",
        },{
            option: "38 42",
        },{
            option: "33 37",
        }],
    answer: null,
    selected: null,
    type: "text"
});
q2.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q10 created');
});
var q3 = new Question({
    title: "8 12 9 13 10 14 11",
    options: [
        {
            option: "14 11",
        }, {
            option: "15 12",
        },{
            option: "8 15",
        },{
            option: "15 19",
        }],
    answer: null,
    selected: null,
    type: "text"
});
q3.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q10 created');
});
var q4 = new Question({
    title: "36 31 29 24 22 17 15",
    options: [
        {
            option: "13 11",
        }, {
            option: "10 5",
        },{
            option: "10 8",
        },{
            option: "12 7",
        }],
    answer: null,
    selected: null,
    type: "text"
});
q4.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q10 created');
});
var q5 = new Question({
    title: "3 5 35 10 12 35 17",
    options: [
        {
            option: "22 35",
        }, {
            option: "35 19",
        },{
            option: "19 24",
        },{
            option: "19 35",
        }],
    answer: null,
    selected: null,
    type: "text"
});
q5.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q10 created');
});
var q6 = new Question({
    title: "13 29 15 26 17 23 19",
    options: [
        {
            option: "21 23",
        }, {
            option: "20 21",
        },{
            option: "20 17",
        },{
            option: "25 27",
        }],
    answer: null,
    selected: null,
    type: "text"
});
q6.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q10 created');
});
var q7 = new Question({
    title: "14 14 26 26 38 38 50",
    options: [
        {
            option: "60 72",
        }, {
            option: "50 72",
        },{
            option: "62 62",
        },{
            option: "50 62",
        }],
    answer: null,
    selected: null,
    type: "text"
});
q7.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q10 created');
});
var q8 = new Question({
    title: "44 41 38 35 32 29 26",
    options: [
        {
            option: "24 21",
        }, {
            option: "22 19",
        },{
            option: "29 32",
        },{
            option: "23 20",
        }],
    answer: null,
    selected: null,
    type: "text"
});
q8.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q10 created');
});
var q9 = new Question({
    title: "34 30 26 22 18 14 10",
    options: [
        {
            option: "6 2",
        }, {
            option: "6 4",
        },{
            option: "14 18",
        },{
            option: "4 0",
        }],
    answer: null,
    selected: null,
    type: "text"
});
q9.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q10 created');
});
var q10 = new Question({
    title: "32 31 32 29 32 27 32",
    options: [
        {
            option: "25 32",
        }, {
            option: "31 32",
        },{
            option: "29 32",
        },{
            option: "25 30",
        }],
    answer: null,
    selected: null,
    type: "text"
});
q10.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q10 created');
});
var q11 = new Question({
    title: "7 9 66 12 14 66 17",
    options: [
        {
            option: "66 19",
        }, {
            option: "19 66",
        },{
            option: "19 22",
        },{
            option: "20 66",
        }],
    answer: null,
    selected: null,
    type: "text"
});
q11.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q10 created');
});
var q12 = new Question({
    title: "3 8 10 15 17 22 24",
    options: [
        {
            option: "26 28",
        }, {
            option: "29 34",
        },{
            option: "29 31",
        },{
            option: "26 31",
        }],
    answer: null,
    selected: null,
    type: "text"
});
q12.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q10 created');
});
var q13 = new Question({
    title: "4 7 26 10 13 20 16",
    options: [
        {
            option: "14 4",
        }, {
            option: "14 17",
        },{
            option: "18 14",
        },{
            option: "19 14",
        }],
    answer: null,
    selected: null,
    type: "text"
});
q13.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q10 created');
});
var q14 = new Question({
    title: "32 29 26 23 20 17 14",
    options: [
        {
            option: "11 8",
        }, {
            option: "12 8",
        },{
            option: "11 7",
        },{
            option: "10 9",
        }],
    answer: null,
    selected: null,
    type: "text"
});
q14.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q10 created');
});
var q15 = new Question({
    title: "16 26 56 36 46 68 56",
    options: [
        {
            option: "80 66",
        }, {
            option: "64 82",
        },{
            option: "66 80",
        },{
            option: "78 68",
        }],
    answer: null,
    selected: null,
    type: "text"
});
q15.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q10 created');
});
*/

/*
var test1 = new Test({
    name:"Logical Number Series Test",
    duration: null,
    testId: 'numbers1234',
    answers: [2,0,1,2,3,1,3,3,0,0,1,2,3,0,2],
    questions: {
        question: [q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12,q13,q14,q15]
    }
});

//Saving the model instance to the DB
test1.save(function(err, res){
    if (err)
        console.log(err);
    console.log(res, 'Logical Number Series Test created');
});
*/


/*,q7,q8,q9,q10,q11,q12,q13,q14,q15,q16,q17*!/


Test.findOne({}).populate('questions').exec(function(err, Test) {
    if(err)
        res.send(err);
    res.json({ status: 200, message: 'test created'});
});*/



module.exports = router;
