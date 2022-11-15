
$(function() {
    //маска телефонов
    $('[data-mask]').each(function() {
        input = $(this);
        mask = input.attr('data-mask');
        input.inputmask({"mask": mask});
    });

    //сворачивание мобильного меню
    $('.toggle-menu-js').on('click', function (e) {
        e.preventDefault();
        $('body').removeClass('show-phones-menu')
        if ($('body').hasClass('show-slide-menu')) {
            hideSlideMenu();
        } else {
            showSlideMenu();
        }
    });
/*
    $('body').on('click', '[data-menu-show]', function() {
        $('[data-menu-show]').removeClass("active");
        $(this).addClass("active");

        var menuId = $(this).attr('data-menu-show');
        $('[data-menu-panel]').removeClass("active");
        $('[data-menu-panel="'+menuId+'"]').addClass("active");
    });
*/
    //плавный переход по контенту
    $('body').on('click', '[data-goto]', function(e) {
        e.preventDefault();
        $('.mobile-menu').slideUp();
        var hx = 0;
        var selector = $(this).attr('data-goto');
        $('html, body').animate({ scrollTop: $(selector).offset().top + hx}, 1200);
    });

    //обрабатываем событие клика по табу
    $('[data-tab]').click(function(e){
        e.preventDefault();
        if ($(this).hasClass('active')) return false;

        var parent = $(this).parents('.xtab-container');
        var xtab = parent.find('.xtab');

        xtab.stop(true, true);
        parent.find('[data-tab]').removeClass('active');

        var data_tab = $(this).attr('data-tab');
        
        $(this).addClass('active');
        //$('[data-tab="'+data_tab+'"]').addClass('active');
        xtab.animate({ "opacity": 0.2 }, 150, function() {
            xtab.removeClass('active');
            xtab.animate({"opacity": 1});
            $(data_tab).addClass('active');
        });
        return false;
    });

    // слайдер на главной
    initLeadSlider();

    // слайдер с техникой
    initTechnicSlider();

    // initXtab();

    /*
    toogler({
        "parent": ".footer-block",
        "hiddenContainer": ".footer-block__body",
        "link": ".footer-block__arrow",
        "speed": 100,
    });
    */

    toogler({
        "parent": "li",
        "hiddenContainer": ".slide-menu__submenu",
        "link": ".slide-menu__arrow",
        "speed": 100,
    });

    //плавный переход по контенту
    $('body').on('click', '[data-goto]', function(e) {
        e.preventDefault();
        $('.mobile-menu').slideUp();
        var hx = 0;
        var selector = $(this).attr('data-goto');
        $('html, body').animate({ scrollTop: $(selector).offset().top + hx}, 1200);
    });

    new WOW().init();


    $('.header__menu > ul > li').hover(
        function(){
            var elem = $(this);
            $('body').removeClass('open-menu');
            $('.submenu').removeClass('active');
            $('.header__menu > ul > li').removeClass('hover');

            
            if (elem.hasClass('has-child')) {
                $('body').addClass('open-menu');
                elem.addClass('hover');

                var submenuId = elem.attr('data-submenu-id');
                $('[data-submenu-panel-id="'+submenuId+'"]').addClass('active');
            }
        }, 
        function() {
            //$('body').removeClass('open-menu');
            //$('.submenu').removeClass('active');
        }
    );

    $('.submenus').hover(
        function() {},
        function() {
            $('body').removeClass('open-menu');
            $('.submenu').removeClass('active');
            $('.header__menu > ul > li').removeClass('hover');
        }
    );

    showMore({
        "parent": ".application__grid",
        "item": '.application__item',
        "elemShowMore": '.application__showmore a',
        "collapseClass": "collapse",
        "itemsShow": 2,
        "textShowMore": "Смотреть все",
        "textCollapse": "Свернуть",
    });
});

var hideSlideMenu = function() {
    $('body').removeClass('show-slide-menu');
};

var showSlideMenu = function() {
    $('body').addClass('show-slide-menu');
};

var initLeadSlider = function() {
    var selector = '.lead-slider-js';

    $(selector).owlCarousel({
        loop: true,
        margin: 0,
        responsiveClass: true,
        navContainer: '.section-lead .slider-nav',
        dotsContainer: '.section-lead .slider-dots',
        responsive:{
            0:{
                items: 1,
                nav: true
            }
        }
    });
};

var initTechnicSlider = function() {
    var selector = '.technics-slider-js';

    $(selector).owlCarousel({
        loop: true,
        margin: 0,
        responsiveClass: true,
        navContainer: '.technics-slider .slider-nav',
        dotsContainer: '.technics-slider .slider-dots',
        dotsEach: 2,
        responsive:{
            0: {
                items: 1,
                nav: true
            },
            1024: {
                items: 3,
                nav: true
            },
            1450: {
                items: 4,
                nav: true
            }
        }
    });
}

var showMore = function(ops) {
    var defaultOptions = {
        "parent": "body",
        "item": '.show-more-item',
        "elemShowMore": '.services-all',
        "collapseClass": "collapse",
        "itemsShow": 5,
        "textShowMore": "Все услуги",
        "textCollapse": "Свернуть",
    };

    var options = $.extend({}, defaultOptions, ops);

    var show = function() {
        $(options.parent).removeClass(options.collapseClass);
        $(options.item).show();
        $(options.elemShowMore).text(options.textCollapse);
    }

    var hide = function () {
        $(options.parent).addClass(options.collapseClass);
        $(options.item).slice(options.itemsShow, 100).hide();
        $(options.elemShowMore).text(options.textShowMore);
    }

    if ($(window).width() < 450) {
        hide();
    } else {
        show();
    }

    $(options.elemShowMore).on('click', function(e) {
        e.preventDefault();
        var parent = $(options.parent);

        if ($(options.parent).hasClass(options.collapseClass)) {
            show();
        } else {
            hide();
        }
    });
}

var initXtab = function() {
    setTimeout(function() {
        $('.xtab-container').each(function() {
            $(this).addClass('xtab-initialized');
        });
    }, 100);
};

var toogler = function(ops) {
    var defaultOptions = {
        "parent": "body",
        "speed": 300,
        "openClass": "opened",
        "stepCorrection": true,
    };

    // var options = Object.assign({}, defaultOptions, ops);
    var options = $.extend({}, defaultOptions, ops);

    $("body").on("click", options.link, function (e) {
        e.preventDefault();

        if (options.before) {
            options.before(this);    
        }

        var classOpened = options.openClass || "open";
        var parent = $(this).closest(options.parent);
        var body = parent.find(options.hiddenContainer).eq(0);
        var opened = parent.hasClass(classOpened);

        var v_up = 0;  
        var v_down = 0;  
        var bd = jQuery('body').get(0);

        if (opened) {
            $(body).slideUp({ 
                easing: "linear", 
                step: function(now, tween) {
                    if (options.stepCorrection && tween.prop == "height"){
                        if (v_up == 0){
                            v_up = now;
                        } else {
                            var k = v_up - now;
                            console.log("slideUp k", k);
                            bd.scrollTop -= k;
                            v_up = now;
                        }
                    }
                }, 
                duration: options.speed, 
                complete: function() { 
                    parent.removeClass(classOpened);

                    if (options.complete) {
                        options.complete("close");    
                    }
                }
            });

        } else {
            $(body).slideDown({ 
                easing: "linear", 
                step: function(now, tween) {
                    if (options.stepCorrection && tween.prop == "height"){
                        if (v_down == 0){
                            v_down = now;
                        }else{
                            var k = v_down - now;
                            console.log("slideDown k", k);
                            bd.scrollTop -= k;
                            v_down = now;
                        }
                    }
                }, 
                duration: options.speed, 
                complete: function() { 
                    parent.addClass(classOpened);

                    if (options.complete) {
                        options.complete("open");    
                    }
                }
            });
        }
    });  
};

var doit;
$(window).resize(function(){
    clearTimeout(doit);
    doit = setTimeout(resizedw, 100);
});

var resizedw = function(){
    // $('body').removeClass('show-slide-menu');
    // $('body').removeClass('show-phones-menu');
};

var setFixedHeader = function() {
    var scroll = $(window).scrollTop();

    if (scroll > 0) {
        $('header').addClass('header-scrolled');
    } else {
        $('header').removeClass('header-scrolled');
    }
}