var express = require('express');
var config = require('../../config')();
var Conversation = require('../models/conversation');
var router = express.Router();


// Define the result api middleware
router.use(function(req, res, next) {
    // TODO Sanity check
    next();
});


router.route('/')
// Get All Conversation
    .get(function(req, res){
        Conversation.find(function(err, conversation) {
            if (err)
                res.send(err);

            res.json(conversation);
        });
    })
    // Create a new Conversation
    .post(function(req, res) {
        var conversation = new Conversation();
        conversation.timeStamp = Date.now();
        conversation.user1 = req.body.user1;
        conversation.user2 = req.body.user2;

        conversation.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({ status:200, message: 'conversation created!', data: conversation});
            }
        });
    });
router.route('/:_id')
    .post(function (req, res) {
        Conversation.findOne({'_id': req.params._id}, function (err, conversation) {
                if(err)
                    res.send(err);
                else{
                    conversation.messages.push(req.body.message);
                    console.log("message added to conv");

                    conversation.save(function (err) {
                        if(err)
                            res.send(err);
                        else
                            res.json({message: 'conversation saved', data:conversation});
                    })
                }
            }
        )}
    )
    .get(function (req, res) {
        Conversation.findOne({'_id': req.params._id}, function (err, conversation) {
                if(err)
                    res.send(err);
                else
                    res.send(conversation)
            }
        )}
    );
router.route('/remove/:_id')
    .get(function (req, res) {
        var id = req.params._id;
        console.log("conv req.id: "+ req.params._id);
        Conversation.findById(id, function (err, conversation) {
            console.log("Inside conversation api");
            if(err)
                res.send(err);
            else {
                conversation.remove();
                res.send(conversation);
            }
        })
    });
router.route('/loopThrough/this/:_id')
    .get(function (req, res) {
        var id = req.params._id;
        console.log("id: "+id);
        Conversation.find({},function (err, conversation) {
            if(err)
                res.send(err);
            else {
                for (var i = 0; i < conversation.length; i++) {
                    if(conversation[i].user1._id == id){
                        conversation[i].user1.status = !conversation[i].user1.status;
                        console.log("convId: "+ conversation[i]._id);
                        console.log("status: "+ conversation[i].user1.status);
                        conversation[i].save();
                    } else if(conversation[i].user2._id == id){
                        conversation[i].user2.status = !conversation[i].user2.status;
                        console.log("convId: "+ conversation[i]._id);
                        console.log("status: "+ conversation[i].user2.status);
                        conversation[i].save();
                    }
                    //console.log("conversation: " + conversation._id);
                }
                res.send(conversation);
            }
        })
    });
/*router.route('/updateStatus/:_id')
    .post(function(req, res) {
        var id = req.params._id;
        Conversation.findById(id, function(err, conversation) {
            if (err)
                res.send(err);
            else {
                conversation.
                conversation.save(function(err){
                    if(err)
                        res.send(err);

                    res.json({message: 'User updated!'});
                });
            }

        });
    });*/

module.exports = router;