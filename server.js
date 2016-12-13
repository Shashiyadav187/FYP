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
    console.log('serializing ' + user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        console.log('deserializing  ' +  user);
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
// Register web app routes
app.use('/', web);

// Register API routes
app.use('/api/', api);
app.use('/api/users/', users);
app.use('/api/tests/', tests);
app.use('/api/questions/', questions);

//Serve app
http.createServer(app).listen(config.web.port);

console.log('The magic happens at ', config.web.port);