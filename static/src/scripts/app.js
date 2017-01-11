/**
 * HATCHD DIGITAL CLIENT SIDE APP
 *
 * This code has been developed in house at HATCHD DIGITAL.
 *
 * @author Hatchd Digital <hello@hatchd.com.au>
 * @see http://hatchd.com.au/
 */

//
// ─── IMPORT THE FILES WE NEED ───────────────────────────────────────────────────
//

window.$ = window.jQuery = require("jquery");
import MediaQuery from './mediaquery';
import breakpointguide from './breakpointguide';

//
// ─── EXAMPLES OF USING BROWSERIFY ON FRONTEND TO LOAD NPM MODULE ────────────────
//

// Used the same way as in the gulp file
// EXAMPLE...
//-------------------------------------------------
// NPM install --save slick-carousel-browserify
// var slick = require("slick-carousel-browserify");
//-------------------------------------------------
// no more is needed

console.log("-------------------------------------------------------------------");
console.log("TESTING BROWSERIFY");
console.log("-------------------------------------------------------------------");

import slick from "slick-carousel-browserify";
console.log("SLICK NPM MODULE =>",slick);

import lightbox from "lightbox2";
console.log("LIGHTBOX NPM MODULE =>",lightbox);

console.log("-------------------------------------------------------------------");
console.log("END TESTING BROWSERIFY");
console.log("-------------------------------------------------------------------");

//
// ─── EXMAPLE OF IMPORTING AND USING ES6 CLASS ───────────────────────────────────
//

// import the class. must be wrapped in curly braces unlike importing a function
console.log("-------------------------------------------------------------------");
console.log("TESTING ES6 CLASSES");
console.log("-------------------------------------------------------------------");

import {testClass} from './es6.class';
// create new instance of the class and send in 2 variables
let test = new testClass("foo",undefined);
// this will print out the string "foo" defined above
test.printVar1();
// this will print out the default for the var2 variable defined in the constructor of the class
test.printVar2(); 
// this will print out the result of an external function in es6.function.js imported from within the class
test.printExternalFunctionVar();
//import the same function used in the test class
import aFunction from './es6.function';
let foo = aFunction("bar");
console.log("The value returned from the imported es6 function is "+foo);

console.log("-------------------------------------------------------------------");
console.log("END TESTING ES6 CLASSES");
console.log("-------------------------------------------------------------------");

//
// ─── EXAMPLE USAGE OF MEDIA QUERIES ─────────────────────────────────────────────
//

let MQ = new MediaQuery();
console.log("TODO: fix media queries"); 
(function resize(){
    //console.log(MQ);
    if(MQ.query("medium")){
        console.log("Medium breakpoint reached");
    }
    $(window).on("resize",this);
})();

//
// ─── ENABLE BREAKPOINT GUIDE ────────────────────────────────────────────────────
//

new breakpointguide();

//
// ─── HANDLE ADDING THE USE ELEMENT TO DATA SVG ELEMENTS ─────────────────────────
//

// example usage... <span data-svg='name-of-svg-file'></span>
$("[data-svg]").each(function(){
    let svg = $(this);
    let id = svg.attr("data-svg");
    let content = "<svg class='svg-"+id+"' 'xmlns=http://www.w3.org/2000/svg role='img'><use xlink:href='#"+id+"'></use></svg>";
    svg.html(content);
});

//
// ─── AND WE ARE GOOD TO GO ──────────────────────────────────────────────────────
//

// sitewide specific code
console.log("GO GO GADGET WEBSITE");
