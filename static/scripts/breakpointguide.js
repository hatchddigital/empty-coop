/**
 * Breakpoint guide
 */

define(['jquery'], function ($) {
    'use strict';
    var useguide = true;
    function breakpointguide(){
        var bpgmarkup =
            '<div class="breakpointguide">'+
                '<link rel="stylesheet" href="../stylesheets/breakpointguide.css" />'+
                '<span class="breakpointguide-label"></span>'+
                '<span class="breakpointguide-value"></span>'+
            '</div>';
        $('body').append(bpgmarkup);
    }
    if(useguide){
        breakpointguide();
    }
});

