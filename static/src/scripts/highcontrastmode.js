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

export default function HighContrast(btn = false) {
    // grab the button el
    let button;
    if (!btn) {
        button = $('.toggle-highcontrast');
    } else {
        button = $(btn);
    }

    // grab the link el
    const link = $('head link[data-highcontrast]');
    if (!link.length) {
        console.error('Please include a link element with a data-highcontrast attribute pointing to your high contrast css');
        return false;
    }

    // save wether in high contrast mode
    let highContrast = false;

    // save the button text
    const origText = button.text();
    const activeText = button.attr('data-activetext');

    // save the diff stylesheets
    const originalStyle = link.attr('href');
    const contrastStyle = link.attr('data-highcontrast');

    // on click of the button
    button.on('click', (e) => {
        e.preventDefault();
        // if in high contrast mode revert to original
        if (highContrast) {
            link.attr('href', originalStyle);
            highContrast = false;
            button.text(origText);
        // else load up the high contrast style sheet
        } else {
            link.attr('href', `${contrastStyle}?r=${Math.random()}`);
            highContrast = true;
            button.text(activeText);
        }
    });
}
