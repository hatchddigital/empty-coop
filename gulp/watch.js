import gulp from 'gulp';
import {dev_server} from './server';
import * as config from './config';

// Import the various watch tasks
import * as fonts from './tasks/fonts';
import * as templates from './tasks/templates';
import * as scripts from './tasks/scripts';
import * as styles from './tasks/styles';
import * as modernizr from './tasks/modernizr';
import * as images from './tasks/images';
import * as backstop from './tasks/backstop';

gulp.task('watch', ['default'], function() {

  // Start local watch server
  dev_server();

  // Watch for changes
  templates.watch();
  scripts.watch();
  styles.watch();
  modernizr.watch();
  images.watch();
  fonts.watch();
  backstop.watch();
});
