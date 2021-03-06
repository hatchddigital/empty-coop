// ----------------------------------------------------------------------------
// GULP USAGE
// ----------------------------------------------------------------------------

/*

gulp watch
----------------------
the one to use for development. This will minify images, compile sass and js and
launch a browsersync server on port specified using the given proxy dev url set in
the config below. For browsersync to work with  ploneyou will need to update this
url to point to your dev site.

gulp build
----------------------
the one to use for staging and live builds. this does the same as watch but it
also runs a clean task to delete any old css, js and images. it also wont
attempt to launch a browsersync server and will minify all js and css.

*/

// ----------------------------------------------------------------------------
// LINTING JS
// ----------------------------------------------------------------------------

/*

Here are some plugins that will make it easier to pass the js linting.
they help with the linting but they cannot fix every error.
NOTE: you may need to install ESLint globally using npm install -g eslint
----------------------

VSCODE
----------------------
install this plugin -> https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
go to "code" -> "prefrences" -> "user settings" then chnge the option
"eslint.autoFixOnSave" (under the heading ESLint) to true

SUBLIME
----------------------
install this plugin -> https://github.com/TheSavior/ESLint-Formatter
go to "sublime text" -> "prefrences" -> "package settings" -> "eslint formatter" -> "user settings"
and past in the following option...
{"format_on_save": true}

*/

// ----------------------------------------------------------------------------
// LINTING SASS
// ----------------------------------------------------------------------------

/*

Here are some plugins that will make it easier to pass the sass linting.
they help with the linting but they cannot fix every error.
NOTE: you may need to install sass-lint globally using npm install -g sass-lint
----------------------

VSCODE
----------------------
install this plugin -> https://marketplace.visualstudio.com/items?itemName=glen-84.sass-lint
go to "code" -> "prefrences" -> "user settings" then chnge the option
"eslint.autoFixOnSave" (under the heading ESLint) to true

SUBLIME
----------------------
install this plugin -> https://github.com/skovhus/SublimeLinter-contrib-sass-lint
You will need SublimeLinter to be installed first.

*/

// ----------------------------------------------------------------------------
// TODOS AND NOTES
// ----------------------------------------------------------------------------

// @TODO: way to load css and images from npm modules

// ----------------------------------------------------------------------------
// USE STRICT MODE
// ----------------------------------------------------------------------------

'use strict'; // eslint-disable-line

// ----------------------------------------------------------------------------
// THE GULP config
// ----------------------------------------------------------------------------

const defaultConfig = {
    proxyurl: false, // the url of the site on your machine (only use if proxying a current server)
    src: 'static/src',
    build: 'static/build',
    port: 1982,
    // the paths to the relevant files
    paths: {
        // styles
        get scss() { return `${config.src}/sass`; },
        get css() { return `${config.build}/styles`; },
        // images
        get images_orig() { return `${config.src}/images`; },
        get images_min() { return `${config.build}/images`; },
        // scripts
        get js_dev() { return `${config.src}/scripts`; },
        get js_prod() { return `${config.build}/scripts`; },
        // external libs
        get libs_dev() { return `${config.src}/external-libs`; },
        get libs_prod() { return `${config.build}/external-libs`; },
        // html templates
        get pug_templates() { return `${config.src}/pug-templates`; },
        get html_templates() { return `${config.build}/`; },
        // fonts
        get fonts_dev() { return `${config.src}/fonts`; },
        get fonts_prod() { return `${config.build}/fonts`; },
        // meta data / icons
        get meta_dev() { return `${config.src}/meta`; },
        get meta_prod() { return `${config.build}/meta`; },
        // svgs
        get svgs_dev() { return `${config.src}/svgs`; },
        get svgs_prod() { return `${config.build}/svgs`; },
        // where to look for the plone template files
        plone_templates: './',
    },
};

// Override with values from config.json
const overrideConfig = require('./config.json');
const config = Object.assign(defaultConfig, overrideConfig)


// ----------------------------------------------------------------------------
// LOAD UP ALL THE PLUGINS
// ----------------------------------------------------------------------------

let gulp = require('gulp'),
    // helpers
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    del = require('del'),
    data = require('gulp-data'),
    path = require('path'),
    count = require('gulp-count'),
    os = require('os'),
    addsrc = require('gulp-add-src'),
    // css plugins
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    postcss = require('gulp-postcss'),
    contrast = require('postcss-high-contrast'),
    stylelint = require('gulp-stylelint'),
    // images
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    rsp = require('remove-svg-properties').stream,
    svgsprite = require('gulp-svg-sprite'),
    // js plugins
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify'),
    modernizr = require('gulp-modernizr'),
    eslint = require('gulp-eslint'),
    // html plugins
    pug = require('gulp-pug'),
    // workbox for offline caching
    wbBuild = require('workbox-build'),
    // live reload stuff
    browserSync = require('browser-sync').create('server'),
    reload = browserSync.reload;

// ----------------------------------------------------------------------------
// THE PLUMBER ERROR HANDLER
// ----------------------------------------------------------------------------

const plumberErrorHandler = {
    errorHandler: notify.onError({
        title: 'Gulp',
        message: 'Error: <%= error.message %>',
    }),
};

// ----------------------------------------------------------------------------
// BROWSER-SYNC TASK FOR STARTING A SERVER
// ----------------------------------------------------------------------------

gulp.task('browser-sync', () => {
    // watch files
    const files = [
        `${config.paths.css}**/*.css`,
        `${config.paths.js}**/*.js`,
        `${config.paths.plone_templates}**/*.pt`,
        `${config.paths.html_templates}**/*.html`,
    ];
    if (config.proxyurl) {
        // initialize browsersync
        browserSync.init(files, {
            // browsersync with a proxy server
            port: config.port,
            proxy: config.proxyurl,
        });
    } else {
        // initialize browsersync
        browserSync.init(files, {
            port: config.port,
            server: {
                baseDir: config.build,
            },
        });
    }
});

// ----------------------------------------------------------------------------
// THE STYLES TASKS
// ----------------------------------------------------------------------------

// config for linter can be found in the .sass-lint.yml file
gulp.task('styles-lint', () => gulp.src(`${config.paths.scss}/**/*.scss`)
    .pipe(plumber(plumberErrorHandler))
    .pipe(stylelint({
        reporters: [
            {
                formatter: 'string',
                console: true,
                // failAfterError: false,
            },
        ],
    })));

gulp.task('styles-highcontrast', () => gulp.src(`${config.paths.css}/styles.css`)
    .pipe(plumber(plumberErrorHandler))
    .pipe(postcss([contrast({
        // elements to change
        aggressiveHC: true,
        aggressiveHCDefaultSelectorList: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'th', 'td'],
        aggressiveHCCustomSelectorList: ['div', 'span', 'a', 'button'],
        // background and text
        backgroundColor: '#fff',
        textColor: '#000',
        // links
        linkColor: '#204DCB',
        linkHoverColor: '#153489',
        linkHoverBgColor: '#fff',
        // buttons
        buttonSelector: ['button', '.button', '.btn', 'input[type=submit]'],
        buttonColor: '#fff',
        buttonBackgroundColor: '#000',
        buttonBorderColor: '#000',
        // images
        // imageFilter: 'invert(100%) grayscale(100%) contrast(200%)',
        imageFilter: 'grayscale(100%) contrast(200%)',
        imageSelectors: ['img', 'svg'],
        // other settings
        borderColor: '#000',
        disableShadow: true,
        removeCSSProps: false,
        CSSPropsWhiteList: ['background', 'background-color', 'color', 'border', 'border-top', 'border-bottom',
            'border-left', 'border-right', 'border-color', 'border-top-color', 'border-right-color',
            'border-bottom-color', 'border-left-color', 'box-shadow', 'filter', 'text-shadow'],
    })]))
    .pipe(addsrc(`${config.paths.css}/highcontrast-custom.css`))
    .pipe(concat('styles-highcontrast.css'))
    .pipe(postcss([
        cssnano(),
    ]))
    .pipe(gulp.dest(config.paths.css))
    .pipe(reload({ stream: true }))
    .pipe(notify({ message: 'Styles high contrast task complete' })));

gulp.task('styles-dev', ['styles-lint'], () => gulp.src(`${config.paths.scss}/**/*.scss`)
    .pipe(plumber(plumberErrorHandler))
    .pipe(sourcemaps.init())
    .pipe(sass({ errLogToConsole: true }))
    .pipe(postcss([
        autoprefixer(),
    ]))
    .pipe(sourcemaps.write())
    .pipe(rename({ dirname: '' }))
    .pipe(gulp.dest(config.paths.css))
    .pipe(reload({ stream: true }))
    .pipe(notify({ message: 'Styles dev task complete' })));

gulp.task('styles-build', () => gulp.src(`${config.paths.scss}/**/*.scss`)
    .pipe(plumber(plumberErrorHandler))
    .pipe(sass({ errLogToConsole: true }))
    .pipe(postcss([
        autoprefixer(),
        cssnano(),
    ]))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(config.paths.css))
    .pipe(reload({ stream: true }))
    .pipe(notify({ message: 'Styles build task complete' })));

// ----------------------------------------------------------------------------
// THE SCRIPTS TASK
// ----------------------------------------------------------------------------

// config for linter can be found in the .eslintrc file
gulp.task('scripts-lint', () => gulp.src(`${config.paths.js_dev}/**/*`)
    .pipe(plumber(plumberErrorHandler))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError()));

gulp.task('scripts-dev', ['scripts-lint'], () => browserify(`${config.paths.js_dev}/app.js`, { debug: true })
    .transform('babelify', { presets: ['env'] })
    .bundle()
    .on('error', plumberErrorHandler.errorHandler)
    .pipe(plumber(plumberErrorHandler))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest(config.paths.js_prod))
    .pipe(reload({ stream: true }))
    .pipe(notify({ message: 'Scripts task complete' })));

gulp.task('scripts-build', () => browserify(`${config.paths.js_dev}/app.js`, { debug: false })
    .transform('babelify', { presets: ['env'] })
    .bundle()
    .on('error', plumberErrorHandler.errorHandler)
    .pipe(plumber(plumberErrorHandler))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.js_prod))
    .pipe(reload({ stream: true }))
    .pipe(notify({ message: 'Scripts task complete' })));

// ----------------------------------------------------------------------------
// THE LIBS TASK
// ----------------------------------------------------------------------------

gulp.task('libs-dev', () => gulp.src(`${config.paths.libs_dev}/**/*`)
    .pipe(plumber(plumberErrorHandler))
    .pipe(gulp.dest(config.paths.libs_prod))
    .pipe(reload({ stream: true }))
    .pipe(notify({ message: 'Libs task complete' })));

gulp.task('libs-build', () => gulp.src(`${config.paths.libs_dev}/**/*`)
    .pipe(plumber(plumberErrorHandler))
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.libs_prod))
    .pipe(reload({ stream: true }))
    .pipe(notify({ message: 'Libs task complete' })));

// ----------------------------------------------------------------------------
// THE IMAGES TASK
// ----------------------------------------------------------------------------

gulp.task('images', () => gulp.src(`${config.paths.images_orig}/**/*`)
    .pipe(plumber(plumberErrorHandler))
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(config.paths.images_min))
    .pipe(notify({ message: 'Images task complete' })));


// ----------------------------------------------------------------------------
// THE META TASK
// ----------------------------------------------------------------------------

gulp.task('meta', () => gulp.src(`${config.paths.meta_dev}/**/*`)
    .pipe(plumber(plumberErrorHandler))
    .pipe(gulp.dest(config.paths.meta_prod))
    .pipe(notify({ message: 'Meta task complete' })));

// ----------------------------------------------------------------------------
// THE TEMPLATES TASK
// ----------------------------------------------------------------------------

gulp.task('templates', () => {
    // get the options
    const locals = require(`./${config.paths.pug_templates}/locals.json`);

    // get the ip address (see here -> http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js)
    const ifaces = os.networkInterfaces();
    let ip = '0.0.0.0';
    Object.keys(ifaces).forEach((ifname) => {
        ifaces[ifname].forEach((iface) => {
            if (iface.family !== 'IPv4' || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
            ip = iface.address;
        });
    });

    // log the files to process and the files processed
    let fileNo = -1; // -1 due to count() logging again once finished and increasing the count by 1
    let filesProcessed = 0;

    // loop the pug templates
    return gulp.src(`${config.paths.pug_templates}/templates/**/*.pug`)
        .pipe(plumber(plumberErrorHandler))
        .pipe(count({
            logFiles: true,
            logEmpty: false,
            logger() { fileNo += 1; },
        }))
        .pipe(data((file) => {
            // grab the locals and clone
            const info = JSON.parse(JSON.stringify(locals));

            // grab the file details
            const fileName = path.basename(file.path).replace('.pug', '');

            // dont process master
            if (fileName !== 'master') {
                let dirName = path.dirname(file.path).split('/').pop().replace('pug-templates/templates', '');
                const uri = path.dirname(file.path).replace(`${config.paths.pug_templates}/templates`, '').replace(process.cwd(), '').replace('//', '/');
                let section = uri.split('/')[1];

                // set the destination to be a dir with the same name as the file
                let dest = file.path
                    .replace(`${config.paths.pug_templates}/templates`, config.build)
                    .replace(`/${fileName}.pug`, '')
                ;

                // if homepage
                if (fileName === 'index') {
                    dest = config.paths.html_templates;
                    section = 'index';
                    dirName = '';
                }

                // pass the vars to the template
                info.template = `${fileName}-template`;
                info.fileName = `${fileName}.html`;
                info.dirName = dirName;
                info.section = `${section}-section`;
                info.uri = uri;
                info.basePath = `http://${ip}:${config.port}`;

                // convert to html from pug
                const stream = gulp.src(file.path)
                    .pipe(plumber(plumberErrorHandler))
                    .pipe(pug({
                        locals: info,
                        pretty: true,
                    }))
                    .pipe(rename('index.html'))
                    .pipe(gulp.dest(dest));

                // on completion of processing file
                stream.on('finish', () => {
                    filesProcessed += 1;
                    if (fileNo === filesProcessed) {
                        gulp.src(dest)
                            .pipe(reload({ stream: true }))
                            .pipe(notify({ message: 'Templates task complete' }));
                    }
                });
            } else {
                filesProcessed += 1;
            }
        }));
});

// ----------------------------------------------------------------------------
// THE SVG TASK
// ----------------------------------------------------------------------------

gulp.task('svgs', () => gulp.src(`${config.paths.svgs_dev}/icons/**/*.svg`)
    .pipe(plumber(plumberErrorHandler))
    .pipe(rsp.remove({
        properties: [rsp.PROPS_FILL, rsp.PROPS_STROKE],
    }))
    .pipe(addsrc(`${config.paths.svgs_dev}/*.svg`))
    .pipe(svgsprite({
        mode: {
            symbol: {
                inline: true,
            },
        },
    }))
    .pipe(rename('spritesheet.svg'))
    .pipe(gulp.dest(config.paths.svgs_prod))
    .pipe(reload({ stream: true }))
    .pipe(notify({ message: 'SVG task complete' })));

// ----------------------------------------------------------------------------
// THE FONTS TASK
// ----------------------------------------------------------------------------

gulp.task('fonts', () => gulp.src(`${config.paths.fonts_dev}/**/*`)
    .pipe(plumber(plumberErrorHandler))
    .pipe(gulp.dest(config.paths.fonts_prod))
    .pipe(reload({ stream: true }))
    .pipe(notify({ message: 'Fonts task complete' })));

// ----------------------------------------------------------------------------
// THE MODERNIZR TASK
// ----------------------------------------------------------------------------

gulp.task('modernizr', () => gulp.src([`${config.paths.js_prod}/app.js`, `${config.paths.css}/styles.css`])
    .pipe(plumber(plumberErrorHandler))
    .pipe(modernizr('modernizr.min.js', {
        options: [
            'setClasses',
            'addTest',
            'html5printshiv',
            'testProp',
            'fnBind',
        ],
        useBuffers: true,
        parseFiles: true,
        uglify: true,
    }))
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.js_prod)));

gulp.task('modernizr-build', ['styles-build', 'scripts-build'], () => gulp.src([`${config.paths.js_prod}/app.js`, `${config.paths.css}/styles.css`])
    .pipe(plumber(plumberErrorHandler))
    .pipe(modernizr('modernizr.min.js', {
        options: [
            'setClasses',
            'addTest',
            'html5printshiv',
            'testProp',
            'fnBind',
        ],
        useBuffers: true,
        parseFiles: true,
        uglify: true,
    }))
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.js_prod)));

// ----------------------------------------------------------------------------
// THE SERVICE WORKER TASK
// ----------------------------------------------------------------------------
gulp.task('copy-workbox', () => gulp.src(require.resolve('workbox-sw'))
    .pipe(plumber(plumberErrorHandler))
    .pipe(rename('workbox-sw.prod.js'))
    .pipe(gulp.dest(config.paths.js_prod))
    .pipe(reload({ stream: true }))
    .pipe(notify({ message: 'Copy Workbox task complete' })));

gulp.task('bundle-sw', ['styles-build', 'styles-highcontrast', 'scripts-build', 'libs-build', 'modernizr-build', 'copy-workbox'], () => wbBuild.injectManifest({
    globDirectory: `${config.build}`,
    swSrc: `${config.paths.js_dev}/sw.js`,
    swDest: `${config.paths.js_prod}/sw.js`,
    modifyUrlPrefix: { '': '../' },
    globPatterns: ['**/*.{js,css}'],
    globIgnores: ['**/workbox-sw.prod.js'],
})
    .then(() => {
        console.log('Service worker generated.');
    })
    .catch((err) => {
        console.log(`[ERROR] This happened: ${err}`);
    }));

// ----------------------------------------------------------------------------
// THE CLEAN UP TASK
// ----------------------------------------------------------------------------

gulp.task('clean', cb => del([config.build], cb));
gulp.task('clear-cache', done => cache.clearAll(done));

// ----------------------------------------------------------------------------
// THE DEFAULT TASK
// ----------------------------------------------------------------------------

gulp.task('default', ['styles-dev', 'styles-highcontrast', 'scripts-dev', 'libs-dev', 'modernizr', 'fonts', 'svgs'], () => {
    gulp.start('templates');
});

// ----------------------------------------------------------------------------
// THE BUILD TASK
// ----------------------------------------------------------------------------

gulp.task('build', ['clean', 'clear-cache'], () => {
    gulp.start('styles-build', 'styles-highcontrast', 'scripts-build', 'libs-build', 'images', 'modernizr-build', 'fonts', 'svgs', 'meta', 'bundle-sw');
});

// ----------------------------------------------------------------------------
// THE WATCH TASK
// ----------------------------------------------------------------------------

gulp.task('watch', () => {
    // run default to start
    gulp.start('default');
    // watch .scss files
    gulp.watch([`${config.paths.scss}/**/*.scss`], ['styles-dev']);
    // watch .css files
    gulp.watch([`${config.paths.css}/**/*.css`], ['styles-highcontrast']);
    // watch .js files
    gulp.watch([`${config.paths.js_dev}/**/*.js`], ['scripts-dev']);
    // watch image files
    gulp.watch([`${config.paths.images_orig}/**/*`], ['images']);
    // watch template files
    gulp.watch([`${config.paths.pug_templates}/**/*.pug`, `${config.paths.pug_templates}/**/*.json`], ['templates']);
    // watch for modernizr changes
    gulp.watch([`${config.paths.js_dev}/**/*.js`, `${config.paths.css}**/*.css`], ['modernizr']);
    // watch for font changes
    gulp.watch([`${config.paths.fonts_dev}/**/*`], ['fonts']);
    // watch for icon changes
    gulp.watch([`${config.paths.svgs_dev}/**/*`], ['svgs']);
    // start browsersync
    gulp.start('browser-sync');
});
