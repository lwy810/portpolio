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
		
		$('#list-btn').click(function(){
			var listSession;
			location.href = "/admin/member/mylibrary/interested_book_list?num=1&member_id="+member_id;
		});
		
		
		
	})
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
			
				<ul  class="search-keyword search-keyword-list">
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
				</ul>
				
				<div class="mylibrary-interested-book-wrap">
					<c:if test="${ empty interested_book_list }">
					<p class="null_list_msg">등록한 관심 도서가 없습니다.</p>
					</c:if>
				
					<c:if test="${ !empty interested_book_list }">
					<c:forEach items="${interested_book_list}"  var="interested_book_list" varStatus="status">
					<div class="interested_book_list-container interested_book_list-container-${status.index}">
						<div class="interested_book_list-index">
							<p>${status.index+1}.</p>
							<input type="checkbox" id="interested-book-${status.index}"  value="interested-book-${status.index}">
						</div>
					
						<div class="book-thumbnail">
							<a href=""><img src="/libraryUploadImg/${interested_book_list.book_thumbnail}"></a>
						</div>
					
							<ul class="interested_book_list">
							<li><a href="/book/view?book_id=${interested_book_list.book_id}">${interested_book_list.book_title}</a></li>
							<li><p><span>저자 : ${interested_book_list.book_author}</span><span>|</span><span>발행자 : ${interested_book_list.book_publisher}</span><span>|</span><span>저자 : ${interested_book_list.book_publisher_date}</span></p></li>
							<li><p><span>등록번호 : ${interested_book_list.book_id}</span><span>|</span><span>ISBN : ${interested_book_list.book_isbn}</span></li>
							<li><p><span>자료위치 : ${interested_book_list.book_position}</span></p></li>
						</ul>
					</div>
					</c:forEach>
					</c:if>
				</div>

				<%-- Page 객체(DTO)를 사용한 페이징 처리 --%>
				<ul class="pagenation">
					<c:if test="${page.prev}">
					<li><button type="button"  class="prev" onclick="prev()"><i class="bi bi-chevron-left"></i></button></li>
					</c:if>
					
					<%-- 페이지 번호 버튼 --%>
					<c:forEach begin="${page.startPageNum}" end="${page.endPageNum}" var="num">
					<li>
						<c:if test="${selectNum != num}">
						<a href="" class="pageTransfer" >${num}</a>
						</c:if>
						<c:if test="${selectNum == num}">
						<a href="" class="active">${num}</a>
						</c:if>
					</li>
					</c:forEach>
				
					<c:if test="${page.next}">
					<li><button type="button"  class="prev" onclick="next()"><i class="bi bi-chevron-right"></i></button></li>
					<li><a href="/admin/borrow/memberinfo?member_id=${mvo.member_id }&num=${page.endPageNum + 1}" class="next"><i class="bi bi-chevron-right"></i></a></li>
					</c:if>
				</ul>
			</div>
		</div>

	</section>	
	
	
<%@ include file="../../../includes/footer.jsp" %>
	
	
	