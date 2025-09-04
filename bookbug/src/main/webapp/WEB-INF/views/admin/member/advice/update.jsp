<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../../includes/admin-header.jsp" %>
<script src="/resources/js/adm-script.js"></script>
<script src="/resources/ckeditor/ckeditor.js"></script>
<link rel="stylesheet" href="/resources/css/admin/advice.css">

	<div class="bn bn-advice-update">
		<h2>advice <span>update</span></h2>
	</div>
	
	<section>
		<c:if test="${staff==null and member!=null }">
		<p class="msg">※ 접근 불가 ※ </p>
		</c:if>
		<c:if test="${member==null or staff!=null}">
		<div class="mb-advice-update">
		<form name="updateAdvice Frm" action="/admin/member/advice/update" method="post" enctype="multipart/form-data">
			<input type="hidden" name="num" value="${num }">
			<input type="hidden" name="advice_no" value="${advo.advice_no}">
			<input type="hidden" name="advice_thumbnail" value="${advo.advice_thumbnail}">
			<input type="hidden" name="advice_client" value="${member.member_id }">
			<table>
				<c:if test="${member==null and staff!=null }">
				<tr>
				<td colspan="2">
					<p>문의 상태</p>	</td>
					<td colspan="2"><select name="advice_status">
						<option value="${advo.advice_status}">${advo.advice_status}</option>
						<option value="답변완료">답변완료</option>
					</select></td>
					
				</tr>
				</c:if> 
				<tr>
					<td><p>등록번호</p></td><td>${advo.advice_no}</td>
					<td><p>분류</p></td>
					<td>
					<input type="text" name="advice_type" value="${advo.advice_type }" readonly>
					</td>
				</tr>
				<tr>
					<td><p>등록일</p></td><td><fmt:formatDate value="${advo.advice_reg_date }" pattern="yyyy-MM-dd"/> </td>
					<td><p>작성자</p>	</td>
					<td>${advo.advice_client}(${member.member_name})</td>
				</tr>
				<tr>
					<td><p>제목</p></td>
					<td colspan="3"><input type="text" name="advice_title" value="${advo.advice_title }"></td>
					
				</tr>
				<tr><td colspan="4"><p>내용</p></td></tr>
				<tr><td colspan="4">
					<textarea name="advice_content" id="contents">${advo.advice_content }</textarea>
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
				<tr><td colspan="4"><div class="img-advice">※ 문의 작성시 이미지를 등록할 수 있습니다~ :) ※</div></td></tr>
				<tr><td colspan="4"><input type="file" name="file" id="file"></td></tr>
			</table>
			
			<div class="updateBtn">
				<c:if test="${staff==null and member!=null }">
				<a href="/admin/member/advice/mylist?advice_client=${member.member_id}&num=${num }" class="btn btn-default center">목록</a>
				</c:if>
				<c:if test="${staff!=null and member==null }">
				<a href="/admin/member/advice/list?num=${num }" class="btn btn-default center">목록</a>
				<button type="submit" class="btn btn-default">관리자 수정하기</button>
				</c:if>
			</div>
		</form>
		</div>
		</c:if>
	</section>


<%@ include file="../../../includes/footer.jsp" %>










