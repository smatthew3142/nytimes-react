var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require('morgan');
var path = require('path');
var routes = require("./routes");
var app = express();

var PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static(path.join(__dirname, "client/build")));
// Add routes, both API and view
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nytimes-react"
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

// Start the API server
app.listen(PORT, function() {
  console.log("Listening on PORT " + PORT);
});