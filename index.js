/* global: process __dirname */
"use strict";

var express = require('express'),
    path = require("path"),
    env = require("node-env-file"),
    exphbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    formHandlerFactory = require('./form_handler');

if (process.env.NODE_ENV === "development" || typeof process.env.NODE_ENV === "undefined") {
    env(path.join(__dirname, "./.env"));
}

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
//app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.engine('handlebars', exphbs({defaultLayout: 'default'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('main');
});
app.post('/form', formHandlerFactory(
    process.env.SPREADSHEET,
    process.env.GMAIL_USERNAME,
    process.env.GMAIL_PASSWORD
));

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});