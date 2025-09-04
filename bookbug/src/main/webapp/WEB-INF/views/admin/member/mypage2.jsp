<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../includes/admin-header.jsp" %>
<script src="/resources/js/adm-script.js"></script>
<link rel="stylesheet" href="/resources/css/admin/member.css">

<script>
	$(function(){
		var female = $('#female').val();
		var male = $('#male').val();
		var transPrefer = "${member.member_prefer}".toString();
		var arrPrefer =  transPrefer.split('');
		
		$('.member-search-bar li:nth-child(2)').css('background','#fdf4d1')
		
		for (var i=0; i<arrPrefer.length; i++) {
			if (arrPrefer[i] == 1) {
				$('#mb-pf-'+i).attr('checked',true)
			} else {
				$('#mb-pf-'+i ).next().css('display','none')
			}
		}
		$('.mb-adm-register li label')
	});
	
</script>
<style>
	.mb-adm-register li:nth-child(5) {display:flex;}
	.mb-prefer {background:skyblue; margin:0 4px;}
</style>

	<div class="bn bn-admin-register">
		<h2>Member<span>Mypage</span></h2>
	</div>
	
	<section>
		<div class="member-container">
			<ul class="search-bar member-search-bar">
				<li><h3>마이 페이지</h3></li>
				<li><a href="/admin/member/mypage?member_id=${member.member_id}" >기본정보</a></li>
				<li><a href="/admin/confirm/pwdConfirm?member_id=${member.member_id}" >회원정보 수정</a></li>
				<li><a href="/admin/confirm/pwdModify?member_id=${member.member_id}" >비밀번호 변경</a></li>
				<li><a href="/admin/confirm/deleteConfirm?member_id=${member.member_id}" >회원 탈퇴</a></li>
			</ul>

			<ul class="mb-profile">
				<li></li>
				<li><h4 class="mb-register-id">아이디 : ${member.member_id }</h4></li>
			</ul>
	
			<ul class="mb-adm-register">
				<li><p>이름 : ${member.member_name }</li>
				<li><p>전화번호 : ${member.member_phone }</li>
				<li><p>선호 장르</p></li>
				<li>
					<input type="checkbox" id="mb-pf-0" name="member_prefer" value="SF소설" class="mb-prefer"  onClick="return false">
					<label for="mb-pf-0">SF</label>
					<input type="checkbox" id="mb-pf-1" name="member_prefer" value="역사" class="mb-prefer"onClick="return false">
					<label for="mb-pf-1">역사</label>
					<input type="checkbox" id="mb-pf-2" name="member_prefer" value="비문학" class="mb-prefer" onClick="return false">
					<label for="mb-pf-2">비문학</label>
					<input type="checkbox" id="mb-pf-3" name="member_prefer" value="만화" class="mb-prefer"onClick="return false">
					<label for="mb-pf-3">만화</label>
					<input type="checkbox" id="mb-pf-4" name="member_prefer" value="실용" class="mb-prefer"onClick="return false">
					<label for="mb-pf-4">실용</label>
				</li>
				<li>
					<a href="/admin/member/advice/register" class="suggest-btn">문의하기</a>
					<a href="/admin/member/advice/mylist?advice_client=${member.member_name }&num=1" class="suggest-btn">문의목록</a>
				</li>
				<h5>Welcome to <span>B.Bug</span></h5>
			</ul>
		</div>
		
	</section>


<%@ include file="../../includes/footer.jsp" %>





