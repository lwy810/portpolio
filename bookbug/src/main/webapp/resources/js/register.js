$(function(){
	var staff_id_empty = '아이디 : 필수 정보입니다.';
	var staff_pwd_empty = '비밀번호 : 필수 정보입니다.';
	var staff_name_empty = '이름 : 필수 정보입니다.';
	var staff_phone_empty = '전화번호 : 필수 정보입니다.';
	var staff_birthday_empty = '생년월일 : 필수 정보입니다.';
	var staff_level_empty = '등급 : 필수 정보입니다.';
	var staff_department_empty = '부서 : 필수 정보입니다.';
	var regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,15}$/;
	var password ='';
	
	$('.mb-adm-register li input').focus(function(){
		$(this).css('border','3px solid green');
	});
	
	
	$('input[name="staff_pwd"]').focus(function(){
		if($('input[name="staff_id"]').val() =='') {
			$('.mb-adm-register li:nth-child(3)').css('display', 'block');
			$('.mb-adm-register li:nth-child(3) .staff_id_empty').css('display', 'block');
			$('input[name="staff_id"]').css('border','3px solid red');
			$('.mb-adm-register li:nth-child(3)').addClass('active');
			$('.staff_id_empty').addClass('active');
			$('.staff_id_empty').text(staff_id_empty);
		}
	});
	
	$('input[name="staff_name"]').focus(function(){
		if($('input[name="staff_id"]').val() =='') {
			$('.mb-adm-register li:nth-child(3)').css('display', 'block');
			$('.mb-adm-register li:nth-child(3) .staff_id_empty').css('display', 'block');
			$('input[name="staff_id"]').css('border','3px solid red');
			$('.mb-adm-register li:nth-child(3)').addClass('active');
			$('.staff_id_empty').addClass('active');
			$('.staff_id_empty').text(staff_id_empty);
		}
	});
	
	$('input[name="staff_phone"]').focus(function(){
		if($('input[name="staff_id"]').val() =='') {
			$('.mb-adm-register li:nth-child(3)').css('display', 'block');
			$('.mb-adm-register li:nth-child(3) .staff_id_empty').css('display', 'block');
			$('input[name="staff_id"]').css('border','3px solid red');
			$('.mb-adm-register li:nth-child(3)').addClass('active');
			$('.staff_id_empty').addClass('active');
			$('.staff_id_empty').text(staff_id_empty);
		}
	});
	
	$('input[name="staff_birthday"]').focus(function(){
		if($('input[name="staff_id"]').val() =='') {
			$('.mb-adm-register li:nth-child(3)').css('display', 'block');
			$('.mb-adm-register li:nth-child(3) .staff_id_empty').css('display', 'block');
			$('input[name="staff_id"]').css('border','3px solid red');
			$('.mb-adm-register li:nth-child(3)').addClass('active');
			$('.staff_id_empty').addClass('active');
			$('.staff_id_empty').text(staff_id_empty);
		}
	});
	
	$('input[name="staff_level"]').focus(function(){
		if($('input[name="staff_id"]').val() =='') {
			$('.mb-adm-register li:nth-child(3)').css('display', 'block');
			$('.mb-adm-register li:nth-child(3) .staff_id_empty').css('display', 'block');
			$('input[name="staff_id"]').css('border','3px solid red');
			$('.mb-adm-register li:nth-child(3)').addClass('active');
			$('.staff_id_empty').addClass('active');
			$('.staff_id_empty').text(staff_id_empty);
		}
	});
	
	$('input[name="staff_department"]').focus(function(){
		if($('input[name="staff_id"]').val() =='') {
			$('.mb-adm-register li:nth-child(3)').css('display', 'block');
			$('.mb-adm-register li:nth-child(3) .staff_id_empty').css('display', 'block');
			$('input[name="staff_id"]').css('border','3px solid red');
			$('.mb-adm-register li:nth-child(3)').addClass('active');
			$('.staff_id_empty').addClass('active');
			$('.staff_id_empty').text(staff_id_empty);
		}
	});
	
	$('input[name="staff_id"]').blur(function(){
		
		if ($(this).val() =='') {
			$('.mb-adm-register li:nth-child(3)').css('display', 'block');
			$('.mb-adm-register li:nth-child(3) .staff_id_empty').css('display', 'block');
			$(this).css('border','3px solid red');
			$('.mb-adm-register li:nth-child(3)').addClass('active');
			$('.staff_id_empty').addClass('active');
			$('.staff_id_empty').text(staff_id_empty);
		} else if ($(this).val() !='') {
			$('.mb-adm-register li:nth-child(3) .staff_id_empty').css('display', 'none');
			$('.staff_id_empty').removeClass('active');
		} else if ($(this).val() !='' && $('input[name="staff_pwd"]').val() !='') {
			$('.mb-adm-register li:nth-child(3)').css('display', 'none');
			$('.mb-adm-register li:nth-child(3)').removeClass('active');
		}
	});
		
	$('input[name="staff_pwd"]').blur(function(){
		
		if ($(this).val() =='') {
			$('.mb-adm-register li:nth-child(3)').css('display', 'block');
			$('.mb-adm-register li:nth-child(3) .staff_pwd_empty').css('display', 'block');
			$(this).css('border','3px solid red');
			$('.mb-adm-register li:nth-child(3)').addClass('active');
			$('.staff_pwd_empty').addClass('active');
			$('.staff_pwd_empty').text(staff_pwd_empty);
		} else if ($(this).val() !='') {
			password = $('input[name="staff_pwd"]').val();
			
			if (!regex.test(password)) {
				alert("비밀번호는 영문, 숫자, 특수문자의 조합으로 이루어진 8자 이상 15자 이하 문자만 가능합니다.");
			} else {
				$('.mb-adm-register li:nth-child(3) .staff_pwd_empty').css('display', 'none');
				$('.staff_pwd_empty').removeClass('active');
			}
		} else if ($(this).val() !='' && $('input[name="staff_id"]').val() !='') {
			$('.mb-adm-register li:nth-child(3)').css('display', 'none');
			$('.mb-adm-register li:nth-child(3)').removeClass('active');
		}
	});
	
	$('input[name="staff_name"]').blur(function(){
		
		if ($(this).val() =='') {
			$('.mb-adm-register li:nth-child(7)').css('display', 'block');
			$('.mb-adm-register li:nth-child(7) .staff_name_empty').css('display', 'block');
			$(this).css('border','3px solid red');
			$('.mb-adm-register li:nth-child(7)').addClass('active');
			$('.staff_name_empty').addClass('active');
			$('.staff_name_empty').text(staff_name_empty);
		} else if ($(this).val() !='') {
			$('.mb-adm-register li:nth-child(7) .staff_name_empty').css('display', 'none');
			$('.staff_name_empty').removeClass('active');
		} else if ($(this).val() !='' && $('input[name="staff_phone"]').val() !='') {
			$('.mb-adm-register li:nth-child(7)').css('display', 'none');
			$('.mb-adm-register li:nth-child(7)').removeClass('active');
		}
	});
	
	$('input[name="staff_phone"]').blur(function(){

		if ($(this).val() =='') {
			$('.mb-adm-register li:nth-child(7)').css('display', 'block');
			$('.mb-adm-register li:nth-child(7) .staff_phone_empty').css('display', 'block');
			$(this).css('border','3px solid red');
			$('.mb-adm-register li:nth-child(7)').addClass('active');
			$('.staff_phone_empty').addClass('active');
			$('.staff_phone_empty').text(staff_phone_empty);
		} else if ($(this).val() !='') {
			$('.mb-adm-register li:nth-child(7) .staff_phone_empty').css('display', 'none');
			$('.staff_phone_empty').removeClass('active');
		} else if ($(this).val() !='' && $('input[name="staff_name"]').val() !='' ) {
			$('.mb-adm-register li:nth-child(7)').css('display', 'none');
			$('.mb-adm-register li:nth-child(7)').removeClass('active');
		}
	});
	
	$('input[name="staff_birthday"]').blur(function(){
		
		if ($(this).val() =='') {
			$('.mb-adm-register li:nth-child(11)').css('display', 'block');
			$('.mb-adm-register li:nth-child(11) .staff_birthday_empty').css('display', 'block');
			$(this).css('border','3px solid red');
			$('.mb-adm-register li:nth-child(11)').addClass('active');
			$('.staff_birthday_empty').addClass('active');
			$('.staff_birthday_empty').text(staff_birthday_empty);
		} else if ($(this).val() !='') {
			$('.mb-adm-register li:nth-child(11) .staff_birthday_empty').css('display', 'none');
			$('.staff_birthday_empty').removeClass('active');
		} else if ($(this).val() !='' && $('input[name="staff_department"]').val() !='' && $('input[name="staff_level"]').val() !='') {
			$('.mb-adm-register li:nth-child(11)').css('display', 'none');
			$('.mb-adm-register li:nth-child(11)').removeClass('active');
		}
	});

	
	$('input[name="staff_level"]').blur(function(){

		if ($(this).val() =='') {
			$('.mb-adm-register li:nth-child(11)').css('display', 'block');
			$('.mb-adm-register li:nth-child(11) .staff_level_empty').css('display', 'block');
			$(this).css('border','3px solid red');
			$('.mb-adm-register li:nth-child(11)').addClass('active');
			$('.staff_level_empty').addClass('active');
			$('.staff_level_empty').text(staff_level_empty);
		} else if ($(this).val() !='') {
			$('.mb-adm-register li:nth-child(11) .staff_level_empty').css('display', 'none');
			$('.staff_level_empty').removeClass('active');
		} else if ($(this).val() !='' && $('input[name="staff_department"]').val() !='' && $('input[name="staff_birthday"]').val() !='') {
			$('.mb-adm-register li:nth-child(11)').css('display', 'none');
			$('.mb-adm-register li:nth-child(11)').removeClass('active');
		}
	});
	
	$('input[name="staff_department"]').blur(function(){
		
		if ($(this).val() =='') {
			$('.mb-adm-register li:nth-child(11)').css('display', 'block');
			$('.mb-adm-register li:nth-child(11) .staff_department_empty').css('display', 'block');
			$(this).css('border','3px solid red');
			$('.mb-adm-register li:nth-child(11)').addClass('active');
			$('.staff_department_empty').addClass('active');
			$('.staff_department_empty').text(staff_department_empty);
		} else if ($(this).val() !='') {
			$('.mb-adm-register li:nth-child(11) .staff_department_empty').css('display', 'none');
			$('.staff_department_empty').removeClass('active');
		} else if ($(this).val() !='' && $('input[name="staff_level"]').val() !='' && $('input[name="staff_birthday"]').val() !='') {
			$('.mb-adm-register li:nth-child(11)').css('display', 'none');
			$('.mb-adm-register li:nth-child(11)').removeClass('active');
		}
	});
});