/**
 * Simple node + connect based static web server for
 * quick front end development. Usage:
 *
 * > node server.js
 *
 * This will run a server for empty-coop setting the root
 * to the /static/ directory. For access open your browser and
 * load http://localhost:3000/html/ which will load the default
 * HTML boilerplate page.
 *
 * @see http://www.senchalabs.org/connect/
 */
var connect = require('connect');
var http = require('http');
var app = connect();

// app.use(connect.logger('dev')); // enable full server logging
app.use(connect.static('static'));
app.use(function (req, res) {
    res.end('404. There is no such file.');
});
app.listen(3000);
