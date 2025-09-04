<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@ include file="../includes/admin-header.jsp" %>   
<link rel="stylesheet" href="/resources/css/book/book.css">
<link rel="stylesheet" href="/resources/css/book/subject-search.css">

<script>
	$(function(){
		
		$('.search-bar li:nth-child(3)').css('background' , '#fdf4d1');
		
		$('.depth1-background').click(function(){
			var depth1_content = $(this).next().val();
			console.log(depth1_content);
			$(this).attr('href','/book/subject-search?category_depth_1='+depth1_content);
		});
		
		$('.book_category').click(function(){
			var book_category = $(this).children('span:eq(0)').text();
			console.log(book_category);
			$(this).attr('href','/book/subject-search-list?num=1&book_category='+book_category);
		});
		
		
	});
</script>

	<div class="bn bn-book-subjectSearch">
		<h2>Book<span> Subject </span><span>Search</span></h2>
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
				<ul class="search-depth1-container">
					<li>
						<div class="depth1-background-wrap">
							<a href ="" class="depth1-background depth1-background-0"></a>
							<input type="hidden" value="총류" name="depth1-content">
						</div>
						<p class="depth1-content">총류</p>
					</li>
					
					<li>
						<div class="depth1-background-wrap">
							<a href =""  class="depth1-background depth1-background-1"></a>
							<input type="hidden" value="철학" name="depth1-content">
						</div>
						<p class="depth1-content">철학</p>
					</li>
	
					<li>
						<div class="depth1-background-wrap">
							<a href =""  class="depth1-background depth1-background-2"></a>
							<input type="hidden" value="종교" name="depth1-content">
						</div>
						<p class="depth1-content">종교</p>
					</li>				
	
					<li>
						<div class="depth1-background-wrap">
							<a href =""  class="depth1-background depth1-background-3"></a>
							<input type="hidden" value="사회과학" name="depth1-content">
						</div>
						<p class="depth1-content">사회과학</p>
					</li>
	
					<li>
						<div class="depth1-background-wrap">
							<a href =""  class="depth1-background depth1-background-4"></a>
							<input type="hidden" value="자연과학" name="depth1-content">
						</div>
						<p class="depth1-content">자연과학</p>
					</li>
				
					<li>
						<div class="depth1-background-wrap">
							<a href =""  class="depth1-background depth1-background-5"></a>
							<input type="hidden" value="기술과학" name="depth1-content">
						</div>
						<p class="depth1-content">기술과학</p>
					</li>
					
					<li>
						<div class="depth1-background-wrap">
							<a href =""  class="depth1-background depth1-background-6"></a>
							<input type="hidden" value="예술" name="depth1-content">
						</div>
						<p class="depth1-content">예술</p>
					</li>
					
					<li>
						<div class="depth1-background-wrap">
							<a href =""  class="depth1-background depth1-background-7"></a>
							<input type="hidden" value="언어" name="depth1-content">
						</div>
						<p class="depth1-content">언어</p>
					</li>
					
					<li>
						<div class="depth1-background-wrap">
							<a href =""  class="depth1-background depth1-background-8"></a>
							<input type="hidden" value="문학" name="depth1-content">
						</div>
						<p class="depth1-content">문학</p>
					</li>
															
					<li>
						<div class="depth1-background-wrap">
							<a href =""  class="depth1-background depth1-background-9"></a>
							<input type="hidden" value="역사" name="depth1-content">
						</div>
						<p class="depth1-content">역사</p>
					</li>																					
				</ul>
	
				<div class="search-depth2-container">
					<ul class="category_list category_list-0">
						<c:forEach items="${db_category_list_0}" var="db_category_list_0" varStatus="status">
						<c:if test="${status.index == 0 }">
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_0.category_number}</span>
								<span> ${db_category_list_0.category_name}</span>
							</a>
						</li>
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_0.category_number}</span>
								<span> ${db_category_list_0.category_name}</span>
							</a>
						</li>
						</c:if>
						<c:if test="${status.index > 0 }">
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_0.category_number}</span>
								<span> ${db_category_list_0.category_name}</span>
							</a>
						</li>
						</c:if>
						</c:forEach>
					</ul>
						
					<ul class="category_list category_list-1">
						<c:forEach items="${db_category_list_1}" var="db_category_list_1" varStatus="status">
						<c:if test="${status.index == 0 }">
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_1.category_number}</span>
								<span> ${db_category_list_1.category_name}</span>
							</a>
						</li>
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_1.category_number}</span>
								<span> ${db_category_list_1.category_name}</span>
							</a>
						</li>
						</c:if>
						<c:if test="${status.index > 0 }">
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_1.category_number}</span>
								<span> ${db_category_list_1.category_name}</span>
							</a>
						</li>
						</c:if>
						</c:forEach>
					</ul>
						
					<ul class="category_list category_list-2">
						<c:forEach items="${db_category_list_2}" var="db_category_list_2" varStatus="status">
						<c:if test="${status.index == 0 }">
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_2.category_number}</span>
								<span> ${db_category_list_2.category_name}</span>
							</a>
						</li>
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_2.category_number}</span>
								<span> ${db_category_list_2.category_name}</span>
							</a>
						</li>
						</c:if>
						<c:if test="${status.index > 0 }">
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_2.category_number}</span>
								<span> ${db_category_list_2.category_name}</span>
							</a>
						</li>
						</c:if>
						</c:forEach>
					</ul>
						
					<ul class="category_list category_list-3">
						<c:forEach items="${db_category_list_3}" var="db_category_list_3" varStatus="status">
						<c:if test="${status.index == 0 }">
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_3.category_number}</span>
								<span> ${db_category_list_3.category_name}</span>
							</a>
						</li>
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_3.category_number}</span>
								<span> ${db_category_list_3.category_name}</span>
							</a>
						</li>
						</c:if>
						<c:if test="${status.index > 0 }">
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_3.category_number}</span>
								<span> ${db_category_list_3.category_name}</span>
							</a>
						</li>
						</c:if>
						</c:forEach>
					</ul>
		
						
					<ul class="category_list category_list-4">
						<c:forEach items="${db_category_list_4}" var="db_category_list_4" varStatus="status">
						<c:if test="${status.index == 0 }">
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_4.category_number}</span>
								<span> ${db_category_list_4.category_name}</span>
							</a>
						</li>
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_4.category_number}</span>
								<span> ${db_category_list_4.category_name}</span>
							</a>
						</li>
						</c:if>
						<c:if test="${status.index > 0 }">
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_4.category_number}</span>
								<span> ${db_category_list_4.category_name}</span>
							</a>
						</li>
						</c:if>
						</c:forEach>
					</ul>
	
					
					<ul class="category_list category_list-5">
						<c:forEach items="${db_category_list_5}" var="db_category_list_5" varStatus="status">
						<c:if test="${status.index == 0 }">
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_5.category_number}</span>
								<span> ${db_category_list_5.category_name}</span>
							</a>
						</li>
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_5.category_number}</span>
								<span> ${db_category_list_5.category_name}</span>
							</a>
						</li>
						</c:if>
						<c:if test="${status.index > 0 }">
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_5.category_number}</span>
								<span> ${db_category_list_5.category_name}</span>
							</a>
						</li>
						</c:if>
						</c:forEach>
					</ul>
					
					<ul class="category_list category_list-6">
						<c:forEach items="${db_category_list_6}" var="db_category_list_6" varStatus="status">
						<c:if test="${status.index == 0 }">
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_6.category_number}</span>
								<span> ${db_category_list_6.category_name}</span>
							</a>
						</li>
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_6.category_number}</span>
								<span> ${db_category_list_6.category_name}</span>
							</a>
						</li>
						</c:if>
						<c:if test="${status.index > 0 }">
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_6.category_number}</span>
								<span> ${db_category_list_6.category_name}</span>
							</a>
						</li>
						</c:if>
						</c:forEach>
					</ul>	
		
					<ul class="category_list category_list-7">
						<c:forEach items="${db_category_list_7}" var="db_category_list_7" varStatus="status">
						<c:if test="${status.index == 0 }">
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_7.category_number}</span>
								<span> ${db_category_list_7.category_name}</span>
							</a>
						</li>
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_7.category_number}</span>
								<span> ${db_category_list_7.category_name}</span>
							</a>
						</li>
						</c:if>
						<c:if test="${status.index > 0 }">
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_7.category_number}</span>
								<span> ${db_category_list_7.category_name}</span>
							</a>
						</li>
						</c:if>
						</c:forEach>
					</ul>
	
					<ul class="category_list category_list-8">
						<c:forEach items="${db_category_list_8}" var="db_category_list_8" varStatus="status">
						<c:if test="${status.index == 0 }">
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_8.category_number}</span>
								<span> ${db_category_list_8.category_name}</span>
							</a>
						</li>
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_8.category_number}</span>
								<span> ${db_category_list_8.category_name}</span>
							</a>
						</li>
						</c:if>
						<c:if test="${status.index > 0 }">
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_8.category_number}</span>
								<span> ${db_category_list_8.category_name}</span>
							</a>
						</li>
						</c:if>
						</c:forEach>
					</ul>
						
					<ul class="category_list category_list-9">
						<c:forEach items="${db_category_list_9}" var="db_category_list_9" varStatus="status">
						<c:if test="${status.index == 0 }">
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_9.category_number}</span>
								<span> ${db_category_list_9.category_name}</span>
							</a>
						</li>
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_9.category_number}</span>
								<span> ${db_category_list_9.category_name}</span>
							</a>
						</li>
						</c:if>
						<c:if test="${status.index > 0 }">
						<li>
							<a href="" class="book_category">
								<span>${db_category_list_9.category_number}</span>
								<span> ${db_category_list_9.category_name}</span>
							</a>
						</li>
						</c:if>
						</c:forEach>
					</ul>
				</div>
			</div>
		</div>
	</section>
	
	
<%@ include file="../includes/admin-footer.jsp" %>