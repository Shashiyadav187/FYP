var express=  require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    config = require('./config')();

//Create the application
var app = express();

var User = require('./api/models/user');

// API Routes
var api = require('./api/routes/api');
var users = require('./api/routes/users');

app.use(express.static(__dirname + '/app'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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

console.log('listening on:', config.web.port);
app.listen(config.web.port)