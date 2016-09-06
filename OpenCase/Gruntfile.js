module.exports = function(grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            basic_and_extras: {
				files: {
					'scripts/build/basic.js': ['scripts/libs/jquery.min.js','scripts/libs/*.js','scripts/main.js','scripts/settings.js','scripts/navigationMenu.js','scripts/localization.js'],
					
					'scripts/build/cases.js': ['scripts/cases2.js','scripts/skinNames.js','scripts/quality.js','scripts/prices.js','scripts/inventory.js','scripts/openCase.js','scripts/jackpotBots.js'],
				},
			}
        },
		uglify: {
			my_target: {
				files: [{
					expand: true,
					cwd: 'scripts/build',
					src: '*.js',
					dest: 'scripts/build/min'
				}]
			}
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'images/build/'
				}]
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			scripts: {
				files: ['scripts/*.js'],
				tasks: ['default'],
				options: {
					spawn: false,
				},
			}
		}

    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['concat', 'uglify']);

};