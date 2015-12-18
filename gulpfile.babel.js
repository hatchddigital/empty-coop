import * as ut from 'gulp-runtime/lib/utils';
import {dev_server} from 'gulp-runtime/lib/server';
import {manager} from 'gulp-runtime';
import gulp from 'gulp';
import run from 'run-sequence';

// ----------------------------------------------------------------------------

/// Config
var config = {};

// Base paths
ut.root = __dirname;
config.src = ut.path('static/src');
config.tmp = ut.path('static/tmp');
config.build = ut.path('static/build');

// Dev server
config.server_port = 3000;
config.server_folder = ut.path('static/build');

// ----------------------------------------------------------------------------

/// Load default arguments
ut.default_args(config);

/// Load various child tasks
import './gulp/content';
import './gulp/modernizr';
import './gulp/styles';
import './gulp/scripts';
import './gulp/imagemin';
import './gulp/fonts';

/// Register child tasks
manager.debug = true;
manager.tasks(config);

// ----------------------------------------------------------------------------

/// Main task
gulp.task('default', function(callback) {
  run(
    'scripts',
    'fonts',
    'styles',
    'modernizr',
    'content',
    'imagemin',
    function() {
      ut.build_success();
      callback();
    }
  );
});

/// Watch task
gulp.task('watch', ['default'], function() {
  dev_server(config);
  manager.watch();
});
