import p from 'path';
import fs from 'fs';
import ejs from 'ejs';
import yargs from 'yargs';

/** Turn an arbitrary path into an absolute path relative to the root of the folder */
export function path(relative_path) {
  return p.resolve(p.join(__dirname, '..', '..', relative_path))
}

/** Read a file from a relative path */
export function read(path) {
  return JSON.parse(fs.readFileSync(path));
}

/** Render an ejs template with a data block */
export function templated(src, data, target) {
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

/**
 * Check for production mode
 * To use: gulp default --mode=production
 * By default this is run the first time we run gulp
 */
export function default_args(config) {
  config.PRODUCTION = yargs.argv.mode == 'production';
  try { read('.build', true); }
  catch(err) {
    if (!config.PRODUCTION) {
      console.log("Never run gulp before, defaulting to production build");
      config.PRODUCTION = true;
    }
  }
}

/** Build is successful */
export function build_success(config) {
  var mode = config.PRODUCTION ? 'production' : 'default';
  write('.build', { mode: mode, build: new Date() }, true);
}

/**
 * Write a file to a path synchronously
 * @param target The file to write
 * @param value The hash to convert to json and store
 * @param relative If this is a relative path, otherwise use absolute loading
 * @return true on success and false on failure
 */
export function write(target, value, relative) {
  if (relative) { target = path(target); }
  try {
    value = JSON.stringify(value);
    fs.writeFileSync(target, value);
    return true;
  }
  catch(err) {
    console.log('Failed to write to path: ' + target);
    console.log(err);
    console.log(err.stack);
    return false;
  }
}
