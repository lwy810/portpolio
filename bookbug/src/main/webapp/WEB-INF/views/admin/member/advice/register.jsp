<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../../includes/header.jsp" %>
<script src="/resources/js/adm-script.js"></script>
<script src="/resources/ckeditor/ckeditor.js"></script>
<link rel="stylesheet" href="/resources/css/admin/advice.css">

	<div class="bn bn-advice-register">
		<h2>advice <span>Register</span></h2>
	</div>

	<section>
		<form name="registerFrm" action="/admin/member/advice/register" method="post" enctype="multipart/form-data">
			<div class="mb-advice-register">
			<c:if test="${member!=null and staff==null }">
			<table>
				<tr>
					<td><label for="advice_client">상담 고객</label></td>
					<td><input type="text" id="advice_client" name="advice_client" value="${member.member_id}${staff.staff_id}" readonly required autofocus></td>
					<td><label for="advice_type">상담 분류</label></td>
					<td><select name="advice_type" id="advice_type">
						<option value="주문" selected>주문</option>
						<option value="배송">배송</option>
						<option value="예약">예약</option>
						<option value="교환">교환</option>
						<option value="기타">기타</option>
					</select>
					</td>
				</tr>
				<tr>
					<td>
					<label for="advice_title">제목</label>
					</td>
					<td colspan="3">
					<input type="text" name="advice_title" id="advice_title" required="required">
					</td>
				</tr>
				<tr><td colspan="4"><label>상담 내용</label></td></tr>
				<tr><td colspan="4"><textarea name="advice_content" id="contents">${advo.advice_content }</textarea>
						<script>
							var ckeditor_config = {
								width: '100%',
								height: '350px',
								resize_enable: false,
								enterMode: CKEDITOR.ENTER_BR,
								shiftEnterMode: CKEDITOR.ENTER_P,
								filebrowserUploadUrl: "/common/ckUpload"
							};
							
							CKEDITOR.replace("contents", ckeditor_config);
						</script>
					</td>
				</tr>
				<tr><td colspan="4"><p class="img-notice">※ 문의시 도서의 표지를 등록해주시면 큰 도움이 됩니다~ :) ※</p></tr>
				<tr><td colspan="4"><input type="file" name="file" id="file"></td></tr>
				<tr>
					<td colspan="4">
					<c:if test="${member==null and staff!=null }">
						<a href="/admin/member/advice/list?num=1" class="btn btn-default">목록</a>
					</c:if>
					
					<c:if test="${member!=null and staff==null }">
						<button type="submit" id="register-btn" class="btn">문의하기</button>
						<a href="/admin/member/advice/mylist?advice_client=${member.member_id }&num=1" class="btn btn-default">나의문의내역</a>
					</c:if>
					</td>
				</tr>
			</table>
			</c:if>
			</div>
		</form>
	</section>




<%@ include file="../../../includes/footer.jsp" %>










