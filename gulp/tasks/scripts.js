import gulp from 'gulp';
import babel_ from 'gulp-babel';
import nodeunit from 'gulp-nodeunit';
import rename from 'gulp-rename';
import run from 'run-sequence';
import browserSync from 'browser-sync';
import browserify from 'gulp-browserify';
import uglify from 'gulp-uglify';
import * as config from '../config';

// Components
import template from 'component-template';

// Common babel config
var babel = () => { return babel_({ presets: ['es2015'] }); };

/** Convert all scripts from es6 into normal js */
gulp.task('scripts-es6', function() {
  gulp.src(template.scripts())
    .pipe(babel())
    .pipe(gulp.dest(`${config.tmp}/imports/template`));
  return gulp.src([config.es6 + '/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest(config.tmp));
});

/** Run nodeunit tests */
gulp.task('scripts-nodeunit', ['scripts-es6'], function() {
  return gulp.src(config.tmp + '/**/*.tests.js')
    .pipe(nodeunit());
});

/** Combine scripts */
gulp.task('scripts-combine', function() {
  var task = gulp.src(config.tmp + '/app.js');
  task = task.pipe(browserify());
  task = config.PRODUCTION ? task.pipe(uglify()) : task;
  task = task.pipe(rename({ extname: '.min.js' }));
  return task.pipe(gulp.dest(config.js));
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

  // Browserify scripts and add callback
  tasks.push('scripts-combine');
  tasks.push(callback);

  return run.apply(this, tasks);
});

// Watch and livereload
gulp.task('scripts-watch', ['scripts'], browserSync.reload);

export function watch() {
  gulp.watch([config.es6 + '/**/*.js'], ['scripts-watch']);
}
