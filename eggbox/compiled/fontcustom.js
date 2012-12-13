/**
 * ICON FONT FIX
 *
 * Font fix script moves through all generated supporting browsers (e.g. those
 * that don't support :before/:after) and adding in a new span element with
 * the proper font character code.
 * The character codes MUST be added to the icon_codes array for this
 * technique to function correctly.
 *
 */

$(document).ready(function () {
    if (!Modernizr.generatedcontent) {
        var icon_codes = {
            
            'arrows-full-down': '&#xf100;', 
            'arrows-full-left': '&#xf101;', 
            'arrows-full-right': '&#xf102;', 
            'arrows-full-up': '&#xf103;', 
            'arrows-fullinverted-down': '&#xf104;', 
            'arrows-fullinverted-left': '&#xf105;', 
            'arrows-fullinverted-right': '&#xf106;', 
            'arrows-fullinverted-up': '&#xf107;', 
            'arrows-hairline-down': '&#xf108;', 
            'arrows-hairline-left': '&#xf109;', 
            'arrows-hairline-right': '&#xf10a;', 
            'arrows-hairline-up': '&#xf10b;', 
            'arrows-keyline-down': '&#xf10c;', 
            'arrows-keyline-left': '&#xf10d;', 
            'arrows-keyline-right': '&#xf10e;', 
            'arrows-keyline-up': '&#xf10f;', 
            'arrows-outline-down': '&#xf110;', 
            'arrows-outline-left': '&#xf111;', 
            'arrows-outline-right': '&#xf112;', 
            'arrows-outline-up': '&#xf113;', 
            'misc-bell': '&#xf114;', 
            'misc-book-closed': '&#xf115;', 
            'misc-book-open': '&#xf116;', 
            'misc-clock': '&#xf117;', 
            'misc-coffeecup': '&#xf118;', 
            'misc-conversation': '&#xf119;', 
            'misc-handshake': '&#xf11a;', 
            'misc-heart': '&#xf11b;', 
            'misc-paperclip': '&#xf11c;', 
            'misc-presentation': '&#xf11d;', 
            'misc-stopwatch': '&#xf11e;', 
            'misc-timer': '&#xf11f;', 
            'misc-vcard': '&#xf120;', 
            'social-facebook-fill': '&#xf121;', 
            'social-facebook': '&#xf122;', 
            'social-foursquare-inverted': '&#xf123;', 
            'social-foursquare': '&#xf124;', 
            'social-googleplus': '&#xf125;', 
            'social-instagram': '&#xf126;', 
            'social-linked-inverted': '&#xf127;', 
            'social-linkedin': '&#xf128;', 
            'social-rss': '&#xf129;', 
            'social-twitter-fill': '&#xf12a;', 
            'social-twitter': '&#xf12b;', 
            'social-youtube': '&#xf12c;', 
            'ui-alert-fill': '&#xf12d;', 
            'ui-bookmark': '&#xf12e;', 
            'ui-calendar': '&#xf12f;', 
            'ui-check': '&#xf130;', 
            'ui-comment': '&#xf131;', 
            'ui-contract': '&#xf132;', 
            'ui-cross-large': '&#xf133;', 
            'ui-cross-small': '&#xf134;', 
            'ui-documents': '&#xf135;', 
            'ui-download': '&#xf136;', 
            'ui-edit': '&#xf137;', 
            'ui-email-closed': '&#xf138;', 
            'ui-email-open': '&#xf139;', 
            'ui-expand': '&#xf13a;', 
            'ui-favourite': '&#xf13b;', 
            'ui-flag': '&#xf13c;', 
            'ui-help': '&#xf13d;', 
            'ui-home': '&#xf13e;', 
            'ui-image': '&#xf13f;', 
            'ui-info-fill': '&#xf140;', 
            'ui-info': '&#xf141;', 
            'ui-link': '&#xf142;', 
            'ui-locked': '&#xf143;', 
            'ui-logout-1': '&#xf144;', 
            'ui-logout-2': '&#xf145;', 
            'ui-mapmarker': '&#xf146;', 
            'ui-menutoggle': '&#xf147;', 
            'ui-microphone': '&#xf148;', 
            'ui-minus': '&#xf149;', 
            'ui-phone': '&#xf14a;', 
            'ui-plus': '&#xf14b;', 
            'ui-print': '&#xf14c;', 
            'ui-profile-2': '&#xf14d;', 
            'ui-profile': '&#xf14e;', 
            'ui-refresh': '&#xf14f;', 
            'ui-search': '&#xf150;', 
            'ui-settings-spanner': '&#xf151;', 
            'ui-settings': '&#xf152;', 
            'ui-sync-1': '&#xf153;', 
            'ui-sync-2': '&#xf154;', 
            'ui-tab': '&#xf155;', 
            'ui-trash': '&#xf156;', 
            'ui-unlocked': '&#xf157;', 
            'ui-upload': '&#xf158;', 
            'ui-view': '&#xf159;', 
            'ui-zoom-in': '&#xf15a;', 
            'ui-zoom-out': '&#xf15b;', 
        };
        $('[class*="icon-"]').each(function () {
            var $this = $(this)
              , classes = $(this).attr('class').split(' ')
              , icon_class = false;
            for (x = 0; x < classes.length; x++) {
                if (classes[x].indexOf('icon-') === 0) {
                    icon_class = classes[x].replace('icon-', '');
                }
            }
            var prepend_element = '<span class="icon icon-legacy">' +
                                      icon_codes[icon_class] +
                                  '</span>';
            $this.prepend(prepend_element);
        });
    }
});
