// ----------------------------------------------------------------------------
// GULP USAGE
// ----------------------------------------------------------------------------

/*

gulp watch
----------------------
the one to use for development. This will minify images, compile sass and js and
launch a browsersync server on port :3000 uing the given proxy dev url set in
the config below. For browsersync to work you will need to update this url to
point to your dev site.

gulp build
----------------------
the one to use for staging and live builds. this does the same as watch but it
also runs a clean task to delete any old css, js and images. it also wont
attempt to launch a browsersync server.

*/

// ----------------------------------------------------------------------------
// THE GULP CONFIG
// ----------------------------------------------------------------------------

var config = {
    //the url of the site on your machine (only use if proxying a current server)
    proxyurl : false,
    src      : "static/src",
    build    : "static/build",
    port     : 1982,
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
        //html templates
        get pug_templates(){return config.src+"/pug-templates"},
        get html_templates(){return config.build+"/"},
        //fonts
        get dev_fonts(){return config.build+"/fonts"},
        get prod_fonts(){return config.src+"/fonts"},
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
    //css plugins
    sass            = require("gulp-ruby-sass"),
    autoprefixer    = require("gulp-autoprefixer"),
    minifycss       = require("gulp-minify-css"),
    //images
    imagemin        = require("gulp-imagemin"),
    cache           = require("gulp-cache"),
    //js plugins
    jshint          = require("gulp-jshint"),
    babel           = require("gulp-babel"),
    uglify          = require("gulp-uglify"),
    modernizr       = require("gulp-modernizr"),
    amdOptimize     = require("amd-optimize"),
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
// THE STYLES TASK
// ----------------------------------------------------------------------------

gulp.task("styles", function() {
    return sass(config.paths.scss+"**/*.scss",{style:"expanded"})
        .pipe(plumber(plumberErrorHandler))
        .pipe(autoprefixer({browsers:["last 3 versions","> 1%","ie 8"]}))
        .pipe(concat("production.css"))
        .pipe(gulp.dest(config.paths.css))
        .pipe(rename({suffix: ".min"}))
        .pipe(minifycss())
        .pipe(gulp.dest(config.paths.css))
        .pipe(reload({stream:true}))
        .pipe(notify({ message: "Styles task complete" }));
});

// ----------------------------------------------------------------------------
// THE SCRIPTS TASK
// ----------------------------------------------------------------------------

gulp.task("scripts", function() {
    return gulp.src(config.paths.js_dev+"/**/*.js")
        .pipe(plumber(plumberErrorHandler))
        //.pipe(jshint(".jshintrc"))
        //.pipe(jshint.reporter("default"))
        .pipe(babel({
            presets:["es2015"]
        }))
        //.pipe(amdOptimize("app"))
        .pipe(concat("app.js"))
        .pipe(gulp.dest(config.paths.js_prod))
        .pipe(rename({suffix:".min"}))
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.js_prod))
        .pipe(reload({stream:true}))
        .pipe(notify({ message: "Scripts task complete" }));

    //@NOTE: Below is the browserify solution. Much better than require js
    //please dont delete as hopefully we will switch to this in the future.
    // ------------------------------------------------------------------------
    /*return browserify(config.paths.jsdev+"/init.js",{debug:true})
        .bundle().on("error",plumberErrorHandler.errorHandler)
        .pipe(plumber(plumberErrorHandler))
        .pipe(source("production.js"))
        .pipe(buffer())
        //.pipe(jshint(".jshintrc"))
        //.pipe(jshint.reporter("default"))
        .pipe(gulp.dest(config.paths.jsprod))
        .pipe(rename({suffix:".min"}))
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.jsprod))
        .pipe(reload({stream:true}))
        .pipe(notify({ message: "Scripts task complete" }));*/
    // ------------------------------------------------------------------------

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

    reload({stream:true})

    //loop the pug templates
    return gulp.src(config.paths.pug_templates+"/**/*.pug")
        .pipe(plumber(plumberErrorHandler))
        .pipe(data(function(file){

            //grab the locals and clone
            var info = JSON.parse(JSON.stringify(locals));

            //grab the file details
            var fileName = path.basename(file.path).replace(".pug","");
            var template = path.basename(file.path).replace(".pug","-template");
            var dirName  = path.dirname(file.path).split("/").pop().replace("pug-templates","");

            //dont process certain dirs
            var ignoredirs = ["partials","templates","samples"];
            for(var i=0; i<=ignoredirs.length; i++){
                if(dirName == ignoredirs[i]){
                    return;
                }
            }

            //set the uri
            if(dirName == ""){
                dirName = "toplevel";
                var uri = "/"+fileName+"/";
            }else{
                var uri = "/"+dirName+"/"+fileName+"/";
            }

            //set the destination to be a dir with the same name as the file
            if(fileName == "index"){
                var dest = config.paths.html_templates;
            }else{
                var dest = file.path
                    .replace(config.paths.pug_templates,config.build)
                    .replace("/"+fileName+".pug","")
                ;
            }

            //get the port browser sync is running on
            //config.port = browserSync.getOption("port");

            //pass the vars to the template
            info.template = template;
            info.fileName = fileName;
            info.dirName  = dirName;
            info.section  = dirName+"-section";
            info.uri      = uri;
            info.basePath = "http://localhost:"+config.port;

            //convert to html from jade
            return gulp.src(file.path)
                .pipe(plumber(plumberErrorHandler))
                .pipe(pug({
                    locals : info,
                    pretty : true
                }))
                .pipe(rename("index.html"))
                .pipe(gulp.dest(dest))
                .pipe(notify({ message: "Templates task complete" }));

        }));

});

// ----------------------------------------------------------------------------
// THE ICONS TASK
// ----------------------------------------------------------------------------

gulp.task("icons", function() {
    //@TODO: eggbox setup
});

// ----------------------------------------------------------------------------
// THE FONTS TASK
// ----------------------------------------------------------------------------

gulp.task("fonts", function() {
    //@TODO: copy webfonts from src to build
});

// ----------------------------------------------------------------------------
// THE LIBS TASK
// ----------------------------------------------------------------------------

gulp.task("libs", function() {
    //@TODO: move libs like reqire from node_modules to libs folder
});

// ----------------------------------------------------------------------------
// THE MODERNIZR TASK
// ----------------------------------------------------------------------------

gulp.task("modernizr", function() {
    return gulp.src([config.paths.js_prod+"/app.min.js", config.paths.css+"/production.min.css"])
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

gulp.task("default", ["templates","styles","scripts","modernizr"], function() {
    notify({ message: "Default task complete" });
});

// ----------------------------------------------------------------------------
// THE BUILD TASK
// ----------------------------------------------------------------------------

gulp.task("build", ["clean"], function() {
    gulp.start("styles", "scripts", "images", "modernizr");
});

// ----------------------------------------------------------------------------
// THE WATCH TASK
// ----------------------------------------------------------------------------

gulp.task("watch",function() {
    //run default to start
    gulp.start("default");
    //watch .scss files
    gulp.watch(config.paths.scss+"/**/*.scss", ["styles"]);
    //watch .js files
    gulp.watch(config.paths.js_dev+"/**/*.js", ["scripts"]);
    //watch image files
    gulp.watch(config.paths.images_orig+"/**/*", ["images"]);
    //watch template files
    gulp.watch(config.paths.pug_templates+"/**/*.pug", ["templates"]);
    //watch for modernizr changes
    gulp.watch([config.paths.js_dev+"/**/*.js", config.paths.css+"**/*.css"], ["modernizr"]);
    //start browsersync
    gulp.start("browser-sync");
});
