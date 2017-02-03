
//
// ─── IMPORT THE FILES WE NEED ───────────────────────────────────────────────────
//

import $ from 'jquery';

//
// ─── HANDLE ADDING THE USE ELEMENT TO DATA SVG ELEMENTS ─────────────────────────
//

// example usage... <span data-svg='name-of-svg-file'></span>
$('[data-svg]').each(function () {
    const svg = $(this);
    const id = svg.attr('data-svg');
    const content = `<svg class='svg-${id}' 'xmlns=http://www.w3.org/2000/svg role='img'><use xlink:href='#${id}'></use></svg>`;
    svg.html(content);
});
