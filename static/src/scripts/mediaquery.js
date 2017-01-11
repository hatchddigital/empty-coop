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
import $ from 'jquery';

export default function mediaQuery() {

    var self = this;

    /** Construct a new instance */
    self.constructor = function () {
        self.queries = {};
        try {
            // Parse the queries which are stored in the content of the body.
            var content = $('head').css('font-family');
            //console.log(content);
            content = content.trim().substring(1, content.length - 1).split(",");
            var jsonstring = [];
            $.each(content, function (i, query) {
                query = query.split("|");
                jsonstring.push('"' + query[0] + '":"' + query[1] + '"');
            });
            jsonstring = "{" + jsonstring.join(",") + "}";
            self.queries = $.parseJSON(jsonstring);
            //console.log(self.queries);
        } catch (e) {}
    }();

    /**
     * Does a check against the given query name and returns if it passes or not.
     *
     * @param string name
     * @return bool
     */
    self.query = function (name) {
        if (typeof (self.queries[name]) != 'undefined') {
            return window.matchMedia(self.queries[name]).matches;
        }
        return false;
    }

}