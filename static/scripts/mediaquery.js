/**
 * Parse SASS media queries, defined in _breakpoints.scss
 * to pass to Javascript
 * @usage:
 * // Create a new instance of the MediaQuery class
 * var mediaquery =  new mq.MediaQuery();
 * // Check against a specific breakpoint
 *  if ( mediaquery.query('pebble') ){
 *      // Do something
 *  }
 */
define(['jquery', 'exports'], function($, exports) {
    'use strict';

    var MediaQuery = (function () {
        function MediaQuery() {
            this.queries = {};
            try {
                // Parse the queries which are stored in the content of the body.
                var content = $('head').css('font-family');
                content = content.replace(/""/g, '"');
                this.queries = $.parseJSON(content.substr(1, content.length - 2));
            }
            catch(e) {}
        }


        /**
         * Does a check against the given query name and returns if it passes or not.
         *
         * @param string name
         * @return bool
         */
        MediaQuery.prototype.query = function(name) {
            if (typeof(this.queries[name]) != 'undefined') {
                return Modernizr.mq(this.queries[name]);
            }
            return false;
        };

        return MediaQuery;
    })();

    exports.MediaQuery = MediaQuery;
});
