import gulp from 'gulp';
import babel from 'gulp-babel';
import rjs from 'gulp-requirejs-optimize';
import nodeunit from 'gulp-nodeunit';
import rename from 'gulp-rename';
import run from 'run-sequence';
import browserSync from 'browser-sync';
import browserify from 'gulp-browserify';
import * as config from '../config';

/** Convert all scripts from es6 into js (normal) */
gulp.task('scripts-es6', function() {
  return gulp.src([config.es6 + '/**/*.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(config.js));
});

/** Run nodeunit tests */
gulp.task('scripts-nodeunit', ['scripts-es6'], function() {
  return gulp.src(config.js + '/**/*.tests.js')
    .pipe(nodeunit());
});

/** Combine scripts */
gulp.task('scripts-minify', function() {
  return gulp.src(config.js + '/bootstrap.js')
    .pipe(browserify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(config.js));
});

/**
 * Build all scripts.
 * In production mode, run the requirejs minifier (slow).
 */
gulp.task('scripts', function(callback) {
  var tasks = [];

  // If we're running tests, add the required tasks
  if (config.enable_nodeunit) {
    tasks.push('scripts-nodeunit');
  }

  // In production, add a minify task
  if (config.PRODUCTION) {
    tasks.push('scripts-minify');
  }

  // Callback marks the task as completed
  tasks.push(callback);
  return run.apply(this, tasks);
});

// Watch and livereload
gulp.task('scripts-watch', ['scripts'], browserSync.reload);

export function watch() {
  gulp.watch([config.es6 + '/**/*.js'], ['scripts-watch']);
}
