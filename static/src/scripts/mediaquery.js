/**
 * Parse SASS media queries, defined in _breakpoints.scss
 * to pass to Javascript
 * @usage:
 * // Create a new instance of the MediaQuery class
 * var mediaquery =  new MediaQuery();
 * // Check against a specific breakpoint
 *  if ( mediaquery.query('pebble') ){
 *      // Do something
 *  }
 */

//
// ─── IMPORT THE FILES WE NEED ───────────────────────────────────────────────────
//

import $ from 'jquery';

//
// ─── THE MEDIA QUERY CLASS ──────────────────────────────────────────────────────
//

export default class MediaQuery {
    constructor(debug = false) {
        // add the parser to the page
        this.parser = $('#mq-parser');
        if (!this.parser.length) {
            this.parser = $("<div class='mq-parser'></div>");
            $('body').append(this.parser);
        }
        if (debug) {
            this.parser.addClass('mq-parser--debug');
        }
        // grab the breakpoints
        this.points = this.getPoints();
        // add all the breakpoint elements
        this.addElements();
        // set the curret query
        this.currentQuery = this.getQuery();
        // update on resize
        const self = this;
        $(window).on('resize', () => {
            self.currentQuery = self.getQuery();
        });
    }

    // get all the breakpoints
    getPoints() {
        return window
            .getComputedStyle(this.parser.get(0), ':after')
            .getPropertyValue('content')
            .replace(/"/g, '')
            .split(',');
    }

    // add the breakpoint elements
    addElements() {
        this.parser.html('');
        this.breakpoints = [];
        $.each(this.points, (i, point) => {
            const bp = $(`<div class='${point}'>${point}</div>`);
            this.parser.append(bp);
            this.breakpoints.push(bp);
        });
    }

    // get the current queries
    getQuery() {
        const bps = [];
        $.each(this.breakpoints, function() {
            const bp = $(this);
            if (bp.is(':visible')) {
                bps.push(bp.text());
            }
        });
        return bps;
    }

    // query the breakpoints
    query(point) {
        const bps = this.getQuery();
        this.currentQuery = bps;
        if ($.inArray(point, bps) !== -1) {
            return true;
        }
        return false;
    }
}
