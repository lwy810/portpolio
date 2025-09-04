<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
 <%@ include file="../includes/admin-header.jsp" %>   
<link rel="stylesheet" href="/resources/css/book/book.css">
<script src="/resources/js/book_register.js"></script>
<script>
	$(function(){
		
		$('.book-search-bar li:nth-child(2)').css('background','#fdf4d1')
		
		var searchType = "${page.searchType}"
		
		if (searchType == '') {
			searchType = 'book_title';
		}
		var keyword = "${page.keyword}"
		var searchType2 = "${page.searchType2}"
		var keyword2 = "${page.keyword2}"
		var reSearchBtn = 1;
		var a = "${page.searchTypeKeyword}"
		var b = "${page.searchTypeKeyword2}"
		
		if (searchType2 == '') {
			$('#searchType').val(searchType);
		} else {
			$('#searchType').val(searchType2);
		}
		
		if (keyword2 == '') {
			$('#keyword').val(keyword);
		} else {
			$('#keyword').val(keyword2);
		}
		
		$('#reSearchBtn').change(function(e){
		
			if($('#reSearchBtn').prop('checked') == true ) {
				reSearchBtn = 2;
				keyword = $('#keyword').val();
				searchType = $('#searchType').val();
				$('#keyword').val('');
				$('#searchType').val('all');
			} else {
				reSearchBtn = 1;
				$('#keyword').val(keyword);
				$('#searchType').val(searchType);
			}
		});
		
		$('#searchBtn').click(function(){
			
			var num = ${page.num}
			if($('#keyword').val() == '') {
				alert("검색어를 입력하세요");
			} else if ($('#reSearchBtn').prop('checked') == true && keyword != null) {
				keyword2 = $('#keyword').val();
				searchType2 = $('#searchType').val();
				console.log(searchType);
				console.log(keyword);
				console.log(searchType2);
				console.log(keyword2);
			
				location.href="/book/list?num="+num+"&searchType="+searchType+"&keyword="+keyword+"&searchType2="+searchType2+"&keyword2="+keyword2;

			} else {
				keyword = $('#keyword').val();
				searchType = $('#searchType').val();
				location.href="/book/list?num="+num+"&searchType="+searchType+"&keyword="+keyword;
				console.log(searchType);
				console.log(keyword);
			}
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
						<select id="searchType" name="searchType">
							<option value="book_title" selected>책 제목</option>
							<option value="book_author">저자</option>
							<option value="book_publisher">출판사</option>
							<option value="all">전체</option>
						</select>
					</li>
					<li>
						<input type="search" id="keyword" name="keyword"  placeholder="검색어 입력"  class="input-frm">
						<input type="text" name="empty" readonly>
						<div class="book_list_btn_wrap">
							<input type="checkbox" id="reSearchBtn" name="reSearch" value="Y">
							<label for="reSearchBtn">결과내재검색</label>
						</div>
					</li>
					<li>
						<button type="button" id="searchBtn"  >검색</button>
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
							<p>
								<c:set value="${page.displayPost }" var="displayPost"  />
								${status.index+1+displayPost}.
							</p>
							<input type="checkbox" id="book-${status.index}"  value="book-${status.index}">
						</div>
					
						<div class="book-thumbnail">
							<a href=""><img src="/libraryUploadImg/${book_list.book_thumbnail}"></a>
						</div>
					
						<ul class="book-list">
							<li><a href="/book/view?book_id=${book_list.book_id}&book_category_type=${book_list.book_category_type}">${book_list.book_title}</a></li>
							<li><p><span>저자 : ${book_list.book_author}</span><span>|</span><span>발행자 : ${book_list.book_publisher}</span><span>|</span><span>발행일 : ${book_list.book_publisher_year}</span></p></li>
							<li><p><span>등록번호 : ${book_list.book_id}</span><span>|</span><span>ISBN : ${book_list.book_isbn}</span><span>|</span><span>청구기호 : ${book_list.book_callnumber}</span></li>
							<li><p><span>자료위치 : ${book_list.book_position}</span><span>|</span><span>대출 횟수 : ${book_list.book_borrow_cnt}회</span></p></li>
							<li>
								<c:if test = "${book_list.book_rental_able eq '대출 가능'}">
								<div><p class="rental-enable">${book_list.book_rental_able}[비치중]</p></div>
								</c:if>
								<c:if test = "${book_list.book_rental_able eq '대출 불가'}">
								<div><p class="rental-unable">${book_list.book_rental_able}[대출중]</p></div>
								</c:if>
	
								<div class="reserve-container">
									<c:if test = "${book_list.book_rental_able eq '대출 가능'}">
									<button type="button" class="reservationBtn borrowEnable" disabled>도서예약 신청</button>
									</c:if>
									<c:if test = "${book_list.book_rental_able eq '대출 불가'}">
									<button type="button" class="reservationBtn borrowUnable">도서예약 신청</button>
									</c:if>
									<input type="hidden" name="book_id" value="${book_list.book_id}">
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
						<c:if test ="${page.searchType2 == null}">
						<li><a href="/book/list?num=${page.startPageNum - 1}${page.searchTypeKeyword}" class="prev">이전</a></li>
						</c:if>
						
						<c:if test ="${page.searchType2 != null}">
						<li><a href="/book/list?num=${page.startPageNum - 1}${page.searchTypeKeyword}${page.searchTypeKeyword2}" class="prev"></a></li>
						</c:if>
						</c:if>
						
						<%-- 페이지 번호 버튼 --%>
						<c:forEach begin="${page.startPageNum}" end="${page.endPageNum}" var="num">
						<li>
							<c:if test="${selectNum != num}">
							<c:if test ="${page.searchType2 == null}">
							<a class ="a"  href="/book/list?num=${num}${page.searchTypeKeyword}">${num}</a>
							</c:if>
							<c:if test ="${page.searchType2 != null}">
							<a class ="a" href="/book/list?num=${num}${page.searchTypeKeyword}${page.searchTypeKeyword2}">${num}</a>
							</c:if>
							</c:if>
							<c:if test="${selectNum == num}">
							<a class="active">${num}</a>
							</c:if>
						</li>
						</c:forEach>
						
						<%-- 다음(next) 버튼 --%>
						<c:if test="${page.next}">
						<c:if test ="${page.searchType2 == null}">
						<li><a href="/book/list?num=${page.endPageNum + 1}${page.searchTypeKeyword}" class="next">다음</a></li>
						</c:if>
						<c:if test ="${page.searchType2 != null}">
						<li><a href="/book/list?num=${page.endPageNum + 1}${page.searchTypeKeyword}${page.searchTypeKeyword2}" class="next">다음</a></li>
						</c:if>
						</c:if>
					</ul>
				</div>
			</div>
		</div>

	</section>	
	
	
<%@ include file="../includes/admin-footer.jsp" %>
	
	
	