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
// TODOS AND NOTES
// ----------------------------------------------------------------------------

//@TODO: way to load css and images from npm modules

// ----------------------------------------------------------------------------
// THE GULP CONFIG
// ----------------------------------------------------------------------------

var config = {
    proxyurl        : false, //the url of the site on your machine (only use if proxying a current server)
    src             : "static/src",
    build           : "static/build",
    port            : 1982,
    //the paths to the relevant files
    paths   : {
        //styles
        get scss(){return config.src+"/sass"},
        get css(){return config.build+"/styles"},
        //images
        get images_orig(){return config.src+"/images"},
        get images_min(){return config.build+"/images"},
        //scripts
        get js_dev(){return config.src+"/scripts"},
        get js_prod(){return config.build+"/scripts"},
        //external libs
        get libs_dev(){return config.src+"/external-libs"},
        get libs_prod(){return config.build+"/external-libs"},
        //html templates
        get pug_templates(){return config.src+"/pug-templates"},
        get html_templates(){return config.build+"/"},
        //fonts
        get fonts_dev(){return config.src+"/fonts"},
        get fonts_prod(){return config.build+"/fonts"},
        //svgs
        get svgs_dev(){return config.src+"/svgs"},
        get svgs_prod(){return config.build+"/svgs"},
        //where to look for the plone template files
        plone_templates : "./"
    }
}

// ----------------------------------------------------------------------------
// LOAD UP ALL THE PLUGINS
// ----------------------------------------------------------------------------

var gulp            = require("gulp"),
    //helpers
    rename          = require("gulp-rename"),
    concat          = require("gulp-concat"),
    notify          = require("gulp-notify"),
    plumber         = require("gulp-plumber"),
    del             = require("del"),
    data            = require("gulp-data"),
    path            = require("path"),
    count           = require("gulp-count"),
    os              = require("os"),
    addsrc          = require("gulp-add-src"),
    //css plugins
    sass            = require("gulp-sass"),
    sourcemaps      = require("gulp-sourcemaps"),
    autoprefixer    = require("gulp-autoprefixer"),
    minifycss       = require("gulp-minify-css"),
    //images
    imagemin        = require("gulp-imagemin"),
    cache           = require("gulp-cache"),
    rsp             = require("remove-svg-properties").stream,
    svgsprite       = require("gulp-svg-sprite"),
    //js plugins
    browserify      = require("browserify"),
    source          = require("vinyl-source-stream"),
    buffer          = require("vinyl-buffer"),
    babelify        = require("babelify"),
    uglify          = require("gulp-uglify"),
    modernizr       = require("gulp-modernizr"),
    //html plugins
    pug             = require("gulp-pug"),
    //live reload stuff
    browserSync     = require("browser-sync").create("server"),
    reload          = browserSync.reload;

// ----------------------------------------------------------------------------
// THE PLUMBER ERROR HANDLER
// ----------------------------------------------------------------------------

var plumberErrorHandler = {
    errorHandler : notify.onError({
        title   : "Gulp",
        message : "Error: <%= error.message %>"
    })
};

// ----------------------------------------------------------------------------
// BROWSER-SYNC TASK FOR STARTING A SERVER
// ----------------------------------------------------------------------------

gulp.task("browser-sync",function(){
    //watch files
    var files = [
        config.paths.css+"**/*.css",
        config.paths.js+"**/*.js",
        config.paths.plone_templates+"**/*.pt",
        config.paths.html_templates+"**/*.html"
    ];
    if(config.proxyurl){
        //initialize browsersync
        browserSync.init(files,{
            //browsersync with a proxy server
            port  : config.port,
            proxy : config.proxyurl
        });
    }else{
        //initialize browsersync
        browserSync.init(files,{
            port   : config.port,
            server : {
                baseDir : config.build
            }
        });
    }
});

// ----------------------------------------------------------------------------
// THE STYLES TASKS
// ----------------------------------------------------------------------------

gulp.task("styles-dev", function() {
    return gulp.src(config.paths.scss+"**/*.scss")
        .pipe(plumber(plumberErrorHandler))
        .pipe(sourcemaps.init())
        .pipe(sass({errLogToConsole:true}))
        .pipe(sourcemaps.write())
        .pipe(rename({dirname:""}))
        .pipe(gulp.dest(config.paths.css))
        .pipe(reload({stream:true}))
        .pipe(notify({ message: "Styles dev task complete" }));
});

gulp.task("styles-build", function() {
    return gulp.src(config.paths.scss+"**/*.scss")
        .pipe(plumber(plumberErrorHandler))
        .pipe(sass({errLogToConsole:true}))
        .pipe(autoprefixer({browsers:["last 3 versions","> 1%","ie 8"]}))
        .pipe(concat("styles.css"))
        .pipe(gulp.dest(config.paths.css))
        .pipe(minifycss())
        .pipe(gulp.dest(config.paths.css))
        .pipe(reload({stream:true}))
        .pipe(notify({ message: "Styles build task complete" }));
});

// ----------------------------------------------------------------------------
// THE SCRIPTS TASK
// ----------------------------------------------------------------------------

gulp.task("scripts-dev", function() {
    return browserify(config.paths.js_dev+"/app.js",{debug:true})
        .transform("babelify",{presets:["es2015"]})
        .bundle().on("error",plumberErrorHandler.errorHandler)
        .pipe(plumber(plumberErrorHandler))
        .pipe(source("app.js"))
        .pipe(buffer())
        .pipe(gulp.dest(config.paths.js_prod))
        .pipe(reload({stream:true}))
        .pipe(notify({ message: "Scripts task complete" }));
});

gulp.task("scripts-build", function() {
    return browserify(config.paths.js_dev+"/app.js",{debug:false})
        .transform("babelify",{presets:["es2015"]})
        .bundle().on("error",plumberErrorHandler.errorHandler)
        .pipe(plumber(plumberErrorHandler))
        .pipe(source("app.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.js_prod))
        .pipe(reload({stream:true}))
        .pipe(notify({ message: "Scripts task complete" }));
});

// ----------------------------------------------------------------------------
// THE LIBS TASK
// ----------------------------------------------------------------------------

gulp.task("libs-dev", function() {
    return gulp.src(config.paths.libs_dev+"/**/*")
        .pipe(plumber(plumberErrorHandler))
        .pipe(gulp.dest(config.paths.libs_prod))
        .pipe(reload({stream:true}))
        .pipe(notify({ message: "Libs task complete" }));
});

gulp.task("libs-build", function() {
    return gulp.src(config.paths.libs_dev+"/**/*")
        .pipe(plumber(plumberErrorHandler))
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.libs_prod))
        .pipe(reload({stream:true}))
        .pipe(notify({ message: "Libs task complete" }));
});

// ----------------------------------------------------------------------------
// THE IMAGES TASK
// ----------------------------------------------------------------------------

gulp.task("images", function() {
    return gulp.src(config.paths.images_orig+"/**/*")
        .pipe(plumber(plumberErrorHandler))
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest(config.paths.images_min))
        .pipe(notify({ message: "Images task complete" }));
});

// ----------------------------------------------------------------------------
// THE TEMPLATES TASK
// ----------------------------------------------------------------------------

gulp.task("templates", function() {

    //get the options
    var locals = require("./"+config.paths.pug_templates+"/locals.json");

    //get the ip address (see here -> http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js)
    var ifaces = os.networkInterfaces();
    var ip = "0.0.0.0";
    Object.keys(ifaces).forEach(function(ifname){
        ifaces[ifname].forEach(function (iface) {
            if("IPv4" !== iface.family || iface.internal !== false){
                //skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
            ip = iface.address;
        });
    });

    //log the files to process and the files processed
    var fileNo = -1; //-1 due to count() logging again once finished and increasing the count by 1
    var filesProcessed = 0;

    //loop the pug templates
    return gulp.src(config.paths.pug_templates+"/templates/**/*.pug")
        .pipe(plumber(plumberErrorHandler))
        .pipe(count({
            logFiles    : true,
            logEmpty    : false,
            logger      : function(msg){fileNo++}
        }))
        .pipe(data(function(file){

            //grab the locals and clone
            var info = JSON.parse(JSON.stringify(locals));

            //grab the file details
            var fileName = path.basename(file.path).replace(".pug","");

            //dont process master
            if(fileName !== "master"){

                var dirName  = path.dirname(file.path).split("/").pop().replace("pug-templates/templates","");
                var uri      = path.dirname(file.path).replace(config.paths.pug_templates+"/templates","").replace(process.cwd(),"").replace("//","/");
                var section  = uri.split("/")[1];

                //set the destination to be a dir with the same name as the file
                var dest = file.path
                    .replace(config.paths.pug_templates+"/templates",config.build)
                    .replace("/"+fileName+".pug","")
                ;

                //if homepage
                if(fileName == "index"){
                    dest        = config.paths.html_templates;
                    section     = "index";
                    dirName     = "";
                }

                //pass the vars to the template
                info.template = fileName+"-template";
                info.fileName = fileName+".html";
                info.dirName  = dirName;
                info.section  = section+"-section";
                info.uri      = uri;
                info.basePath = "http://"+ip+":"+config.port;

                //convert to html from pug
                var stream = gulp.src(file.path)
                    .pipe(plumber(plumberErrorHandler))
                    .pipe(pug({
                        locals : info,
                        pretty : true
                    }))
                    .pipe(rename("index.html"))
                    .pipe(gulp.dest(dest));

                //on completion of processing file
                stream.on("finish",function(){
                    filesProcessed++;
                    if(fileNo == filesProcessed){
                        gulp.src(dest)
                            .pipe(reload({stream:true}))
                            .pipe(notify({ message: "Templates task complete" }));

                    }
                });

            }else{
                filesProcessed++;
            }

        }));

});

// ----------------------------------------------------------------------------
// THE SVG TASK
// ----------------------------------------------------------------------------

gulp.task("svgs", function() {
    return gulp.src(config.paths.svgs_dev+"/icons/**/*.svg")
        .pipe(plumber(plumberErrorHandler))
        .pipe(rsp.remove({
            properties : [rsp.PROPS_FILL,rsp.PROPS_STROKE]
        }))
        .pipe(addsrc(config.paths.svgs_dev+"/*.svg"))
        .pipe(svgsprite({
            mode : {stack : true}
        }))
        .pipe(rename("spritesheet.svg"))
        .pipe(gulp.dest(config.paths.svgs_prod))
        .pipe(reload({stream:true}))
        .pipe(notify({ message: "SVG task complete" }));
});

// ----------------------------------------------------------------------------
// THE FONTS TASK
// ----------------------------------------------------------------------------

gulp.task("fonts", function() {
    return gulp.src(config.paths.fonts_dev+"/**/*")
        .pipe(plumber(plumberErrorHandler))
        .pipe(gulp.dest(config.paths.fonts_prod))
        .pipe(reload({stream:true}))
        .pipe(notify({ message: "Fonts task complete" }));
});

// ----------------------------------------------------------------------------
// THE MODERNIZR TASK
// ----------------------------------------------------------------------------

gulp.task("modernizr", function() {
    return gulp.src([config.paths.js_prod+"/app.js", config.paths.css+"/styles.css"])
        .pipe(plumber(plumberErrorHandler))
        .pipe(modernizr("modernizr.min.js",{
            options: [
                "setClasses",
                "addTest",
                "html5printshiv",
                "testProp",
                "fnBind"
            ],
            useBuffers: true,
            parseFiles: true,
            uglify: true
        }))
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.js_prod));
});

// ----------------------------------------------------------------------------
// THE CLEAN UP TASK
// ----------------------------------------------------------------------------

gulp.task("clean",function(cb){
    return del([config.build],cb);
});

// ----------------------------------------------------------------------------
// THE DEFAULT TASK
// ----------------------------------------------------------------------------

gulp.task("default", ["styles-dev", "scripts-dev", "libs-dev", "modernizr", "fonts", "svgs"], function() {
    gulp.start("templates");
});

// ----------------------------------------------------------------------------
// THE BUILD TASK
// ----------------------------------------------------------------------------

gulp.task("build", ["clean"], function() {
    gulp.start("styles-build", "scripts-build", "libs-build", "images", "modernizr","fonts", "svgs");
});

// ----------------------------------------------------------------------------
// THE WATCH TASK
// ----------------------------------------------------------------------------

gulp.task("watch",function() {
    //run default to start
    gulp.start("default");
    //watch .scss files
    gulp.watch(config.paths.scss+"/**/*.scss", ["styles-dev"]);
    //watch .js files
    gulp.watch(config.paths.js_dev+"/**/*.js", ["scripts-dev"]);
    //watch image files
    gulp.watch(config.paths.images_orig+"/**/*", ["images"]);
    //watch template files
    gulp.watch(config.paths.pug_templates+"/**/*.pug", ["templates"]);
    //watch for modernizr changes
    gulp.watch([config.paths.js_dev+"/**/*.js", config.paths.css+"**/*.css"], ["modernizr"]);
    //watch for font changes
    gulp.watch([config.paths.fonts_dev+"/**/*"], ["fonts"]);
    //watch for icon changes
    gulp.watch([config.paths.svgs_dev+"/**/*"], ["svgs"]);
    //start browsersync
    gulp.start("browser-sync");
});
