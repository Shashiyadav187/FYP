var express = require('express');
var config = require('../../config')();
var Result = require('../models/result');
var router = express.Router();

module.exports = router;

// Define the question api middleware
router.use(function(req, res, next) {
    // TODO Sanity check
    next();
});


router.route('/')
// Get All Questions
    .get(function(req, res){
        Question.find(function(err, result) {
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
        result.timeStamp = req.body.timeStamp;

        result.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({ status:200, message: 'result created!'});
            }
        });
    });

/*
 var user2 = new User({
 firstName:"Database",
 lastName: "Test",
 email: "thumphries5@hotmail.com",
 username: 'test',
 password:'test',
 admin: false
 });

 user2.save(function(err, res){
 if (err)
 res.send(err);
 console.log(res, 'user2 created');
 });
 */



module.exports = router;