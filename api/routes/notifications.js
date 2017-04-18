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
        Notification.find(function(err, notifications) {
            if (err)
                res.send(err);

            res.json(notifications);
        });
    })
    // Create a new Notification
    .post(function(req, res) {
        var notification = new Notification();
        notification.timeStamp = Date.now();
        notification.senderId = req.body.senderId;
        notification.receiverId = req.body.receiverId;
        notification.conversationId = req.body.conversationId;
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
router.route('/remove/:id')
    .get(function (req, res) {
        Notification.findOne({'id': req.params._id}, function (err, notification) {
                if(err) {
                    res.send(err);
                } else {
                    console.log("inside notification api");
                    notification.remove();
                    res.send(notification);
                }
            }
        )}
    );
router.route('/findByUser/:id')
    .get(function (req, res) {
        var id = req.params.id;
        var myNotifications = [];
        Notification.find(function (err, notifications) {
                if(err)
                    res.send(err);
                else {
                    for(var i = 0; i < notifications.length; i++){
                        if(id == notifications[i].receiverId) {
                            myNotifications.push(notifications[i]);
                        }
                    }
                    res.send(myNotifications);
                }

            }
        )
    });

module.exports = router;