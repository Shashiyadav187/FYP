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
/*
 var mailer = require('../u');
 */
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
                    return done(null, false, { message: 'Invalid username'});
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
passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        //process.nextTick(function() {
        // if the user is not already logged in:
        if (!req.user) {
            User.findOne({ 'email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {

                    // create the user
                    var newUser            = new User();

                    newUser.firstName   = req.body.firstName;
                    newUser.lastName    = req.body.lastName;
                    newUser.email       = email;
                    newUser.profiler    = req.body.profiler;
                    newUser.password    = newUser.generateHash(password);

                    newUser.save(function(err) {
                        if (err)
                            return done(err);

                        return done(null, newUser);
                    });
                }

            });
            // if the user is logged in but has no local account...
        } else if ( !req.user.local.email ) {
            // ...presumably they're trying to connect a local account
            // BUT let's check if the email used to connect a local account is being used by another user
            User.findOne({ 'local.email' :  email }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {
                    return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
                    // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
                } else {
                    var userB = req.user;
                    userB.firstName = firstName;
                    userB.lastName = lastName;
                    userB.email = email;
                    userB.profiler = profiler;
                    userB.password = userB.generateHash(password);
                    userB.save(function (err) {
                        if (err)
                            return done(err);

                        return done(null,userB);
                    });
                }
            });
        } else {
            // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
            return done(null, req.user);
        }

        //});

    }));

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

router.route('/login')
    .post(
        passport.authenticate('local',
            {successRedirect:'/',
                failureRedirect:'/#/login',
                session: true,
                failureFlash: true}
        )
    );

router.route('/signup')
    .post(passport.authenticate('local-signup', {
        successRedirect : '/#/login',
        failureRedirect : '/#/signup',
        failureFlash : true
    }));

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
        /*console.log(req.user);*/
        res.json( { user: req.user });
    });

router.route('/pushResult/:email')
    .post(function(req, res){
        User.findOne({'email': req.params.email}, function (err, user) {
            if(err)
                res.send(err);
            user.results.push(req.body.results);
            user.timeStamp = Date.now();
            console.log(Date.now());
            user.save(function(err){
                if(err)
                    res.send(err);

                res.json({message: 'User updated!'});
            })
        })
    });

router.route('/pushCourse/:email')
    .post(function(req, res){
        User.findOne({'email': req.params.email}, function (err, user) {
            if(err)
                res.send(err);

            console.log(req.body.courses);
            user.courses.push(req.body.courses);

            user.save(function(err){
                if(err)
                    res.send(err);

                res.json({message: 'User updated!'});
            })
        })
    });

router.route('/:email')
    .get(function(req, res) {
        User.findOne({'email': req.params.email}, function(err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
    });

router.route('/getUserById/:_id')
    .get(function(req, res) {
        User.findOne({'_id': req.params._id}, function(err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
    });

router.route('/removeResult/:_id')
    .get(function(req, res) {
        User.findOne({'_id': req.params._id}, function(err, user) {
            if (err)
                res.send(err);
            else{
                console.log(req.body.results);
                res.json(user);
            }
        });
    });

router.route('/removeCourse/:_id/:courseId')
    .get(function(req, res) {
        var courseId = req.params.courseId;
        var id = req.params._id;
        User.findById(id, function(err, user) {
            console.log("course id: "+courseId);
            console.log("user is : "+user.courses);
            if (err)
                res.send(err);
            else {
                for(var i = 0; i < user.courses.length; i++){
                    if(user.courses[i]._id == courseId){
                        user.courses[i].remove();
                    }
                }
                res.json(user);
            }
        });
    });

router.route('/updateUser/:_id')
    .post(function(req, res) {
        User.findOne({'_id': req.params._id}, function(err, user) {
            if (err)
                res.send(err);
            else {
                user.profiler = req.body.profiler;
                user.backgroundPhoto = req.body.backgroundPhoto;

                user.save(function(err){
                    if(err)
                        res.send(err);

                    res.json({message: 'User updated!'});
                });
            }

        });
    });

router.route('/updateViewed/:_id')
    .post(function(req, res) {
        User.findOne({'_id': req.params._id}, function(err, user) {
            if (err)
                res.send(err);
            else {
                console.log("body of recently viewed+ "+ req.body.recentlyViewed);
                user.recentlyViewed.push(req.body.recentlyViewed);

                user.save(function(err){
                    if(err)
                        res.send(err);

                    res.json({message: 'User updated!'});
                });
            }

        });
    });

/*router.route('/pushCourse/:email')
 .post(function(req, res) {
 User.findOne({'email': req.params.email}, function(err, user) {
 if (err)
 res.send(err);
 else {
 user.firstName = req.body.firstName;
 user.lastName = req.body.lastName;
 user.email = req.body.email;
 user.profiler = req.body.profiler;
 user.backgroundPhoto = req.body.backgroundPhoto;
 user.courses.push(req.body.courses);
 user.results.push(req.body.results);
 console.log("success");
 }

 });
 });*/



/*
 var user1 = new User({
 firstName: 'Test',
 lastName: 'McTester',
 email: 'test',
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