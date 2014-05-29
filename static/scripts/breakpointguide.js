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
                    '<li class="breakpointguide-value breakpointguide-value--minw">'+
                        '<span class="breakpointguide-value-label">Min width</span>'+
                        '<span class="breakpointguide-value-data"></span>'+
                    '</li>'+
                    '<li class="breakpointguide-value breakpointguide-value--maxw">'+
                        '<span class="breakpointguide-value-label">Max width</span>'+
                        '<span class="breakpointguide-value-data"></span>'+
                    '</li>'+
                    '<li class="breakpointguide-value breakpointguide-value--minh">'+
                        '<span class="breakpointguide-value-label">Min height</span>'+
                        '<span class="breakpointguide-value-data"></span>'+
                    '</li>'+
                    '<li class="breakpointguide-value breakpointguide-value--maxh">'+
                        '<span class="breakpointguide-value-label">Max height</span>'+
                        '<span class="breakpointguide-value-data"></span>'+
                    '</li>'+
                    '<li class="breakpointguide-value breakpointguide-value--orientation">'+
                        '<span class="breakpointguide-value-label">Orientation</span>'+
                        '<span class="breakpointguide-value-data"></span>'+
                    '</li>'+
                '</ul>'+
            '</div>';
        $('body').append(bpgmarkup);
    }
    breakpointguide();


});
