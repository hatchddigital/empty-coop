import watch from './gulp/watch';
import gulp from 'gulp';
import run from 'run-sequence';
import * as config from './gulp/config';
import yargs from 'yargs';

// Check for production mode
// To use: gulp default --mode=production
config.PRODUCTION = yargs.argv.mode == 'production';

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
      callback);
  }
  catch(err) {
    console.log('error');
  }
});
