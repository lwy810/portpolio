<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
 <%@ include file="../includes/admin-header.jsp" %>   
<link rel="stylesheet" href="/resources/css/book/book.css">
<script src="/resources/js/book_register.js"></script>
<script>
	$(function(){
		var category_depth_1 = '총류';

		$('.book-search-bar li:nth-child(2)').css('background','#fdf4d1')	
		
		$('#searchBtn').click(function(){
			
			if($('#keyword').val() == '') {
				alert("검색어를 입력하세요");
			} else {
				var searchType = $('#searchType').val();
				var keyword = $('#keyword').val();
				console.log(searchType);
				console.log(keyword);

				location.href="/book/list?num=1&searchType="+searchType+"&keyword="+keyword;
			}
		});	
	});

</script>    

	<div class="bn bn-book-search">
		<h2>Book<span> Search</span></h2>
	</div>
	
	<section>
		<div class="book-container">
			<ul class="search-bar book-search-bar">
				<li><h3>자료 검색</h3></li>
				<li><a href="/book/search" >통합자료 검색</a></li>
				<li><a id="subject_searchBtn" href="/book/subject-search?category_depth_1=총류" >주제별 검색</a></li>
				<li><a href="/book/new-book?num=1&registerPeriod=oneMonth&book_category=all">신작 도서</a></li>
				<li><a href="/book/borrow-best?num=1&registerPeriod=oneMonth&book_category=all">대출 베스트</a></li>
			</ul>
			
			<div class="book-search-wrap">
				<ul  class="search-keyword keyword-search">
					<li>	
						<select id="searchType" name="searchType">
							<option value="book_title" selected>책 제목</option>
							<option value="book_author">저자</option>
							<option value="book_publisher">출판사</option>
							<option value="all" >전체</option>
						</select>
					</li>
					<li><input type="search" id="keyword" name="keyword"  placeholder="검색어 입력" class="input-frm"></li>
					<li>
						<button type="button" id="searchBtn" >검색</button>
					</li>
				</ul>
			</div>
		</div>
	</section>	
	

<%@ include file="../includes/admin-footer.jsp" %>