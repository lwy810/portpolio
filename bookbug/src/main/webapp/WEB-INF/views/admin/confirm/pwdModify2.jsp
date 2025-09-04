<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="../../includes/admin-header.jsp" %>
<link rel="stylesheet" href="/resources/css/admin/member.css">

<script>
	$(function(){
		
		$('.member-search-bar li:nth-child(4)').css('background','#fdf4d1')
		
		var mod_pwd = null;
		var pwd_confirm= null;
		$('.mb-adm-member input').change(function(e){
			mod_pwd= $('input[name=modify_pwd]').val();
			pwd_confirm = $('input[name=pwd_confirm]').val();
		})
		
		console.log(mod_pwd);
		console.log(pwd_confirm);
		
		$('#confirmBtn').click(function(){
			
			if (mod_pwd != pwd_confirm) {
				alert('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.');
			} else {
				$('#login-mb-frm').attr('action','/admin/confirm/pwdModify');
				$('#login-mb-frm').submit();
			}
		});
		
	});
	
</script>

	<div class="bn bn-admin-login">
		<h2>Password<span> Confirm</span></h2>
	</div>

	<section>
		<div class="modify-wrap">
			<ul class="search-bar member-search-bar">
				<li><h3>My page</h3></li>
				<c:if test="${member != null  and staff == null}">
				<li><a href="/admin/member/mypage?member_id=${member.member_id}" >기본정보</a></li>
				<li><a href="/admin/member/memberModify?member_id=${member.member_id}" >회원정보 수정</a></li>
				<li><a href="/admin/confirm/pwdModify?member_id=${member.member_id}" >비밀번호 변경</a></li>
				<li><a href="/admin/confirm/pwdConfirm?member_id=${member.member_id}" >회원 탈퇴</a></li>
				</c:if>
				<c:if test="${member == null  and staff != null}">
				<li><a href="/admin/staff/mypage?staff_id=${staff.staff_id}" >기본정보</a></li>
				<li><a href="/admin/staff/staffModify?staff_id=${staff.staff_id}" >회원정보 수정</a></li>
				<li><a href="/admin/confirm/pwdModify?staff_id=${staff.staff_id}" >비밀번호 변경</a></li>
				<li><a href="/admin/confirm/pwdConfirm?staff_id=${staff.staff_id}" >회원 탈퇴</a></li>
				</c:if>
			</ul>
		
			<div>
				<c:if test = "${member == null and staff != null }">
				<form name="member-login-frm" id="login-mb-frm" method="post">
					<ul class="mb-adm-member">
						<li><input type="hidden" name="staff_id" value="${staff.staff_id }"></li>
						<li><input type="password" name="staff_pwd" placeholder="현재 비밀번호" class="input-frm" autofocus required></li>
						<li><input type="password" name="modify_pwd" placeholder="새 비밀번호" class="input-frm" required></li>
						<li><input type="password" name="pwd_confirm" placeholder="새 비밀번호 확인" class="input-frm" required></li>
						<li><p>8~20자리의 영문, 숫자, 특수문자를 조합하여 입력 (단, 특수문자 &<>“”제외)</p></li>
						<li>
							<a id="confirmBtn" class="btn btn-public">비밀번호 변경</a>
							<a href="/admin/staff/mypage?staff_id=${staff.staff_id }" class="btn btn-private">마이 페이지</a>
						</li>
					</ul>
				</form>
				</c:if>
				
				<c:if test = "${member != null and staff == null }">
				<form name="member-login-frm" id="login-mb-frm" method="post">
					<ul class="mb-adm-member">
						<li><input type="hidden" name="member_id" value="${member.member_id }"></li>
						<li><input type="password" name="member_pwd" placeholder="현재 비밀번호" class="input-frm" autofocus required></li>
						<li><input type="password" name="modify_pwd" placeholder="새 비밀번호" class="input-frm" required></li>
						<li><input type="password" name="pwd_confirm" placeholder="새 비밀번호 확인" class="input-frm" required></li>
						<li>
							<a id="confirmBtn" class="btn btn-public">비밀번호 변경</a>
							<a href="/admin/member/mypage?member_id=${member.member_id }" class="btn btn-private">마이 페이지</a>
						</li>
					</ul>
				</form>
				</c:if>
				
			</div>
		</div>
	</section>
<%@ include file="../../includes/footer.jsp" %>


