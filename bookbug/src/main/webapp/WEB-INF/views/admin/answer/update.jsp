<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../includes/admin-header.jsp" %>
<script src="/resources/js/adm-script.js"></script>
<script src="/resources/ckeditor/ckeditor.js"></script>
<link rel="stylesheet" href="/resources/css/admin/advice.css">

<div class="bn bn-answer-update">
	<h2>answer <span>update</span></h2>
</div>
	
<section>  
    <%-- 댓글 작성 --%>
		<c:if test="${staff!=null and member==null }">
		<div class="mb-answer-update">
			<form name="answerUpFrm" action="/admin/answer/update" method="post">
				<input type="hidden" name="advice_no" value="${answer.advice_no }">
				<input type="hidden" name="answer_no" value="${answer.answer_no }">
				<input type="hidden" name="num" value="${num }">
			
				<ul class="answer-up">
					<li>
						<div class="answer-writer">
						<input type="text" name="respondent" value="${staff.staff_id }" readonly>
						</div>
						<c:if test="${staff!=null and member==null}">
						<button type="submit" class="btn btn-default">댓글수정하기</button>
						</c:if>
					</li>
					<li>
						<textarea name="content" id="contents">${answer.content }</textarea>
						<script>
						var ckeditor_config = {
							width: '100%',
							height: '100px',
							resize_enable: false,
							enterMode: CKEDITOR.ENTER_BR,
							shiftEnterMode: CKEDITOR.ENTER_P,
							filebrowserUploadUrl: "/common/ckUpload"
						};
						
						CKEDITOR.replace("contents", ckeditor_config);
					</script>
					</li>
				</ul>
			</form>
		</div>
		</c:if>
</section>


<%@ include file="../../includes/footer.jsp" %>