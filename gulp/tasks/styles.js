import gulp from 'gulp';
import sass from 'gulp-sass-native';
import run from 'run-sequence';
import prefix from 'gulp-autoprefixer';
import cmq from 'gulp-combine-media-queries';
import sassdoc from 'sassdoc';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import * as config from '../config';

/** Convert all scripts from es6 into js (normal) */
gulp.task('styles-build', function() {
  var rtn = gulp.src(config.sass + '/*.scss')
    .pipe(plumber())
    .pipe(sass());

  // In production, add cmq
  if (config.PRODUCTION) {
    rtn = rtn.pipe(cmq());
  }

  // In production add autoprefixer
  if (config.PRODUCTION) {
    rtn = rtn.pipe(prefix({
      browsers: ['last 3 versions', '> 1%', 'ie 8']
    }));
  }

  return rtn
    .pipe(gulp.dest(config.css))
    .pipe(browserSync.stream());
});

/** Convert all scripts from es6 into js (normal) */
gulp.task('styles-doc', function(callback) {
  if (config.enable_sassdoc) {
    return gulp.src(config.sass + '/**/*.scss')
      .pipe(sassdoc({
        //dest: 'docs',
        // verbose: true,
        display: {
          access: ['public', 'private'],
          alias: true,
          watermark: true,
        },
        groups: {
          'undefined': 'Ungrouped'
        }
      }))
      .pipe(gulp.dest(config.sassdoc));
  }
  else {
    callback();
  }
});

/** Convert all scss into css */
gulp.task('styles', function(callback) {
  return run('styles-build', 'styles-doc', callback);
});

export function watch() {
  gulp.watch([config.sass + '/**/*.scss'], ['styles']);
}
