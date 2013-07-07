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
        watch: {
            livereload: {
                files: [
                    '<%= pkg.templates %>/*',
                    '<%= pkg.stylesheets %>}/less/{,*/}*.less',
                    '<%= pkg.scripts %>}/{,*/}*.js'
                ],
                tasks: ['livereload']
            }
        },
        regarde: {
            js: {
                files: ['<%= pkg.scripts %>/**/*.js', '!<%= pkg.scripts %>/**/*-min.js'],
                tasks: ['jshint', 'requirejs'],
                spawn: true
            },
            css: {
                files: '<%= pkg.stylesheets %>/**/*.less',
                tasks: ['less:development', 'autoprefixer:development'],
                spawn: true
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= pkg.port %>'
            }
        },
        clean: [
            '<%= pkg.scripts %>/*-min.js',
            '<%= pkg.stylesheets %>/*.css'
        ],
        jshint: {
            all: [
                'Gruntfile.js',
                '<%= pkg.app %>/scripts/{,*/}*.js',
                '!<%= pkg.app %>/scripts/lib/*'
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
        autoprefixer: {
            options: {
                browsers: ['last 3 versions', '> 1%', 'ie 8', 'ie 7']
            },
            development: {
                files: {
                    '<%= pkg.stylesheets %>/styles.css': '<%= pkg.stylesheets %>/styles.css'
                }
            },
            production: {
                files: {
                    '<%= pkg.stylesheets %>/styles.css': '<%= pkg.stylesheets %>/styles.css'
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
        },
        bower: {
            all: {
                rjsConfig: '<%= pkg.app %>/scripts/main.js'
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
    grunt.loadNpmTasks('grunt-autoprefixer');

    // Simply watch script which does a build on entry
    grunt.registerTask('watch', [
        'default',
        'regarde'
    ]);

    // Build for development purposes with linting
    grunt.registerTask('default', [
        'clean',
        'jshint',
        'less:development',
        'autoprefixer:development',
        'requirejs'
    ]);

    // Server build
    grunt.registerTask('server', [
        'clean',
        'less:production',
        'autoprefixer:production',
        'requirejs'
    ]);

};
