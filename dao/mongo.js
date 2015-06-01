'use strict';
var host = soap.config.database.host || 'localhost',
	port = soap.config.database.port || 27017,
	name = soap.config.database.name || 'soap',
	mongoskin = require('mongoskin');
module.exports = function(){
	return mongoskin.db('mongodb://' + host + ':' + port + '/' + name,{native_parser: true,auto_reconnect: true});
};