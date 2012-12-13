/**
 * HATCHD DIGITAL EMPTY COOP WEB APPLICATION FRAMEWORK
 *
 * ATTRIBUTION-NONCOMMERCIAL-SHAREALIKE 3.0 UNPORTED
 *
 * THE WORK (AS DEFINED BELOW) IS PROVIDED UNDER THE TERMS OF THIS CREATIVE
 * COMMONS PUBLIC LICENSE ("CCPL" OR "LICENSE"). THE WORK IS PROTECTED BY
 * COPYRIGHT AND/OR OTHER APPLICABLE LAW. ANY USE OF THE WORK OTHER THAN AS
 * AUTHORIZED UNDER THIS LICENSE OR COPYRIGHT LAW IS PROHIBITED.
 *
 * BY EXERCISING ANY RIGHTS TO THE WORK PROVIDED HERE, YOU ACCEPT AND AGREE
 * TO BE BOUND BY THE TERMS OF THIS LICENSE. TO THE EXTENT THIS LICENSE MAY
 * BE CONSIDERED TO BE A CONTRACT, THE LICENSOR GRANTS YOU THE RIGHTS
 * CONTAINED HERE IN CONSIDERATION OF YOUR ACCEPTANCE OF SUCH TERMS AND
 * CONDITIONS.
 *
 * This code has been developed in house at HATCHD DIGITAL.
 * @see http://hatchd.com.au
 *
 * DEVELOPER USAGE:
 *
 * ALL external libraries and should be imported here, using a buildout
 * application e.g. CodeKit. This vesion of the file should be pretty,
 * well formatted, and only contain code that is unique to your OWN app.
 * Your site should always use /app-min.js when loading, which contains
 * a minified version of this script prepended with all external scripts.
 *
 */

 // REQUIRED
 // @required jquery (v1.7.0+)

 // IMPORTS
 // @import hatchdlings.module.js

 // VALIDATION
 // All code must validate with JSHint (http://www.jshint.com/) to be launched
 // within a LIVE web application. NO debug code should remain in your final
 // versions e.g. remove EVERY reference to window.console.log().

 // STYLE
 // All code should be within 79 characters WIDE to meet standard Hatchd
 // protocol. Reformat code cleanly to fit within this tool.

 // _jshint = { "laxcomma": true, "laxbreak": true, "browser": true }

/* MODULE DEFINITION */

;(function ($) {

    "use strict";

    var Module = function (settings) {
        // Default settings
        this.element = settings.element || null;
        return this;
    };

    /* MODULE PUBLIC METHODS */

    // Updates the UI to view the next element
    Module.prototype.next = function () {

    };
    // Updates the UI to view the previous element
    Module.prototype.prev = function () {

    };

    /* JQUERY PLUGIN */

    $.fn.moduleCaller = function (options) {
        return this.each(function () {
            var $this = $(this)
              , module = $this.data('module');
            // If we can't find an existing module, create a new one
            if (!module) {
                $this.data('module', (module = new Module({ 'element': this })));
            }

            // ATTACH EVENTS
            $this.find('.trigger').on('click', function () {
            // note: example code only, do not use.
                module.next();
            });
        });
    };

}(window.jQuery));