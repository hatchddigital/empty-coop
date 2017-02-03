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

import $ from 'jquery';
import Slick from 'slick-carousel-browserify';
import Lightbox from 'lightbox2';
import MediaQuery from './mediaquery';
import breakpointguide from './breakpointguide';
import HighContrast from './highcontrastmode';
import TestClass from './es6.class';
import aFunction from './es6.function';
import './svgs';

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

console.log('-------------------------------------------------------------------');
console.log('TESTING BROWSERIFY');
console.log('-------------------------------------------------------------------');

// slick slider module loaded from NPM via import above
console.log('SLICK NPM MODULE =>', Slick);

// lightbox module loaded from NPM via import above
console.log('LIGHTBOX NPM MODULE =>', Lightbox);

console.log('-------------------------------------------------------------------');
console.log('END TESTING BROWSERIFY');
console.log('-------------------------------------------------------------------');

//
// ─── EXMAPLE OF IMPORTING AND USING ES6 CLASS ───────────────────────────────────
//

console.log('-------------------------------------------------------------------');
console.log('TESTING ES6 CLASSES');
console.log('-------------------------------------------------------------------');

// create new instance of the class and send in 2 variables
const test = new TestClass('foo', undefined);
// this will print out the string "foo" defined above
test.printVar1();
// this will print out the default for the var2 variable defined in the constructor of the class
test.printVar2();
// this will print out the result of an external function in es6.function.js
// imported from within the class
test.printExternalFunctionVar();
// import the same function used in the test class
const foo = aFunction('bar');
console.log(`The value returned from the imported es6 function is ${foo}`);

console.log('-------------------------------------------------------------------');
console.log('END TESTING ES6 CLASSES');
console.log('-------------------------------------------------------------------');

//
// ─── EXAMPLE USAGE OF MEDIA QUERIES ─────────────────────────────────────────────
//

console.log('-------------------------------------------------------------------');
console.log('TESTING MEDIAQUERY.JS');
console.log('-------------------------------------------------------------------');

// create new media query instance, remove true param to turn off debug
// this returns any matching breakpoints defined in _breakpoints.scss
const mq = new MediaQuery(true);
console.log('current matching breakpoints', mq.currentQuery);
$(window).on('resize', () => {
    if (mq.query('medium')) {
        console.log('MediaQuery reporting in medium breakpoint');
    }
});

console.log('-------------------------------------------------------------------');
console.log('END TESTING MEDIAQUERY.JS');
console.log('-------------------------------------------------------------------');

//
// ─── ENABLE BREAKPOINT GUIDE ────────────────────────────────────────────────────
//

breakpointguide();

//
// ─── ENABLE HIGH CONTRAST CSS ───────────────────────────────────────────────────
//

HighContrast('.toggle-highcontrast');

//
// ─── AND WE ARE GOOD TO GO ──────────────────────────────────────────────────────
//

// sitewide specific code
console.log('GO GO GADGET WEBSITE');
