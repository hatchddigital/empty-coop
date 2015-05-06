/**
 * HATCHD DIGITAL CLIENT SIDE APP
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
 * ALL external libraries and should be imported here, using a build
 * script like Grunt. This version of the file should be pretty, well
 * formatted, and only contain code that is unique to your own app.
 * Your site should always use /app-min.js when loading, which contains a
 * minified version of this script prepended with all.
 *
 * STYLE:
 *
 * All code should be within 79 characters wide to meet standard Hatchd
 * protocol. Reformat code cleanly to fit within this tool.
 *
 */

require.config({
    paths: {
        jquery: '../libs/jquery/jquery',
        mediaquery: './mediaquery'
    }
});

require(
    [
        'jquery',
        'mediaquery',
        './breakpointguide',
        './ie8message'
    ],
    function ($,mq) {
    'use strict';

    /**
     * Load view-specific requirements for pages
     * @return {void}
     */
    (function () {
        var supported_sections = {
           // 'view-homepage': 'homepage'
        };
        // Loop through each body class name to find view specific classes
        $.each(document.body.className.split(' '), function (index, _class) {
            if (_class in supported_sections) {
                require([supported_sections[_class]]);
            }
        });
    }());

    // Sitewide specific code
    window.console.log('Lock and loaded');

    /**
     * Example mediaquery.js usage
     */
    var mediaquery =  new mq.MediaQuery();
    if ( mediaquery.query('pebble') ){
        window.console.log('Media Query function is being called correctly');
    }

});
