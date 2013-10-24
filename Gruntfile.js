/*global module:false*/
module.exports = function (grunt) {
    'use strict';

    var pkgConfig = {
        stylesheets: 'static/stylesheets',
        scripts: 'static/scripts',
        fonts: 'static/fonts',
        eggboxicons: 'static/libs/eggbox',
        custom_eggboxicons: 'static/custom-eggbox'
    };

    // configurable paths
    grunt.initConfig({
        pkg: pkgConfig,
        watch: {
            livereload: {
                files: [
                    '<%= pkg.templates %>/*',
                    '<%= pkg.stylesheets %>}/less/{,*/}*.less',
                    '<%= pkg.scripts %>}/{,*/}*.js',
                    '<%= pkg.custom_eggboxicons %>}/{,*/}*.svg'
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
            },
            eggbox: {
                files: '<%= pkg.custom_eggboxicons %>/**/*.svg',
                tasks: ['webfont:default'],
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
                    dumpLineNumbers: 'comments',
                    strictMath: true
                },
                files: {
                    '<%= pkg.stylesheets %>/styles.css': '<%= pkg.stylesheets %>/less/styles.less'
                }
            },
            production: {
                options: {
                    paths: ['<%= pkg.stylesheets %>/less'],
                    yuicompress: true,
                    strictMath: true
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
        webfont: {
            default: {
                src: [
                    '<%= pkg.eggboxicons %>/src/*.svg',
                    '<%= pkg.custom_eggboxicons %>/*.svg'],
                dest: '<%= pkg.fonts %>/eggbox',
                htmlDemo : true,
                destCss: '<%= pkg.stylesheets %>/less/reusable-components/',
                options: {
                    hashes: false,
                    font: 'eggbox',
                    icon: 'eggbox',
                    relativeFontPath: '../../fonts/eggbox',
                    template: '<%= pkg.eggboxicons %>/templates/eggbox.css',
                    htmlDemoTemplate: '<%= pkg.eggboxicons %>/templates/your-eggbox.html',
                    destHtml: '<%= pkg.fonts %>/eggbox',
                    stylesheet: 'less'
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
    grunt.loadNpmTasks('grunt-webfont');

    // Simply watch script which does a build on entry
    grunt.registerTask('watch', [
        'default',
        'regarde'
    ]);

    // Build for development purposes with linting
    grunt.registerTask('default', [
        'clean',
        'jshint',
        'webfont:default',
        'less:development',
        'autoprefixer:development',
        'requirejs'
    ]);

    // Server build
    grunt.registerTask('server', [
        'clean',
        'webfont:default',
        'less:production',
        'autoprefixer:production',
        'requirejs'
    ]);

};
