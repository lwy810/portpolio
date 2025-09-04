<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<script src="/resources/js/adm-script.js"></script>
<link rel="stylesheet" href="/resources/css/admin/borrow.css">
<script>
	function getMember(member_id, member_borrowCnt){
		if (member_borrowCnt < 4 ) {
		opener.document.borrowFrm.member_id.value=member_id;
		self.close();
		} else {
			alert('도서 최대 대출 건수 4권을 초과할 수 없습니다.');
		}
	}
</script>
<style>
	body {overflow-x:hidden;}
</style>
	<section>
	
	<form name="reg-member" action="/admin/borrow/reg-member" method="post">
		<ul class="reg-find-member">
			<li><p class="reg-member-msg">※ 회원 이름을 입력하세요.</p></li>
			<li>
				<input type="search" name="member_name" placeholder="이름을 적으세요." required autofocus>
				<button type="submit">회원 검색</button>
				<button type="button" onclick="self.close()">닫기</button>
			</li>
		</ul>
	</form>
	
	<div class="member-wrap">
	<table>
		<tr>
			<th>회원id</th>
			<th>회원이름</th>
			<th>회원성별</th>
			<th>연락처</th>
			<th>생년월일</th>
			<th>현재 대출 건수</th>
		</tr>
		<c:forEach items="${mList }" var="member">
		<tr onclick="getMember('${member.member_id }', '${member.member_borrowCnt }')" style="cursor:pointer;">
			<td>${member.member_id }</td>
			<td>${member.member_name }</td>
			<td>${member.member_gender }</td>
			<td>${member.member_phone }</td>
			<td>${member.member_birthday }</td>
			<td>${member.member_borrowCnt}</td>
		</tr>
		</c:forEach>
	</table>
	
	<%-- <p><a href="javascript:getMember('${member.member_id }')">${member.member_name }, ${member.member_id }</a></p>--%>
	
	</div>
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		</section>





	