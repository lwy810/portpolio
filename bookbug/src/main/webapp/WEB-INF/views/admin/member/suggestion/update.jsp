<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../../includes/admin-header.jsp" %>
<script src="/resources/js/adm-script.js"></script>
	<script src="/resources/ckeditor/ckeditor.js"></script>
<link rel="stylesheet" href="/resources/css/admin/suggestion.css">

	<div class="bn bn-suggestion-update">
		<h2>suggestion <span>update</span></h2>
	</div>
	
	<section>
	<c:if test="${member==null and staff!=null }">
	<form action="/admin/member/suggestion/update" method="post" enctype="multipart/form-data">
		<input type="hidden" name="num" value="${num }">
		<input type="hidden" name="suggestion_no" value="${suggestion.suggestion_no}">
		<input type="hidden" name="suggestion_proposer" value="${suggestion.suggestion_proposer }">
		<input type="hidden" name="suggestion_thumbnail" value="${suggestion.suggestion_thumbnail }">
		
		<div class="mb-suggestion-update">
			<table>
				<tr>
					<c:if test="${member==null and staff!=null }">
					<td>
					<label>진행상태</label>	</td><td>
					<select name="suggestion_status">
						<option value="${suggestion.suggestion_status}">${suggestion.suggestion_status}</option>
						<option value="신청">신청</option>
						<option value="접수">접수</option>
						<option value="구매">구매</option>
						<option value="소장">소장</opZtion>
						<option value="취소">취소</opZtion>
					</select>
					</td>
					</c:if>
					<c:if test="${member!=null and staff==null }">
					<td><label>진행상태</label>	</td><td>
					<input type="text" name="suggestion_status" value="${suggestion.suggestion_status }" readonly></td>
					</c:if>
					<td><label>도서 신청자</label>	</td><td>${suggestion.suggestion_proposer }</td>
				</tr>
				<tr>
					<td><label>신청자 이메일</label></td><td>${suggestion.suggestion_email }</td>
				
					<td><label>도서 제목</label></td>
					<td><input type="text" name="suggestion_booktitle" value="${suggestion.suggestion_booktitle }"></td>
				</tr>
				<tr>
					<td><label>도서 저자</label></td><td><input type="text" name="suggestion_author" value="${suggestion.suggestion_author }"></td>
					<td><label>출판사</label>	</td><td><input type="text" name="suggestion_publisher" value="${suggestion.suggestion_publisher }"></td>
				</tr>
				<tr>
					<td><label>출판년도</label></td><td><input type="text" name="suggestion_publisher_year" value="${suggestion.suggestion_publisher_year }"></td>
					<td><label>도서 ISBN</label></td><td><input type="text" name="suggestion_isbn" value="${suggestion.suggestion_isbn }"></td>
				</tr>
				<tr>
					<td><label>도서 정가</label></td><td><input type="text" name="suggestion_price" value="${suggestion.suggestion_price }"> </td>
					<td><label>신청일</label></td><td colspan="3"><fmt:formatDate value="${suggestion.suggestion_reg_date }" pattern="yyyy-MM-dd"/></td>
				</tr>
				<tr><td colspan="4"><label>추가 메모</label></td></tr>
				<tr><td colspan="4">
					<textarea name="suggestion_notification" id="contents">${suggestion.suggestion_notification }</textarea>
					<script>
						var ckeditor_config = {
							width: '100%',
							height: '150px',
							resize_enable: false,
							enterMode: CKEDITOR.ENTER_BR,
							shiftEnterMode: CKEDITOR.ENTER_P,
							filebrowserUploadUrl: "/common/ckUpload"
						};
						
						CKEDITOR.replace("contents", ckeditor_config);
					</script>
					
				</td></tr>
				<tr><td colspan="4"><p class="img-notice">※ 문의시 도서의 표지를 등록해주시면 큰 도움이 됩니다~ :) ※</p></td></tr>
				<tr><td colspan="4"><input type="file" name="file" id="file">${suggestion.suggestion_thumbnail }</td></tr>
			</table>
			<div class="viewBtn">
				<c:if test="${staff!=null and member==null }">
				<a href="/admin/member/suggestion/list?num=${num }" class="btn btn-default center">목록</a>
				<button type="submit" class="btn btn-default">관리자 수정하기</button>
				</c:if>
				
				<c:if test="${staff==null and member!=null }">
				<button type="submit" class="btn btn-default">수정하기</button>
				<a href="/admin/member/suggestion/mylist?suggestion_proposer=${suggestion.suggestion_proposer }&num=${num }" class="btn btn-default center">목록</a>
				</c:if>
			</div>
		</div>
		</c:if>
		</form>
		
	</section>


<%@ include file="../../../includes/footer.jsp" %>










