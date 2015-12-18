import {Task, manager} from 'gulp-runtime';
import * as utils from 'gulp-runtime/lib/utils';
import gulp from 'gulp';
import sass from 'gulp-sass-native';
import run from 'run-sequence';
import prefix from 'gulp-autoprefixer';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';

// Components
import template from 'component-template';

export class Styles extends Task {

  constructor(config) {
    super("Styles", config);
    this.src_folder = `${config.src}/sass/`;
    this.src_watch = `${this.src_folder}/*/**.scss`;
    this.src = [`${this.src_folder}/*.scss`, `!${this.src_folder}/_*.scss`];
    this.dest = `${config.build}/stylesheets`;
  }

  tasks() {

    // Convert scss to css
    gulp.task('styles-build', () => {

      // Generate component imports
      // Any template components go here!
      template.styles(`${this.src_folder}/imports/template.scss`);

      // Build
      var rtn = gulp.src(this.src)
        .pipe(plumber())
        .pipe(sass({
          stream: true,
          handler: function(err) {
            console.log(err);
          }
        }));

      // In production add autoprefixer
      if (this.config.PRODUCTION) {
        rtn = rtn.pipe(prefix({
          browsers: ['last 3 versions', '> 1%', 'ie 8']
        }));
      }

      return rtn
        .pipe(gulp.dest(this.dest))
        .pipe(browserSync.stream());
    });

    // Convert all scss into css
    gulp.task('styles', (callback) => {
      return run('styles-build', callback);
    });
  }

  watch() {
    gulp.watch(this.src_watch, ['styles']);
  }
}

// Setup this task on import
manager.register(Styles);
