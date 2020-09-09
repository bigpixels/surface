'use strict';
$(function () {
    if (screen.width>991) {
        new WOW().init();
    }
    $('.slider').slick({
        arrows: false,
        dots: false,
        adaptiveHeight: true,
        dots: true,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 598,
                settings: "unslick"
            },
        ],
      });
});