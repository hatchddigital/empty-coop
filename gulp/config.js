import * as utils from './lib/utils';

// ------------------- Global settings ---------------------------------------

// Are we in production build mode?
export var PRODUCTION = false;


// ------------------- Export helpers =---------------------------------------

export var path = utils.path;
export var read = utils.read;
export var write = utils.write;
export var templated = utils.templated;


// ------------------- Input and output settings ------------------------------

// General paths
export var tmp = path("static/tmp");

// Content paths
export var content = {
  raw: path('static/src/content'),
  build: `${tmp/content}`
};

// Template paths
export var templates = path("static/src/jade");
export var html = path("static/build");

// Script paths
export var es6 = path("static/src/scripts");
export var js = path("static/build/scripts");
export var lib = path("static/build/libs");

// Modernizr setup
export var modernizr = path("static/build/scripts");

// Style paths
export var sass = path("static/src/sass");
export var eggbox_mixin = path("static/src/sass/utils/_eggbox.scss");
export var css = path("static/build/stylesheets");
export var sassdoc = path("sassdoc");

// Images & svg for the frontend
export var img = path("static/src/images");
export var imgmin = path("static/build/images");
export var svg = path("static/src/svg");
export var svgmin = path("static/build/svg");

// Custom webfonts
export var fontsvg = path("static/src/custom-eggbox");
export var fonts = path("static/build/fonts");
export var eggbox_demo = path("static/build/fonts/eggbox/demo.html");
export var font_name = "eggbox";
export var font_path = "../fonts/eggbox"; // Used on frontend

// Eggbox specific config for webfonts
export var eggbox = path("node_modules/eggbox/src");
export var eggbox_mixin_template = path("node_modules/eggbox/templates/eggbox.gulp.css");
export var eggbox_demo_template = path("node_modules/eggbox/templates/eggbox.gulp.html");

// Server config
export var server_folder = path("static/build");
export var server_port = 3000;


// ------------------- various config settings -------------------------------

// Enable sass doc?
export var enable_sassdoc = false;

// Enable node unit?
export var enable_nodeunit = true;
