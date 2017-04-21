var express = require('express');
var config = require('../../config')();
var Result = require('../models/result');
var router = express.Router();


// Define the result api middleware
router.use(function(req, res, next) {
    // TODO Sanity check
    next();
});


router.route('/')
// Get All Questions
    .get(function(req, res){
        Result.find(function(err, result) {
            if (err)
                res.send(err);

            res.json(result);
        });
    })
    // Create a new User
    .post(function(req, res) {
        var result = new Result();
        result.testName = req.body.testName;
        result.score = req.body.score;
        result.recommend = req.body.recommend;
        result.timeStamp = req.body.timeStamp;

        result.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({ status:200, message: 'result created!', result: result});
            }
        });
    });

/*
 var result = new User({
 testName:"Careers Test",
 score: null,
 recommend: "Computer Science"
 });

result.save(function(err, res){
 if (err)
 res.send(err);
 console.log(res, 'result created');
 });

*/


module.exports = router;