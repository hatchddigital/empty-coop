import gulp from 'gulp';
import jade from 'gulp-jade';
import fs from 'fs';
import path from 'path';
import data from 'gulp-data';
import * as config from '../config';
import browserSync from 'browser-sync';

/// Build all static templates
gulp.task('templates', function() {

  //get the options
  var locals = config.read(config.templates + '/locals.json');

  // Process all jade files in the templates folder and push the results to the html folder.
  return gulp.src(config.templates + '/*.jade')
    .pipe(data(function(file){
        var fileName = path.basename(file.path).replace(".jade","-template");
        locals.template = fileName;
    }))
    .pipe(jade({
      locals:locals,
      pretty:true
    }))
    .pipe(gulp.dest(config.html));
});

// Watch and livereload
gulp.task('templates-watch', ['templates'], browserSync.reload);

export function watch() {
  gulp.watch([config.templates + '/**/*.json'], ['templates-watch']);
  gulp.watch([config.templates + '/**/*.jade'], ['templates-watch']);
}
