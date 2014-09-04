/**
 * Breakpoint guide
 */

define(['jquery'], function ($) {
    'use strict';

    function breakpointguide(){
        var bpgmarkup =
            '<div class="breakpointguide">'+
                '<link rel="stylesheet" href="../stylesheets/breakpointguide.css" />'+
                '<span class="breakpointguide-label"></span>'+
                '<ul class="breakpointguide-values">'+
                    '<li class="breakpointguide-value">'+
                    '</li>'+
                '</ul>'+
            '</div>';
        $('body').append(bpgmarkup);
    }
    breakpointguide();


});
