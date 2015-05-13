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
				files: [
					'<%= config.app %>{,*/}*.{htm,html}',
					'<%= config.res %>{,*/}*.{js,css,png,jpg}'
				]
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
		}
	});

	grunt.registerTask('default',['connect:server','watch']);
};
