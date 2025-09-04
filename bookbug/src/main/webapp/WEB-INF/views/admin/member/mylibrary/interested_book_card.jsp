<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
 <%@ include file="../../../includes/admin-header.jsp" %>   
<link rel="stylesheet" href="/resources/css/admin/mylibrary/interested_book_list.css">
<script>	
	$(function(){
		$('#searchBtn').click(function(){
			var member_id = "${member.member_id}";
			var searchType = $('#searchType').val();
			var keyword = $('#keyword').val();
			console.log(searchType);
			console.log(keyword);
			
			if (keyword == '') {
				location.href = "/admin/member/mylibrary/interested_book_list?num=1&member_id="+member_id;
			} else {
				location.href = "/admin/member/mylibrary/interested_book_list?num=1&member_id="+member_id+"&searchType="+searchType+"&keyword="+keyword;
			}
		});
		
		$('.list-btn').click(function(){
			var member_id = "${member.member_id}";
			location.href = "/admin/member/mylibrary/interested_book_list?num=1&member_id="+member_id;
		});
			
		var null_list_msg = document.getElementsByClassName("null_list_msg");
		console.log(null_list_msg);
		
		if (null_list_msg.length != 0 ) {
			$('.mylibrary-borrow-wrap').css('display','block');
		} else {
			$('.mylibrary-borrow-wrap').css('display','flex');
		}
			
		
	});
</script>   

	<div class="bn bn-mylibrary-list">
		<h2>My Library <span> list</span></h2>
	</div>
	
	<section>
		<div class="mylibrary-container">
			<ul class="search-bar">
				<li><h3>내 서재</h3></li>
				<li><a href="/admin/member/mylibrary/borrow_current_list?num=1&member_id=${member.member_id }">도서 이용정보</a>
				<li><a href="/admin/member/mylibrary/interested_book_card?num=1&member_id=${member.member_id}">나만의 책장</a></li>
			</ul>
			
			<div class="mylibrary-wrap">
			
				<ul  class="search-keyword">
					<li>
						<select id="searchType" name="searchType">
							<option value="book_title" selected>책 제목</option>
							<option value="borrow_start">대출일</option>
							<option value="borrow_end">반납예정일</option>
						</select>
					</li>
					<li><input type="search" id="keyword" name="keyword"  placeholder="검색어 입력"  class="input-frm"></li>
					<li>
						<button type="button" id="searchBtn" >검색</button>
					</li>
					<li>
						<button type="button" class="list-btn" >리스트로 보기</button>
					</li>
				</ul>
				
				<div class="mylibrary-interested-book-wrap_card">
					<div class="mylibrary-borrow-wrap">
						<c:if test="${ empty interested_book_list }">
						<p class="null_list_msg">등록한 관심 도서가 없습니다.</p>
						</c:if>
					
						<c:if test="${ !empty interested_book_list }">
						<c:forEach items="${interested_book_list}"  var="interested_book_list" varStatus="status">
						<div class="interested_book_card-container interested_book_card-container-${status.index}">
				
							<div class="book-thumbnail-card">
								<a href=""><img src="/libraryUploadImg/${interested_book_list.book_thumbnail}"></a>
								<ul class="interested_book_list_card">
									<li><p>${interested_book_list.book_title} </p></li>
									<li><p>${interested_book_list.book_author} </p></li>
									<li><p>${interested_book_list.book_publisher} </p></li>
									<li><p>${interested_book_list.book_publisher_date} </p></li>
								</ul>
							</div>
							<div>
								<p>${interested_book_list.book_title}</p>
							</div>
	
						</div>
						</c:forEach>
						</c:if>
					</div>
				</div>
			</div>
		</div>

	</section>	
	
	
<%@ include file="../../../includes/footer.jsp" %>
	
	
	