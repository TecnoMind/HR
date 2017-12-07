/*
 * basic - A signature theme from Designova
 * Author: Designova, http://www.designova.net
 * Copyright (C) 2015 Designova
 * This is a premium product. For licensing queries please contact info@designova.net
 */
/*global $:false */
/*global window: false */
(function() {
    "use strict";
    $(function($) {

        //Detecting viewpot dimension
        var vH = $(window).height();
        var vW = $(window).width();
        //Adjusting Intro Components Spacing based on detected screen resolution
        $('.fullwidth').css('width', vW);
        $('.fullheight').css('height', vH);
        $('.halfwidth').css('width', vW / 2);
        $('.halfheight').css('height', vH / 2);

        
        $('.news-head').setAllToMaxHeight();
        //Mobile Only Navigation (multi level)
                $('ul.slimmenu').slimmenu({
                    resizeWidth: '992',
                    collapserTitle: '',
                    easingEffect: 'easeInOutQuint',
                    animSpeed: 'medium',
                });

                $('.slimmenu li a:not(.sub-collapser)').on('click',function(){
                            $('ul.slimmenu').removeClass('expanded').slideUp();
                });


//Sub Menu Trigger
        $('.main-menu li a.sub-menu-trigger').on('mouseenter', function(){
            $(this).next('.sub-menu').stop().slideDown(1000);
        });
        $('.main-menu li').on('mouseleave', function(){
            $('.sub-menu').stop().slideUp(1000);
        });

//COMMON UX
    $('.team-block').on('mouseenter', function(){
        $(this).find('.team-overlay').slideDown();
    });
    $('.team-block').on('mouseleave', function(){
        $(this).find('.team-overlay').slideUp();
    });

//PORTFOLIO UX



//VENOBOX
    $('.venobox, .image-lightbox-link').venobox({
        numeratio: true,
        infinigall: true
    });   
        

//CAROUSEL
 $(".project-carousel").owlCarousel({
                    loop:true,
                    margin:0,
                    dots:false,
                    nav:true,
                    navText: false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:1
                        },
                        1000:{
                            items:1
                        }
                    }
                });


 //PARALLAX
        //Initialize Each Parallax Layer  
        function parallaxInit() {
            $.stellar({
                positionProperty: 'transform'
            });
        }

        if (!device.tablet() && !device.mobile()) {

            //Activating Parallax effect if non-mobile device is detected
            $(window).bind('load', function() {
                parallaxInit();
            });


        } else {

            //Dectivate Parallax effect if mobile device is detected (bg image is displayed)
            $('.parallax, .parallax-layer').addClass('no-parallax');

        }   

    });
    // $(function ($)  : ends
})();
//  JSHint wrapper $(function ($)  : ends