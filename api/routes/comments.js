var express = require('express');
var config = require('../../config')();
var Comment = require('../models/comment');
var router = express.Router();


// Define the result api middleware
router.use(function(req, res, next) {
    // TODO Sanity check
    next();
});


router.route('/')
// Get All Questions
    .get(function(req, res){
        Comment.find(function(err, comment) {
            if (err)
                res.send(err);

            res.json(comment);
        });
    })
    // Create a new Comment
    .post(function(req, res) {
        var comment = new Comment();
        comment.timeStamp = Date.now();
        comment.text = req.body.text;
        comment.user = req.body.user;
        comment.course = req.body.course;

        comment.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({ status:200, message: 'comment created!'});
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