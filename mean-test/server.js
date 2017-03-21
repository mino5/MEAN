// server.js

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongodb = require("mongodb");

// configuration
var db = require('./config/db');
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.json());

var expressMongoDb = require('express-mongo-db');
app.use(expressMongoDb(db.url));

// routes
require('./app/routes')(app);

// create link to Angular build directory (v2 - ts)
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// init
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

module.exports = app;
