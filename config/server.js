var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var app = express();

app.set('view engine', 'ejs');
app.set('views', './application/views');

app.use(express.static('./application/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
	secret : 'oqweuirghoiuds',
	resave : 'false',
	saveUninitialized : 'false'
}));
app.use(expressValidator());

consign()
	.include('application/routes')
	.then('application/models')
	.then('application/controllers')
	.then('config/dbConnection.js')
	.into(app);

module.exports = app;