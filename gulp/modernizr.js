import {Task, manager} from 'gulp-runtime';
import * as utils from 'gulp-runtime/lib/utils';
import modernizr from 'gulp-modernizr';
import uglify from 'gulp-uglify';
import gulp from 'gulp';

export class Modernizr extends Task {

  constructor(config) {
    super('Modernizr', config);
    this.dest = `${config.build}/scripts/modernizer.min.js`;
    this.src = [`${config.build}/**/*.js}`, `${config.build}/**/*.css`, `!${this.dest}`];
  }

  tasks() {
    // Parse js and css files and generate a new modernizer build
    // Notice that modernizr is slow and is only built on production builds.
    gulp.task('modernizr', (callback) => {
      if (this.config.PRODUCTION) {
        return gulp.src(this.src)
          .pipe(modernizr('modernizr.min.js', {
            devFile: 'remote',
            options: [
                'setClasses',
                'addTest',
                'html5printshiv',
                'testProp',
                'fnBind'
            ],
            parseFiles: true
          }))
          .pipe(uglify())
          .pipe(gulp.dest(this.dest));
      }
      else {
        callback();
      }
    });
  }
}

// Setup this task on import
manager.register(Modernizr);
