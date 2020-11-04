'use strict';

$(document).ready(function () {

    $(window).scroll(function () {

        var self = $(this);

        // Menu-mobile change color
        var topMenu = $('.line-block-m');
        var buttonMenuOpen = $('.line-block-m__button__open');

        if (window.innerWidth < 1024) {
            if (self.scrollTop() > 0) {
                topMenu.addClass('top-menu-color');
            } else {
                topMenu.removeClass('top-menu-color');
            }
        } else {
            buttonMenuOpen.hide(300);
        }

    });

    // Menu-mobile open/close
    menuOpenClose();

    $(window).resize(function () {
        if (window.innerWidth < 1024) {
            menuOpenClose();
        } else {
            $('.button-menu').hide(300);
        }
    })

    function menuOpenClose() {
        var buttonMenuOpen = $('.line-block-m__button__open');
        var buttonMenuClose = $('.line-block-m__button__close');
        var containerMenuM = $('.line-block-m__modal');

        buttonMenuOpen.on('click', function () {
            $('html, body').addClass('overflow-hidden');
            buttonMenuOpen.hide(300);
            containerMenuM.addClass('show');
            buttonMenuClose.show(300);
        });
        buttonMenuClose.on('click', function () {
            $('html, body').removeClass('overflow-hidden');
            buttonMenuClose.hide(300);
            containerMenuM.removeClass('show');
            buttonMenuOpen.show(300);
        });
    }

    // Swiper technology - первый слайдер
    var swiperTechnology = new Swiper('.swiper-technology', {
        loop: true,
        speed: 1500,
        allowTouchMove: false,
        initialSlide: 1,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 50,
                slidesPerGroup: 1,
                allowTouchMove: true,
                speed: 600
            },
            1920: {
                slidesPerView: 1,
                spaceBetween: 0,
                slidesPerGroup: 1,
            }
        },
        pagination: {
            el: '.bullet-technology ',
            clickable: true,
        },
        navigation: {
            prevEl: '.pagination-technology .prev',
            nextEl: '.pagination-technology .next',
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });

    // Синхронизация изменения блоков со сменой слайдов
    swiperTechnology.on('slideChange', function (currentSlide) {

        $('.features__item').each(function () {

            if (parseInt($(this).attr('data-id')) === currentSlide.realIndex) {
                $(this).children('.features__text').addClass('active');
                $(this).children()[0].style.display = "none";
                $(this).children()[1].style.display = "block";
            } else {
                $(this).children('.features__text').removeClass('active');
                $(this).children()[0].style.display = "block";
                $(this).children()[1].style.display = "none";
            }
        });

    });

    // Синхронизация изменения блоков со сменой слайдов по клику на блок
    $('.features__item').on('click', function () {
        swiperTechnology.slideToLoop(parseInt($(this).attr('data-id')), 1500, true);
    });

    // Swiper developments - второй слайдер
    var swiperDevelopments = new Swiper('.swiper-developments', {
        loop: true,
        speed: 1500,
        allowTouchMove: false,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 6,
                slidesPerGroup: 1,
                allowTouchMove: true,
                speed: 600,
                pagination: {
                    el: '.bullet-developments'
                },
            },
            1920: {
                width: 1285,
                slidesPerView: 4,
                spaceBetween: 6,
                slidesPerGroup: 4,
            }
        },
        navigation: {
            prevEl: '.pagination-developments .prev',
            nextEl: '.pagination-developments .next',
        }
    });

    // Desktop. Автоскроллинг меню по якорям сайта
    var anchors = document.querySelectorAll('a[href*="#"]');
    anchors.forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            var blockID = anchor.getAttribute('href').substr(1);

            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        })
    });

    // Mobile. Автоскроллинг меню по якорям сайта
    $("#top-menu-m").on("click", "a", function (event) {
        event.preventDefault();

        var id = $(this).attr('href');
        var top = $(id).offset().top - 55;

        $('body, html').animate({scrollTop: top}, 1000);

        $('.line-block-m__button__close').on('click', function () {
            $('html, body').removeClass('overflow-hidden');
            $('.line-block-m__modal__menu').removeClass('show');
        });

        $('.line-block-m__button__close').trigger('click');
    });

    // Синхронизация блока шагов
    $('.steps').children().on('click', function () {

        $('.steps').children().each(function (i, item) {
            $(item).removeClass('active');
        });

        $(this).addClass('active');

        $('.steps-label span').text($(this).attr('data-step'));

    });

});