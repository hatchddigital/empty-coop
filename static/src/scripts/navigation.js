//
// ─── IMPORT THE FILES WE NEED ───────────────────────────────────────────────────
//

import $ from 'jquery';

//
// ─── NAVIGATION FUNCTIONALITY ───────────────────────────────────────────────────
//

export default function Navigation() {
    // Enable keyboard navigation on drop down style nav's
    const subNavToggle = $('.has-subnav > .nav-list-title');

    subNavToggle.on('focus', () => {
        const subNav = subNavToggle.parent().find('.nav-list-sub');
        const item = subNav.find('.nav-list-title');
        const lastItem = item.last();

        subNav.addClass('nav-list-sub--visible').attr('aria-hidden', 'false');
        item.attr('tabindex', '0');
        lastItem.keydown((e) => {
            if (e.keyCode === 9) {
                subNav.removeClass('nav-list-sub--visible').attr('aria-hidden', 'true');
            }
        });
    });
}
