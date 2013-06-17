/*global module:false*/
module.exports = function (grunt) {
    'use strict';

    var pkgConfig = {
        stylesheets: 'static/stylesheets',
        scripts: 'static/scripts'
    };

    // configurable paths
    grunt.initConfig({
        pkg: pkgConfig,
        regarde: {
            js: {
                files: [
                    '<%= pkg.scripts %>/**/*.js',
                    '!<%= pkg.scripts %>/**/*-min.js'
                ],
                tasks: ['jshint', 'requirejs'],
                spawn: true
            },
            css: {
                files: '<%= pkg.stylesheets %>/**/*.less',
                tasks: ['less:development'],
                spawn: true
            }
        },
        clean: [
            '<%= pkg.scripts %>/*-min.js',
            '<%= pkg.stylesheets %>/*.css'
        ],
        jshint: {
            all: [
                'Gruntfile.js',
                '<%= pkg.scripts %>/{,*/}*.js',
                '!<%= pkg.scripts %>/lib/*'
            ]
        },
        less: {
            development: {
                options: {
                    paths: ['<%= pkg.stylesheets %>/less'],
                    dumpLineNumbers: 'comments'
                },
                files: {
                    '<%= pkg.stylesheets %>/styles.css': '<%= pkg.stylesheets %>/less/styles.less'
                }
            },
            production: {
                options: {
                    paths: ['<%= pkg.stylesheets %>/less'],
                    yuicompress: true
                },
                files: {
                    '<%= pkg.stylesheets %>/styles.css': '<%= pkg.stylesheets %>/less/styles.less'
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    name: 'app',
                    baseUrl: '<%= pkg.scripts %>',
                    mainConfigFile: '<%= pkg.scripts %>/app.js',
                    out: '<%= pkg.scripts %>/app-min.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-regarde');

    // Simply watch script which does a build on entry
    grunt.registerTask('watch', [
        'default',
        'regarde'
    ]);

    // Build for development purposes with linting
    grunt.registerTask('default', [
        'clean',
        // 'jshint',
        'less:development',
        'requirejs'
    ]);

    // Server build
    grunt.registerTask('server', [
        'clean',
        'less:production',
        'requirejs'
    ]);
};
