<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../includes/admin-header.jsp" %>
	<link rel="stylesheet" href="/resources/css/admin/board.css">
	<script src="/resources/ckeditor/ckeditor.js"></script>
	<script>
		
	</script>
	
	<div class="bn bn-board-update">
		<h2>board <span>update</span></h2>
	<section>
	<c:if test="${member!=null or staff!=null }">
		<form  action="/board/update" method="post">
		<input type="hidden" name="article_num" value="${update.article_num }">
		<input type="hidden" name="num" value="${num }">
			<ul class="bd-update-frm">
				<li>
					<input type="text" name="article_title" value="${update.article_title }" autofocus required class="input-frm input-bd input-title">
					<input type="text" name="member_id" value="${member.member_id}${staff.staff_name}" readonly class="input-frm input-bd">
				</li>
				<li>
					<textarea name="article_content" id="contents">${update.article_content }</textarea>
					<script>
						var ckeditor_config = {
							width: '100%',
							height: '250px',
							resize_enable: false,
							enterMode: CKEDITOR.ENTER_BR,
							shiftEnterMode: CKEDITOR.ENTER_P,
							filebrowserUploadUrl: "/common/ckUpload"
						};
						
						CKEDITOR.replace("contents", ckeditor_config);
					</script>
				</li>
				<li>
					<div class="board-update-btn">
						<c:if test="${member != null or staff != null}">
						<button type="submit" class="btn btn-register">수 정</button>
						</c:if>
						<a href="/board/list?num=${num }" class="btn btn-default">목 록</a>
					</div>
				</li>
			</ul>
		</form>
		</c:if>
	</section>

<%@ include file="../includes/footer.jsp" %>