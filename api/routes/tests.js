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

router.route('/:testName')
    .get(function (req, res) {
        Test.findOne({'name' : req.params.testName}, function(err, test){
            if(err)
                res.send(err);
            res.json(test);
        });
    });

router.route('/:testId')
// Get a single test by id
    .get(function(req, res) {
        Test.findById(req.params.testId, function(err, test) {
            if (err)
                res.send(err);

            res.json(test);
        });
    })

    //Get and remove one test
    .get(function(req, res) {
        Test.findById(req.params.testId , function(err, test) {
            if (err)
                res.send(err);

            test.remove(function(err) {
                if (err)
                    res.send(err);

                res.json({ status:200, message: 'tests deleted!'});
            });
        });
    });
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
/*var question1 = new Question({
    title: "How big is the moon",
    options: {
        option1 : "1000m",
        option2 : "2000m",
        option3 : "3000m",
        option4 : "4000m"
    },
    answer: "option1",
    selected: null
});
question1.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question1 created');
});
var question2 = new Question({
    title: "How much is the moon",
    options: {
        option1 : "5er",
        option2 : "10er",
        option3 : "20",
        option4 : "more"
    },
    answer: "option4",
    selected: null
});
question2.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question2 created');
});

 var test1 = new Test({
 name:"Moon",
 duration: 10,
 number_questions: "2",
     questions: ({
         question: [question1, question2]
     })
 });

 //Saving the model instance to the DB
 test1.save(function(err, res){
 if (err)
 res.send(err);
 console.log(res, 'test created');
 });*/

/*Test.findOne({}).populate('questions').exec(function(err, Test) {
    if(err)
        res.send(err);
    res.json({ status: 200, message: 'test created'});
});*/



module.exports = router;