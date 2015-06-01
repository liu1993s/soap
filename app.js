'use strict';
var path = require('path'),
	http = require('http'),
	https = require('https'),
	router = require('./router'),
	config = require('./config'),
	express = require('express'),
	app = express();
	global.soap = {};
	soap.config = require('./config');
	soap.dao = {};
	soap.dao.db = require('./dao/mongo');
	soap.dao.index = require('./dao/index.js');
	soap.hooks = {};
	soap.hooks.request = require('./hooks/request');

	app.use(express.static(path.join(__dirname,'static')));
	app.use(router);
	http.createServer(app).listen(soap.config.port,function(){
		console.log('soap start at 3000');
	});
