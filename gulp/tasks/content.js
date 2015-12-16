import gulp from 'gulp';
import markdown from 'gulp-markdown';
import toml from 'gulp-toml';
import * as config from '../config';

/// All content
gulp.task('content', ['content-markdown']);

/// Create all content items
gulp.task('content-markdown', function() {
  return gulp.src(config.content.raw + '/**/*.markdown')
    .pipe(markdown()
    .pipe(gulp.dest(config.content.build));
});

// Watch and livereload
gulp.task('templates-content', ['content'], browserSync.reload);

export function watch() {
  gulp.watch([config.content.raw + '/**/*.markdown'], ['templates-content']);
}
