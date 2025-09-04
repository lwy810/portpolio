<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../includes/admin-header.jsp" %>
<script src="/resources/js/adm-script.js"></script>
<link rel="stylesheet" href="/resources/css/admin/member.css">
<script>
	$(function(){
		
		$('#search-btn').click(function(){
			var searchType = $('#searchType').val();
		 	var keyword = $('#keyword').val();
			location.href="/admin/member/list?num=1&searchType="+searchType+"&keyword="+keyword;		 	
		});
	 	
		
	});
</script>
	<div class="bn bn-member-list">
		<h2>member <span>list</span></h2>
	</div>
	
	<section>
		<c:if test="${staff==null and member!=null }">
		<p class="msg">※ 접근 불가 ※ </p>
		</c:if>
		<c:if test="${member==null and staff!=null }">
		
		<div class="memberCnt">▶ 회원 수 : ${page.count }명</div>
		
		<div class="searchbox">
			<select name="searchType" id="searchType">
				<option value="member_name">회원 이름</option>
				<option value="member_id">회원 아이디</option>
				<option value="member_phone">회원 연락처</option>
				
			</select>
			<input type="search" id="keyword" name="keyword"> 
			<button id="search-btn" type="button" class="btn btn-register">검색</button>
		</div>
	
		<div class="mb-list">
			<table>
			<tr>
				<th>회원 id</th>
				<th>회원 이름</th>
				<th>회원 성별</th>
				<th>연락처</th>
				<th>생년월일</th>
				<th>도서 대여수</th>
				<th>예약 건수</th>
				<th>관심 도서 수</th>
				<th>등록일</th>
			</tr>
			<c:forEach items="${memberList }" var="member" varStatus="status">
			<tr>
				<td>${member.member_id}</td>
				<td>${member.member_name}</td>
				<td>${member.member_gender}</td>
				<td>${member.member_phone}</td>
				<td>${member.member_birthday}</td>
				<td>${member.member_borrowCnt}</td>
				<td>${member.member_reservationCnt}</td>
				<td>${member.member_interestedCnt}</td>
				<td><fmt:formatDate value="${member.member_reg_date}" pattern="yyyy-MM-dd"/> </td>
			</c:forEach>
			</table>
		</div>
		
			<%-- Page 객체(DTO)를 사용한 페이징 처리 --%>
		<ul class="pagenation">
			<c:if test="${page.prev}">
			<li><a href="/admin/member/list?num=${page.startPageNum - 1}" class="prev"><i class="bi bi-chevron-left"></i></a></li>
			</c:if>
			
			<%-- 페이지 번호 버튼 --%>
			<c:forEach begin="${page.startPageNum}" end="${page.endPageNum}" var="num">
			<li>
				<c:if test="${select != num}">
				<a href="/admin/member/list?num=${num}${page.searchTypeKeyword}">${num}</a>
				</c:if>
				<c:if test="${select == num}">
				<a href="" class="active">${num}</a>
				</c:if>
			</li>
			</c:forEach>
			
			<c:if test="${page.next}">
			<li><a href="/admin/member/list?num=${page.endPageNum + 1}" class="next"><i class="bi bi-chevron-right"></i></a></li>
			</c:if>
		</ul>
		</c:if>
	
	</section>


<%@ include file="../../includes/footer.jsp" %>









