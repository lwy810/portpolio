$(function(){	
	var session_member_id = "${member.member_id}"
	var session_staff_id = "${staff.staff_id}"

	var switchVal = sessionStorage.getItem("switchVal");
	console.log(switchVal);
	
	if (session_member_id == '' && session_staff_id == '') {
		var switchVal = 1;
		console.log(switchVal);
	} else {
		switchVal = 2;
		console.log(switchVal);
	 	if(switchVal == 2) {
	 		$('.switch').addClass('active');
     		$(".main-menu-1").addClass('active');
     		$(".main-menu-2").removeClass('active');
     	} else {
     		$(".main-menu-1").removeClass('active');
     		$(".main-menu-2").addClass('active');
     	}     	
	}

	$('.header-switch').click(function(){
		$('.switch').toggleClass('active');
     
     	if ($('.switch').hasClass('active') == true) {
     		switchVal = 2;
     		sessionStorage.setItem("switchVal", switchVal);
     		console.log(switchVal);
     	} else {
     		switchVal = 1;
     		sessionStorage.setItem("switchVal", switchVal);
     		console.log(switchVal);
     	}
     	
     	if(switchVal == 2) {
     		$(".main-menu-1").addClass('active');
     		$(".main-menu-2").removeClass('active');
     	} else {
     		$(".main-menu-1").removeClass('active');
     		$(".main-menu-2").addClass('active');
     	}     	
     });	
         

    $('#trigger').click(function(event){
        $('.main-menu').toggleClass('on');
        $('.bn-shadow').toggleClass('on');
        $('.draw-bg').toggleClass('on');
        $('nav').toggleClass('on');
        $('body').toggleClass('active');
        $('#trigger > i:nth-child(1)').toggleClass('active');
        $('#trigger > i:nth-child(2)').toggleClass('show');
    });

    $(window).scroll(function(){
        var scrollHeight = $(document).scrollTop();
        if (scrollHeight >= 100) {
            $('header').addClass('active');
        } else {
            $('header').removeClass('active');
        }
    });

    var currentIndex = 0;
    var slidePosition;
    
    setInterval(function(){
        if(currentIndex < 2) {
            currentIndex ++;
        } else {
            currentIndex = 0;
        } slidePosition = currentIndex * (-400) +"px";
        
        $(".sp-item-slides").animate({top: slidePosition}, 400);
    },3000);

    
    
    
    
    
    
    
    
});






