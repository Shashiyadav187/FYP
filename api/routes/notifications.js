var express = require('express');
var config = require('../../config')();
var Notification = require('../models/notification');
var router = express.Router();


// Define the result api middleware
router.use(function(req, res, next) {
    // TODO Sanity check
    next();
});


router.route('/')
// Get All Notification
    .get(function(req, res){
        Notification.find(function(err, notification) {
            if (err)
                res.send(err);

            res.json(notification);
        });
    })
    // Create a new Notification
    .post(function(req, res) {
        var notification = new Notification();
        notification.timeStamp = Date.now();
        notification.senderId = req.body.senderId;
        notification.receiverId = req.body.receiverId;
        notification.seen = req.body.seen;
        notification.message = req.body.message;

        notification.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({ status:200, message: 'notification created!'});
            }
        });
    });
router.route('/:_id')
    .get(function (req, res) {
        Notification.findOne({'_id': req.params.receiverId},
        function (err, notification) {
            if(err)
                res.send(err);
            else
                res.send(notification)
        }
    )}
);

module.exports = router;