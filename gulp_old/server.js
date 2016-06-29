import * as config from './config';
import node_static from 'node-static';
import express from 'express';
import http from 'http';
import browserSync from 'browser-sync';


// Setup basic server
export function dev_server() {
  console.log(`Serving ${config.server_folder} on port ${config.server_port}`);
  browserSync({
    server: {
      port: config.server_port,
      baseDir: config.server_folder
    }
  });
  /*var app = express();
  app.use('/', express['static'](config.server_folder));
  app.listen(config.server_port, function () {
  });*/
}
