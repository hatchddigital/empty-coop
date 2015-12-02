import gulp from 'gulp';
import modernizr from 'gulp-modernizr';
import uglify from 'gulp-uglify';
import plumber from 'gulp-plumber';
import * as config from '../config';

/**
 * Parse js and css files and generate a new modernizer build
 * Notice that modernizr is slow and is only built on production builds.
 */
gulp.task('modernizr', function(callback) {
  if (config.PRODUCTION) {
    return gulp.src([`${config.js}/**/*.js`, `${config.css}/**/*.css`, '!**/*.min.js'])
      .pipe(plumber())
      .pipe(modernizr('modernizr.min.js', {
        devFile: 'remote',
        options: [
            'setClasses',
            'addTest',
            'html5printshiv',
            'testProp',
            'fnBind',
            'shiv'
        ],
        parseFiles: true
      }))
      .pipe(uglify())
      .pipe(gulp.dest(config.modernizr));
  }
  else {
    callback();
  }
});

export function watch() {
  // For compatibility; no actual watch as this is a production only build target
}
