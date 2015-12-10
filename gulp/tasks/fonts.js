import gulp from 'gulp';
import ejs from 'ejs';
import run from 'run-sequence';
import svgfont from 'gulp-svgicons2svgfont';
import shell from 'gulp-shell';
import mkdirp from 'mkdirp';
import * as config from '../config';

// Generate an svg font from a set of svg icons
gulp.task('fonts-svg', function(callback) {
    return gulp.src(`${config.eggbox}/**/*.svg`)
      .pipe(svgfont({
        fontName: config.font_name,
        ignoreExt: true
      }))
      .on('glyphs', (glyphs, options) => {

        // Create folder because it may not async have created yet
        mkdirp(config.fonts, function(err) {
          if (err) {
            console.log("Failed to create output folder for fonts");
            console.log(err);
          }
        });

        // Create folder because it may not async have created yet
        mkdirp(config.fonts+"/"+config.font_name, function(err) {
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
          return type ? `url("${config.font_path}/${path}") format("${type}")`
                      : `url("${config.font_path}/${path}")`; }

        // To understand these options, look at the eggbox template.
        var options = {};
        options.glyphs = glyphs;
        options.addLigatures = true;
        options.fontfaceStyles = true;
        options.iconsStyles = true;
        options.stylesheet = 'scss';
        options.addLigatures = true;
        options.fontBaseName = config.font_name
        options.fontSrc1 = font(`eggbox.eot`);
        options.fontSrc2 = [
          font(`${config.font_name}.eot?#iefix`, `embedded-opentype`),
          font(`${config.font_name}.woff`, `woff`),
          font(`${config.font_name}.ttf`, `truetype`)].join(', ');

        config.templated(config.eggbox_demo_template, options, config.eggbox_demo);
        config.templated(config.eggbox_mixin_template, options, config.eggbox_mixin);
      })
      .pipe(gulp.dest(config.fonts+"/"+config.font_name));
});

// Use svg2ttf to convert an svg font to ttf
gulp.task('fonts-ttf', ['fonts-svg'], function(callback) {
  return gulp.src(`${config.fonts}/**/*.svg`, { read: false })
    .pipe(shell([
      'svg2ttf <%= file.path %> <%= f(file.path) %>',
    ], {
      templateData: {
        f: function(path) {
          return path.replace(/\.svg$/, '.ttf');
        }
      }
    }));
});

// Use ttf2woff to convert a ttf font to woff
gulp.task('fonts-woff', ['fonts-ttf'], function(callback) {
  return gulp.src(`${config.fonts}/**/*.ttf`, { read: false })
    .pipe(shell([
      'ttf2woff <%= file.path %> <%= f(file.path) %>',
    ], {
      templateData: {
        f: function(path) {
          return path.replace(/\.ttf$/, '.woff');
        }
      }
    }));
});

// Use ttf2eot to convert a ttf font to eot
gulp.task('fonts-eot', ['fonts-ttf'], function(callback) {
  return gulp.src(`${config.fonts}/**/*.ttf`, { read: false })
    .pipe(shell([
      'ttf2eot <%= file.path %> <%= f(file.path) %>',
    ], {
      templateData: {
        f: function(path) {
          return path.replace(/\.ttf$/, '.eot');
        }
      }
    }));
});

gulp.task('fonts-all', function(callback) {
  run('fonts-svg', 'fonts-ttf', 'fonts-woff', 'fonts-eot', function() {
    callback();
  });
})

gulp.task('fonts', function(callback) {
  if (config.PRODUCTION) {
    run('fonts-all', function() { callback(); });
  }
  else {
    callback();
  }
})

export function watch() {
  // For compatibility; no actual watch as this is a production only build target
}
