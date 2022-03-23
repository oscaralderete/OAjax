const author = {
	name: 'Oscar Alderete',
	email: 'me@oscaralderete.com',
	website: 'https://oscaralderete.com',
	ide_version: '12.5'
};
author.banner = '/*!\n@author:' + +' <' + author.email + '>\n@website: ' + author.website + '\n@editor:NetBeans IDE v' + author.ide_version + '\n*/';


module.exports = (grunt) => {
	// project configuration.
	grunt.initConfig({
		// babel to deal with all JS files
		babel: {
			options: {
				sourceMap: false,
				presets: ['@babel/preset-env'],
				minified: true,
				comments: false
			},
			dist: {
				files: {
					'js/OAjax.js': '_src/js/OAjax.js',
					'js/scripts.js': '_src/js/scripts.js',
				}
			}
		},

		// string replace to add my credits
		'string-replace': {
			dist: {
				files: {
					'js/OAjax.js': 'js/OAjax.js',
					'js/scripts.js': 'js/scripts.js',
				},
				options: {
					replacements: [
						{
							pattern: '"use strict"',
							replacement:  author.banner + '"use strict"'
						},
					]
				}
			}
		},

		// I'm running in terminal 'grunt watch'
		watch: {
			scripts: {
				files: [
					'_src/js/*.*'
				],
				tasks: ['babel', 'string-replace']
			}
		}
	});



	// load the plugins
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//task
	grunt.registerTask('default', []);
};