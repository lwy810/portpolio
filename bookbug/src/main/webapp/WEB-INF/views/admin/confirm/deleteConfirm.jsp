<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="../../includes/admin-header.jsp" %>
<link rel="stylesheet" href="/resources/css/admin/member.css">
<script>
	$(function(){
		
		$('.member-search-bar li:nth-child(5)').css('background','#fdf4d1')
	
		$('#confirmSaBtn').click(function(){
			if (confirm('정말 탈퇴 하시겠습니까?')) {
				$('#login-sa-frm').attr('action','/admin/staff/staffDelete');
				$('#login-sa-frm').submit();
			} 
		});
		
		$('#confirmMbBtn').click(function(){
			if (confirm('정말 탈퇴 하시겠습니까?')) {
				$('#login-mb-frm').attr('action','/admin/member/memberDelete');
				$('#login-mb-frm').submit();
			} 
		});
	});
</script>

	<div class="bn bn-admin-login">
		<h2>Password<span>Confirm</span></h2>
	</div>
	
	<section>
		<div class="confirm-wrap">
			<ul class="search-bar member-search-bar">
				<li><h3>My page</h3></li>
				<c:if test="${member != null  and staff == null}">
				<li><a href="/admin/member/mypage?member_id=${member.member_id}" >기본정보</a></li>
				<li><a href="/admin/confirm/pwdConfirm?member_id=${member.member_id}" >회원정보 수정</a></li>
				<li><a href="/admin/confirm/pwdModify?member_id=${member.member_id}" >비밀번호 변경</a></li>
				<li><a href="/admin/confirm/deleteConfirm?member_id=${member.member_id}" >회원 탈퇴</a></li>
				</c:if>
				<c:if test="${member == null  and staff != null}">
				<li><a href="/admin/staff/mypage?staff_id=${staff.staff_id}" >기본정보</a></li>
				<li><a href="/admin/confirm/pwdConfirm?staff_id=${staff.staff_id}" >회원정보 수정</a></li>
				<li><a href="/admin/confirm/pwdModify?staff_id=${staff.staff_id}" >비밀번호 변경</a></li>
				<li><a href="/admin/confirm/deleteConfirm?staff_id=${staff.staff_id}" >회원 탈퇴</a></li>
				</c:if>
			</ul>
	
	
	
			<div class="confirm-container">
				<h3>비밀번호 확인</h3>
				<p>회원님의 소중한 정보 보호를 위해, B.Bug 계정의 현재 비밀번호를 확인해 주세요.</p>
			
				<div class="mb-adm-pwdconfirm-wrap">
					<c:if test = "${member == null and staff != null }">
					<form name="staff-login-frm" id="login-sa-frm" action="" method="post">
						<input type="hidden" name="staff_id" value="${staff.staff_id }">
						<div class="mb-adm-member mb-adm-pwdconfirm" >
							<div class="id_wrap">
								<p>아이디</p>
								<input type="text" name="staff_id" value="${staff.staff_id}" readonly>
							</div>
							<div class="pwd_wrap">
								<p>비밀번호</p>
								<input type="text" name="staff_pwd"  >
							</div>
							<div class="confirmSaBtn-wrap">
								<button type="submit"  id="confirmSaBtn" class="btn btn-register">계정 탈퇴</button>
								<a href="/admin/staff/mypage?staff_id=${staff.staff_id }" class="btn btn-private">마이 페이지</a>
							</div>
						</div>
						<c:if test = "${current_pwd = false }">
						<div>
							<p>※ 현재 비밀번호가 틀려 수정할 수 없습니다.</p>
						</div>
						</c:if>
					</form>
					</c:if>
					
					<c:if test = "${member != null and staff == null }">
					<form name="member-login-frm" id="login-mb-frm" action="" method="post">
						<input type="hidden" name="member_id" value="${member.member_id }">
						<ul class="mb-adm-member mb-adm-pwdconfirm">
							<li>
								<div class="id_wrap">
									<p>아이디	</p>
									<input type="text" name="staff_id" value="${staff.staff_id}" readonly>
								</div>
								<div class="pwd_wrap">
									<p>비밀번호</p>
									<input type="password" name="staff_pwd">
								</div>
								<div class="confirmMbBtn-wrap">
									<button type="submit"  id="confirmMbBtn" class="btn btn-register">확인</button>
									<a href="/admin/member/mypage?member_id=${member.member_id }" class="btn btn-private">마이 페이지</a>
								</div>				
							</li>		
							<c:if test = "${current_pwd = false }">
							<li>
								<p>※ 현재 비밀번호가 틀려 수정할 수 없습니다.</p>
							</li>
							</c:if>
						</ul>
					</form>
					</c:if>
				</div>
			</div>
		</div>
	</section>
<%@ include file="../../includes/footer.jsp" %>


