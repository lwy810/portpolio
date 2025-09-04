<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../includes/admin-header.jsp" %>
<script src="/resources/js/adm-script.js"></script>
<link rel="stylesheet" href="/resources/css/admin/member.css">
<script>
	$(function(){
		$('.member-search-bar li:nth-child(3)').css('background','#fdf4d1')
		
		$('#upBtn').click(function(){
			$('#upBtn').attr('href','/admin/confirm/update?member_id="${member.member_id }')
		});
		
		var female = $('#female').val();
		var male = $('#male').val();
		var prefer = '${member.member_prefer}';
		var transPrefer = prefer.toString();
		var arrPrefer = transPrefer.split('');
		
		for (var i=0; i<arrPrefer.length; i++) {
			console.log(arrPrefer[i]);
		}
		
		if (arrPrefer[0] != 0) {$('#mb-pf-0').attr('checked', 'true');} 
		if (arrPrefer[1] != 0) {$('#mb-pf-1').attr('checked', 'true');} 
		if (arrPrefer[2] != 0) {$('#mb-pf-2').attr('checked', 'true');} 
		if (arrPrefer[3] != 0) {$('#mb-pf-3').attr('checked', 'true');} 
		if (arrPrefer[4] != 0) {$('#mb-pf-4').attr('checked', 'true');} 
		
		if (female != 'null') {
			$('#female').attr('checked', 'true');
		} else {
			$('#male').attr('checked', 'true');
		}

	});
</script>

	<div class="bn bn-admin-register">
		<h2>Member<span>modify</span></h2>
	</div>
	
	<section>
		<div class="member-container">
			<ul class="search-bar member-search-bar">
				<li><h3>My page</h3></li>
				<li><a href="/admin/member/mypage?member_id=${member.member_id}" >기본정보</a></li>
				<li><a href="/admin/confirm/pwdConfirm?member_id=${member.member_id}" >회원정보 수정</a></li>
				<li><a href="/admin/confirm/pwdModify?member_id=${member.member_id}" >비밀번호 변경</a></li>
				<li><a href="/admin/confirm/deleteConfirm?member_id=${member.member_id}" >회원 탈퇴</a></li>
			</ul>
		
			<c:if test="${member_pwd == false}"><p class="cf-msg">※  비밀번호가 틀려 정보 수정에 실패했습니다.</p></c:if>
			
			<form id="login-sa-frm" action="/admin/member/memberModify" method="post" autocomplete="off">
				<ul class="mb-adm-register">
					<li><input type="text" id="member_id" name="member_id" class="input-frm member-id-mod"  value="${modify.member_id }" readonly></li>
					<li><input type="password" name="member_pwd"  placeholder="비밀번호를 입력하세요" required></li>
					<li><input type="text" name="member_name"  value="${modify.member_name }"></li>
					<li>
						<input type="radio" id="female" name="member_gender" value="여성" >
						<label for="female">여성</label>
						<input type="radio" id="male" name="member_gender" value="남성">
						<label for="male">남성</label>
					</li>
					<li><input type="tel" id="member_phone" name="member_phone" value="${modify.member_phone }"></li>
					<li><input type="date" name="member_birthday" value="${modify.member_birthday }"></li>
					<li>
						<input type="checkbox" id="mb-pf-0" name="member_prefer" value="SF소설" class="mb-prefer" >
						<label for="mb-pf-0">SF</label>
						<input type="checkbox" id="mb-pf-1" name="member_prefer" value="역사" class="mb-prefer">
						<label for="mb-pf-1">역사</label>
						<input type="checkbox" id="mb-pf-2" name="member_prefer" value="비문학" class="mb-prefer">
						<label for="mb-pf-2">비문학</label>
						<input type="checkbox" id="mb-pf-3" name="member_prefer" value="만화" class="mb-prefer">
						<label for="mb-pf-3">만화</label>
						<input type="checkbox" id="mb-pf-4" name="member_prefer" value="실용" class="mb-prefer">
						<label for="mb-pf-4">실용</label>
						</li>
					<li>
						<button id="modifyBtn" type="submit"  class="btn btn-register">수정</button>
					</li>
				</ul>
			</form>
		</div>
	</section>


<%@ include file="../../includes/footer.jsp" %>










