<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BookBug</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
<link href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css" rel="stylesheet">
<!--font-family: 'SUIT', sans-serif;-->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
<!--font-family: "Playfair Display", serif;-->
<link rel="stylesheet" href="/resources/css/reset.css">
<link rel="stylesheet" href="/resources/css/common.css">
<link rel="stylesheet" href="/resources/flexSlider/css/flexslider.css">
<link rel="stylesheet" href="/resources/flexSlider/css/fs-slide.css">
<script src="/resources/js/jquery-1.12.4.min.js"></script>
<script src="/resources/flexSlider/js/jquery.flexslider.js"></script>
<script src="/resources/js/common-script.js"></script>
<script>
	var session_member_id = "${member.member_id}"
	var session_staff_id = "${staff.staff_id}"

	if (session_member_id == '' && session_staff_id == '') {
		location.href="/"
	} 

</script>

</head>
<body>
    <header>
        <nav>
	        <div class="test">
	            <h1><a id="logo" href="/"><span>B.B</span>ug</a></h1>
	            <a href="#" id="trigger"><i class="bi bi-list"></i><i class="bi bi-x-lg"></i></a>
			</div>
             <c:if test="${member == null and staff == null  }">
            <ul class="main-menu">
                <li><a href="/ebook">E-Service</a>
                <li><a href="/support">Support</a>
                <li><a href="/culture">Culture</a>
                <li><a href="/board/list?num=1">Information</a><div class="menu-bar"></div></li>
            </ul>
            </c:if>
            
            <c:if test="${member != null or staff != null}">
            <ul class="main-menu main-menu-1">
            	<li><a href="/ebook">E-Service</a><div class="menu-bar"></div></li>
                <li><a href="/support">Support</a><div class="menu-bar"></div></li>
                <li><a href="/culture">Culture</a><div class="menu-bar"></div></li>
                <li><a href="/board/list?num=1">Information</a><div class="menu-bar"></div></li>
                <li>
                	<div class="header-switch">
                		<div class="switch"></div>
                	</div>
                </li>
                </ul>

				<ul class="main-menu main-menu-2 active">
	                <li>
	                	<a href="#">Member</a>
	                	<div class="menu-bar"></div>
						<ul class="sub-menu">
							<c:if test="${member == null and staff.staff_id eq 'admin'}">
							<li><a href="/admin/staff/list?num=1">직원 목록</a></li>
							</c:if>
							<c:if test="${member == null and staff != null}">
							<li><a href="/admin/member/list?num=1">회원 목록</a></li>
	                		<li><a href="/admin/member/suggestion/list?num=1">희망 도서</a></li>
	                		</c:if>
	                		<c:if test="${member != null and staff == null}">
	                		<li><a href="/admin/member/suggestion/mylist?num=1&suggestion_proposer=${member.member_id}">희망 도서</a></li>
	                		</c:if>
						</ul>	
	                </li>
	                <li>
	                	<a href="/book/search">Book</a>
	                	<div class="menu-bar"></div>
	                	<ul class="sub-menu">
	                		<c:if test="${member == null or staff != null}">
	                		<li><a href="/book/register" >도서 등록</a></li>
	                		<li><a href="/book/list?num=1" >도서 목록</a></li>
	                		</c:if>
							<li><a href="/book/subject-search?category_depth_1=총류" >주제별 검색</a></li>
	                		<li><a href="/book/new-book?num=1&registerPeriod=oneMonth&book_category=all">신작 도서</a></li>
	                		<li><a href="/book/borrow-best?num=1&registerPeriod=oneMonth&book_category=all">대출 베스트</a></li>
	                	</ul>
	               	</li>
	                <li>
	                	<a href="/board/list?num=1">Board</a>
	                	<div class="menu-bar"></div>
	                	<ul class="sub-menu">
	                		<li><a href="/board/notice/list?num=1">공지사항</a></li>
	                		<c:if test="${member != null and staff == null}">
	                		<li><a href="/admin/member/advice/mylist?num=1&advice_client=${member.member_id }">1:1 문의</a></li>
	                		</c:if>
	                		<c:if test="${member == null and staff != null}">
	                		<li><a href="/admin/member/advice/list?num=1">1:1 문의</a></li>
	                		</c:if>
	                	</ul>
	               </li>
	               <c:if test="${member == null and staff != null}">
	               <li>
	               		<a href="">Borrow</a>
	               		<div class="menu-bar"></div>
		                <ul class="sub-menu">
	                		<li><a href="/admin/borrow/register">대출 신청</a></li>
	                		<li><a href="/admin/borrow/list?num=1">대출 목록</a></li>
	                	</ul>
	                </li>
	                </c:if>
	                <c:if test="${member != null and staff == null}">
	                <li>
						<a href="/admin/member/mylibrary/borrow_current_list?num=1&member_id=${member.member_id}">My Library</a>
	               		<div class="menu-bar"></div>
		                <ul class="sub-menu">
	                		<li><a href="/admin/member/mylibrary/borrow_current_list?num=1&member_id=${member.member_id}">도서 이용정보</a></li>
	                		<li><a href="/admin/member/mylibrary/interested_book_card?num=1&member_id=${member.member_id}">나만의 책장</a></li>
	                	</ul>
	                </li>
	                </c:if>
	                <li>
	                	<div class="header-switch">
	                		<div class="switch"></div>
	                		<input type="hidden" name="switch_value" value="">
	                	</div>
	                </li>
	            </ul>
	       	</c:if>


			<c:if test="${member == null and staff == null}">
            <ul class="top-menu">
                <li><a href="/admin/confirm/login"><span>로그인</span><i class="bi bi-person-fill"></i></a></li>
            </ul>
            </c:if>
            <c:if test="${member != null  and staff == null }">
            <ul class="top-menu">
                <li><a href="/admin/confirm/logout"><span>로그아웃</span><i class="bi bi-box-arrow-right"></i></a></li>
                <li><a href="/admin/member/mypage?member_id=${member.member_id }"><span>마이 페이지</span><i class="bi bi-person"></i></a></li>
            </ul>
            </c:if>
            <c:if test="${member == null  and staff != null }">
            <ul class="top-menu">
                <li><a href="/admin/confirm/logout"><span>로그아웃</span><i class="bi bi-box-arrow-right"></i></a></li>
                <li><a href="/admin/staff/mypage?staff_id=${staff.staff_id }"><span>마이 페이지</span><i class="bi bi-person"></i></a></li>
            </ul>
            </c:if>
            
            
            
            
        </nav>
    </header> 
