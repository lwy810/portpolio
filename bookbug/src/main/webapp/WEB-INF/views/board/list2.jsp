<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ include file="../includes/admin-header.jsp" %>
	<link rel="stylesheet" href="/resources/css/admin/board.css">
	<script>
		$(function(){
			$('#search-btn').click(function(){
				var searchType = $('#searchType').val();
				var keyword = $('#keyword').val();
				
				location.href="/board/list?num=1&searchType="+searchType+"&keyword="+keyword;
			});
		});
	</script>
	
	<div class="bn bn-board-list">
		<h2>Community&nbsp;&nbsp;<span>place</span></h2>
	</div>
	
	<section>
		<div class="bd-list-container">
			
			<div class="bd-search-wrap">
				<p class="btn-list-count">게시물 개수 : 
				<c:if test="${!empty ntList}">${page.count } 건 </c:if>
				<c:if test="${empty ntList}">0 건</c:if>
				</p>
			</div>	
				
			<div class="search-wrap">
				<select name="searchType" id="searchType" class="input-frm input-bd bd-search-type">
					<option value="title" selected>제목</option>
					<option value="content">내용</option>
					<option value="title_content">제목+내용</option>
				</select>
				<input type="search" name="keyword" id="keyword" class="input-frm input-bd">
				<button id="search-btn" type="button" class="btn btn-register">검색</button>
			</div>
		
			<ul class="bd-list-wrap">
			<table>
				<tr>
				<th>번호</th>
				<th>제목</th>
				<th>작성자</th>
				<th>작성일</th>
				<th>조회수</th>
				</tr>
			<c:forEach items="${list}" var="bvo">
				<tr>
					<td>${bvo.article_num }</td>
					<td><a href="/board/view?article_num=${bvo.article_num}&num=${page.num}">${bvo.article_title}
					<c:if test="${bvo.reply_cnt!=0 }">(${bvo.reply_cnt})</c:if>
					</a></td>
					<td>${bvo.article_writer}</td>
					<td><fmt:formatDate value="${bvo.article_reg_date}" pattern="yyyy년 MM월 dd일"/></td>
					<td>${bvo.article_views}</td>
				</tr>
					<%-- <li class="bd-list-item">
					<span></span>
					<span></span>
					<span> </span>
					<span>조회수 : </span>
					댓글수 : ${bvo.replyCnt}  
				`	</li>--%>
			</c:forEach>
			</table>
			</ul>
		
		<%-- Page 객체(DTO)를 사용한 페이징 처리 --%>
			<ul class="pagenation">
				<%-- 이전(prev) 버튼 --%>
				<c:if test="${page.prev}">
				<li><a href="/board/list?num=${page.startPageNum - 1}" class="prev">이전</a></li>
				</c:if>
				
				<%-- 페이지 번호 버튼 --%>
				<c:forEach begin="${page.startPageNum}" end="${page.endPageNum}" var="num">
				<li>
					<c:if test="${selectNum != num}">
					<a href="/board/list?num=${num}${page.searchTypeKeyword}">${num}</a>
					</c:if>
					<c:if test="${selectNum == num}">
					<a class="active">${num}</a>
					</c:if>
				</li>
				</c:forEach>
				
				<%-- 다음(next) 버튼 --%>
				<c:if test="${page.next}">
				<li><a href="/board/list?num=${page.endPageNum + 1}" class="next">다음</a></li>
				</c:if>
			</ul>
		<c:if test="${member != null or staff != null}">
			<a href="/board/register" class="btn btn-register">새로운 글 작성하기</a>
		</c:if>
		</div>
	</section>

<%@ include file="../includes/footer.jsp" %>



















