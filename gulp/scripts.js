import {Task, manager} from 'gulp-runtime';
import * as utils from 'gulp-runtime/lib/utils';
import gulp from 'gulp';
import babel_ from 'gulp-babel';
import nodeunit from 'gulp-nodeunit';
import rename from 'gulp-rename';
import run from 'run-sequence';
import browserSync from 'browser-sync';
import browserify from 'gulp-browserify';
import uglify from 'gulp-uglify';

// Components
import template from 'component-template';

// Common babel config
var babel = () => { return babel_({ presets: ['es2015'] }); };

export class Scripts extends Task {

  constructor(config) {
    super("Scripts", config);

    // Input
    this.src_folder = `${config.src}/scripts`;
    this.src = [`${this.src_folder}/**/*.js`];

    // Temp files
    this.tmp_folder = `${config.tmp}/scripts`;
    this.tests = `${this.tmp_folder}/**/*.tests.js`;
    this.tmps = `${this.tmp_folder}/**/*.js`;

    // Combined output
    this.dest = `${config.build}/scripts`;
  }

  tasks() {

    // Convert all scripts from es6 into normal js
    gulp.task('scripts-es6', (callback) => {
      var tasks = [];

      // Component helper
      var componentize = (t, path) => {
        tasks.push(gulp.src(template.scripts())
          .pipe(babel())
          .pipe(gulp.dest(`${this.tmp_folder}/imports/${path}`)));
      };

      // Components all go here
      componentize(template, 'template');

      // Main source compile
      tasks.push(gulp.src(this.src)
        .pipe(babel())
        .pipe(gulp.dest(this.tmp_folder)));

      // Wait for everything and then invoke the callback
      utils.wait_for(tasks, callback);
    });

    // Run nodeunit tests
    gulp.task('scripts-nodeunit', ['scripts-es6'], () => {
      return gulp.src(this.tests)
        .pipe(nodeunit());
    });

    // Combine scripts
    gulp.task('scripts-combine', () => {
      var task = gulp.src(this.tmps)
      task = task.pipe(browserify());
      task = this.config.PRODUCTION ? task.pipe(uglify()) : task;
      task = task.pipe(rename({ extname: '.min.js' }));
      return task.pipe(gulp.dest(this.dest));
    });

    // Build all scripts.
    // In production mode, run the requirejs minifier (slow).
    gulp.task('scripts', (callback) => {
      run('scripts-nodeunit', 'scripts-combine', callback);
    });

    // Watch and livereload
    gulp.task('scripts-watch', ['scripts'], browserSync.reload);
  }

  watch() {
    gulp.watch(this.src, ['scripts-watch']);
  }
}

// Setup this task on import
manager.register(Scripts);
