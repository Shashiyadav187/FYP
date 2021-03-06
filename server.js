var express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config')(),
    web = require('./app/routes/web'),
    http = require('http'),
    mongoose   = require('mongoose'),
    passport = require('passport'),
    flash = require('connect-flash'),
    session = require('express-session'),
    cookieParser = require('cookie-parser');

//Create the application
var app = express();

var User = require('./api/models/user');

// API Routes
var api = require('./api/routes/api');
var users = require('./api/routes/users');
var tests = require('./api/routes/tests');
var questions =require('./api/routes/questions');
var results = require('./api/routes/results');
var courses  = require('./api/routes/courses');
var sectors  = require('./api/routes/sectors');
var comments  = require('./api/routes/comments');
var conversations  = require('./api/routes/conversations');
var messages  = require('./api/routes/messages');
var notifications  = require('./api/routes/notifications');

app.use(express.static(__dirname + '/app'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'Blah',
    saveUninitialized: true,
    resave: true,
    expires: 360000
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// configure passport
passport.serializeUser(function(user, done) {
    /*console.log('serializing ' + user);*/
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        /*console.log('deserializing  ' +  user);*/
        done(err, user);
    });
});

// Connect to MongoDB
mongoose.connect('mongodb://' + config.db.host + ':'
    + config.db.port + '/'
    + config.db.database,
    function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Mongo connected");
        }
    }
);

// // Firebase connection
//
// var configData = {
//     apiKey: "AIzaSyBT3-RmrTaIIMNRs9lKBPXReCIWNQQXXxU",
//     authDomain: "unisexp-a1b2d.firebaseapp.com",
//     databaseURL: "https://unisexp-a1b2d.firebaseio.com",
//     projectId: "unisexp-a1b2d",
//     storageBucket: "unisexp-a1b2d.appspot.com",
//     messagingSenderId: "175197150875"
// };
// firebase.initializeApp(configData);

// console.log("firebase: "+firebase);
// Register web app routes
app.use('/', web);

// Register API routes
app.use('/api/', api);
app.use('/api/users/', users);
app.use('/api/tests/', tests);
app.use('/api/questions/', questions);
app.use('/api/results/', results);
app.use('/api/courses/', courses);
app.use('/api/sectors/', sectors);
app.use('/api/comments/', comments);
app.use('/api/conversations/', conversations);
app.use('/api/messages/', messages);
app.use('/api/notifications/', notifications);

//Serve app
http.createServer(app).listen(config.web.port);

console.log('The magic happens at ', config.web.port);