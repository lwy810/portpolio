<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../includes/admin-header.jsp" %>
<script src="/resources/js/adm-script.js"></script>
<link rel="stylesheet" href="/resources/css/admin/member.css">

<script>
	$(function(){
		$('.member-search-bar li:nth-child(3)').css('background','#fdf4d1')
		
		$('#modifyBtn').click(function(){
			if (confirm('정말 정보를 수정 하시겠습니까?')) {
				$('#login-sa-frm').attr('action','/admin/staff/staffModify');
				$('#login-sa-frm').submit();
			} 
		});

		var female = $('#female').val();
		var male = $('#male').val();
		
		if (female != 'null') {
			$('#female').attr('checked', 'true');
		} else {
			$('#male').attr('checked', 'true');
		}

	});
</script>

	<div class="bn bn-admin-register">
		<h2>Staff<span>modify</span></h2>
	</div>
	
	<section>
		<div class="staff-container">
			<ul class="search-bar member-search-bar">
				<li><h3>My page</h3></li>
				<li><a href="/admin/staff/mypage?staff_id=${staff.staff_id}" >기본정보</a></li>
				<li><a href="/admin/staff/staffModify?staff_id=${staff.staff_id}" >회원정보 수정</a></li>
				<li><a href="/admin/confirm/pwdModify?staff_id=${staff.staff_id}" >비밀번호 변경</a></li>
				<li><a href="/admin/confirm/pwdConfirm?staff_id=${staff.staff_id}" >회원 탈퇴</a></li>
			</ul>

			<c:if test="${staff_pwd == false}"><p class="cf-msg">※  비밀번호가 틀려 정보 수정에 실패했습니다.</p></c:if>
			<form id="login-sa-frm" action="/admin/staff/staffModify" method="post" autocomplete="off">
				<ul class="mb-adm-register">
					<li><input type="text" id="staff_id" name="staff_id" class="input-frm"  value="${modify.staff_id }" readonly></li>
					<li><input type="password" name="staff_pwd"  required></li>
					<li><input type="text" name="staff_name"  value="${modify.staff_name }"></li>
					<li>
						<input type="radio" id="female" name="staff_gender" value="여성" >
						<label for="female">여성</label>
						<input type="radio" id="male" name="staff_gender" value="남성">
						<label for="male">남성</label>
					</li>
					<li><input type="tel" name="staff_phone" value="${modify.staff_phone }"></li>
					<li><input type="date" name="staff_birthday" value="${modify.staff_birthday }"></li>
					<li><input type="number" name="staff_level" value="${modify.staff_level }"></li>
					<li><input type="number" name="staff_department"  value="${modify.staff_department }" readonly></li>
					<li>
						<button id="modifyBtn" type="submit"  class="btn btn-register">수정</button>
						<a href="/">홈</a>
					</li>
				</ul>
			</form>
		</div>
	</section>


<%@ include file="../../includes/footer.jsp" %>










