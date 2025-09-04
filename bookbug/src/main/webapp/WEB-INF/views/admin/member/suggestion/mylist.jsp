<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../../includes/header.jsp" %>
<script src="/resources/js/adm-script.js"></script>
<link rel="stylesheet" href="/resources/css/admin/suggestion.css">
<script>


</script>
	<div class="bn bn-suggestion-mylist">
		<h2>my <span>suggestion</span></h2>
	</div>
	
	<section>
		<c:if test="${member!=null or staff!=null }">
		<p class="suggestion">게시물 개수: ${page.count }</p>
		<div class="mb-suggestion-mylist">
		<h3> <span>${member.member_name }님</span>의 희망 도서 신청 내역</h3> 
			<table>
			<tr>
				<th>번호</th>
				<th>도서표지</th>
				<th>신청 도서 제목</th>
				<th>이메일</th>
				<th>신청일</th>
				<th>진행 상태</th>
			</tr>
		<c:forEach items="${sgList }" var="suggestion">
			<tr onclick="location.href='/admin/member/suggestion/view?suggestion_no=${suggestion.suggestion_no }&num=${num}'" style="cursor:pointer;">
				<td>${suggestion.suggestion_no }</a></td>
				<td>
				<c:if test="${suggestion.suggestion_thumbnail!=null }">
				<div class="mb-suggestion-mylist-img">
					<img id="img" src="/libraryUploadImg/${suggestion.suggestion_thumbnail}">
				</div>
				</c:if>
				<c:if test="${suggestion.suggestion_thumbnail==null }">
				<div class="mb-suggestion-mylist-img-fake"><p>no image</p></div>
				</c:if>
				</td>
				<td>${suggestion.suggestion_booktitle}</td>
				<td>${suggestion.suggestion_email}</td>
				<td><fmt:formatDate value="${suggestion.suggestion_reg_date}" pattern="yyyy-MM-dd"/> </td>
				<td>${suggestion.suggestion_status}</td>
			</tr>
			</c:forEach>
			</table>
			<c:if test="${member.member_id != null }">
				<div class="mylistBtn">
					<a href="/admin/member/suggestion/register" class="btn btn-default">희망 도서 신청하기</a>
				</div>
			</c:if>
		</div>
		<%-- Page 객체(DTO)를 사용한 페이징 처리 --%>
		<ul class="pagenation">
			<c:if test="${page.prev}">
			<li><a href="/admin/member/suggestion/mylist?num=${page.startPageNum - 1}" class="prev"><i class="bi bi-chevron-left"></i></a></li>
			</c:if>
			
			<%-- 페이지 번호 버튼 --%>
			<c:forEach begin="${page.startPageNum}" end="${page.endPageNum}" var="num">
			<li>
				<c:if test="${select != num}">
				<a href="/admin/member/suggestion/mylist?suggestion_proposer=${member.member_id }&num=${num}${page.searchTypeKeyword}">${num}</a>
				</c:if>
				<c:if test="${select == num}">
				<a href="" class="active">${num}</a>
				</c:if>
			</li>
			</c:forEach>
			
			<c:if test="${page.next}">
			<li><a href="/admin/member/suggestion/mylist?suggestion_proposer=${member.member_id }&num=${page.endPageNum + 1}" class="next"><i class="bi bi-chevron-right"></i></a></li>
			</c:if>
		</ul>
		</c:if>
	</section>


<%@ include file="../../../includes/footer.jsp" %>










