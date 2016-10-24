var express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config')(),
    web = require('./app/routes/web'),
    http = require('http'),
    mongoose   = require('mongoose');


//Create the application
var app = express();

var User = require('./api/models/user');

// API Routes
var api = require('./api/routes/api');

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
// Register web app routes
app.use('/', web);

// Register API routes
app.use('/api/', api);

//Serve app
http.createServer(app).listen(config.web.port);

console.log('listening on:', config.web.port);