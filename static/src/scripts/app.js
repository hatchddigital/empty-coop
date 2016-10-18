/**
 * HATCHD DIGITAL CLIENT SIDE APP
 *
 * This code has been developed in house at HATCHD DIGITAL.
 *
 * @author Hatchd Digital <hello@hatchd.com.au>
 * @see http://hatchd.com.au/
 */

window.$ = window.jQuery = require("jquery");
import {MediaQuery} from './mediaquery';
import breakpointguide from './breakpointguide';
import ie8message from './ie8message';

//examples of using browserify on frontend to load npm module
var slick = require("slick-carousel-browserify");
console.log(slick);

var lightbox = require("lightbox2");
console.log(lightbox);
//end examples

// Example usage of media queries
var mediaquery =  new MediaQuery();
if (mediaquery.query('pebble')){
    window.console.log('Media Query function is being called correctly');
}

// Enable breakpoint guide
breakpointguide();

//svg icons
$("[data-svg]").each(function(){
    var svg = $(this);
    var id = svg.attr("data-svg");
    var content = "<svg class='svg-"+id+"' 'xmlns=http://www.w3.org/2000/svg role='img'><use xlink:href='#"+id+"'></use></svg>";
    svg.html(content);
});

// Sitewide specific code
window.console.log('Lock and loaded');
