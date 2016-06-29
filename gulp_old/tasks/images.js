import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import * as config from '../config';

/**
 * Parse js and css files and generate a new modernizer build
 * Notice that modernizr is slow and is only built on production builds.
 */
gulp.task('image-img', function(callback) {
  if (config.PRODUCTION) {
    return gulp.src([`${config.img}/**/*.png`, `${config.img}/**/*.jp*`, `${config.img}/**/*.gif`])
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
      }))
      .pipe(gulp.dest(config.imgmin));
  }
  else {
    callback();
  }
});

/**
 * Parse js and css files and generate a new modernizer build
 * Notice that modernizr is slow and is only built on production builds.
 */
gulp.task('image-svg', function(callback) {
  if (config.PRODUCTION) {
    return gulp.src([`${config.svg}/**/*.svg`])
      .pipe(imagemin({
        svgoPlugins: [{removeViewBox: false}],
      }))
      .pipe(gulp.dest(config.svgmin));
  }
  else {
    callback();
  }
});

/** Run image minification */
gulp.task('images', ['image-img', 'image-svg']);

export function watch() {
  // For compatibility; no actual watch as this is a production only build target
}
