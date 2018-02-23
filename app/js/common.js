$(function () {

    $('.hider').on('click', function () {
        if ($('.p-to-hide').queue().length) {
            return
        }
        $('img.hider').toggleClass('hider-active');
        $('.p-to-hide').slideToggle(400, function () {
            skrollrAnim.refresh();
        });
    });

    var $window = $(window);
    var scrollTime = 0.5;
    var scrollDistance = 190;

    $window.on("mousewheel DOMMouseScroll", function (event) {

        event.preventDefault();

        if ($('.s-3:visible').length) {
            scrollTime = 0.3;
        }
        //console.log(scrollTime);

        var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
        var scrollTop = $window.scrollTop();
        var finalScroll = scrollTop - parseInt(delta * scrollDistance);

        TweenMax.to($window, scrollTime, {
            scrollTo: {y: finalScroll, autoKill: true},
            ease: Power1.easeOut,
            overwrite: 5
        });

    });

    var menu = document.querySelector('.menu');
    var menuHeight = menu.offsetHeight;
    var sections = document.querySelectorAll('.go-to');
    var menuTopOffset = menu.offsetTop + 30;

    window.onscroll = function () {
        if (window.innerWidth < 430) {
            return
        } else if (window.pageYOffset > menuTopOffset) {
            menu.classList.add('menu--sticked');
        } else {
            menu.classList.remove('menu--sticked');
        }
        for (var i = 0; i < sections.length; i++) {
            if (window.pageYOffset + menuHeight > sections[i].offsetTop) {
                $('.menu li').removeClass('active');
                $('.li-' + (i + 1)).addClass('active');
            } else if($(window).scrollTop() + $(window).height() === $(document).height()) {
                $('.menu li').removeClass('active');
                $('.li-' + sections.length).addClass('active');
            }
        }
    };

    var skrollrAnim = skrollr.init();

    $('.menu li').on('click', function () {
        var goTo = $(this).data('link');
        if (goTo === 4) {
            TweenLite.to(window, 1,
                {
                    scrollTo:
                        {
                            y: $(document).height(),
                            autoKill: false
                        },
                    ease: Power2.easeOut
                });
            return
        }
        TweenLite.to(window, 1,
            {
                scrollTo:
                    {
                        y: ".go-to-" + goTo,
                        offsetY: menuHeight,
                        autoKill: false
                    },
                ease: Power2.easeOut
            });
    });

    var controller = new ScrollMagic.Controller();
    var tween1 = new TimelineMax().from('.vagina', .4, {
        ease: Power2.easeInOut,
        opacity: 0
    }).staggerFrom('.animation-01', .4, {
        ease: Power2.easeInOut,
        opacity: 0
    }, .2).staggerFrom('.animation-02', .4, {
        ease: Power2.easeInOut,
        opacity: 0
    }, .2).staggerFrom('.animation-04', .4, {
        ease: Power2.easeInOut,
        opacity: 0
    }, .2).staggerFrom('.animation-03', .4, {
        ease: Power2.easeInOut,
        opacity: 0
    }, .2);
    new ScrollMagic.Scene({
        triggerElement: ".figure-1",
        triggerHook: 'onEnter',
        offset: 300,
        reverse: false
    }).setTween(tween1).addTo(controller);
    var tween2 = new TimelineMax().staggerFrom('.children-image', .4, {
        ease: Power2.easeInOut,
        opacity: 0,
        x: -100
    }, .2);
    new ScrollMagic.Scene({
        triggerElement: ".children",
        triggerHook: 'onEnter',
        offset: 300,
        reverse: false
    }).setTween(tween2).addTo(controller);
    var tween3 = new TimelineMax().from('.car-animation-2', .4, {
        ease: Power2.easeInOut,
        opacity: 0,
        rotation: -300
    }).from('.car-animation-1', .4, {
        ease: Power2.easeInOut,
        opacity: 0
    });
    new ScrollMagic.Scene({
        triggerElement: ".car",
        triggerHook: 'onEnter',
        offset: 300,
        reverse: false
    }).setTween(tween3).addTo(controller);
});