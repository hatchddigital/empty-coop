/**
 * HATCHD DIGITAL CLIENT SIDE APP
 *
 * This code has been developed in house at HATCHD DIGITAL.
 *
 * @author Hatchd Digital <hello@hatchd.com.au>
 * @see http://hatchd.com.au/
 */
import $ from 'jquery';
import {MediaQuery} from './mediaquery';
import breakpointguide from './breakpointguide';
import ie8message from './ie8message';

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

// Example usage of media queries
var mediaquery =  new MediaQuery();
if (mediaquery.query('pebble')){
    window.console.log('Media Query function is being called correctly');
}

// Enable breakpoint guide
breakpointguide();

// Sitewide specific code
window.console.log('Lock and loaded');
