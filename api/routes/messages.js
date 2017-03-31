var express = require('express');
var config = require('../../config')();
var Message = require('../models/message');
var router = express.Router();


// Define the result api middleware
router.use(function(req, res, next) {
    // TODO Sanity check
    next();
});


router.route('/')
// Get All Messagess
    .get(function(req, res){
        Message.find(function(err, message) {
            if (err)
                res.send(err);

            res.json(message);
        });
    })
    // Create a new Conversation
    .post(function(req, res) {
        var message = new Message();
        message.timeStamp = Date.now();
        message.body = req.body.body;
        message.read = req.body.read;
        message.senderId = req.body.senderId;
        message.receiverId = req.body.receiverId;

        message.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({ status:200, message: 'message created!', data: message});
            }
        });
    });

module.exports = router;