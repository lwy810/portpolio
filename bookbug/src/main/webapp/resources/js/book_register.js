$(function(){
	var category_depth_1 = '', category_depth_2 = '', category_number = '';
	var depth_1_select ='', depth_2_select ='', category_number_select ='';
	var depth_1_pos = '', depth_2_pos = '', category_number_pos = '';
	
	$('#category_depth_1').change(function(){
		if ($('#category_depth_1').val() == '키워드1' ) {
			$('#category_depth_2').css('display', 'none');
			$('#category_number').css('display', 'none');
		} else {
			$('#category_depth_2').css('display', 'block');
		}
		
		depth_1_select = $('select[name=category_depth_1]').val();
		category_depth_1 = $("#category_depth_1 option:selected").val();
		depth_1_pos =$("#category_depth_1 option").index($("#category_depth_1 option:selected"));
		console.log(depth_1_select);
		console.log(depth_1_pos);
		console.log(category_depth_1);
		
		var query = {category_depth_1: $("#category_depth_1 option:selected").val()};
		var category_depth2_list = [];
		
		$.ajax({
			url : '/book/categoryDepth2Search',
			method: 'post',
			data: query,
			traditional: true,
			 dataType: 'json',
			 
			success: function(data) {
				if (data != 'null' ) {
					$('#category_depth_2 > option').remove();
					$('#category_depth_2').append('<option value="키워드2" selected>키워드2</option>');
					$('#category_depth_2').attr('value', '');
					for(var i=0; i<data.length; i++) {
						category_depth2_list.push(data[i]);
						console.log(data[i]);
						console.log(category_depth2_list[i]);
						$('#category_depth_2').append('<option></option>');
						$('#category_depth_2 option:last-child').val(data[i]);
						$('#category_depth_2 option:last-child').text(data[i]);
					}
				}
			}
		});
	});

	
	$('#category_depth_2').change(function(){
		if ($('#category_depth_2').val() == "키워드2" ) {
			$('#category_number').css('display', 'none');
		} else {
			$('#category_number').css('display', 'block');
		}

		depth_2_select = $('select[name=category_depth_2]').val();
		category_depth_2 = $("#category_depth_2 option:selected").val();
		depth_2_pos =$("#category_depth_2 option").index($("#category_depth_2 option:selected"));
		console.log(depth_2_select);
		console.log(depth_2_pos);
		console.log(category_depth_2);
		
		var query2 = {category_depth_2: $("#category_depth_2 option:selected").val()};
		var number_name = [];
		
		$.ajax({
			url : '/book/categoryDepth3Search',
			method: 'post',
			data: query2,
			traditional :  true,
			dataType: 'json',
			 
			success: function(data) {
				if (data != 'null' ) {
					$('#category_number > option').remove();
					$('#category_number').append('<option value="키워드3" selected>키워드3</option>');
					category_number = $("#category_number option:selected").val();
					console.log('-------------'+category_number);
					for(var i=0; i<data.length; i++) {
						$('#category_number').append('<option></option>');	
						number_name = data[i].category_name+' ('+data[i].category_number+')';
						console.log(number_name);
						$('#category_number option:last-child').val(data[i].category_number);
						$('#category_number option:last-child').text(number_name);
					}
				}
			}
		});
	});

	$('#category_number').change(function() {
		category_number = $("#category_number option:selected").val();
		console.log(category_number);
		if (category_number == '') {
			alert("?");
		}
	});
	
	$('#registerBtn').click(function(){
		var book_title = $('input[name="book_title"]').val();
		var book_author = $('input[name="book_author"]').val();
		var book_publisher = $('input[name="book_publisher"]').val();
		var book_publisher_date = $('input[name="book_publisher_date"]').val();
		var book_isbn_1 = $('input[name="book_isbn_1"]').val();
		var book_isbn_2 = $('input[name="book_isbn_2"]').val();
		var book_isbn_3 = $('input[name="book_isbn_3"]').val();
		var book_isbn_4 = $('input[name="book_isbn_4"]').val();
		var book_isbn_5 = $('input[name="book_isbn_5"]').val();
		var book_isbn_6 = $('input[name="book_isbn_6"]').val();
		
		category_depth_1 = $('select[name=category_depth_1]').val();
		category_depth_2 = $('select[name=category_depth_2]').val();
		category_number = $('select[name=category_number]').val();
		console.log(book_isbn_1);
		console.log(book_isbn_2);
		console.log(book_isbn_3);;
		console.log(book_isbn_4);
		console.log(book_isbn_5);
		console.log(book_isbn_6);
		
		
		if (book_title == '') {
			alert('책 제목을 입력해주세요');
			$('input[name="book_title"]').focus();
		} else if ($('#type_kmo').is(':checked') == false && $('#type_emo').is(':checked') == false && $('#type_wmo').is(':checked') == false) {
			alert('도서 타입을 선택해주세요');
			$('#type_kmo').focus();
		} else if (category_depth_1 == '키워드1') {
			alert('키워드1 선택해주세요');
			$('#category_depth_1').focus();
		} else if (category_depth_2 == '키워드2') {
			alert('키워드2 선택해주세요');
			$('#category_depth_2').focus();
		} else if (category_number == '키워드3') {
			category_number = $('select[name=category_number]').val();
			alert('키워드3 선택해주세요');
			$('#category_number').focus();
		} else if ($('#position_1').is(':checked') == false && $('#position_2').is(':checked') == false  && $('#position_3').is(':checked') == false) {
			$('#position_1').focus();
			alert('도서 소장 위치를 선택해주세요');
		} else if (book_author == '') {
			$('input[name="book_author"]').focus();
			console.log(category_number);
			alert('저자를 입력해주세요');
		} else if (book_publisher == '') {
			$('input[name="book_publisher"]').focus();
			alert('출판사를 입력해주세요');
		} else if (book_publisher_date == '') {
			$('input[name="book_publisher_date"]').focus();
			alert('출판일자를 입력해주세요');
		} else if (book_isbn_1 == '') {
			$('input[name="book_isbn_1"]').focus();
			alert('접두부를 입력해주세요');
		} else if (book_isbn_2 == '') {
			$('input[name="book_isbn_2"]').focus();
			alert('국가번호를 입력해주세요');
		} else if (book_isbn_3 == '') {
			$('input[name="book_isbn_3"]').focus();
			alert('발행자 번호를 입력해주세요');
		} else if (book_isbn_4 == '') {
			$('input[name="book_isbn_4"]').focus();
			alert('서명식 식별번호를 입력해주세요');
		} else if (book_isbn_5 == '') {
			$('input[name="book_isbn_5"]').focus();
			alert('체크기호를 입력해주세요');
		} else if ($('#rental_enable').is(':checked') == false && $('#rental_unable').is(':checked') == false) {
			$('#rental_enable').focus();
			alert('대출 여부를 선택해주세요');
		} else {
			
			if (book_isbn_6 != null) {
				var book_isbn = book_isbn_1+'-'+book_isbn_2+'-'+book_isbn_3+'-'+book_isbn_4+'-'+book_isbn_5+'-'+book_isbn_6;
			} else {
				var book_isbn = book_isbn_1+'-'+book_isbn_2+'-'+book_isbn_3+'-'+book_isbn_4+'-'+book_isbn_5;
			}
			$('#book_isbn').attr('value', book_isbn);
			$('#registerFrm').attr('action', '/book/register');
			$('#registerBtn').attr('type', 'submit');
		}
	});	

});