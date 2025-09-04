<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<script src="/resources/js/adm-script.js"></script>
<link rel="stylesheet" href="/resources/css/admin/borrow.css">
<script>
	function findBook(book_id, book_rental_able){
		if(book_rental_able != '대출 불가'){
			opener.document.borrowFrm.book_id.value = book_id;
			self.close();
		}else{
			alert('이 책은 현재 대출중입니다.');
		}
	}
</script>
<style>
	body {overflow-x:hidden;}
</style>
<section>
	<form name="regBook" action="/admin/borrow/reg-book" method="post">
		<ul class="reg-find-book">
		<li><p class="reg-book-msg">※ 도서제목을 입력하세요.</p></li>
		<li>
			<input type="search" name="book_title" placeholder="책 제목을 입력하세요." autofocus required>
			<button type="submit">책 찾기</button>
			<button type="button" onclick="self.close()">닫기</button>
		</li>
		</ul>
	</form>
	<div class="book-wrap">
		<table>
		<tr>
			<th>도서id</th>
			<th>분류</th>
			<th>장르</th>
			<th>제목</th>
			<th>저자</th>
			<th>출판사</th>
			<th>출판년도</th>
			<th>대출상태</th>
		</tr>
		<c:forEach items="${bkList }" var="book">
		<tr onclick="findBook('${book.book_id}','${book.book_rental_able }')" style="cursor:pointer;">
			<td>${book.book_id }</td>
			<td>${book.book_type}</td>
			<td>${book.book_category }</td>
			<td>${book.book_title }</td>
			<td>${book.book_author }</td>
			<td>${book.book_publisher}</td>
			<td>${book.book_publisher_year }</td>
			<td>${book.book_rental_able }</td>
		</tr>
		</c:forEach>
	</table>
	<%--<p><a href="javascript:findBook('${book.book_id }','${book.book_rental_able }')">${book.book_id }, ${book.book_title }, ${book.book_author }, ${book.book_rental_able }</a></p>--%>
	</div>

</section>





