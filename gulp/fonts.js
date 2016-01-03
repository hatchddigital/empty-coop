import {Task, manager} from 'gulp-runtime';
import * as utils from 'gulp-runtime/lib/utils';
import gulp from 'gulp';
import ejs from 'ejs';
import run from 'run-sequence';
import svgfont from 'gulp-svgicons2svgfont';
import shell from 'gulp-shell';
import mkdirp from 'mkdirp';
import fs from 'fs';

export class Fonts extends Task {

  constructor(config) {
    super('Fonts', config);

    // CSS paths
    this.eggbox_mixin = utils.path("static/src/sass/utils/_eggbox.scss");

    // Font paths
    this.fontsvg = utils.path("static/src/custom-eggbox");
    this.fonts = utils.path("static/build/fonts");
    this.eggbox_demo = utils.path("static/build/fonts/eggbox/demo.html");
    this.eggbox_demo_folder = utils.path("static/build/fonts/eggbox");
    this.font_name = "eggbox";
    this.font_path = "../fonts/eggbox"; // Used on frontend

    // Eggbox specific config for webfonts
    this.eggbox = utils.path("node_modules/eggbox/src");
    this.eggbox_mixin_template = utils.path("node_modules/eggbox/templates/eggbox.gulp.css");
    this.eggbox_demo_template = utils.path("node_modules/eggbox/templates/eggbox.gulp.html");
  }

  // Legacy template function
  templated(src, data, target) {
    try {
      var raw = fs.readFileSync(src).toString('utf-8');
      var output = ejs.render(raw, data);
      if (target != null) {
        fs.writeFileSync(target, output);
      }
      return output;
    }
    catch(err) {
      console.log("Failed to render template: " + src);
      console.log(err);
      console.log(err.stack);
    }
    return false;
  }

  tasks() {

    // Generate an svg font from a set of svg icons
    gulp.task('fonts-svg', (callback) => {
        return gulp.src(`${this.eggbox}/**/*.svg`)
          .pipe(svgfont({
            fontName: this.font_name,
            ignoreExt: true
          }))
          .on('glyphs', (glyphs, options) => {

            // Create folder because it may not async have created yet
            mkdirp(this.fonts, (err) => {
              if (err) {
                console.log("Failed to create output folder for fonts");
                console.log(err);
              }
            });

            // Create folder because it may not async have created yet
            mkdirp(this.fonts+"/"+this.font_name, (err) => {
              if (err) {
                console.log("Failed to create output folder for eggbox fonts");
                console.log(err);
              }
            });

            // Build glyph array
            for (var i = 0; i < glyphs.length; ++i) {
              glyphs[i].code = '\\' + glyphs[i].unicode[0].charCodeAt(0).toString(16).toUpperCase();
              glyphs[i].raw = glyphs[i].unicode[0];
            }

            // Makes a url from a format path pair
            var font = (path, type) => {
              return type ? `url("${this.font_path}/${path}") format("${type}")`
                          : `url("${this.font_path}/${path}")`; }

            // To understand these options, look at the eggbox template.
            var options = {};
            options.glyphs = glyphs;
            options.addLigatures = true;
            options.fontfaceStyles = true;
            options.iconsStyles = true;
            options.stylesheet = 'scss';
            options.addLigatures = true;
            options.fontBaseName = this.font_name
            options.fontSrc1 = font(`eggbox.eot`);
            options.fontSrc2 = [
              font(`${this.font_name}.eot?#iefix`, `embedded-opentype`),
              font(`${this.font_name}.woff`, `woff`),
              font(`${this.font_name}.ttf`, `truetype`)
            ].join(', ');

            // Create folder because it may not async have created yet
            mkdirp(this.eggbox_demo_folder, (err) => {
              if (err) {
                console.log("Failed to create demo output folder for eggbox fonts");
                console.log(err);
              }
              else {
                this.templated(this.eggbox_demo_template, options, this.eggbox_demo);
                this.templated(this.eggbox_mixin_template, options, this.eggbox_mixin);
              }
            });
          })
          .pipe(gulp.dest(this.fonts+"/"+this.font_name));
    });

    // Use svg2ttf to convert an svg font to ttf
    gulp.task('fonts-ttf', ['fonts-svg'], (callback) => {
      return gulp.src(`${this.fonts}/**/*.svg`, { read: false })
        .pipe(shell([
          'svg2ttf <%= file.path %> <%= f(file.path) %>',
        ], {
          templateData: {
            f: (path) => {
              return path.replace(/\.svg$/, '.ttf');
            }
          }
        }));
    });

    // Use ttf2woff to convert a ttf font to woff
    gulp.task('fonts-woff', ['fonts-ttf'], (callback) => {
      return gulp.src(`${this.fonts}/**/*.ttf`, { read: false })
        .pipe(shell([
          'ttf2woff <%= file.path %> <%= f(file.path) %>',
        ], {
          templateData: {
            f: (path) => {
              return path.replace(/\.ttf$/, '.woff');
            }
          }
        }));
    });

    // Use ttf2eot to convert a ttf font to eot
    gulp.task('fonts-eot', ['fonts-ttf'], (callback) => {
      return gulp.src(`${this.fonts}/**/*.ttf`, { read: false })
        .pipe(shell([
          'ttf2eot <%= file.path %> <%= f(file.path) %>',
        ], {
          templateData: {
            f: (path) => {
              return path.replace(/\.ttf$/, '.eot');
            }
          }
        }));
    });

    gulp.task('fonts-all', (callback) => {
      run('fonts-svg', 'fonts-ttf', 'fonts-woff', 'fonts-eot', () => {
        callback();
      });
    })

    gulp.task('fonts', (callback) => {
      if (this.config.PRODUCTION) {
        run('fonts-all', () => { callback(); });
      }
      else {
        callback();
      }
    })
  }
}

// Setup this task on import
manager.register(Fonts);
