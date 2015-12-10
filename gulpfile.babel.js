import watch from './gulp/watch';
import {read} from './gulp/lib/utils';
import gulp from 'gulp';
import run from 'run-sequence';
import * as config from './gulp/config';
import yargs from 'yargs';

// Check for production mode
// To use: gulp default --mode=production
// By default this is run the first time we run gulp
config.PRODUCTION = yargs.argv.mode == 'production';
if ((!config.PRODUCTION) && (config.read('.build', true) == null)) {
  console.log("Never run gulp before, defaulting to production build");
  config.PRODUCTION = true;
}

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
        config.write('.build', { build: new Date() }, true);
        callback();
      });
  }
  catch(err) {
    console.log('error');
  }
});
