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
			location.href="/admin/staff/list?num=1&searchType="+searchType+"&keyword="+keyword;		 	
		});
	});
</script>
	<div class="bn bn-member-list">
		<h2>staff  <span>list</span></h2>
	</div>
	
	<section>
		<c:if test="${staff == null and member != null }">
		<p class="msg">※ 접근 불가 ※ </p>
		</c:if>
		<c:if test="${member == null and staff != null }">
		
		<div class="memberCnt">▶직원 수 : ${page.count }명</div>
		
		<div class="searchbox">
			<select name="searchType" id="searchType">
				<option value="staff_name">이름</option>
				<option value="staff_department">부서명</option>
				<option value="staff_level">등급</option>
				
			</select>
			<input type="search" id="keyword" name="keyword"> 
			<button id="search-btn" type="button" class="btn btn-register">검색</button>
		</div>
	
		<div class="mb-list">
			<table>
			<tr>
				<th>사번</th>
				<th>이름</th>
				<th>성별</th>
				<th>연락처</th>
				<th>생일</th>
				<th>부서명</th>
				<th>등급</th>
				<th>등록일</th>
			</tr>
			<c:forEach items="${staffList }" var="staff" varStatus="status">
			<tr>
				<td>${staff.staff_id}</td>
				<td>${staff.staff_name}</td>
				<td>${staff.staff_gender}</td>
				<td>${staff.staff_phone}</td>
				<td>${staff.staff_birthday}</td>
				<td>${staff.staff_department}</td>
				<td>${staff.staff_level}</td>
				<td><fmt:formatDate value="${staff.staff_reg_date}" pattern="yyyy-MM-dd"/> </td>
			</tr>

			</c:forEach>
			</table>
		</div>
			<%-- Page 객체(DTO)를 사용한 페이징 처리 --%>
		<ul class="pagenation">
			<c:if test="${page.prev}">
			<li><a href="/admin/staff/list?num=${page.startPageNum - 1}" class="prev"><i class="bi bi-chevron-left"></i></a></li>
			</c:if>
			
			<%-- 페이지 번호 버튼 --%>
			<c:forEach begin="${page.startPageNum}" end="${page.endPageNum}" var="num">
			<li>
				<c:if test="${select != num}">
				<a href="/admin/staff/list?num=${num}${page.searchTypeKeyword}">${num}</a>
				</c:if>
				<c:if test="${select == num}">
				<a href="" class="active">${num}</a>
				</c:if>
			</li>
			</c:forEach>
			
			<c:if test="${page.next}">
			<li><a href="/admin/staff/list?num=${page.endPageNum + 1}" class="next"><i class="bi bi-chevron-right"></i></a></li>
			</c:if>
		</ul>
		</c:if>

	</section>


<%@ include file="../../includes/footer.jsp" %>









