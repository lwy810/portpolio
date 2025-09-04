$(function(){
    $('.next').click(function(event) {
        event.preventDefault();
        if ($('.slide-1 > div.active').hasClass('third')) {
            event.preventDefault();
            $('.slide-1 > div').removeClass('active');
            $('.first').addClass('active');
        } else {
            $('.slide-1 > div.active').addClass('on');
            $('.slide-1 > div').removeClass('active');
            $('.slide-1 > div.on').next().addClass('active');
            $('.slide-1 > div.on').removeClass('on');
        }
    });

    $('.prev').click(function(event) {
        event.preventDefault();
        if ($('.slide-1 > div.active').hasClass('first')) {
            event.preventDefault();
            $('.slide-1 > div').removeClass('active');
            $('.third').addClass('active');
        } else {
            $('.slide-1 > div.active').addClass('on');
            $('.slide-1 > div').removeClass('active');
            $('.slide-1 > div.on').prev().addClass('active');
            $('.slide-1 > div.on').removeClass('on');
        }
    });
      
    $('.button-nav li .first').click(function(event) {
        event.preventDefault();
        $('.button-nav > li').removeClass('active')
        $('.slide-2 > div').removeClass('active');
        $('.button-nav li:first-child').addClass('active')
        $('.slide-2 .first').addClass('active')
    });

    $('.button-nav li .second').click(function(event) {
        event.preventDefault();
        $('.button-nav > li').removeClass('active')
        $('.slide-2 > div').removeClass('active');
        $('.button-nav li:nth-child(2)').addClass('active')
        $('.slide-2 .second').addClass('active')
    });

    $('.button-nav li .third').click(function(event) {
        event.preventDefault();
        $('.button-nav > li').removeClass('active')
        $('.slide-2 > div').removeClass('active');
        $('.button-nav li:last-child').addClass('active')
        $('.slide-2 .third').addClass('active')
    });

    $('input').click(function(event){
        $(this).css('background','white')
    });
    
});
