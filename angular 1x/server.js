var express  = require('express');
var exp      = express(); 
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
//config database 
var mongoose = require('mongoose');
var database = require('./config/database');
mongoose.connect(database.url, function(err) {
    if (err) throw err;
});

// Setup Middlewares =====================

    exp.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    exp.use(morgan('dev'));                                         // log every request to the console
    exp.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    exp.use(bodyParser.json());                                     // parse application/json
    exp.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    exp.use(methodOverride());
    
// Setup apis and their routes (Use & API(Get/Post/Delete) =====================

require('./app/routes.js')(exp);

// listen (start app with node server.js) ======================================
exp.listen(8081);
console.log("Server kicking now...");



    

