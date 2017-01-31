/**
 *
 * Requires a button/link on the page with a class of .toggle-highcontrast
 * and a data-activetext attribute
 * EG. <a class='toggle-highcontrast' data-activetext='high contrast on'>high contrast off</a>
 * Also needs a <link> tag on the page with a data-highcontrast attr.
 * EG <link rel='stylesheet' href='styles.css' data-highcontrast='styles-highcontrast.css'/>
 *
 */

//
// ─── IMPORT THE FILES WE NEED ───────────────────────────────────────────────────
//

import $ from 'jquery';

//
// ─── THE HIGH CONTRAST FUNCTIONALITY ────────────────────────────────────────────
//

export default class HighContrast {

    constructor(button = false) {
        // grab the button el
        if (!button) {
            this.button = $('.toggle-highcontrast');
        } else {
            this.button = $(button);
        }

        // grab the link el
        this.link = $('head link[data-highcontrast]');
        if (!this.link.length) {
            console.error('Please include a link element with a data-highcontrast attribute pointing to your high contrast css');
            return false;
        }

        // save wether in high contrast mode
        this.highContrast = false;

        // save the button text
        this.origText = this.button.text();
        this.activeText = this.button.attr('data-activetext');

        // save the diff stylesheets
        this.originalStyle = this.link.attr('href');
        this.contrastStyle = this.link.attr('data-highcontrast');

        // on click of the button
        this.button.on('click', (e) => {
            e.preventDefault();
            this.toggle();
        });
    }

    // toggle between high contrast
    toggle() {
        // if in high contrast mode revert to original
        if (this.highContrast) {
            this.link.attr('href', this.originalStyle);
            this.highContrast = false;
            this.button.text(this.origText);
        // else load up the high contrast style sheet
        } else {
            this.link.attr('href', this.contrastStyle);
            this.highContrast = true;
            this.button.text(this.activeText);
        }
    }

    // test high contrast mode
    test() {
        setTimeout(() => {
            console.log('Entering high contrast mode');
            this.toggle();
        }, 4000);
        setTimeout(() => {
            console.log('Leaving high contrast mode');
            this.toggle();
        }, 8000);
    }


}
