import watch from './gulp/watch';
import gulp from 'gulp';
import run from 'run-sequence';
import * as config from './gulp/config';
import yargs from 'yargs';
import * as utils from './gulp/lib/utils';

// Check for production mode
// To use: gulp default --mode=production
utils.default_args(config);

// By default, just run in dev mode
gulp.task('default', function(callback) {
  try {
    return run(
      'templates',
      'scripts',
      'fonts',
      'styles',
      'modernizr',
      'images',
      function() {
        utils.build_success(config);
        callback();
      });
  }
  catch(err) {
    console.log('error');
  }
});
