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
 * @author douglinder <doug@hatchd.com.au>
 */

module.exports = function (grunt) {
    'use strict';

    // Set root path (if you change this line you must also change the
    // project template to match).
    var root = 'static';

    // Task configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %>: version <%= pkg.version %>\n' +
                '* Built on: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '* Author: <%= pkg.author %>\n' +
                '* http://<%= pkg.homepage %>\n' +
                '* <%= pkg.description %>\n' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> */',
        assets: {
            stylesheets: root+'/stylesheets',
            scripts: root+'/scripts',
            fonts: root+'/fonts',
            images: root+'/images',
            email_source: root+'/../emails',
            email_public: root+'/email'
        },
        eggbox: {
            colors: {
                black: '000000',
                white: 'ffffff'
            },
            sizes: {
                default: '16x16'
            },
            fallbacks: root+'/images/eggbox',
            root: root+'/libs/eggbox',
            icons: root+'/libs/eggbox/src',
            iconTmp: root+'/libs/eggbox/tmp',
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
            }
            // email: {
            //     files: '<%= assets.email_source %>/**/*',
            //     tasks: [
            //         'shell:build_email'
            //     ],
            //     spawn: true
            // },
        },
        clean: {
            dist: {
                source:[
                    '<%= assets.email_public %>/*',
                    '<%= assets.scripts %>/*.min.js',
                    '<%= assets.stylesheets %>/*.css'
                ]
            }
        },
        // Eggbox webfont
        webfont: {
            production: {
                src: [
                    '<%= eggbox.icons %>/*.svg',
                    '<%= eggbox.customIcons %>/*.svg'],
                dest: '<%= assets.fonts %>/eggbox',
                htmlDemo : true,
                destCss: '<%= assets.stylesheets %>/sass/mixins/',
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
                  'python <%= eggbox.root %>/svg2png.py -c <%= eggbox.colors.white %> -o <%= eggbox.fallbacks %> -s <%= eggbox.sizes.default %> <%= eggbox.icons %>'
                ].join(' && ')
            },
            build_email: {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: [
                    'mkdir -p <%= assets.email_public %>',
                    'grunt --gruntfile <%= assets.email_source %>/Gruntfile.js',
                    'cp -Rf <%= assets.email_source %>/images/ <%= assets.email_public %>/images/',
                    'cp <%= assets.email_source %>/stylesheets/styles.css <%= assets.email_public %>/styles.css'
                ].join(' && ')
            }
        },
        // Stylesheets
        sass: {
            development: {
                options: {
                    style: 'expanded',
                    debugInfo: false,
                    sourcemap: true,
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
                    sourcemap: false,
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
                browsers: ['last 3 versions', '> 1%', 'ie 8', 'ie 7']
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
        },
        imagemin: {
            production: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: '<%= assets.images %>',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= assets.images %>'
                }]
            }
        }
    });

    // Required tasks
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-webfont');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-modernizr');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-combine-media-queries');


    // build icon set
    grunt.registerTask('eggbox', [
        'webfont',
        'shell:build_icons'
    ]);

    // Build for development purposes with linting
    grunt.registerTask('default', [
        'clean',
        'shell:build_icons',
        //'shell:build_email',
        'webfont',
        'sass:development',
        'autoprefixer',
        'cmq:combine',
        'jshint',
        'requirejs',
        'modernizr:dist'
    ]);

    // Server build
    grunt.registerTask('server', [
        'clean',
        'shell:build_icons',
        //'shell:build_email',
        'webfont',
        'sass:production',
        'autoprefixer',
        'cmq:combine',
        'cssmin',
        'requirejs',
        'modernizr:dist',
        'imagemin:production'
    ]);

};
