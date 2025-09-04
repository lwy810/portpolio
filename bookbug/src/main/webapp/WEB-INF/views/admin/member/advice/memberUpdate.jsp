<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../../includes/admin-header.jsp" %>
<script src="/resources/js/adm-script.js"></script>
<script src="/resources/ckeditor/ckeditor.js"></script>
<link rel="stylesheet" href="/resources/css/admin/advice.css">

	<div class="bn bn-advice-memberUpdate">
		<h2>advice <span>member update</span></h2>
	</div>
	
	<section>
		<c:if test="${member!=null or staff==null}">
		<div class="mb-advice-update">
		<form name="updateAdviceFrm" action="/admin/member/advice/memberUpdate" method="post" enctype="multipart/form-data">
			<input type="hidden" name="num" value="${num }">
			<input type="hidden" name="advice_no" value="${advo.advice_no}">
			<input type="hidden" name="advice_thumbnail" value="${advo.advice_thumbnail}">
			<input type="hidden" name="advice_client" value="${member.member_id }">
			<table>
				<!-- 
				<c:if test="${member!=null and staff==null }">
				<tr>
					<td colspan="2"><label>문의상태</label></td>
					<td colspan="2"><input type="text" name="advice_status" value="${advo.advice_status }" readonly></td>
					
				</tr>
				</c:if> -->
				<tr>
					<td><label>등록번호</label></td><td>${advo.advice_no}</td>
					<td><label>분류</label></td><td>${advo.advice_type }</td>
				</tr>
				<tr>
					<td><label>등록일</label></td><td><fmt:formatDate value="${advo.advice_reg_date }" pattern="yyyy-MM-dd"/> </td>
					<td><label>작성자</label>	</td>
					<td>${advo.advice_client}(${member.member_name})</td>
				</tr>
				<tr>
					<td><label>제목</label></td>
					<td colspan="3"><input type="text" name="advice_title" value="${advo.advice_title }"></td>
					
				</tr>
				<tr><td colspan="4"><label>내용</label></td></tr>
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
				<tr><td colspan="4"><p class="img-advice">※ 문의 작성시 이미지를 등록할 수 있습니다~ :) ※</p></td></tr>
				<tr><td colspan="4"><input type="file" name="file" id="file"></td></tr>
			</table>
			
			<div class="ad-updateBtn">
				<c:if test="${staff==null and member!=null }">
				<a href="/admin/member/advice/mylist?advice_client=${advo.advice_client }&num=${num }" class="btn btn-default center">목록</a>
				<button type="submit" class="btn btn-default">수정하기</button>
				</c:if>
				
			</div>
		</form>
		</div>
		</c:if>
	</section>


<%@ include file="../../../includes/footer.jsp" %>










