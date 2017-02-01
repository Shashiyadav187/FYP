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

router.route('/create')
    .post(function(req,res){

        }

    );

//Instantiating the Model - An instance of Model represents a mongodb document

/*
var question1 = new Question({
    title: "Careers Question 1",
    options: [
 {
 option: "option1", weight:[1,1,4,3,2],
 },{
 option: "option2", weight:[1,2,3,4,5],
 },{
 option: "option3", weight:[1,3,4,2,1],
 },{
 option: "option4", weight:[1,0,1,1,2],
 }],
    answer: null,
    selected: null,
    type: "text"
});
question1.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question1 created');
});
var question2 = new Question({
    title: "How much is the moon",
    options: [
 {
 option: "5er", weight:[0,1,2,3,4],
 },{
 option: "10er", weight:[1,2,3,4,5],
 },{
 option: "50", weight:[1,1,4,3,2],
 },{
 option: "Probably more", weight:[1,1,4,3,2],
 }],
    answer: "option4",
    type: "text",
    selected: null
});
question2.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question2 created');
});

*/

/*
var question1 = new Question({
    title: "https://www.123test.com/spatial-reasoning-test/items//item1/uitgevouwen.png",
    options: [
        {
            option: "https://www.123test.com/spatial-reasoning-test/items/item1/goed1.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item1/fout.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item1/goed2.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item1/goed3.png",
        }],
    answer: null,
    selected: null,
    type: "image"
});
question1.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q1 created');
});
var question2 = new Question({
    title: "https://www.123test.com/spatial-reasoning-test/items//item2/uitgevouwen.png",
    options: [
        {
            option: "https://www.123test.com/spatial-reasoning-test/items/item2/fout.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item2/goed1.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item2/goed2.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item2/goed3.png",
        }],
    answer: null,
    selected: null,
    type: "image"
});
question2.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q2 created');
});
var question3 = new Question({
    title: "https://www.123test.com/spatial-reasoning-test/items//item3/uitgevouwen.png",
    options: [
        {
            option: "https://www.123test.com/spatial-reasoning-test/items/item3/goed1.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item3/goed2.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item3/fout.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item3/goed3.png",
        }],
    answer: null,
    selected: null,
    type: "image"
});
question3.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q3 created');
});
var question4 = new Question({
    title: "https://www.123test.com/spatial-reasoning-test/items//item4/uitgevouwen.png",
    options: [
        {
            option: "https://www.123test.com/spatial-reasoning-test/items/item4/goed1.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item4/goed2.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item4/fout.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item4/goed3.png",
        }],
    answer: null,
    selected: null,
    type: "image"
});
question4.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q4 created');
});
var question5 = new Question({
    title: "https://www.123test.com/spatial-reasoning-test/items//item5/uitgevouwen.png",
    options: [
        {
            option: "https://www.123test.com/spatial-reasoning-test/items/item5/fout.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item5/goed1.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item5/goed2.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item5/goed3.png",
        }],
    answer: null,
    selected: null,
    type: "image"
});
question5.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q5 created');
});
var question6 = new Question({
    title: "https://www.123test.com/spatial-reasoning-test/items//item6/uitgevouwen.png",
    options: [
        {
            option: "https://www.123test.com/spatial-reasoning-test/items/item6/goed1.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item6/goed2.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item6/goed3.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item6/fout.png",
        }],
    answer: null,
    selected: null,
    type: "image"
});
question6.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q6 created');
});
var question7 = new Question({
    title: "https://www.123test.com/spatial-reasoning-test/items//item7/uitgevouwen.png",
    options: [
        {
            option: "https://www.123test.com/spatial-reasoning-test/items/item7/goed1.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item7/fout.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item7/goed2.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item7/goed3.png",
        }],
    answer: null,
    selected: null,
    type: "image"
});
question7.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q7 created');
});
var question8 = new Question({
    title: "https://www.123test.com/spatial-reasoning-test/items//item8/uitgevouwen.png",
    options: [
        {
            option: "https://www.123test.com/spatial-reasoning-test/items/item8/goed1.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item8/goed2.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item8/goed3.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item8/fout.png",
        }],
    answer: null,
    selected: null,
    type: "image"
});
question8.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q8 created');
});
var question9 = new Question({
    title: "https://www.123test.com/spatial-reasoning-test/items//item9/uitgevouwen.png",
    options: [
        {
            option: "https://www.123test.com/spatial-reasoning-test/items/item9/goed1.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item9/goed2.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item9/fout.png",
        }, {
            option: "https://www.123test.com/spatial-reasoning-test/items/item9/goed3.png",
        }],
    answer: null,
    selected: null,
    type: "image"
});
question9.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'Q9 created');
});
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
    answers: [],
    questions: {
        question: [question1, question2]
    }
});

//Saving the model instance to the DB
test1.save(function(err, res){
    if (err)
        res.send(err);
    console.log(res, 'spatial test created');
});*/




/*Test.findOne({}).populate('questions').exec(function(err, Test) {
    if(err)
        res.send(err);
    res.json({ status: 200, message: 'test created'});
});*/



module.exports = router;