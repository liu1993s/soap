module.exports = function(grunt){
	require('load-grunt-tasks')(grunt);
	grunt.file.defaultEncoding = 'utf-8';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: {
			static: 'static/'
		},
		watch: {
			options: {
				livereload: true
			},
			html: {
				files: ['<%= config.static %>{,**/}*.{htm,html}','<%= config.static %>template/{,**/}*.{htm,html}']
			},
			js: {
				files: ['<%= config.static %>js/{,**/}*.js']
			},
			sass: {
				files: ['<%= config.static %>sass/{,**/}*.{scss,sass}'],
				tasks: ['sass:build']
			},
			express: {
				files: ['{,**/}*.js'],
				tasks: ['express:build'],
				options: {
					spawn: false
				}
			}
		},
		sass: {
			build: {
				options: {
					style: 'compressed',
					sourcemap: 'auto',
					cacheLocation: '<%= config.static %>sass/.sass-cache'
				},
				files: {
					'<%= config.static %>css/soap.css': '<%= config.static %>sass/soap.scss',
					'<%= config.static %>css/admin.css': '<%= config.static %>sass/admin.scss'
				}
			}
		},
		express: {
			options: {},
			build: {
				options:{
					script: 'app.js'
				}
			}
		}
	});
	grunt.registerTask('default',[
		'sass:build',
		'express:build',
		'watch'
	]);
};