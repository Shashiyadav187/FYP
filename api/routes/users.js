var express = require('express');
var config = require('../../config')();
var User = require('../models/user');
var passport = require('passport'),
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

        user.setPassword(req.body.password);

        user.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                var token = user.generateJwt();
                res.json({ status:200, message: 'user created!', 'token created':token});
            }
        });
    })

    .get(function(req, res){

        passport.authenticate('local', function(err, user, info){
            var token;

            if(err){
                res.send(err);
                return;
            }
            if(user){
                token = user.generateJwt();
                res.json({status:200, message: 'user found', 'token': token});
            }
            else {
                res.status(401).json(info);
            }
        })(req,res);
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

passport.use('local', new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            console.log(username + ' ' + password);
            return done(null, user);
        });
    }
));

router.route('update')
// Get a single user and update their info
    .get(function(req, res) {
        User.findById(req.params.userId, req.params.user, function(err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
    });

router.route('/login')
    .post(
        passport.authenticate('local',
            {successRedirect:'/',
                failureRedirect:'/#/login',
                session: true,
                failureFlash: true}
        )
    );


router.route('/logout')
    .get(function(req, res){
        var name = req.user.username;
        console.log('Logging out' + name);
        req.logout();
        res.redirect('/#/login');
    });

router.route('/current')
    .get(function(req, res){
        console.log(req.user);
        res.json( { user: req.user });
    });

/*var user1 = new User({
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
 });*/
module.exports = router;