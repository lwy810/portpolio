<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
 <%@ include file="../includes/admin-header.jsp" %>   
<link rel="stylesheet" href="/resources/css/book/book.css">
<script src="/resources/js/book_register.js"></script>
<script>
	$(function(){
		var category_depth_1 = $('#hidden_category_depth_1').val();
		var category_depth_2 = $('#hidden_category_depth_2').val();
		var category_number = $('#hidden_category_number').val();
		var category_name = $('#hidden_category_name').val();
		var category_number_name = category_number +' '+category_name;
		
		console.log(category_depth_1); 	
		console.log(category_depth_2); 	
		console.log(category_number); 	
		console.log(category_name); 	
		console.log(category_number_name); 	
		
		$('#category_depth_1').val(category_depth_1);
		$('#category_depth_2').val(category_depth_2);
		$('#category_number').val(category_number_name);
		
		$('#book_isbn_1').attr('maxlength', '3');
		$('#book_isbn_2').attr('maxlength', '2');
		$('#book_isbn_3').attr('maxlength', '6');
		$('#book_isbn_4').attr('maxlength', '1');
		$('#book_isbn_5').attr('maxlength', '1');
		$('#book_isbn_6').attr('maxlength', '5');
	
		var book_type =$('input[name="book_type"]').val();
		var book_position =$('input[name="book_position"]').val();
		var book_rental_able =$('input[name="book_rental_able"]').val();
	
		if (book_type == 'KMO') {$('#type_kmo').attr('checked', true);}
		if (book_type == 'EMO') {$('#type_kmo').attr('checked', true);}
		if (book_type == 'WMO') {$('#type_kmo').attr('checked', true);}
		
		if (book_position == '종합자료실1') {$('#position_1').attr('checked', true);}
		if (book_position == '종합자료실2') {$('#position_2').attr('checked', true);}
		if (book_position == '어린이자료실') {$('#position_3').attr('checked', true);}
		
		if (book_rental_able == '대출 가능') {$('#rental_enable').attr('checked', true);}
		if (book_rental_able == '대출 불가') {$('#rental_unable').attr('checked', true);}

		$('.back').click(function(){
			history.back();
		});

		
		$('#bookModifyBtn').click(function(){
			$('#bookModifyFrm').attr('action', '/book/bookModify');
			$(this).attr('type', 'submit');
		});
			
		$('#bookModifyBtn').click(function(){
			$('#bookModifyFrm').attr('action', '/book/bookModify');
			$(this).attr('type', 'submit');
		});
			
		
	});

</script>

	<div class="bn bn-book-register">
		<h2>Book<span>view</span></h2>
	</div>
		
	<section>
		<c:forEach items="${book_list }" var="book_list" varStatus="book_list_status">
		<form id="bookModifyFrm" name="bookModifyFrm" method="post"  enctype="multipart/form-data">
			<input type="hidden" name="book_id" value="${book_list.book_id }">
			<ul class="book-register book-view">
				<li>
					<p class="sub-category"><span>*</span><span> 도서명</span></p>
					<input type="text" name="book_title" class="book_input"  value="${book_list.book_title }"  required autofocus>
				</li>
				<li>
					<p class="sub-category"><span>&nbsp;&nbsp;</span><span> 도서명(부제)</span></p>
					<input type="text" name="book_subtitle"   value="${book_list.book_subtitle }"  class="book_input" >
				</li>
				<li>
					<p class="sub-category"><span>*</span><span> 도서 유형</span></p>
					<input type="radio" id="type_kmo" name="book_type"  value="KMO"  >
					<label for="type_kmo">KMO</label>
					<input type="radio" id="type_emo" name="book_type"  value="EMO" >
					<label for="type_emo">EMO</label>
					<input type="radio" id="type_wmo" name="book_type"  value="WMO" >
					<label for="type_wmo">WMO</label>
				</li>
				<li class="view_category">
					<p class="sub-category"><span>*</span><span> 도서 카테고리</span></p>
					<c:forEach items="${category_list }" var="category_list" varStatus="category_list_status">
					<input type="hidden" id="hidden_category_depth_1" name="hidden_category_depth_1" value="${category_list.category_depth_1}" >
					<input type="hidden" id="hidden_category_depth_2" name="hidden_category_depth_2" value="${category_list.category_depth_2}" >
					<input type="hidden" id="hidden_category_number" name="hidden_category_number" value="${category_list.category_number}" >
					<input type="hidden" id="hidden_category_name" name="hidden_category_name" value="${category_list.category_name}" >
					</c:forEach>
					
					
					
					<select id="category_depth_1" name="category_depth_1"  required>
						<option value="키워드1" >키워드1</option>
					<c:forEach items="${category_depth1_list }" var="depth1" varStatus="depth1_status">
						<option class="depth1" value="${depth1}" >${depth1}</option>
					</c:forEach>
					</select>
					
					<select id="category_depth_2" name="category_depth_2"  required>
						<option value="키워드2" >키워드2</option>
					<c:forEach items="${category_depth2_list }" var="depth2" varStatus="depth2_status">
						<option class="depth2" value="${depth2 }" >${depth2 }</option>
					</c:forEach>
					</select>
					
					<select id="category_number" name="category_number"  required>
						<option value="키워드3" >키워드3</option>
					<c:forEach items="${category_name_list }" var="number_name" varStatus="depth1_status">
						<option class="number_name" value="${number_name.category_number } ${number_name.category_name}" >${number_name.category_number } ${number_name.category_name}</option>
					</c:forEach>
					</select>
					
					

				</li>
				<li>
					<p class="sub-category"><span>*</span><span> 도서 위치</span></p>
					<input type="radio" id="position_1" name="book_position"  value="종합자료실1" >
					<label for="position_1">종합자료실1</label>
					<input type="radio" id="position_2" name="book_position"  value="종합자료실2" >
					<label for="position_2">종합자료실2</label>
					<input type="radio" id="position_3" name="book_position"  value="어린이자료실" >
					<label for="position_3">어린이자료실</label>
				</li>
				
				<li>
					<p class="sub-category"><span>&nbsp;&nbsp;</span><span> 도서 상세소개</span></p>
					<textarea name="book_detail" >${book_list.book_detail }</textarea>
				</li>
				<li>
					<p class="sub-category"><span>*</span><span> 도서 저자</span></p>
					<input type="text" name="book_author"  value="${book_list.book_author }"  class="book_input"  required>
				</li>
				<li>
					<p class="sub-category"><span>*</span><span> 도서 출판사</span></p>
					<input type="text" name="book_publisher"  value="${book_list.book_publisher }" class="book_input"  required>
				</li>
				<li>
					<p class="sub-category"><span>*</span><span> 도서 출판일</span></p>
					<input type="text" name="book_publisher_year"  value="${book_list.book_publisher_year }"  class="book_input"  required>
				</li>
				<li>
					<p class="sub-category"><span>*</span><span> ISBN</span></p>
				
					<input type="hidden" id="book_isbn" name="book_isbn" >
					<p class="book-register-isbn">
						<c:forEach items="${fn:split(book_list.book_isbn, '-')}" var="book_isbn"  varStatus="status">
						<input type="text" id="book_isbn_${status.index+1}" name="book_isbn_${status.index+1 }"  value="${book_isbn }" class="book_input" required >
						</c:forEach>
					</p>
				</li>
				<li>
					<p class="sub-category"><span>*</span><span> 대출 가능여부</span></p>
					<input type="radio" id="rental_enable" name="book_rental_able"  value="${book_list.book_rental_able }">
					<label for="rental_enable">대출 가능</label>
					<input type="radio" id="rental_unable" name="book_rental_able"  value="${book_list.book_rental_able }" >
					<label for="rental_unable" >대출 불가</label>
				</li>
				<li>
					<p class="sub-category"><span>&nbsp;&nbsp;</span><span> 도서 이미지</span></p>
					<input type="file" id="file" name="file" class="book_input file" required>
				</li>
				<li>
					<p class="sub-category"><span>&nbsp;&nbsp;</span><span>첨부파일 리스트</span></p>
					<div>
						<p id="attachFile_1">${book_list.book_thumbnail }</p>
						<input type="hidden" name="originalFile" value="${book_list.book_thumbnail }">
					</div>
				</li>
			</ul>
			
			<div class="book_view_btn-wrap">
				<button type="button" id="bookModifyBtn" class="btn btn-register" >수정하기</button>
				<button type="button" id="bookdeleteBtn" class="btn btn-danger" >삭제하기</button>
				<a href="/book/list?num=1" class="btn btn-default back">목록</a>
			</div>
			
		</form>
		</c:forEach>
	</section>	


<%@ include file="../includes/admin-footer.jsp" %>