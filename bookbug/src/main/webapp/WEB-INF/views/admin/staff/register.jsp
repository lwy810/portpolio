<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../includes/header.jsp" %>
<link rel="stylesheet" href="/resources/css/admin/member.css">
<script src="/resources/js/register.js"></script>

	<div class="bn bn-admin-register">
		<h2>staff <span>register</span></h2>
	</div>
	
	<section>
		<form name="registerFrm" action="/admin/staff/register" method="post">
			<ul class="mb-adm-register sa-adm-register">
				<li><input type="text" id="staff_id" name="staff_id" placeholder="아이디" class="input-frm" required></li>
				<li><input type="password" name="staff_pwd" placeholder="비밀번호" required></li>
				<li>
					<p class="staff_id_empty"></p>
					<p class="staff_pwd_empty"></p>
				</li>
				<li>
					<input type="radio" id="female" name="staff_gender" value="여성" checked>
					<label for="female">여성</label>
					<input type="radio" id="male" name="staff_gender" value="남성">
					<label for="male">남성</label>
				</li>
				<li><input type="text" name="staff_name" placeholder="이름" required></li>
				<li><input type="tel" name="staff_phone" placeholder="전화번호"></li>
				<li>
					<p class="staff_name_empty"></p>
					<p class="staff_phone_empty"></p>
				</li>
				<li><input type="date" name="staff_birthday" placeholder="생년월일"></li>
				<li><input type="number" name="staff_level" placeholder="등급 레벨"></li>
				<li><input type="number" name="staff_department" placeholder="부서"></li>
				<li>
					<p class="staff_birthday_empty"></p>
					<p class="staff_level_empty"></p>
					<p class="staff_department_empty"></p>
				</li>

				<li>
					<button type="submit" id="register-btn" class="btn btn-register">직원 등록</button>
				</li>
			</ul>
		</form>
	</section>




<%@ include file="../../includes/footer.jsp" %>










