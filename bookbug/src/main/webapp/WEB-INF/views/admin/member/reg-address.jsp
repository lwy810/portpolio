<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="/resources/css/admin/adm-reset.css">
<link rel="stylesheet" href="/resources/css/admin/member.css">
<script src="/resources/js/adm-script.js"></script>
<script>
	function getAddress(zipcode, area1, area2, area3, area4) {
		var address = area1+' '+area2+' '+area3+' '+area4;
		opener.document.registerFrm.member_zipcode.value = zipcode;
		opener.document.registerFrm.member_address.value = address;
		self.close();
	}
</script>    
<meta charset="UTF-8">
<title>주소등록</title>
</head>
<body>
 <p>우편번호 페이지</p>
 <form action="/admin/member/reg-address" method="post">
 	<ul class="zipcode-wrap">
 		<li><input type="search" name="area3" placeholder="동을 적으세요." class="area3" required autofocus></li>
 		<li><button type="submit" class="btn btn-register">검색</button></li>
 		<li><a href="" onclick="self.close()" class="btn btn-private">닫기</a></li>
 	</ul>
 
 </form>
 
 <div class="address-wrap">
<c:forEach items="${avoList }" var="address">	
 <p><a href="javascript:getAddress('${address.zipcode }', '${address.area1 }', '${address.area2 }','${address.area3 }', '${address.area4 }')">
 	${address.zipcode }, ${address.area3 }, ${address.area2 }, ${address.area3 }, ${address.area4 } 
 </a></p>
 </c:forEach>
 </div>
 

 
 