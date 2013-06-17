/**
 * HATCHD DIGITAL CLIENT SIDE APP
 *
 * DESCRIPTION:
 *
 * This client side code...
 *
 * This code has been developed in house at HATCHD DIGITAL.
 *
 * @author Hatchd Digital <hello@hatchd.com.au>
 * @see http://hatchd.com.au/
 * @contributor Jimmy Hillis <jimmy@hatchd.com.au>
 * @contributor Niaal Holder <niaal@hatchd.com.au>
 * @contributor Neil Ferreira <neil@hatchd.com.au>
 *
 * FOR DEVELOPERS:
 *
 * ALL external libraries and should be imported here, using a buildout
 * application e.g. CodeKit or Grunt. This vesion of the file should be pretty,
 * well formatted, and only contain code that is unique to your OWN app.
 * Your site should always use /app-min.js when loading, which contains
 * a minified version of this script prepended with all external scripts.
 *
 * STYLE:
 *
 * All code should be within 79 characters wide to meet standard Hatchd
 * protocol. Reformat code cleanly to fit within this tool.
 *
 */

require.config({
    paths: {
        jquery: '../libs/jquery/jquery'
    }
});

require([], function () {
    'use strict';

    // Load correct modules for correct pages
    require([document.body.id]);
});
