/**
 * IE8 message
 */

define(['jquery'], function ($) {
    'use strict';

    var
        usemessage = false,
        messageheading = 'Hey there! We notice you\'re using Internet Explorer 8',
        messagetext =
            [
                'We don\'t support this browser, so you may see some visual anomolies whilst using our site. ',
                'For a more optimal experience, we\'d recommend a newer version of Internet Explorer' +
                'or an alternative, free browser like Chrome or Firefox'
            ]
        ;

    if($('html').hasClass('lt-ie9')){
        usemessage = true;
    }

    var message = function(text){
        $('body').prepend(
            '<div class="ie8-message">' +
                '<div class="ie8-message-inner">' +
                    '<h2 class="ie8-message-header">' + messageheading + '</h2>' +
                    '<p>' + messagetext[0] + '</p>' +
                    '<p>' + messagetext[1] + '</p>' +
                '</div>' +
            '</div>'
        );
    };

    if(usemessage){
        message(messagetext);
    }
});

