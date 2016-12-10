var Layout = function () {
    'use strict';

    // handle on page scroll
    var handleHeaderOnScroll = function () {
        if ($(window).scrollTop() > 60) {
            document.getElementById("imageid").src = "/img/logo-dark.png";
            $('#icon_wrapper').addClass('icon_wrapper');
            $('header').addClass('page-on-scroll');
            $('i').removeClass('white');

        } else {
            $('#icon_wrapper').removeClass('icon_wrapper');
            $('header').removeClass('page-on-scroll');
            document.getElementById("imageid").src = "/img/logo.png";
            $('i').addClass('white');

        }
    }
    return {
        init: function () {
            handleHeaderOnScroll();
            $(window).scroll(function() {
                handleHeaderOnScroll();
            });
        }
    };
}();

$(document).ready(function() {
    Layout.init();
    $('.parallax-window').parallax({imageSrc: '../img/swiper/01.jpg'});
    $("#i-button" ).click(function() {
        $(".li_wrapper").toggle();

    });
});
