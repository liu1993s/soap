'use strict';
var livereload = document.createElement('script');
	livereload.src = '//' + (location.hostname || 'localhost') + ':35729/livereload.js?snipver=1';
	document.body.appendChild(livereload);
var soap = angular.module('soap',['ngRoute']);