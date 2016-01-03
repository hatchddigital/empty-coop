import {Task, manager} from 'gulp-runtime';
import * as utils from 'gulp-runtime/lib/utils';
import gulp from 'gulp';
import section from 'gulp-section';
import markdown from 'gulp-markdown';
import rename from 'gulp-rename';
import toml from 'gulp-toml';
import browserSync from 'browser-sync';
import magicTemplate from 'gulp-magic-template';
import summary from 'gulp-summary';
import jade from 'gulp-jade';
import run from 'run-sequence';

export class Content extends Task {

  constructor(config) {
    super('Content', config);

    // For globals for all content to share
    this.global_raw = `${config.src}/content/**/*.toml`;
    this.global_folder = `${config.tmp}/globals/`;
    this.global_files = `${config.tmp}/globals/**/*.json`;

    // Content paths
    this.build = config.build;
    this.tmp = `${config.tmp}/content`;

    // Source files to generate parts from
    this.src = `${config.src}/content/**/*.md`;

    // All parts to reassemble
    this.parts = [`${config.tmp}/content/**/*`, this.global_files];
    this.metadata = `${config.tmp}/content/**/*.json`;

    // Paths to use to generate jade templates from parts
    this.templates = `${config.src}/jade/`;
    this.magic = utils.template(`${config.src}/jade/magic.jade.in`);

    // Jade paths
    this.jade_folder = `${config.tmp}/content`;
    this.jade_files = `${config.tmp}/content/**/*.jade`;
  }

  tasks() {

    // All content
    gulp.task('content', function(callback) {
      run('content-build-jade', 'content-jade', callback);
    });

    // Compile jade files
    gulp.task('content-jade', () => {
      return gulp.src(this.jade_files)
        .pipe(jade({
          basedir: this.templates
        }))
        .pipe(gulp.dest(this.build));
    });

    // Force all subtasks to finish
    gulp.task('content-build-deps', function(callback) {
      run('content-markdown', 'content-toml', 'content-globals', 'content-metadata', callback);
    });

    // Build jade files out of parts
    gulp.task('content-build-jade', ['content-build-deps'], () => {
      return gulp.src(this.parts)
        .pipe(magicTemplate({
          patterns: {
            html: /.*content(.*)\.html/,
            json: /.*content(.*)\.json/
          },
          globals: {
            global: /.*globals(.*)globals\.json$/,
            pages: /.*globals(.*)pages\.json$/
          },
          action: (data) => {
            var metadata = JSON.parse(data.json.value);
            var template = '/' + metadata.template;
            return this.magic({
              locals: {
                metadata: data.json.value,
                content: JSON.stringify(data.html.value.trim()),
                globals: data.global.value,
                pages: data.pages.value
              },
              template: template
            });
          },
          path: (data) => { return data.html.path; },
          debug: (data) => {
            if (data.incomplete != 0) {
              console.log("WARNING: The magic template did not complete all patterns.")
              console.log(data);
            }
          }
        }))
        .pipe(rename((path) => { path.extname = '.jade'; }))
        .pipe(gulp.dest(this.jade_folder));
    });

    // Take last part of source files as markdown
    gulp.task('content-markdown', () => {
      return gulp.src(this.src)
        .pipe(section({ start: /^--$/ }))
        .pipe(markdown())
        .pipe(rename((path) => { path.extname = '.html'; }))
        .pipe(gulp.dest(this.tmp));
    });

    // Take first part of source files as toml
    gulp.task('content-toml', () => {
      return gulp.src(this.src)
        .pipe(section({ end: /^--$/ }))
        .pipe(toml())
        .pipe(rename((path) => { path.extname = '.json'; }))
        .pipe(gulp.dest(this.tmp));
    });

    // Compile global files into includes
    gulp.task('content-globals', () => {
      return gulp.src(this.global_raw)
        .pipe(toml())
        .pipe(gulp.dest(this.global_folder));
    });

    // Combine metadata files so we can have an index
    // Notice we generate the 'url' magic key here, automatically.
    gulp.task('content-metadata', () => {
      return gulp.src(this.metadata)
        .pipe(summary({
          filename: 'pages.json',
          basePath: this.tmp,
          handler: (v) => {
            var rtn = [];
            for (var i = 0; i < v.length; ++i) {
              var page = utils.json(`${this.tmp}/${v[i]}`);
              page.url = '/' + v[i].replace(/.json$/, '.html');
              rtn.push(page);
            }
            return JSON.stringify(rtn);
          }
        }))
        .pipe(gulp.dest(this.global_folder));
    });

    // Watch
    gulp.task('content-sync', ['content'], browserSync.reload);
  }

  watch() {
    gulp.watch([this.src, `${this.templates}/**/*.jade`], ['content-sync']);
  }
}

// Setup this task on import
manager.register(Content);
