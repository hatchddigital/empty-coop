import gulp from 'gulp';
import babel from 'gulp-babel';
import rjs from 'gulp-requirejs-optimize';
import nodeunit from 'gulp-nodeunit';
import rename from 'gulp-rename';
import run from 'run-sequence';
import browserSync from 'browser-sync';
import * as config from '../config';

/** Convert all scripts from es6 into js (normal) */
gulp.task('scripts-es6', function() {
  return gulp.src([config.es6 + '/**/*.js', `!${config.es6}/**/*.raw.js`])
    .pipe(babel())
    .pipe(gulp.dest(config.js));
});

/** Run nodeunit tests */
gulp.task('scripts-nodeunit', ['scripts-es6'], function() {
  return gulp.src(config.js + '/**/*.tests.js')
    .pipe(nodeunit());
});

/** Copy any 'raw' files over directly and rename to js */
gulp.task('scripts-raw', function() {

  // Work around for requirejs not being smart enough to resolve modules
  // Copy any 'raw' files over without using babel to transpile them first.
  return gulp.src(`${config.es6}/**/*.raw`)
    .pipe(rename({
      extname: '.js'
    }))
    .pipe(gulp.dest(config.js));
});

/** Publish node modules into the libs folder */
gulp.task('scripts-lib', function(callback) {

  // Hack!
  // The requirejs build can only run once this is done.
  // Wait until all copies are done before running scripts-minify
  var count = 0;
  var handler = () => {
    count += 1;
    // Debug
    // console.log(`Copy modules: ${count}/${config.requirejs_libs.length}`);
    if (count == config.requirejs_libs.length) {
      callback();
    }
  };

  // Copy files
  for (var i = 0; i < config.requirejs_libs.length; ++i) {
    var id = config.requirejs_libs[i];
    var source = config.path(`node_modules/${id}/**/*`);
    var target = `${config.lib}/${id}`;
    gulp.src(source)
      .pipe(gulp.dest(target))
      .on('end', handler);
  }
});

/** Compile scripts into amd modules for requirejs */
gulp.task('scripts-amd', ['scripts-lib', 'scripts-raw'], function() {
  return gulp.src([config.es6 + '/**/*.js', `!${config.es6}/**/*.raw.js`])
    .pipe(babel({
      modules: 'amd'
    }))
    .pipe(gulp.dest(config.js));
});

/** Combine scripts */
gulp.task('scripts-minify', function() {
  return gulp.src(config.js + '/bootstrap.js')
    .pipe(rjs({
       mainConfigFile: config.js + '/bootstrap.js',
       out: 'app.js'
    }))
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

  // Compile modules & static files
  tasks.push('scripts-amd');

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
  gulp.watch([config.es6 + '/**/*.raw'], ['scripts-watch']);
}
