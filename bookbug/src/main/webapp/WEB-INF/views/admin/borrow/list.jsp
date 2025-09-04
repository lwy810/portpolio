<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../includes/admin-header.jsp" %>
<script src="/resources/js/adm-script.js"></script>
<link rel="stylesheet" href="/resources/css/admin/borrow.css">
<script>
	$(function(){
		$('#search-btn').click(function(){
		 	var keyword = $('#keyword').val();
		 	var searchType	= $('#searchType').val();
			location.href="/admin/borrow/list?searchType="+searchType+"&keyword="+keyword+"&num=${select}";		 	
		});
	});
</script>
	<div class="bn bn-borrow-list">
		<h2>borrow <span>list</span></h2>
	</div>
	
	<section>
	
	<c:if test="${member == null or staff !=null }">
		<div class="mb-borrow-list">
			<div class="borrowCnt">대출 현황 총
			<c:if test="${!empty brList}">${page.count } 건 </c:if>
			<c:if test="${empty brList}">0 건</c:if>
			</div>
		
			<div class="searchbox">
				<select name="searchType" id="searchType">
					<option value="book_title">도서제목</option>
					<option value="member_id">회원id</option>
					<option value="member_phone">연락처</option>
				</select>
				<input type="search" id="keyword" name="keyword"> 
				<button id="search-btn" type="button" class="btn btn-register">검색</button>
			</div>
			
			<div>
				<table>
					<tr>
					<th>대출 no</th>
					<th>도서 번호</th>
					<th>회원 id</th>
					<th>대출일</th>
					<th>반납 예정일</th>
					<th>대출 상태</th>
					<th>책 제목</th>
					<th>연락처</th>	
					<th>등록일</th>
					<th>수정일</th>
				</tr>
			
			<c:forEach items="${brList }" var="borrow" varStatus="status">
				<tr>
					<td><input type="text" id="borrow_id" name="borrow_id" value="${borrow.borrow_id}" class="${status.index }_id" readonly></td>
					<td><input type="hidden" id="book_id" name="book_id" value="${borrow.book_id}" class="${status.index }_book_id" readonly>${borrow.book_id}</td>
					<td>${borrow.member_id}</td>
					<td>${borrow.borrow_start}</td>
					<td>${borrow.borrow_end}</td>
					<td>
						<select id="borrow_state" name="borrow_state" class="${status.index }_selected">
							<c:if test="${borrow.borrow_state  eq '대출중'}">
							<option value="${borrow.borrow_state }" selected>${borrow.borrow_state }</option>
							<option value="반납">반납</option>
							</c:if>
							<c:if test="${borrow.borrow_state  eq '반납'}">
							<option value="${borrow.borrow_state }" selected>${borrow.borrow_state }</option>
							<option value="대출중">대출중</option>
							</c:if>
						</select>
					</td>
					<td>${borrow.book_title}</td>
					<td>${borrow.member_phone}</td>
					<td><fmt:formatDate value="${borrow.borrow_reg_date}" pattern="yyyy-MM-dd"/> </td>
					<td><fmt:formatDate value="${borrow.borrow_up_date}" pattern="yyyy-MM-dd"/></td>
				</tr>
				<script>
				$('.${status.index }_selected').change(function(){
					var state = $(this).val();
					var borrow_id = $('.${status.index }_id').val();
					var book_id = $('.${status.index }_book_id').val();
					if(confirm('정말 수정하시겠습니까?')==true){
						location.href='/admin/borrow/update-state?borrow_state='+state+'&borrow_id='+borrow_id+'&book_id='+book_id;	
					}
				});
				</script>
				</c:forEach>
			</table>
			<c:if test="${empty brList}">
			<p class="null_msg">검색된 대출 내역이 없습니다.</p>
			</c:if>
				
			</div>
				<%-- Page 객체(DTO)를 사용한 페이징 처리 --%>
				
			<c:if test="${!empty brList}">
			<ul class="pagenation">
				<c:if test="${page.prev}">
				<li><a href="/admin/borrow/list?num=${page.startPageNum - 1}" class="prev"><i class="bi bi-chevron-left"></i></a></li>
				</c:if>
				
				<%-- 페이지 번호 버튼 --%>
				<c:forEach begin="${page.startPageNum}" end="${page.endPageNum}" var="num">
				<li>
					<c:if test="${select != num}">
					<a href="/admin/borrow/list?num=${num}${page.searchKeyword}">${num}</a>
					</c:if>
					<c:if test="${select == num}">
					<a href="" class="active">${num}</a>
					</c:if>
				</li>
				</c:forEach>
				
				<c:if test="${page.next}">
				<li><a href="/admin/borrow/list?num=${page.endPageNum + 1}" class="next"><i class="bi bi-chevron-right"></i></a></li>
				</c:if>
			</ul>
			</c:if>			
			
			<div class="borrow-btn-wrap">
				<c:if test="${staff.staff_id != null }">
				<a href="/admin/borrow/register" class="btn btn-default status">대출입력하기</a>
				<a href="/admin/member/advice/list?num=1" class="btn btn-default">1:1문의 답변하기</a>
				</c:if>	
				<c:if test="${member.member_id != null }">
					<a href="/admin/member/advice/register" class="btn btn-default">1:1문의하기</a>
				</c:if>
			</div>
		</div>
		</c:if>
	</section>


<%@ include file="../../includes/footer.jsp" %>









