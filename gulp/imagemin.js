import {Task, manager} from 'gulp-runtime';
import * as utils from 'gulp-runtime/lib/utils';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';

export class ImageMin extends Task {

  constructor(config) {
    super("ImageMin", config);

    // Image paths
    this.images = `${config.src}/images/**/*`;
    this.images_out = `${config.build}/images`;

    // SVG paths
    this.svg = `${config.src}/svg/**/*`;
    this.svg_out = `${config.build}/svg`;
  }

  tasks() {

    // Minify images only in production mode
    gulp.task('imagemin-img', (callback) => {
      if (this.config.PRODUCTION) {
        return gulp.src(this.images)
          .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
          }))
          .pipe(gulp.dest(this.images_out));
      }
      else {
        callback();
      }
    });

    // Minify svg in production mode
    gulp.task('imagemin-svg', (callback) => {
      if (this.config.PRODUCTION) {
        return gulp.src(this.svg)
          .pipe(imagemin({
            svgoPlugins: [{removeViewBox: false}],
          }))
          .pipe(gulp.dest(this.svg_out));
      }
      else {
        callback();
      }
    });

    // All image minification tasks
    gulp.task('imagemin', ['imagemin-img', 'imagemin-svg']);
  }
}

// Setup this task on import
manager.register(ImageMin);
