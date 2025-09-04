<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../../includes/header.jsp" %>
<script src="/resources/js/adm-script.js"></script>
<link rel="stylesheet" href="/resources/css/admin/advice.css">

	<div class="bn bn-advice-mylist">
		<h2>my <span>advice</span></h2>
	</div>
	
	<section>
		<c:if test="${member!=null or staff!=null }">
		<p class="adviceCnt">게시물 개수: ${page.count }</p>
		<div class="mb-advice-mylist">
		<h3>${member.member_name }님의 <span>문의 내역</span></h3>
			<table>
			<tr>
				<th>문의 번호</th>
				<th>문의 분류</th>
				<th>진행 상태</th>
				<th>문의 제목</th>
				<th>문의 등록일</th>
			</tr>
			<c:forEach items="${adList }" var="advice">
				<tr onclick="location.href='/admin/member/advice/view?advice_no=${advice.advice_no }&num=${num}'" style="cursor:pointer;">
					<td>${advice.advice_no}</td>
					<td>${advice.advice_type}</td>
					<td>${advice.advice_status}</td>
					<td>
						${advice.advice_title}
						<c:if test="${advice.advice_client==null and member.member_id==null and staff.staff_id!=null }">
						<c:if test="${advice.reply_cnt>0 }">
						(${advice.reply_cnt })
						</c:if>
						</c:if>
					</td>
					<td><fmt:formatDate value="${advice.advice_reg_date}" pattern="yyyy-MM-dd"/> </td>
				</tr>
			</c:forEach>
			</table>
		</div>
		<%-- Page 객체(DTO)를 사용한 페이징 처리 --%>
		<ul class="pagenation">
			<c:if test="${page.prev}">
			<li><a href="/admin/member/advice/mylist?num=${page.startPageNum - 1}" class="prev"><i class="bi bi-chevron-left"></i></a></li>
			</c:if>
			
			<%-- 페이지 번호 버튼 --%>
			<c:forEach begin="${page.startPageNum}" end="${page.endPageNum}" var="num">
			<li>
				<c:if test="${select != num}">
				<a href="/admin/member/advice/mylist?advice_client=${member.member_id}&num=${num}${page.searchTypeKeyword}">${num}</a>
				</c:if>
				<c:if test="${select == num}">
				<a href="" class="active">${num}</a>
				</c:if>
			</li>
			</c:forEach>
			
			<c:if test="${page.next}">
			<li><a href="/admin/member/advice/mylist?advice_client=${member.member_id}&num=${page.endPageNum + 1}" class="next"><i class="bi bi-chevron-right"></i></a></li>
			</c:if>
		</ul>
			<div class="advice-btn">
			<c:if test="${member.member_id != null }">
				<a href="/admin/member/advice/register" class="btn btn-default advice-btn">문의하기</a>
			</c:if>
			</div>
		</c:if>
	</section>


<%@ include file="../../../includes/footer.jsp" %>










