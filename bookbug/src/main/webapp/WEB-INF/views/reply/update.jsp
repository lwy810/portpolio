<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../includes/admin-header.jsp" %>
<script src="/resources/ckeditor/ckeditor.js"></script>
	
	
	
	<div class="bn bn-adm-board">
		<h2>reply <span>update</span></h2>
	</div>
	
	<section>
	<c:if test="${member!=null or staff!=null }">
	<form action="/reply/update" method="post">
		<input type="hidden" name="article_num" value="${reply.article_num }">
		<input type="hidden" name="reply_num" value="${reply.reply_num }">
		<ul>
		<li>${reply.reply_writer }</li>
		<li><fmt:formatDate value="${reply.reply_reg_date}" pattern="yyyy년MM월dd일"/> </li>
		<li>
			<textarea name="reply_content" id="reply_content">${reply.reply_content }</textarea>
			<script>
				var ckeditor_config = {
					width: '100%',
					height: '100px',
					resize_enable: false,
					enterMode: CKEDITOR.ENTER_BR,
					shiftEnterMode: CKEDITOR.ENTER_P,
					filebrowserUploadUrl: "/board/ckUpload"
				};
				
					CKEDITOR.replace("reply_content", ckeditor_config);
					</script>
		</li>
		<button type="submit" class="btn btn-register">댓글 수정</button>
		<a href="/board/view?article_num=${reply.article_num }&num=1" class="btn btn-public">목록</a>
		</ul>
	</form>
	</c:if>
	</section>
	
	
	
	
	<%@ include file="../includes/admin-footer.jsp" %>