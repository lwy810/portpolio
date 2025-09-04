<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../includes/header.jsp" %>
<link rel="stylesheet" href="/resources/css/admin/member.css">
<script>
	$(function(){
		$('#memberIdCheckBtn').click(function(){
			var query = {member_id: $('#member_id').val()};
			console.log(query);
			
			$.ajax({
				url:'/admin/member/memberIdCheck',
				type:'post',
				data:query,
				
				success:function(data){
					var member_id = $('#member_id').val();
					if (data === 'success'){
						alert("이미 존재하는 아이디입니다.");
						$('#member_id').focus();
						$('#memberRegister-btn').attr('disabled', 'disabled');
					} else if (member_id == ''){
						alert("아이디를 입력하세요.");
						$('#member_id').focus();
						$('#memberRegister-btn').attr('disabled', 'disabled');
					} else {
						alert('사용가능한 아이디입니다.');
						$('#member_id').addClass('click');
						$('#memberRegister-btn').removeAttr('disabled');
					}
				}
			});
		});
	});
	
</script>

	<div class="bn bn-admin-register">
		<h2>Member <span>Register</span></h2>
	</div>

	<section>
		<form name="registerFrm" action="/admin/member/register" method="post">
			<ul class="mb-adm-register mb-member-register">
				<li>
					<input type="text" id="member_id" name="member_id" placeholder="아이디 입력" class="input-frm" required autofocus>
					<button type="button"  id="memberIdCheckBtn" class="btn btn-public">아이디 중복 검사</button>
				</li>
				<li><input type="password" name="member_pwd" placeholder="비밀번호 입력" required></li>
				<li><input type="text" name="member_name" placeholder="이름 입력" required></li>
				<li>
					<input type="radio" id="female" name="member_gender" value="여성" checked>
					<label for="female">female</label>
					<input type="radio" id="male" name="member_gender" value="남성">
					<label for="male">male</label>
				</li>
				<li><input type="tel" name="member_phone" placeholder="전화번호 입력" required></li>
				<li><p>생년월일 : </p> <input type="date" name="member_birthday" placeholder="생년월일"></li>
				<li>
					<input type="text" name="member_zipcode" placeholder="우편번호" class="input-frm" readonly>
					<button type="button" onclick="getZipcode()" class="btn btn-public">주소 검색</button>
				</li>
				<li><input type="text" name="member_address" placeholder="상세 주소"></li>
				<li>
					<input type="checkbox" id="mb-pf-1" name="member_prefer" value="SF소설" class="mb-prefer" >
					<label for="mb-pf-1">SF</label>
					<input type="checkbox" id="mb-pf-2" name="member_prefer" value="역사" class="mb-prefer">
					<label for="mb-pf-2">역사</label>
					<input type="checkbox" id="mb-pf-3" name="member_prefer" value="비문학" class="mb-prefer">
					<label for="mb-pf-3">소설</label>
					<input type="checkbox" id="mb-pf-4" name="member_prefer" value="만화" class="mb-prefer">
					<label for="mb-pf-4">만화</label>
					<input type="checkbox" id="mb-pf-5" name="member_prefer" value="실용" class="mb-prefer">
					<label for="mb-pf-5">실용</label>
				</li>
				<li>
					<button type="submit" id="memberRegister-btn" class="btn btn-register">회원 등록</button>
				</li>
			</ul>
		</form>
	</section>




<%@ include file="../../includes/footer.jsp" %>










