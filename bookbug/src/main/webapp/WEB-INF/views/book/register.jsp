<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
 <%@ include file="../includes/admin-header.jsp" %>   
<link rel="stylesheet" href="/resources/css/book/book.css">
<script src="/resources/js/book_register.js"></script>

	<div class="bn bn-book-register">
		<h2>Book<span>register</span></h2>
	</div>
	
	<section>
		<form id="registerFrm" name="registerFrm" method="post"  enctype="multipart/form-data">
			
			<ul class="book-register">
				<li><p>※ 필수 입력 항목(*)은 반드시 입력해야 합니다. </p></li>
				<li><p class="sub-category"><span>*</span><span> 도서명</span></p><input type="text" name="book_title" class="book_input"  required autofocus></li>
				<li><p class="sub-category"><span>&nbsp;&nbsp;</span><span> 도서명(부제)</span></p><input type="text" name="book_subtitle"  class="book_input" ></li>
				<li>
					<p class="sub-category"><span>*</span><span> 도서 유형</span></p>
					<input type="radio" id="type_kmo" name="book_type"  value="KMO" >
					<label for="type_kmo">KMO</label>
					<input type="radio" id="type_emo" name="book_type"  value="EMO" >
					<label for="type_emo">EMO</label>
					<input type="radio" id="type_wmo" name="book_type"  value="WMO" >
					<label for="type_wmo">WMO</label>
				</li>
				<li class="category">
					<p class="sub-category"><span>*</span><span> 도서 카테고리</span></p>
					<select id="category_depth_1" name="category_depth_1"  class="book_register_select" required>
						<option value="키워드1"  selected>키워드1</option>
					<c:forEach items="${category_depth1_list }" var="depth1" varStatus="depth1_status">
						<option class="depth1" value="${depth1 }" <c:if test = "${depth_1_select eq depth1}">selected</c:if>>${depth1 }</option>
					</c:forEach>
					</select>
					<select id="category_depth_2" name="category_depth_2" class="book_register_select"  required>
						<option value="키워드2" >키워드2</option>
					</select>
					<select id="category_number" name="category_number" class="book_register_select"  required>
						<option value="키워드3" >키워드3</option>
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
					<textarea name="book_detail" ></textarea>
				</li>
				<li><p class="sub-category"><span>*</span><span> 도서 저자</span></p><input type="text" name="book_author" class="book_input"  required></li>
				<li><p class="sub-category"><span>*</span><span> 도서 출판사</span></p><input type="text" name="book_publisher" class="book_input"  required></li>
				<li><p class="sub-category"><span>*</span><span> 도서 출판년도</span></p><input type="text" name="book_publisher_year" class="book_input"  required></li>
				<li>
					<p class="sub-category"><span>*</span><span> ISBN</span></p>
					<input type="hidden" id="book_isbn" name="book_isbn" >
					<p class="book-register-isbn">
						<input type="text" id="book_isbn_1" name="book_isbn_1"  class="book_input"  maxlength="3" required >
						<span>-</span>
						<input type="text" id="book_isbn_2"name="book_isbn_2" class="book_input"  maxlength="2" required>
						<span>-</span>
						<input type="text" id="book_isbn_3"name="book_isbn_3"  class="book_input"  maxlength="6" required>
						<span>-</span>
						<input type="text" id="book_isbn_4"name="book_isbn_4"  class="book_input"  maxlength="1"required>
						<span>-</span>
						<input type="text" id="book_isbn_5"name="book_isbn_5"  class="book_input"  maxlength="1"required>
						<span>-</span>
						<input type="text" id="book_isbn_6"name="book_isbn_6" class="book_input" maxlength="5">
				</li>
				<li>
					<p class="sub-category"><span>*</span><span> 대출 가능여부</span></p>
					<input type="radio" id="rental_enable" name="book_rental_able"  value="대출 가능" >
					<label for="rental_enable">가능</label>
					<input type="radio" id="rental_unable" name="book_rental_able"  value="대출 불가" >
					<label for="rental_unable" >불가</label>
				</li>
				<li>
					<p class="sub-category"><span>*</span><span> 도서 이미지</span></p>
					<input type="file" name="file" class="book_input file" required>
				</li>			
			</ul>
			
			<div class="book_register_btn-wrap">
				<button type="button" id="registerBtn" class="btn btn-register" >도서 등록</button>
				<a href="/book/list?num=1"  class="btn btn-default">목록</a>
			</div>
			
			
		</form>

	</section>	


<%@ include file="../includes/admin-footer.jsp" %>