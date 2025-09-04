<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../../includes/admin-header.jsp" %>
<script src="/resources/js/adm-script.js"></script>
<script src="/resources/ckeditor/ckeditor.js"></script>
<link rel="stylesheet" href="/resources/css/admin/suggestion.css">
<script>
 $(function(){
	 $('#input_direct').hide();
		
	$('#select-email').change(function(){
		if($(this).val()=='direct'){
			$('#input_direct').show();
		}else{
			$('#input_direct').hide();
		}
	});
 });
</script>
	<div class="bn bn-suggestion-register">
		<h2>suggestion <span>Register</span></h2>
	</div>

	<section>
		<c:if test="${member!=null and staff==null}">
		<form name="registerFrm" action="/admin/member/suggestion/register" method="post" enctype="multipart/form-data">
			<ul class="mb-suggestion-register">
				
				<li>
					<input type="text" id="suggestion_proposer" name="suggestion_proposer" value="${member.member_id}${staff.staff_id}" readonly class="input-frm" required autofocus>
				</li>
				<li>
					<div class="selectbox">
					<input type="text" name="suggestion_email" placeholder="이메일 입력" required>@
					<select name="suggestion_select" id="select-email">
						<option value="naver.com">naver.com</option>
						<option value="nate.com">nate.com</option>
						<option value="daum.net">daum.net</option>
						<option value="kakao.com">kakao.com</option>
						<option value="direct">직접 입력</option>
					</select>
					<input type="text" id="input_direct" name="input_direct">
					</div>
				</li>
				<li>
					<input type="text" name="suggestion_booktitle" placeholder="도서 제목" required>
				</li>
				<li>
					<input type="text" name="suggestion_author" placeholder="저자" required>
				</li>
				<li>
					<input type="text" name="suggestion_publisher" placeholder="출판사">
					<input type="text" name="suggestion_publisher_year" placeholder="출판년도">
				</li>
				<li>
					<input type="text" name="suggestion_isbn" placeholder="도서 ISBN">
					<input type="text" name="suggestion_price" placeholder="도서 정가">
				</li>
				<li>
					<textarea name="suggestion_notification" id="contents"></textarea>
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
				<li><input type="file" name="file" id="file"></li>
				<li>
					<button type="submit" id="register-btn" class="btn btn-suggestion">신청</button>
					<a href="/admin/member/suggestion/mylist?suggestion_proposer=${member.member_id }&num=1" class="btn btn-default">나의 신청 내역</a>
					<c:if test="${member==null and staff!=null }">
						<a href="/admin/member/suggestion/list?num=1" class="btn btn-default">목록</a>
					</c:if>
				</li>
			</ul>
		</form>
		</c:if>
	</section>




<%@ include file="../../../includes/footer.jsp" %>










