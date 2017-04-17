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
router.route('/getByUser/:id')
  /*  .get(function (req, res) {
        //console.log("inside notification api");
        Notification.find(function (err, notification) {
                if(err) {
                    console.log("inside notification api");
                    res.send(err);
                } else {
                    console.log("inside notification api");
                    res.send(notification);
                }
            }
        )}
    );*/
router.route('/:id')
    .get(function (req, res) {
        console.log("inside remove api");
        Notification.findByIdAndRemove({'id' : req.params._id},
            function (err, notification) {
                if(err)
                    res.send(err);
                else {
                    notification.save(function (err, res) {
                        if(err)
                            res.send(err)
                        else
                            notification.remove().exec();
                    })
                }

            }
        )
    });

module.exports = router;