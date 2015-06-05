/**
 * Grunt configuration for front end deployment.
 *
 * The following tasks will generate development or production front end
 * ready code. This includes linting, compiling and minifying code. As a
 * standard `development` tasks will lint and compile (no minification) while
 * `production` tasks should compile and minify (no linting).
 *
 * @author jackarmley <jack@hatchd.com.au>
 * @author douglinder <doug@hatchd.com.au>
 * @author janeyee <jane@hatchd.com.au>
 * @author neilf <neil@hatchd.com.au>
 * @author danmurray <dan@hatchd.com.au>
 */

var ext = require('./.gruntExt');
module.exports = function (grunt) {
    'use strict';

    // Set root path (if you change this line you must also change the
    // project template to match).
    var root = 'static';

    // Configuration
    var config = {
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %>: version <%= pkg.version %>\n' +
            '* Built on: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* Author: <%= pkg.author %>\n' +
            '* http://<%= pkg.homepage %>\n' +
            '* <%= pkg.description %>\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> */',
        assets: {
            stylesheets: root + '/stylesheets',
            scripts: root + '/scripts',
            fonts: root + '/fonts',
            images: root + '/images',
            templates: root + '/html',
            docs: root + '/docs'
        },
        eggbox: {
            root: root + '/libs/eggbox',
            icons: root + '/libs/eggbox/src',
            iconTmp: root + '/libs/eggbox/tmp',
            customIcons: root + '/custom-eggbox'
        }
    };
    ext.configure(config);

    // Common tasks
    ext.configure({
        watcher: {
            options: {
                atBegin: true
            },
            startup: {
                files: [],
                tasks: ['default'],
                spawn: true
            },
            js: {
                files: [
                    '<%= assets.scripts %>/**/*.js',
                    '!<%= assets.scripts %>/**/*.min.js',
                    '!<%= assets.scripts %>/**/*-min.js'
                ],
                tasks: [
                    'jshint',
                    'requirejs'
                ],
                spawn: true
            },
            css: {
                files: '<%= assets.stylesheets %>/**/*.scss',
                tasks: [
                    'sass:development',
                    'modernizr:dist',
                    'autoprefixer',
                    'cmq'
                ],
                spawn: true
            },
            templates: {
                files: [
                    '<%= assets.templates %>/**/*.jade'
                ],
                tasks: [
                    'jade:dist'
                ],
                spawn: true
            }
        },
        clean: {
            dist: {
                source: [
                    '<%= assets.email_public %>/*',
                    '<%= assets.scripts %>/*.min.js',
                    '<%= assets.stylesheets %>/*.css'
                ]
            }
        }
    });

    // Eggbox webfont
    ext.configure({
        webfont: {
            production: {
                src: [
                    '<%= eggbox.icons %>/*.svg',
                    '<%= eggbox.customIcons %>/*.svg'],
                dest: '<%= assets.fonts %>/eggbox',
                htmlDemo: true,
                destCss: '<%= assets.stylesheets %>/sass/utils/',
                options: {
                    hashes: false,
                    font: 'eggbox',
                    icon: 'eggbox',
                    relativeFontPath: '../fonts/eggbox',
                    template: '<%= eggbox.root %>/templates/eggbox.css',
                    htmlDemoTemplate: '<%= eggbox.root %>/templates/your-eggbox.html',
                    destHtml: '<%= assets.fonts %>/eggbox',
                    stylesheet: 'scss',
                    templateOptions: {
                        baseClass: 'eggbox',
                        classPrefix: 'eggbox-',
                        mixinPrefix: 'eggbox-'
                    }
                }
            }
        }
    });

    // Jade
    ext.configure({
        jade: {
            dist: {
                options: {
                    pretty: true,
                    data: function(dest, src) {
                        // dot slash at the beginning, as require **ahem** requires
                        // a dot slash at the beginning of the path.
                        return require('./' + config.assets.templates + '/jade/locals.json');
                    }
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= assets.templates %>/jade/',
                        src: '*.jade',
                        dest: '<%= assets.templates %>',
                        ext: '.html',
                        extDot: 'last'
                    },
                ],
            }
        }
    });

    // Stylesheets
    ext.configure({
        sass: {
            development: {
                options: {
                    style: 'expanded',
                    debugInfo: false,
                    noCache: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= assets.stylesheets %>/sass/',
                        src: '*.scss',
                        dest: '<%= assets.stylesheets %>',
                        ext: '.css',
                        extDot: 'last'
                    },
                ]
            },
            production: {
                options: {
                    style: 'compressed',
                    debugInfo: false,
                    noCache: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= assets.stylesheets %>/sass/',
                        src: '*.scss',
                        dest: '<%= assets.stylesheets %>',
                        ext: '.css',
                        extDot: 'last'
                    },
                ]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 3 versions', '> 1%', 'ie 8']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= assets.stylesheets %>/',
                        src: '*.css',
                        dest: '<%= assets.stylesheets %>',
                        ext: '.css',
                        extDot: 'last'
                    },
                ]
            }
        },
        cmq: {
            combine: {
                options: {
                    log: false
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= assets.stylesheets %>/',
                        src: '*.css',
                        dest: '<%= assets.stylesheets %>',
                        ext: '.css',
                        extDot: 'last'
                    },
                ]
            }
        },
        cssmin: {
            combine: {
                options: {
                    banner: '<%= banner %>'
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= assets.stylesheets %>/',
                        src: '*.css',
                        dest: '<%= assets.stylesheets %>',
                        ext: '.css',
                        extDot: 'last'
                    },
                ]
            }
        }
    });

    // SASS docs
    ext.configure({
        sassdoc: {
            default: {
                src: '<%= assets.stylesheets %>/sass/',
                options: {
                    dest: '<%= assets.docs %>'
                },
            }
        }
    });

    // Javascript
    ext.configure({
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
            dist: {
                devFile: 'remote',
                outputFile: '<%= assets.scripts %>/../libs/modernizr/modernizr.min.js',
                extra: {
                    'shiv': true,
                    'load': false,
                    'cssclasses': true
                },
                uglify: true,
                parseFiles: true,
                files: {
                    src: [
                        '<%= assets.stylesheets %>/*.css',
                        '<%= assets.scripts %>/app.min.js'
                    ]
                }
            }
        }
    });

    // Image minification
    ext.configure({
        imagemin: {
            production: {
                options: {
                    optimizationLevel: 7
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= assets.images %>',
                        src: [
                            '**/*.{png,jpg,gif}'
                        ],
                        dest: '<%= assets.images %>'
                    }
                ]
            }
        },
        svgmin: {
            options: {
                plugins: [
                    {
                        removeViewBox: false
                    }, {
                        removeUselessStrokeAndFill: false
                    }
                ]
            },
            dist: {
                files: {
                    '<%= assets.images %>/image.svg': '<%= assets.images %>/image.svg'
                }
            }
        }
    });

    // Local dev
    ext.configure({
        connect: {
            dev: {
                options: {
                    port: 3000,
                    base: 'static',
                }
            }
        }
    });
    ext.registerTask('watch', ['connect', 'watcher'], 'watch', 'watcher');

    // build icon set
    ext.registerTask('eggbox', [
        'webfont'
    ]);

    // Build for development purposes with linting
    ext.registerTask('default', [
        'clean',
        'webfont',
        'sass:development',
        'jade:dist',
        'autoprefixer',
        'cmq:combine',
        'jshint',
        'requirejs',
        'modernizr:dist',
        'sassdoc:default'
    ]);

    // Server build
    ext.registerTask('server', [
        'clean',
        'webfont',
        'sass:production',
        'jade:dist',
        'autoprefixer',
        'cmq:combine',
        'cssmin',
        'requirejs',
        'modernizr:dist',
        'imagemin:production',
        'svgmin:dist'
    ]);

    // Load grunt configuration
    ext.initConfig(grunt);
};
