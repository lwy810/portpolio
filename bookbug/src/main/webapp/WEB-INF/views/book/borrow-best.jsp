<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
 <%@ include file="../includes/admin-header.jsp" %>   
<link rel="stylesheet" href="/resources/css/book/book.css">
<script src="/resources/js/book_register.js"></script>
<script>
	$(function(){
		
		$('.book-search-bar li:nth-child(5)').css('background','#fdf4d1')
		
		var searchType = "${page.searchType}"
		var keyword = "${page.keyword}"
		var registerPeriod = "${page.registerPeriod}"
		var book_category_type = "${page.book_category_type}"
				
		$('#registerPeriod').val(registerPeriod);
		$('#book_category_type').val(book_category_type);
		
		
		var a = "${page.searchTypeKeyword}"
		var book_category_type;
		var registerPeriod;
		
		if (searchType == '') {
			$('#searchType').val('book_title');
		} 


		$('#searchBtn').click(function(){
			var num = ${page.num}
			
			keyword = $('#keyword').val();
			searchType = $('#searchType').val();
			book_category_type = $('#book_category_type').val();
			registerPeriod = $('#registerPeriod').val();
			
			location.href="/book/borrow-best?num="+num+"&book_category_type="+book_category_type+"&registerPeriod="+registerPeriod+"&searchType="+searchType+"&keyword="+keyword;
			console.log(searchType);
			console.log(keyword);
		});
		
		$('.reservationBtn').click(function(){
			var member_id = "${member.member_id}"
			var book_id = $(this).next().val();
			
			
			var params = {
					member_id : member_id,
					book_id : book_id
			}
			
			console.log(member_id);
			console.log(book_id);
			console.log(params);
			
			$.ajax({
				url: '/admin/member/mylibrary/reservationRegister',
				method: 'post',
				data: params,
				tranditional: true,
				
				success: function(data) {
					if (data === 'success' ) {
						alert('도서가 예약되었습니다.');
					} 	else if (data === 'finish' ) {
						alert('이미 예약되어 있는 도서입니다.');
					}
				} 
			});
		});
		
		$('.interestedBtn').click(function(){
			var member_id = "${member.member_id}"
			var book_id = $(this).prev().val();
			
			var params = {
					member_id : member_id,
					book_id : book_id
			}
			
			console.log(member_id);
			console.log(book_id);
			console.log(params);
			
			$.ajax({
				url: '/admin/member/mylibrary/interestedRegister',
				method: 'post',
				data: params,
				tranditional: true,
				
				success: function(data) {
					if (data === 'success' ) {
						alert('관심도서가 등록되었습니다.');
					} 	else if (data === 'finish' ) {
						alert('이미 등록되어 있는 관심도서 입니다..');
					}
				} 
			});
		});
	});
	
</script>   
    
    
	<div class="bn bn-book-list">
		<h2>Book <span> list</span></h2>
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
			
				<ul  class="search-keyword search-keyword-booklist">
					<li>
						<select id="book_category_type" name="book_category_type">
							<option value="all" selected>전체 주제</option>
							<option value="총류">총류</option>
							<option value="철학">철학</option>
							<option value="종교">종교</option>
							<option value="사회과학">사회과학</option>
							<option value="자연과학">자연과학</option>
							<option value="기술과학">기술과학</option>
							<option value="예술">예술</option>
							<option value="언어">언어</option>
							<option value="문학">문학</option>			
							<option value="역사">역사</option>
						</select>
					</li>
					<li>
						<select id="registerPeriod" name="registerPeriod">
							<option value="oneMonth" selected>1달 이내</option>
							<option value="threeWeek">3주 이내</option>
							<option value="twoWeek">2주 이내</option>
							<option value="oneWeek">1주 이내</option>
						</select>
					</li>
				</ul>
			
			
				<ul  class="search-keyword search-keyword-booklist keyword-search">
					<li>
						<select id="searchType" name="searchType">
							<option value="book_title" selected>책 제목</option>
							<option value="book_author">저자</option>
							<option value="book_publisher">출판사</option>
							<option value="all">전체</option>
						</select>
					</li>
					<li><input type="search" id="keyword" name="keyword"  placeholder="검색어 입력"  class="input-frm"></li>
			
					<li>
						<button type="button" id="searchBtn"  >검색</button>
					</li>
				</ul>
				
				<div class="book-list-wrap">
					<c:if test="${ empty getBorrowBestList }">
					<p class="null_list_msg">검색된 도서가 없습니다.</p>
					</c:if>
				
					<c:if test="${ !empty getBorrowBestList }">
					<c:forEach items="${getBorrowBestList}"  var="getBorrowBestList" varStatus="status">
					<div class="book-list-container book-list-container-${status.index}">
						<div class="book-index">
							<p>
								<c:set value="${page.displayPost }" var="displayPost"  />
								${status.index+1+displayPost}.
							</p>
							<input type="checkbox" id="book-${status.index}"  value="book-${status.index}">
						</div>
					
						<div class="book-thumbnail">
							<a href=""><img src="/libraryUploadImg/${getBorrowBestList.book_thumbnail}"></a>
						</div>
					
						<ul class="book-list">
							<li><a href="/book/view?book_id=${getBorrowBestList.book_id}">${getBorrowBestList.book_title}</a></li>
							<li><p><span>저자 : ${getBorrowBestList.book_author}</span><span>|</span><span>발행자 : ${getBorrowBestList.book_publisher}</span><span>|</span><span>발행일 : ${getBorrowBestList.book_publisher_year}</span></p></li>
							<li><p><span>등록번호 : ${getBorrowBestList.book_id}</span><span>|</span><span>ISBN : ${getBorrowBestList.book_isbn}</span><span>|</span><span>청구기호 : ${getBorrowBestList.book_callnumber}</span></li>
							<li><p><span>자료위치 : ${getBorrowBestList.book_position}</span><span>|</span><span>대출 횟수 : ${getBorrowBestList.book_borrow_cnt}회</span></p></li>
							<li>
								<c:if test = "${getBorrowBestList.book_rental_able eq '대출 가능'}">
								<div><p class="rental-enable">${getBorrowBestList.book_rental_able}[비치중]</p></div>
								</c:if>
								<c:if test = "${getBorrowBestList.book_rental_able eq '대출 불가'}">
								<div><p class="rental-enable">${getBorrowBestList.book_rental_able}[대출중]</p></div>
								</c:if>
								
								
								<div class="reserve-container">
									<button type="button" class="reservationBtn">도서예약 신청</button>
									<input type="hidden" name="book_id" value="${getBorrowBestList.book_id}">
									<button type="button" class="interestedBtn">관심도서 담기</button>
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
					
						<li><a href="/book/borrow-best?num=${page.startPageNum - 1}${page.searchTypeKeyword}" class="prev">이전</a></li>
					
						
						
						</c:if>
						
						<%-- 페이지 번호 버튼 --%>
						<c:forEach begin="${page.startPageNum}" end="${page.endPageNum}" var="num">
						<li>
							<c:if test="${selectNum != num}">
							
							<a class ="a"  href="/book/borrow-best?num=${num}${page.searchTypeKeyword}">${num}</a>
				
							</c:if>
							<c:if test="${selectNum == num}">
							<a class="active">${num}</a>
							</c:if>
						</li>
						</c:forEach>
						
						<%-- 다음(next) 버튼 --%>
						<c:if test="${page.next}">
					
						<li><a href="/book/borrow-best?num=${page.endPageNum + 1}${page.searchTypeKeyword}" class="next">다음</a></li>
						
						
						</c:if>
					</ul>
				</div>
			</div>
		</div>

	</section>	
	
	
<%@ include file="../includes/admin-footer.jsp" %>
	
	
	