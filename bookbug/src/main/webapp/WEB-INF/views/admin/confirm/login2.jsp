<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="../../includes/header.jsp" %>
<link rel="stylesheet" href="/resources/css/admin/member.css">
<script>
	function myStaffPwd(){
		let staff_pwd = document.getElementById('staff_pwd').value;
		
		if (staff_pwd != null) {
			$('.staff-eye-slash').css('display','inline');
			$('.staff-pwd-x').css('display','inline');
		}
	}
	
	function myStaffId(){
		let staff_id = document.getElementById('staff_id').value;
		
		if (staff_id != null) {
			$('.staff-id-x').css('display','inline');
		}
	}
	
	function myMemberPwd(){
		let member_pwd = document.getElementById('member_pwd').value;
		
		if (member_pwd != null) {
			$('.member-eye-slash').css('display','inline');
			$('.member-pwd-x').css('display','inline');
		}
	}
	
	function myMemberId(){
		let member_id = document.getElementById('member_id').value;
		
		if (member_id != null) {
			$('.member-id-x').css('display','inline');
		}
	}
	

	$(function(){
	 	$('.staff-eye-slash').click(function(){
	 		$('input[name="staff_pwd"]').attr('type','text');
	 		$(this).css('display','none');
	 		$('.staff-eye').css('display','inline');
	 	})
	 	
	 	$('.staff-eye').click(function(){
	 		$('input[name="staff_pwd"]').attr('type','password');
	 		$(this).css('display','none');
	 		$('.staff-eye-slash').css('display','inline');
	 	})
	 	
	 	$('.staff-pwd-x').click(function(){
	 		$('input[name="staff_pwd"]').val('');
	 	})
	 	
	 	$('.staff-id-x').click(function(){
	 		$('input[name="staff_id"]').val('');
	 	})
	 	
	 	
	 	$('.member-eye-slash').click(function(){
	 		$('input[name="member_pwd"]').attr('type','text');
	 		$(this).css('display','none');
	 		$('.member-eye').css('display','inline');
	 	})
	 	
	 	$('.member-eye').click(function(){
	 		$('input[name="member_pwd"]').attr('type','password');
	 		$(this).css('display','none');
	 		$('.member-eye-slash').css('display','inline');
	 	})
	 	
	 	$('.member-pwd-x').click(function(){
	 		$('input[name="member_pwd"]').val('');
	 	})
	 	
	 	$('.member-id-x').click(function(){
	 		$('input[name="member_id"]').val('');
	 	})

	});
</script>



	<div class="bn bn-admin-login">
		<h2>welcome to <span>B.Bug</span></h2>
	</div>

	<section>
		<div class="tabs">
			<input type="radio" name="tabs" id="tab-member" checked>
			<label for="tab-member">Member</label>
			<input type="radio" name="tabs" id="tab-staff" >
			<label for="tab-staff">Staff</label>
			
					
			<div class="login-wrap">
			
				<div class="staff-wrap">
				<form name="staff-login-frm" id="login-sf-frm" action="/admin/confirm/staffLogin" method="post">
					<ul class="mb-login-staff">
						<li><h3>For Staff</h3></li>
						<li>
							<input type="text" name="staff_id" id="staff_id"  oninput="myStaffId()"placeholder="Account" class="input-frm" autofocus required>
							<span><i class="bi bi-plus-circle staff-id-x"></i></span>
						</li>
						<li>
							<input type="password" name="staff_pwd" id="staff_pwd" oninput="myStaffPwd()" placeholder="Password" class="input-frm" required>
							<span><i class="bi bi-eye-fill staff-eye"></i><i class="bi bi-eye-slash-fill staff-eye-slash"></i><i class="bi bi-plus-circle staff-pwd-x"></i></span>
						</li>
						<li>
						<button type="submit" class="btn btn-public">Staff Login</button>
						<a href="/admin/staff/register" class="btn btn-private">Staff Register</a>
						</li>
					</ul>
				</form>
				<c:if test="${staff_pwd == false}"><p class="cf-msg">※ 사원 번호는 맞으나 비밀번호가 틀려 로그인에 실패했습니다.</p></c:if>
				<c:if test="${staff_id == false}"><p class="cf-msg">※ 사원 번호가 틀려 로그인에 실패했습니다.</p></c:if>
				</div>
				
				<div class="member-wrap">
				<form name="member-login-frm" id="login-mb-frm" action="/admin/confirm/login" method="post">
					<ul class="mb-login-member">
						<li><h3>For Member</h3></li>
						<li>
							<input type="text" name="member_id" id="member_id" placeholder="Account" oninput="myMemberId()" class="input-frm" autofocus required>
							<span><i class="bi bi-plus-circle member-id-x"></i></span>
						</li>
						<li>
							<input type="password" name="member_pwd" id="member_pwd" placeholder="Password" oninput="myMemberPwd()" class="input-frm" required>
							<span><i class="bi bi-eye-fill member-eye"></i><i class="bi bi-eye-slash-fill member-eye-slash"></i><i class="bi bi-plus-circle member-pwd-x"></i></span>
						</li>
						<li>
							<button type="submit" class="btn btn-public">User Login</button>
							<a href="/admin/member/register" class="btn btn-private">User Register</a>
						</li>
					</ul>
				</form>
				
					<div class="cf-msg-wrap">
					<c:if test="${member_pwd == false}"><p class="cf-msg">※ 아이디는 맞으나 비밀번호가 틀려 로그인에 실패했습니다.</p></c:if>
					<c:if test="${member_id == false}"><p class="cf-msg">※ 아이디가 틀려 로그인에 실패했습니다.</p></c:if>
					
					<c:if test="${staff_pwd == false}"><p class="cf-msg">※ 사원 번호는 맞으나 비밀번호가 틀려 로그인에 실패했습니다.</p></c:if>
					<c:if test="${staff_id == false}"><p class="cf-msg">※ 사원 번호가 틀려 로그인에 실패했습니다.</p></c:if>
					</div>
				
				</div>
			</div>
		</div>
	</section>


