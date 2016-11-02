var express = require('express');
var config = require('../../config')();
var User = require('../models/user');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});
var router = express.Router();

router.use( function(req, res, next) {
    res.locals.login = req.isAuthenticated();
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
        //process.nextTick(function(){
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
        // })
    });

passport.use('local', new LocalStrategy({
        passReqToCallback : true,
        usernameField: 'email',
        passwordField: 'password'
    },
    function(req, username, password, done) {

        process.nextTick(function(){
            User.findOne({ email: username }, function(err, user) {

                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, {message: 'Invalid username'});
                }

                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }

                console.log(username + ' ' + password);
                return done(null, user);
            })
        });
    }
));
passport.use(new FacebookStrategy({

        clientID: '1867416510155339',
        clientSecret: '1bb918141ea357962db525698aa8a2de',
        callbackURL: "http://localhost:1349/api/users/auth/facebook/callback",
        passReqToCallback : true,
        profileFields: ['id', 'emails', 'displayName', 'name']

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'facebookID' : profile.id }, function(err, user) {

                    if (err) {
                        return done(err);
                    }

                    if (user) {

                        user.firstName  = profile.name.givenName;
                        user.lastName   = profile.name.familyName;
                        user.email      = (profile.emails[0].value || '').toLowerCase();

                        user.save(function(err) {
                            if (err) {
                                return done(err);
                            }

                            console.log('user saved' + user);
                            return done(null, user);
                        });

                        console.log('user found and returned' + user);
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        console.log('no user found, user being created');
                        var newUser            = new User();

                        newUser.facebookID      = profile.id;
                        newUser.firstName       = profile.name.givenName;
                        newUser.lastName        = profile.name.familyName;
                        newUser.email           = (profile.emails[0].value || '').toLowerCase();

                        newUser.save(function(err) {
                            if (err) {
                                return done(err);
                            }

                            console.log('new user created and saved'+ newUser);
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user            = req.user; // pull the user out of the session

                user.facebookID     = profile.id;
                user.firstName      = profile.name.givenName;
                user.lastName       = profile.name.familyName;
                user.email          = (profile.emails[0].value || '').toLowerCase();

                user.save(function(err) {
                    if (err) {
                        return done(err);
                    }

                    console.log('found user returned');
                    return done(null, user);
                });

            }
        });

    }));
/*--------------------------------------------------------------------------------------------------*/
/*router.route('/remove')
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
 });*/
/*--------------------------------------------------------------------------------------------------*/
router.route('/login')
    .post(
        passport.authenticate('local',
            {successRedirect:'/',
                failureRedirect:'/#/login',
                session: true,
                failureFlash: true}
        )
    );

router.route('/auth/facebook')
    .get(passport.authenticate('facebook', {scope: 'email'}));

router.route('/auth/facebook/callback')
    .get(
        passport.authenticate('facebook',
            {
                successRedirect: '/',
                failureRedirect: '/#/login'
            })
    );

router.route('/logout')
    .get(function(req, res){
        var name = req.user.firstName;
        console.log('Logging out ' + name);
        req.logout();
        res.redirect('/#/login');
    });

router.route('/current')
    .get(function(req, res){
        console.log(req.user);
        res.json( { user: req.user });
    });
/*
 var user1 = new User({
 firstName: 'Test',
 lastName: 'McTester',
 email: 'test',
 username: 'test',
 password: 'test',
 admin: false,
 });


 user1.save(function(err, res){
 if (err)
 console.log(err);
 else
 console.log(res, 'user1 created');
 });*/
module.exports = router;