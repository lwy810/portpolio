<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ include file="../includes/admin-header.jsp" %>
	<link rel="stylesheet" href="/resources/css/admin/board.css">
	<script src="/resources/ckeditor/ckeditor.js"></script>
	
	<div class="bn bn-board-register">
		<h2>board <span>register</span></h2>
	</div>
		
	<section>
		<c:if test="${member!=null or staff!=null }">
		<div class="bb-register-wap">
			<form action="/board/register" method="post">
				<ul class="bd-reg-frm">
					<li>
						<input type="text" name="article_title" placeholder="제목 입력" autofocus required class="input-frm input-bd input-title">
						<input type="text" name="article_writer" value="${member.member_id}${staff.staff_id}" readonly class="input-frm input-bd input-id">
					</li>
					<li>
						<textarea name="article_content" id="contents"></textarea>
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
					</li>
					<li>
						<c:if test="${member != null or staff != null}"><button type="submit" class="btn btn-register">등 록</button></c:if>
						<a href="/board/list?num=1" class="btn btn-default">목 록</a>
					</li>
				</ul>
			</form>
		</div>
		</c:if>
	</section>

    <%@include file="../includes/footer.jsp" %>
















