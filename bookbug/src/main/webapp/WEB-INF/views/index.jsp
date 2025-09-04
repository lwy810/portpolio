<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<%@include file="includes/header.jsp" %>
<link rel="stylesheet" href="../resources/css/index.css">

<script>
	$(function () {
		$(window).load(function () {
			$('.flexslider').flexslider({
				animation: "slide"
			});
		});
	});
</script>

    <div class="flexslider">
      <ul class="slides">
        <li>
          <div class="main-bg main-bg-1">
            <div class="main-contents">
              <h3><span>Y</span>our Passport to <span>I</span>nfinite Worlds</h3>
              <p><span>Open</span> a Book, <span>Open Your</span> Mind</p>
            </div>
          </div>
        </li>
        <li>
          <div class="main-bg main-bg-2">
            <div class="main-contents">
              <h3><span>A</span> journey of a <span>T</span>housand Words</h3>
              <p><span>R</span>ead, <span>D</span>ream, <span>Repeat</span></p>
            </div>
          </div>
        </li>
        <li>
          <div class="main-bg main-bg-3">
            <div class="main-contents">
              <p><span>Your</span> Best <span>Investment</span></p>
              <h3><span>U</span>nleash Your <span>I</span>magination</h3>
            </div>
          </div>
        </li>
        <li>
          <div class="main-bg main-bg-4">
            <div class="main-contents">
              <h3><span>R</span>eaders are <span>L</span>eaders</h3>
              <p><span>R</span>ead, <span>L</span>earn, <span>Grow</span></p>
            </div>
          </div>
        </li>
      </ul>
    </div>
	
	<ul class="btn-group">
		<li><a href="/ebook" class="main-btn">E-Book</a></li>
		<li><a href="/support" class="main-btn">Support</a></li>
		<li><a href="/culture" class="main-btn">Culture</a></li>
		<li><a href="#" class="main-btn">Information</a></li> 
	</ul>
</body>
</html>