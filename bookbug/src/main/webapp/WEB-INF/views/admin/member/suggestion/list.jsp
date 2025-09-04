<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../../includes/admin-header.jsp" %>
<script src="/resources/js/adm-script.js"></script>
<link rel="stylesheet" href="/resources/css/admin/suggestion.css">
<link rel="stylesheet" href="/resources/css/admin/adm-reset.css">
<script>
	$(function(){
		$('#search-btn').click(function(){
			var searchType = $('#searchType').val();
		 	var keyword = $('#keyword').val();
			location.href="/admin/member/suggestion/list?num=1&searchType="+searchType+"&keyword="+keyword;		 	
		});
	
	});
</script>
	<div class="bn bn-admin-list">
		<h2>suggestion <span>list</span></h2>
	</div>
	
	<section>
		<c:if test="${staff==null and member!=null }">
		<p class="msg">※ 접근 불가 ※ </p>
		
		</c:if>
		<c:if test="${member==null and staff!=null }">
		<div class="suggestionCnt">${page.count }개의 게시물</div>
		
		
		
		<div class="mb-suggestion-list">
			<div class="searchbox">
				<select name="searchType" id="searchType">
					<option value="booktitle">도서제목</option>
					<option value="author">저자</option>
					<option value="proposer">신청자</option>
					<option value="publisher">출판사</option>
					<option value="publisher_year">출판년도</option>
				</select>
				<input type="search" id="keyword" name="keyword"> 
				<button id="search-btn" type="button" class="btn btn-register">검색</button>
			</div>
			<table>
			
			<tr>
				<th>번호</th>
				<th>도서표지</th>
				<th>제목</th>
				<th>저자</th>
				<th>정가</th>
				<th>출판사</th>
				<th>출판년도</th>
				<th>ISBN</th>
				<th>신청자</th>
				<th>이메일</th>
				<th>신청일</th>
				<th>진행 상태</th>
				<th>삭제</th>
			</tr>
			<c:if test="${member==null and staff!=null }">
			<c:forEach items="${sgList }" var="suggestion" varStatus="status">
			<tr>
				<td><input type="text" name="suggestion_no" id="suggestion_no" value="${suggestion.suggestion_no}" class="${status.index }_no"></td>
				<td>
				<c:if test="${suggestion.suggestion_thumbnail!=null }">
				<div class="mb-suggestion-list-img">
					<img id="img" src="/libraryUploadImg/${suggestion.suggestion_thumbnail}">
				</div>
				</c:if>
				<c:if test="${suggestion.suggestion_thumbnail==null }">
				<div class="mb-suggestion-list-img-fake"><p>no image</p></div>
				</c:if>
				</td>
				<td onclick="location.href='/admin/member/suggestion/view?suggestion_proposer=${suggestion.suggestion_proposer }&suggestion_no=${suggestion.suggestion_no }&num=${select}'" style="cursor:pointer; text-decoration:underline;">${suggestion.suggestion_booktitle}</td>
				<td>${suggestion.suggestion_author}</td>
				<td><fmt:formatNumber value="${suggestion.suggestion_price }" pattern="#,###,###"/></td>
				<td>${suggestion.suggestion_publisher }</td>
				<td>${suggestion.suggestion_publisher_year }</td>
				<td>${suggestion.suggestion_isbn }</td>
				<td>
					<input type="hidden" name="suggestion_proposer" value="${suggestion.suggestion_proposer}" class="${status.index }_proposer">
					${suggestion.suggestion_proposer}
				</td>
				<td>${suggestion.suggestion_email}</td>
				<td><fmt:formatDate value="${suggestion.suggestion_reg_date}" pattern="yyyy-MM-dd"/> </td>
				<td>
					<select name="suggestion_status" id="suggestion_status" class="${status.index }_status">
						<option value="${suggestion.suggestion_status}">${suggestion.suggestion_status}</option>
						<option value="신청">신청</option>
						<option value="접수">접수</option>
						<option value="구매">구매</option>
						<option value="소장">소장</option>
						<option value="취소">취소</option>
					</select>	
				</td>
				<td><a href="" class="btn btn-public ${status.index }_del">삭제</a></td>
			</tr>
			<%--<tr><td colspan="10" style="background:#fff; border:0; height:50px;"></td></tr> --%>
			<tr>
				<script>
					$('.${status.index }_status').change(function(){
						var status = $(this).val();
						var suggestion_no = $('.${status.index }_no').val();
						if(confirm('신청서의 상태를 변경하시겠습니까?')==true){
							location.href='/admin/member/suggestion/updateStatus?suggestion_no='+suggestion_no+'&suggestion_status='+status;	
						}
						
					});
					
					$('.${status.index }_del').click(function(){
						if(confirm("신청서를 삭제하시겠습니까?")){
							$(this).attr('href', '/admin/member/suggestion/deleteRow?suggestion_no=${suggestion.suggestion_no}');						
						}
					});
				</script>
			</tr>		
			</c:forEach>
			</c:if>
			</table>
		</div>
		<%-- Page 객체(DTO)를 사용한 페이징 처리 --%>
		<ul class="pagenation">
			<c:if test="${page.prev}">
			<li><a href="/admin/member/suggestion/list?num=${page.startPageNum - 1}" class="prev"><i class="bi bi-chevron-left"></i></a></li>
			</c:if>
			
			<%-- 페이지 번호 버튼 --%>
			<c:forEach begin="${page.startPageNum}" end="${page.endPageNum}" var="num">
			<li>
				<c:if test="${select != num}">
				<a href="/admin/member/suggestion/list?num=${num}${page.searchTypeKeyword}">${num}</a>
				</c:if>
				<c:if test="${select == num}">
				<a href="" class="active">${num}</a>
				</c:if>
			</li>
			</c:forEach>
			
			<c:if test="${page.next}">
			<li><a href="/admin/member/suggestion/list?num=${page.endPageNum + 1}" class="next"><i class="bi bi-chevron-right"></i></a></li>
			</c:if>
		</ul>
		</c:if>
		<div class="suggestion-list-btn">
			<c:if test="${staff.staff_id != null }">
				<a href="/admin/borrow/register" class="btn btn-default status">대출 입력하기</a>
				<a href="/admin/member/advice/list?num=1" class="btn btn-default">1:1 문의 답변하기</a>
			</c:if>	
			<c:if test="${member.member_id != null }">
				<a href="/admin/member/suggestion/register" class="btn btn-default">희망 도서 신청하기</a>
			</c:if>
		</div>
	</section>
<%@ include file="../../../includes/footer.jsp" %>









