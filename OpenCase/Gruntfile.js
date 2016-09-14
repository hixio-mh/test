const webpack = require('webpack');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            basic_and_extras: {
                files: {
                    'scripts/build/libs.js': ['scripts/libs/jquery.min.js', 'scripts/libs/*.js'],
                    //'scripts/build/basic.js': ['scripts/libs/jquery.min.js', 'scripts/libs/*.js', 'scripts/main.js', 'scripts/settings.js', 'scripts/navigationMenu.js', 'scripts/localization.js'],

                    //'scripts/build/cases.js': ['scripts/cases2.js', 'scripts/skinNames.js', 'scripts/quality.js', 'scripts/prices.js', 'scripts/inventory.js', 'scripts/openCase.js', 'scripts/jackpotBots.js'],
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
        },
        webpack: {
            settings: {
                entry: {
                    spinking: './scripts/spinking'
                },
                output: {
                    path: __dirname + '/scripts/build',
                    filename: '[name].js',
                    library: '[name]'
                },
                watch: true,
                watchOptions: {
                    aggregateTimeout: 300
                },
                keepalive: true,
                devtool: "source-map",
                module: {
                    loaders: [{
                        test: /\.js$/,
                        loader: 'babel',
                        query: {
                            presets: ['es2015']
                        }
                    }]
                },
                plugins: [
                    new webpack.NoErrorsPlugin(),
                    /*new webpack.optimize.UglifyJsPlugin({
                    	compress: {
                    		warnings: 		false,
                    		drop_console:	true,
                    		unsafe:			true
                    	}
                    }),*/
                    new webpack.optimize.CommonsChunkPlugin({
                        name: 'common',
                        minChunks: 3
                    })
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('babel-loader');
    grunt.loadNpmTasks('babel-core');
    grunt.loadNpmTasks('babel-preset-es2015');

    grunt.registerTask('default', ['concat', 'webpack']);
    // grunt.registerTask('default', ['concat', 'uglify']);

};
