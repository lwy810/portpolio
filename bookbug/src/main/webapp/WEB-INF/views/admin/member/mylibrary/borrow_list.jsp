<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
 <%@ include file="../../../includes/admin-header.jsp" %>   
<link rel="stylesheet" href="/resources/css/admin/mylibrary/borrow_list.css">
<script>	
	$(function(){
		$('#searchBtn').click(function(){
			var member_id = "${member.member_id}";
			var searchType = $('#searchType').val();
			var keyword = $('#keyword').val();
			console.log(searchType);
			console.log(keyword);
			
			if (keyword == '') {
				location.href = "/admin/member/mylibrary/borrow_current_list?num=1&member_id="+member_id;
			} else {
				location.href = "/admin/member/mylibrary/borrow_current_list?num=1&member_id="+member_id+"&searchType="+searchType+"&keyword="+keyword;
			}
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
			
				<ul class="mylibrary-menu-container">
					<li><a href="/admin/member/mylibrary/borrow_current_list?num=1&member_id=${member.member_id }">대출 현황</a></li>
					<li><a href="/admin/member/mylibrary/reservation_book_list?num=1&member_id=${member.member_id }">예약 현황</a></li>
					<li><a href="/admin/member/mylibrary/borrow_list?num=1&member_id=${member.member_id }">대출 이력</a></li>
				</ul>
				
				<div class="info-sentense">
					<p>도서 대출연장(반납연기) 신청은 반납예정일 3일전부터 7일씩 2회 가능합니다. (단, 연체도서, 예약도서, DVD, 바로대출 도서는 제외)
					<p>도서 및 부록자료 모두 선택하여 연장 신청하세요.</p>
				</div>
			
			
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
				</ul>

				<div class="mylibrary-borrow-wrap">
					<c:if test="${ empty borrow_list }">
					<p class="null_list_msg">대출한 도서가 없습니다.</p>
					</c:if>
				
					<c:if test="${ !empty borrow_list }">
					<c:forEach items="${borrow_list}"  var="borrow_list" varStatus="status">
					<div class="borrow-list-container borrow-list-container-${status.index}">
						<div class="borrow-index">
							<p>${status.index+1}.</p>
							<input type="checkbox" id="borrow-${status.index}"  value="borrow-${status.index}">
						</div>
					
						<div class="book-thumbnail">
							<a href=""><img src="/libraryUploadImg/${borrow_list.book_thumbnail}"></a>
						</div>
					
						<ul class="borrow-list">
							<li><p>${borrow_list.book_title}</p></li>
							<li><p>자료실 위치 : ?</p></li>
							<li><p><span>대출일 : ${borrow_list.borrow_start}</span><span> | </span><span>반납 예정일: ${borrow_list.borrow_end}</span></p></li>
							<li><p>${borrow_list.borrow_state}</p></li>
						</ul>
					</div>
					</c:forEach>
					</c:if>
				</div>
				
				<div class="pagenation-wrap">
					<ul class="pagenation">
						<%-- 이전(prev) 버튼 --%>
						<c:if test ="${page.prev}">
						<c:if test ="${page.searchType2 == null}">
						<li><a href="/board/list?num=${page.startPageNum - 1}${page.searchTypeKeyword}" class="prev">이전</a></li>
						</c:if>
						
						<c:if test ="${page.searchType2 != null}">
						<li><a href="/board/list?num=${page.startPageNum - 1}${page.searchTypeKeyword}${page.searchTypeKeyword2}" class="prev"></a></li>
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
	
	
<%@ include file="../../../includes/footer.jsp" %>
	
	
	