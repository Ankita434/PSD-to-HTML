var Layout = function () {
    'use strict';

    // handle on page scroll
    var handleHeaderOnScroll = function () {
        if ($(window).scrollTop() > 360) {
            document.getElementById("imageid").src = "/img/logo-dark.png";
            $('#icon_wrapper').addClass('icon_wrapper');
            $('header').addClass('page-on-scroll');
            $('i').style.color = 'white';

        } else {
            $('#icon_wrapper').removeClass('icon_wrapper');
            $('header').removeClass('page-on-scroll');
            document.getElementById("imageid").src = "/img/logo.png";
        }
    }


    return {
        init: function () {
            handleHeaderOnScroll(); // initial setup for fixed header

            // handle minimized header on page scroll
            $(window).scroll(function () {
                handleHeaderOnScroll();
            });
        }
    };
}();

$(document).ready(function () {
    Layout.init();
});