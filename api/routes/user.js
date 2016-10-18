var express = require('express');
var config = require('../../config')();
var User = require('../models/user');
var passport = require('passport'),
    rehearsal = require('./rehearsals'),
    LocalStrategy = require('passport-local').Strategy;
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});
var router = express.Router();

router.use( function(req, res, next) {
    return next();

});


router.route('/', auth)
// Get All Users
    .get(function(req, res){
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    })
    // Create a new User
    .post(function(req, res) {
        var user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.username = req.body.username;
        user.admin = req.body.admin;
        var rehearsal = new Rehearsal(req.body.rehearsal);
        user.rehearsal = rehearsal.id;

        user.setPassword(req.body.password);

        user.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                var token = user.generateJwt();
                res.json({ status:200, message: 'user created!', 'token':token });
            }
        });
    });

router.route('/remove')
//Get and remove users
    .get(function(req, res) {
        User.find(function(err, user) {
            if (err)
                res.send(err);

            user.remove(function(err) {
                if (err)
                    res.send(err);

                res.json({ status:200, message: 'user deleted!'});
            });
        });
    });
router.route('update')
// Get a single user and update their info
    .get(function(req, res) {
        User.findById(req.params.userId, req.params.user, function(err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
    });

//var user1 = new User();

var user1 = new User({
    firstName: 'Tim',
    lastName: 'Humphries',
    email: 'thumphries5@gmail.com',
    username: 'tim',
    password: 'tim',
    admin: false,

});

user1.save(function(err, res){
    if (err)
        console.log(err);
    else
        console.log(res, 'user1 created');
});

module.exports = router;