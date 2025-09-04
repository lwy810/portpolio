<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../../includes/admin-header.jsp" %>
<link rel="stylesheet" href="/resources/css/admin/suggestion.css">
<script>
	$(function(){
		$('#delete-suggestion').click(function(){
			if(confirm('정말 희망 도서 신청서를 삭제하시겠습니까?')==true){
				$(this).attr('href', '/admin/member/suggestion/delete?suggestion_no=${suggestion.suggestion_no }&suggestion_proposer=${suggestion.suggestion_proposer }&num=${num }');	
			}
		});
		
		$('#img').click(function(){
			$('.bigImg').css('display','block');
			$('.bg').css('display', 'block');
		});
		$('.bigImg').click(function(){
			$('.bigImg').css('display','none');
			$('.bg').css('display', 'none');
		});
	});

</script>
	<div class="bn bn-suggestion-view">
		<h2>suggestion <span>view</span></h2>
	</div>
	
	<section>
		<c:if test="${member!=null or staff!=null}">
		<div class="mb-suggestion-view">
			<table>
				<tr>
					<th><label>번호</label>	</th>
					<th><label>진행상태</label>	</th>
					<th><label>도서 신청자</label>	</th>
					<th><label>신청자 이메일</label></th>
					<th><label>도서 제목</label></th>
					<th><label>도서 저자</label></th>
					<th><label>출판사</label>	</th>
					<th><label>출판년도</label></th>
					<th><label>도서 ISBN</label></th>
					<th><label>도서 정가</label></th>
					<th><label>신청일</label></th>
				</tr>
				<tr>
					<td>${suggestion.suggestion_no }</td>
					<td>${suggestion.suggestion_status }</td>
					<td>${suggestion.suggestion_proposer }</td>
					<td>${suggestion.suggestion_email }</td>
					<td>${suggestion.suggestion_booktitle }</td>
					<td>${suggestion.suggestion_author }</td>
					<td>${suggestion.suggestion_publisher }</td>
					<td>${suggestion.suggestion_publisher_year }</td>
					<td>${suggestion.suggestion_isbn }</td>
					<td><fmt:formatNumber value="${suggestion.suggestion_price }" pattern="#,###,###"/>원 </td>
					<td><fmt:formatDate value="${suggestion.suggestion_reg_date }" pattern="yyyy- MM-dd"/></td>
				</tr>
				<c:if test="${suggestion.suggestion_thumbnail != null }">
				<tr>
					<td colspan="11">
						<div class="mb-suggestion-view-img">
							<img id="img" src="/libraryUploadImg/${suggestion.suggestion_thumbnail}">
							<div class="bigImg"><img src="/libraryUploadImg/${suggestion.suggestion_thumbnail}"></div>
							<div class="bg"></div>
						</div>
					</td>
				</tr>
				</c:if>
				<tr><td colspan="11"><label>추가 메모</label></td></tr>
				<tr><td colspan="11">${suggestion.suggestion_notification }</td></tr>
			</table>
			
			<div class="viewBtn">
				<c:if test="${staff!=null and member==null }">
				<a href="/admin/member/suggestion/list?num=${num }" class="btn btn-default center">목록</a>
				<a href="/admin/member/suggestion/update?suggestion_no=${suggestion.suggestion_no }&num=${num }" class="btn btn-default center">수정하기</a>
				<%--<a id="delete-suggestion" href="" class="btn btn-default center">삭제하기</a> --%>
				</c:if>
				
				<c:if test="${staff==null and member!=null }">
				<a href="/admin/member/suggestion/mylist?suggestion_proposer=${suggestion.suggestion_proposer }&num=${num }" class="btn btn-default center">목록</a>
				<%-- <a href="/admin/member/suggestion/update?suggestion_no=${suggestion.suggestion_no }&num=${num }" class="btn btn-default center">수정하기</a>--%>
				</c:if>
			</div>
		</div>
		</c:if>
	</section>


<%@ include file="../../../includes/footer.jsp" %>










