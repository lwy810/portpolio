<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../includes/admin-header.jsp" %>
<script src="/resources/js/adm-script.js"></script>
<script src="/resources/ckeditor/ckeditor.js"></script>
<link rel="stylesheet" href="/resources/css/admin/notice.css">

	<div class="bn bn-notice-update">
		<h2>notice <span>update</span></h2>
	</div>

	<section>
	<c:if test="${staff==null and member!=null }">
	<p class="msg">※ 접근 불가 ※ </p>
	</c:if>
	<c:if test="${member==null and staff!=null }">
		<form name="updateNoticeFrm" action="/board/notice/update" method="post" enctype="multipart/form-data">
		<input type="hidden" name="num" value="${num }">
		<input type="hidden" name="notice_no" value="${notice.notice_no }">
		<div class="mb-notice-register">
			<table>
				<tr>
					<td><label for="notice_writer">작성자</label></td>
					<td><input type="text" id="notice_writer" name="notice_writer" value="${staff.staff_id}" readonly required autofocus></td>
					<td><label>공지분류</label></td>
					<td><select name="notice_type" id="notice_type" disabled="disabled">
						<option value="주문" selected>주문</option>
						<option value="배송">배송</option>
						<option value="예약">예약</option>
						<option value="교환">교환</option>
						<option value="기타">기타</option>
					</select>
					</td>
				</tr>
				<tr>
					<td><label for="notice_title">제목</label></td>
					<td colspan="3"><input type="text" name="notice_title" id="notice_title" value="${notice.notice_title} "></td>
				</tr>
				<tr><td colspan="4"><label>내용</label></td></tr>
					<tr><td colspan="4"><textarea name="notice_content" id="contents">${notice.notice_content }</textarea>
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
				</tr>
				<tr><td colspan="4"><p class="img-notice">※ 공지시 이미지를 등록할 수 있습니다. :) ※</p></td></tr>
				<tr><td colspan="4"><input type="file" name="file" id="file"></td></tr>
				</table>
				<c:if test="${member==null and staff!=null }">
					<a href="/board/notice/list?num=1" class="btn btn-default">목록</a>
					<button type="submit" id="register-btn" class="btn">관리자 공지 수정</button>
				</c:if>
			</div>
		</form>
		</c:if>
	</section>




<%@ include file="../../includes/footer.jsp" %>










