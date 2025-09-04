<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../../includes/admin-header.jsp" %>
<script src="/resources/js/adm-script.js"></script>
<link rel="stylesheet" href="/resources/css/admin/advice.css">
<link rel="stylesheet" href="/resources/css/admin/adm-reset.css">
<script>
	$(function(){
		
		$('#search-btn').click(function(){
			var searchType = $('#searchType').val();
		 	var keyword = $('#keyword').val();
			location.href="/admin/member/advice/list?num=1&searchType="+searchType+"&keyword="+keyword;		 	
		});
	 	
	 	
	});
</script>
	<div class="bn bn-advice-list">
		<h2>advice <span>list</span></h2>
	</div>
	
	<section>
		<c:if test="${staff==null and member!=null }">
		<p class="msg">※ 접근 불가 ※ </p>
		</c:if>
		<c:if test="${member==null and staff!=null }">
		
		<div class="adviceCnt">총 ${page.count }건</div>
		
		<div class="searchbox">
			<select name="searchType" id="searchType">
				<option value="title">문의 제목</option>
				<option value="category">문의 분류</option>
				<option value="client">문의자</option>
				<option value="content">문의 내용</option>
				<option value="title_content">문의 제목+내용</option>
			</select>
			<input type="search" id="keyword" name="keyword"> 
			<button id="search-btn" type="button" class="btn btn-register">검색</button>
		</div>
		
		<div class="mb-advice-list">
			<table>
			<tr>
				<th>번호</th>
				<th>문의 상태</th>
				<th>문의 분류</th>
				<th>제목</th>
				<th>문의자</th>
				<th>등록일</th>
			</tr>
			<c:forEach items="${adList }" var="advice">
			<tr onclick="location.href='/admin/member/advice/view?advice_no=${advice.advice_no }&num=${select}'" style="cursor:pointer;">
				<td>${advice.advice_no}</td>
				<td>${advice.advice_status}</td>
				<td>${advice.advice_type}</td>
				<td>${advice.advice_title}
				<c:if test="${advice.reply_cnt != 0}">
				(${advice.reply_cnt })
				</c:if>
				</td>
				<td>${advice.advice_client}</td>
				<td><fmt:formatDate value="${advice.advice_up_date}" pattern="yyyy-MM-dd"/> </td>
			</tr>
			</c:forEach>
			</table>
			<%-- Page 객체(DTO)를 사용한 페이징 처리 --%>
			
			
		<c:if test="${!empty adList}">
		<ul class="pagenation">
			<c:if test="${page.prev}">
			<li><a href="/admin/member/advice/list?num=${page.startPageNum - 1}" class="prev"><i class="bi bi-chevron-left"></i></a></li>
			</c:if>
			
			<%-- 페이지 번호 버튼 --%>
			<c:forEach begin="${page.startPageNum}" end="${page.endPageNum}" var="num">
			<li>
				<c:if test="${select != num}">
				<a href="/admin/member/advice/list?num=${num}${page.searchTypeKeyword}">${num}</a>
				</c:if>
				<c:if test="${select == num}">
				<a href="" class="active">${num}</a>
				</c:if>
			</li>
			</c:forEach>
			
			<c:if test="${page.next}">
			<li><a href="/admin/member/advice/list?num=${page.endPageNum + 1}" class="next"><i class="bi bi-chevron-right"></i></a></li>
			</c:if>
		</ul>
		</c:if>
		
		</div>
		</c:if>
		<div class="advice-list-btn">
			<c:if test="${staff.staff_id != null }">
				<a href="/admin/borrow/register" class="btn btn-default status">대출입력하기</a>
				<a href="/admin/member/suggestion/list?num=1" class="btn btn-default">희망도서신청리스트</a>
			</c:if>	
			<c:if test="${member.member_id != null }">
				<a href="/admin/member/advice/register" class="btn btn-default">문의하기</a>
			</c:if>
		</div>
	</section>


<%@ include file="../../../includes/footer.jsp" %>









