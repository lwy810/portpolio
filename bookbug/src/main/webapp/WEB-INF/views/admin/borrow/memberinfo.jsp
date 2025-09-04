<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../includes/admin-header.jsp" %>
<script src="/resources/js/adm-script.js"></script>
<link rel="stylesheet" href="/resources/css/admin/borrow.css">
<script>
	
	$(function(){
		var tmpPrefer = "${mvo.member_prefer}";
		var arrPrefer = tmpPrefer.split('');
		var arrList = ['SF소설', '역사', '비문학', '만화', '실용'];
		var prefer= '';
		
		for(var i = 0; i<arrPrefer.length; i++){
			if(arrPrefer[i]=='1'){
				prefer += arrList[i] + '/';
				
			}
		}
		prefer = prefer.split('');
		prefer = prefer.slice(0, -1);
		prefer = prefer.join('');
		
		$('#prefer').text(prefer);
		
		$('#search-btn').click(function(){
		 	var keyword = $('#keyword').val();
		 	alert(keyword);
			location.href="/admin/borrow/memberinfo?member_id=${member.member_id}&keyword="+keyword+"&num=${num}";		 	
		});
	});
	
</script>
	<div class="bn bn-borrow-member">
		<h2>member's borrow <span>info</span></h2>
	</div>
	
	<section>
	<c:if test="${member!=null or staff!=null }">
	<h3>${mvo.member_name }님의 정보</h3>
	<%-- 
	<div class="searchbox">
		<input type="search" id="keyword" name="keyword"> 
		<button id="search-btn" type="button" class="btn btn-register">검색</button>
	</div>
	--%>
	<div class="tabs">	
		<input type="radio" name="member-info" id="tabs-info">
		<label for="tabs-info">기본 정보</label>
		<input type="radio" name="member-info" id="tabs-list" checked="checked">
		<label for="tabs-list">${mvo.member_name }님의 대출내역</label>
		
		<div class="info-contents">
			<div class="mb-info">
				<ul>
					<li><p>아이디</p><span>${mvo.member_id}</span></li>
					<li><p>이름</p> <span>${mvo.member_name}<span></li>
					<li><p>성별</p> <span>${mvo.member_gender}<span></li>
					<li><p>우편번호</p><span> ${mvo.member_zipcode}<span></li>
					<li><p>배송지</p> <span>${mvo.member_address}<span></li>
					<li><p>연락처</p> <span>${mvo.member_phone}<span></li>
					<li><p>생년월일</p><span> ${mvo.member_birthday}<span></li>
					<li><p>선호장르</p> <span><div id="prefer"></div><span></li>
					<li><p>회원가입일</p> <span><fmt:formatDate value="${mvo.member_reg_date}" pattern="yyyy-MM-dd "/><span> </li>
				</ul>
			
			</div>
		
		
			<div class="mb-borrow-mylist">
				<table>
				<tr>
					<th>대여id</th>
					<th>도서id</th>
					<th>책제목</th>
					<th>대출시작일</th>
					<th>대출반납일</th>
					<th>등록일</th>
				</tr>
				<c:forEach items="${bkList }" var="book">
				<tr>
					<td>${book.borrow_id}</td>
					<td>${book.book_id}</td>
					<td>${book.book_title}</a></td>
					<td>${book.borrow_start}</td>
					<td>${book.borrow_end}</td>
					<td><fmt:formatDate value="${book.borrow_reg_date}" pattern="yyyy-MM-dd"/> </td>
				</tr>
				</c:forEach>
				</table>
				<%-- Page 객체(DTO)를 사용한 페이징 처리 --%>
				<ul class="pagenation">
				<c:if test="${page.prev}">
				<li><a href="/admin/borrow/memberinfo?member_id=${mvo.member_id }&num=${page.startPageNum - 1}" class="prev"><i class="bi bi-chevron-left"></i></a></li>
				</c:if>
				
				<%-- 페이지 번호 버튼 --%>
				<c:forEach begin="${page.startPageNum}" end="${page.endPageNum}" var="num">
				<li>
					<c:if test="${select != num}">
					<a href="/admin/borrow/memberinfo?member_id=${mvo.member_id }&num=${num}${page.searchKeyword}">${num}</a>
					</c:if>
					<c:if test="${select == num}">
					<a href="" class="active">${num}</a>
					</c:if>
				</li>
				</c:forEach>
				
				<c:if test="${page.next}">
				<li><a href="/admin/borrow/memberinfo?member_id=${mvo.member_id }&num=${page.endPageNum + 1}" class="next"><i class="bi bi-chevron-right"></i></a></li>
				</c:if>
			</ul>
			</div>
			
		</div>
				
			</div>
			<div class="borrowBtn">
				<c:if test="${member.member_id != null }">
					<a href="/admin/member/advice/register" class="btn btn-default">1:1문의하기</a>
					<a href="" onclick="history.back();" class="btn btn-default">이전</a>
				</c:if>
				<c:if test="${member.member_id== null and staff.staff_id!=null }">
					<a href="/admin/borrow/list?num=${num }" class="btn btn-default">목록</a>
				</c:if>
			</div>
		</div>
		
		</c:if>
	</section>


<%@ include file="../../includes/footer.jsp" %>









