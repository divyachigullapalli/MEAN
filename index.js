// require app, mongoose
var app = require('./server/server.js');
var mongoose = require('mongoose');

// set mongoURI
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/stationarymart';

// connect db
mongoose.connect(mongoURI);
var db = mongoose.connection;
console.log(db)

// set port
var port = process.env.PORT || 1337;

// listen on port
app.listen(port);

console.log("Server is listening on port " + port);

