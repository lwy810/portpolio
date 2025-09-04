$(function(){

	$('#img').click(function(){
		$('.bigImg').css('display','block');
		$('.bg').css('display', 'block');
	});

	$('.bigImg').click(function(){
		$('.bigImg').css('display','none');
		$('.bg').css('display', 'none');
	});
	
});


function getZipcode(){
	window.open('/admin/member/reg-address', 'zipcodeCheck', 'width=450, height=300, scrollbars=yes');
}

function findMember(){
	window.open('/admin/borrow/reg-member', 'findmember', 'width=500, height=300, scrollbars=yes');
}

function findBook(){
	window.open('/admin/borrow/reg-book', 'findbook', 'width=550, height=300, scrollbars=yes');
}




