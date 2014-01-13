/**
 * Grunt configuration for front end deployment.
 *
 * The following tasks will generate development or production front end
 * ready code. This includes linting, compiling and minifying code. As a
 * standard `development` tasks will lint and compile (no minification) while
 * `production` tasks should compile and minify (no linting).
 *
 * @author jimmyhillis <jimmy@hatchd.com.au>
 * @author neilf <neil@hatchd.com.au>
 * @author janeyee <jane@hatchd.com.au>
 * @author jackarmley <jack@hatchd.com.au>
 */

module.exports = function (grunt) {
    'use strict';

    // Set root path (if you change this line you must also change the
    // project template to match).
    var root = 'static';

    // Task configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assets: {
            stylesheets: root+'/stylesheets',
            scripts: root+'/scripts',
            fonts: root+'/fonts',
            images: root+'/images'
        },
        eggbox: {
            iconSize: '16x16',
            iconColor: '000000',
            fallbacks: root+'/images/eggbox',
            root: root+'/libs/eggbox',
            icons: root+'/libs/eggbox/src',
            customIcons: root+'/custom-eggbox'
        },
        watch: {
            options:{
                atBegin:true
            },
            startup: {
                files: [],
                tasks: ['default'],
                spawn: true
            },
            js: {
                files: [
                    '<%= assets.scripts %>/**/*.js',
                    '!<%= assets.scripts %>/**/*min.js'
                ],
                tasks: ['jshint', 'requirejs'],
                spawn: true
            },
            eggbox: {
                files: '<%= eggbox.customIcons %>/**/*.svg',
                tasks: ['webfont','shell'],
                spawn: true
            },
            css: {
                files: '<%= assets.stylesheets %>/**/*.scss',
                tasks: ['compass:development', 'autoprefixer:development'],
                spawn: true
            }
        },
        clean: [
            '<%= assets.scripts %>/*.min.js',
            '<%= assets.stylesheets %>/*.css'
        ],
        // Eggbox webfont
        webfont: {
            production: {
                src: [
                    '<%= eggbox.icons %>/*.svg',
                    '<%= eggbox.customIcons %>/*.svg'],
                dest: '<%= assets.fonts %>/eggbox',
                htmlDemo : true,
                destCss: '<%= assets.stylesheets %>/sass/reusable-components/',
                options: {
                    hashes: false,
                    font: 'eggbox',
                    icon: 'eggbox',
                    relativeFontPath: '../fonts/eggbox',
                    template: '<%= eggbox.root %>/templates/eggbox.css',
                    htmlDemoTemplate: '<%= eggbox.root %>/templates/your-eggbox.html',
                    destHtml: '<%= assets.fonts %>/eggbox',
                    stylesheet: 'scss'
                }
            }
        },
        // Eggbox image fallbacks
        shell: {
            build_icons: {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: [
                  'mkdir -p <%= eggbox.fallbacks %>',
                  'python <%= eggbox.root %>/svg2png.py -c <%= eggbox.iconColor %> -o <%= eggbox.fallbacks %> -s <%= eggbox.iconSize %> <%= eggbox.icons %>'
                ].join(' && ')
            }
        },
        // Stylesheets
        compass: {
            development: {
                options: {
                    sassDir: '<%= assets.stylesheets %>/sass',
                    cssDir: '<%= assets.stylesheets %>',
                    specify: '<%= assets.stylesheets %>/sass/styles.scss',
                    assetCacheBuster: true,
                    outputStyle: 'expanded',
                    debugInfo: true
                },
                files: {
                    '<%= assets.stylesheets %>/styles.css': '<%= assets.stylesheets %>/sass/styles.scss'
                }
            },
            production: {
                options: {
                    sassDir: '<%= assets.stylesheets %>/sass',
                    cssDir: '<%= assets.stylesheets %>',
                    specify: '<%= assets.stylesheets %>/sass/styles.scss',
                    assetCacheBuster: true,
                    outputStyle: 'compressed',
                    debugInfo: false
                },
                files: {
                    '<%= assets.stylesheets %>/styles.css': '<%= assets.stylesheets %>/less/styles.scss'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 3 versions', '> 1%', 'ie 8', 'ie 7']
            },
            development: {
                files: {
                    '<%= assets.stylesheets %>/styles.css': '<%= assets.stylesheets %>/styles.css'
                }
            },
            production: {
                files: {
                    '<%= assets.stylesheets %>/styles.css': '<%= assets.stylesheets %>/styles.css'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    '<%= assets.stylesheets %>/styles.css': '<%= assets.stylesheets %>/styles.css'
                }
            }
        },
        // Javascript
        jshint: {
            all: [
                'Gruntfile.js',
                '<%= assets.scripts %>/{,*/}*.js',
                '!<%= assets.scripts %>/{,*/}*.min.js'
            ]
        },
        requirejs: {
            compile: {
                options: {
                    name: 'app',
                    baseUrl: '<%= assets.scripts %>',
                    mainConfigFile: '<%= assets.scripts %>/app.js',
                    out: '<%= assets.scripts %>/app.min.js'
                }
            }
        },
        modernizr: {
            devFile: 'remote',
            outputFile: '<%= assets.scripts %>/../libs/modernizr/modernizr.min.js',
            extra: {
                'shiv': true,
                'load': false,
                'cssclasses': true
            },
            uglify: true,
            parseFiles: true,
            files: [
                '<%= assets.stylesheets %>/styles.css',
                '<%= assets.scripts %>/app.min.js'
            ]
        }
    });

    // Required tasks

    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-webfont');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-modernizr');
    grunt.loadNpmTasks('grunt-shell');

    // Build for development purposes with linting
    grunt.registerTask('default', [
        'clean',
        'shell',
        'webfont',
        'compass:development',
        'autoprefixer:development',
        'jshint',
        'requirejs',
        'modernizr'
    ]);

    // Server build
    grunt.registerTask('server', [
        'clean',
        'shell',
        'webfont',
        'compass:production',
        'autoprefixer:production',
        'cssmin',
        'requirejs'
    ]);

};
