<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../includes/admin-header.jsp" %>
<script src="/resources/js/adm-script.js"></script>
<link rel="stylesheet" href="/resources/css/admin/member.css">

<script>
	$(function(){

		$('.member-search-bar li:nth-child(2)').css('background','#fdf4d1')
		
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
		<h2>Staff<span>Mypage</span></h2>
	</div>
	
	<section>
		<div class="staff-container">
			<ul class="search-bar member-search-bar">
				<li><h3>마이 페이지</h3></li>
				<li><a href="/admin/staff/mypage?staff_id=${staff.staff_id}" >기본정보</a></li>
				<li><a href="/admin/confirm/pwdConfirm?staff_id=${staff.staff_id}" >회원정보 수정</a></li>
				<li><a href="/admin/confirm/pwdModify?staff_id=${staff.staff_id}" >비밀번호 변경</a></li>
				<li><a href="/admin/confirm/deleteConfirm?staff_id=${staff.staff_id}" >회원 탈퇴</a></li>
			</ul>
	
			<ul class="mb-profile">
				<li></li>
				<li><h4 class="mb-register-id">사번 : ${staff.staff_id }</h4></li>
			</ul>
	
	
			<ul class="mb-adm-register mb_adm_mypage">
				<li><h4 class="mb-register-id" >사번 : ${staff.staff_id }</h4></li>
				<li><p>이름 : ${staff.staff_name }</li>
				<li><p>전화번호 : ${staff.staff_phone }</li>
				
				<c:if test = "${staff.staff_department == 1}">
				<li><p>부서 : 구매</li>
				</c:if>
				<c:if test = "${staff.staff_department == 2}">
				<li><p>부서 : 대출</li>
				</c:if>
				<c:if test = "${staff.staff_department == 3}">
				<li><p>부서 : 인사</li>
				</c:if>
				<li>
					<a href="/">홈</a>
				</li>
			</ul>
		</div>
	</section>


<%@ include file="../../includes/footer.jsp" %>










