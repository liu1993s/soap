'use strict';
module.exports = function(grunt){
	var config = {
		app: 'app',
		res: 'app/res/'
	};
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	grunt.file.defaultEncoding = 'utf-8';
	grunt.initConfig({
		config: config,
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: '<%= config.app %>{,*/}*.{htm,html}'
			},
			uglify: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: '<%= config.res %>js/haso/app.js',
				tasks: ['uglify:dev']
			}
		},
		connect: {
			options: {
				port: 9000,
				hostname: 'localhost',
				livereload: 35729
			},
			server: {
				open: true,
				base: ['app']
			}
		},
		uglify: {
			options: {
				report: 'min',
				mangle: true,
				preserveComments: false,
				compress: {
					//drop_console: true
				}
			},
			init: {
				options: {
					sourceMap: true,
					sourceMapName: '<%= config.res %>js/haso.js.map'
				},
				files:{
					'<%= config.res %>js/haso.js': ['<%= config.res %>js/haso/*.js'],
					'<%= config.res %>js/haso.lib.js': [
						'<%= config.res %>js/angular/angular.js',
						'<%= config.res %>js/angular/angular-route.js',
						'<%= config.res %>js/angular/angular-resource.js'
					]
				}
			},
			dev: {
				files:{
					'<%= config.res %>js/haso.js': ['<%= config.res %>js/haso/*.js']
				}
			}
		}
	});

	grunt.registerTask('default',['connect','uglify:init','watch']);
};
