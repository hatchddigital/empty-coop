import * as utils from './lib/utils';
import * as base from './base';

// ------------------- Global settings ---------------------------------------

// Are we in production build mode?
export var PRODUCTION = false;


// ------------------- Export helpers =---------------------------------------

export var path = utils.path;
export var read = utils.read;
export var templated = utils.templated;


// ------------------- Input and output settings ------------------------------

// Template paths
export var templates = path(`${base.path}/src/jade`);
export var html = path(`${base.path}/build`);

// Script paths
export var es6 = path(`${base.path}/src/scripts`);
export var js = path(`${base.path}/build/scripts`);
export var lib = path(`${base.path}/build/libs`);

// Modernizr setup
export var modernizr = path(`${base.path}/build/scripts`);

// Style paths
export var sass = path(`${base.path}/src/sass`);
export var eggbox_mixin = path(`${base.path}/src/sass/utils/_eggbox.scss`);
export var css = path(`${base.path}/build/stylesheets`);
export var sassdoc = path(`sassdoc`);

// Images & svg for the frontend
export var img = path(`${base.path}/src/images`);
export var imgmin = path(`${base.path}/build/images`);
export var svg = path(`${base.path}/src/svg`);
export var svgmin = path(`${base.path}/build/svg`);

// Custom webfonts
export var fontsvg = path(`${base.path}/src/custom-eggbox`);
export var fonts = path(`${base.path}/build/fonts`);
export var eggbox_demo = path(`${base.path}/build/fonts/eggbox/demo.html`);
export var font_name = "eggbox";
export var font_path = "../fonts/eggbox"; // Used on frontend

// Eggbox specific config for webfonts
export var eggbox = path(`node_modules/eggbox/src`);
export var eggbox_mixin_template = path(`node_modules/eggbox/templates/eggbox.gulp.css`);
export var eggbox_demo_template = path(`node_modules/eggbox/templates/eggbox.gulp.html`);

// Server config
export var server_folder = path(`${base.path}/build`);
export var server_port = 3000;


// ------------------- various config settings -------------------------------

// Enable sass doc?
export var enable_sassdoc = false;

// Enable node unit?
export var enable_nodeunit = true;

// Node modules to copy out into the libs folder
// TODO: At some point remove this and use browserify.
export var requirejs_libs = [
  'jquery/dist',
  'requirejs'
];
