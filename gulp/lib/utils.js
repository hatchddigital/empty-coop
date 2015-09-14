import p from 'path';
import fs from 'fs';
import ejs from 'ejs';

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
