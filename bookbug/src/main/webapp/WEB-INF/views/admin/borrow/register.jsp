<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="../../includes/admin-header.jsp" %>
<script src="/resources/js/adm-script.js"></script>
<link rel="stylesheet" href="/resources/css/admin/borrow.css">

<div class="bn bn-book-borrow">
	<h2>book <span>borrow</span></h2>
</div>

<section>
	<c:if test="${member==null or staff!=null }">
	<div class="borrow-wrap">
		<form name="borrowFrm" action="/admin/borrow/register" method="post">
			<input type="hidden" name="book_rental_able">
			<table>
				<tr>
					<td><label>대여할 회원</label></td>
					<td><input type="text" name="member_id" required="required" autofocus readonly></td>
					<td><button type="button" onclick="findMember()" class="btn btn-default">회원 찾기</button></td>
				</tr>
				<tr>
					<td><label>대여할  도서</label></td>
					<td><input type="text" name="book_id" required="required" readonly></td>
					<td><button type="button" onclick="findBook()" class="btn btn-default">도서 찾기</button></td>
				</tr>
				<tr>
					<td colspan="3"><button type="submit" class="btn btn-default">대출신청</button></td>
				</tr>
			</table>
		</form>

	</div>
	<div class="borrowBtn">
		<c:if test="${member.member_id== null and staff.staff_id!=null }">
			<a href="/admin/borrow/list?num=1" class="btn btn-default">목록</a>
		</c:if>
	</div>
	</c:if>
</section>
<%@ include file="../../includes/footer.jsp" %>