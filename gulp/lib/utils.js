import p from 'path';
import fs from 'fs';
import ejs from 'ejs';

/** Turn an arbitrary path into an absolute path relative to the root of the folder */
export function path(relative_path) {
  return p.resolve(p.join(__dirname, '..', '..', relative_path))
}

/**
 * Read a file from a path synchronously
 * @param target The file to open and parse as json
 * @param relative If this is a relative path, otherwise use absolute loading
 * @return A parsed json block or null.
 */
export function read(target, relative) {
  if (relative) { target = path(target); }
  try {
    return JSON.parse(fs.readFileSync(target));
  }
  catch(err) {
    return null;
  }
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
