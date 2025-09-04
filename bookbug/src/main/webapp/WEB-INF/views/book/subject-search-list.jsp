<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@ include file="../includes/admin-header.jsp" %>   
<link rel="stylesheet" href="/resources/css/book/book.css">
<link rel="stylesheet" href="/resources/css/book/subject-search.css">

<script>
	$(function(){
		
		$('.book-search-bar li:nth-child(3)').css('background','#fdf4d1')
		
		$('.depth1-background').click(function(){
			var depth1_content = $(this).next().val();
			console.log(depth1_content);
			$(this).attr('href','/book/subject-search?category_depth_1='+depth1_content);
		});
		
	});
</script>

	<div class="bn bn-book-subjectSearch">
		<h2>Subject<span> Book</span><span> List</span></h2>
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
	
				<div class="book-list-wrap">
					<c:if test="${ empty book_list }">
					<p class="null_list_msg">검색된 도서가 없습니다.</p>
				</c:if>
					
					<c:if test="${ !empty book_list }">
					<c:forEach items="${book_list}"  var="book_list" varStatus="status">
					<div class="book-list-container book-list-container-${status.index}">
						<div class="book-index">
							<p>${status.index+1}.</p>
							<input type="checkbox" id="book-${status.index}"  value="book-${status.index}">
						</div>
					
						<div class="book-thumbnail">
							<a href=""><img src="/libraryUploadImg/${book_list.book_thumbnail}"></a>
						</div>
					
						<ul class="book-list">
							<li><p>${book_list.book_title}</p></li>
							<li><p><span>저자 : ${book_list.book_author}</span><span>|</span><span>발행자 : ${book_list.book_publisher}</span><span>|</span><span>발행일 : ${book_list.book_publisher_year}</span></p></li>
							<li><p><span>등록번호 : ${book_list.book_id}</span><span>|</span><span>ISBN : ${book_list.book_isbn}</span><span>|</span><span>청구기호 : ${book_list.book_callnumber}</span></li>
							<li><p><span>자료위치 : 자료실</span></p></li>
							<li>
								<c:if test = "${book_list.book_rental_able eq '대출 가능'}">
								<div><p class="rental-enable">${book_list.book_rental_able}[비치중]</p></div>
								</c:if>
								<c:if test = "${book_list.book_rental_able eq '대출 불가'}">
								<div><p class="rental-enable">${book_list.book_rental_able}[대출중]</p></div>
								</c:if>
								<div class="reserve-container">
									<button type="button" id="reservationBtn">도서예약 신청</button>
									<input type="hidden" name="book_id" value="${book_list.book_id}">
									<button type="button"  id="interestedBtn">관심도서 담기</button>
								</div>
							</li>
						</ul>
					</div>
					</c:forEach>
					</c:if>
				</div>

						<%-- Page 객체(DTO)를 사용한 페이징 처리 --%>
				<div class="pagenation-wrap">
					<ul class="pagenation">
						<%-- 이전(prev) 버튼 --%>
						<c:if test ="${page.prev}">
						<li><a class="prev_a"  href="/book/subject-search-list?num=${page.startPageNum - 1}&book_category=${page.book_category}" class="prev"></a></li>
						</c:if>
						
						<%-- 페이지 번호 버튼 --%>
						<c:forEach begin="${page.startPageNum}" end="${page.endPageNum}" var="num">
						<li>
							<c:if test="${select != num}">
							<input type="hidden" name="page_book_category" value="${page.book_category}">
							<a class ="a"  href="/book/subject-search-list?num=${num}&book_category=${page.book_category}">${num}</a>
							</c:if>
							<c:if test="${select == num}">
							<a class="active">${num}</a>
							</c:if>
						</li>
						</c:forEach>
						
						<%-- 다음(next) 버튼 --%>
						<c:if test="${page.next}">
						<li>
							<input type="hidden" name="page_book_category" value="${page.book_category}">
							<a class="next_a" href="/book/subject-search-list?num=${page.endPageNum + 1}&book_category=${page.book_category}" class="next">다음</a>
						</li>
						</c:if>
					</ul>
				</div>
			</div>
		</div>

	</section>
	
	
<%@ include file="../includes/admin-footer.jsp" %>