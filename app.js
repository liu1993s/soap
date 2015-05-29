'use strict';
var path = require('path'),
	http = require('http'),
	https = require('https'),
	router = require('./router'),
	config = require('./config'),
	express = require('express'),
	app = express();
	global.soap = {
		config: config,
		hooks: {
			request: require('./hooks/request')
		}
	};
	app.use(express.static(path.join(__dirname,'static')));
	app.use(router);

	http.createServer(app).listen(soap.config.port,function(){
		console.log('soap start at 3000');
	});