<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="../includes/header.jsp" %>
<link rel="stylesheet" href="/resources/css/admin/gettoknow.css">

<div class="bn bn-bookbug-gettoknow">
	<h2>welcome to <span>B.Bug's story</span></h2>
</div>

<section>
<div class="tabs">
	<input type="radio" name="tabs" id="tab-intro" checked>
	<label for="tab-intro">북버그소개</label>
	<input type="radio" name="tabs" id="tab-history">
	<label for="tab-history">북버그의 발전과정</label>
	<input type="radio" name="tabs" id="tab-policy">
	<label for="tab-policy">북버그 정책</label>
	<input type="radio" name="tabs" id="tab-primary-feature">
	<label for="tab-primary-feature">북버그의 메인기능</label>
	<input type="radio" name="tabs" id="tab-findus">
	<label for="tab-findus">북버그 위치</label>
			
	<div class="gettoknow-wrap">
		<div class="intro">
			<h3><span>북버그</span></h3>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae orci semper, aliquet justo in, porta neque. Cras pulvinar aliquam erat. Suspendisse potenti. Integer commodo vulputate quam non vehicula. Nullam vehicula, sem in maximus tempor, lorem massa pellentesque mauris, sed ullamcorper felis orci ac nulla. Vivamus consequat ante et est tempor, sed mattis sapien sollicitudin. In auctor leo tincidunt lacus semper iaculis. Sed vehicula sed velit ut placerat. Integer laoreet a dui eget luctus. In eu lorem dapibus, tincidunt lacus ut, tincidunt odio. Etiam rhoncus, justo vitae sollicitudin efficitur, massa urna iaculis tortor, iaculis tempor tellus magna nec mauris. Aliquam erat volutpat. Fusce vitae sem nec ligula vestibulum bibendum.
		</p>
		</div>
		
		<div class="history">
			<h3><span>북버그의 발전 과정</span></h3>
			<ul>
				<li><p>2024.07</p><span>이젠 아카데미 풀스택 개발자 과정 시작</span></li>
				<li><p>2024.08</p><span>프로젝트 조 편성</span></li>
				<li><p>2024.09</p><span>시안 작성</span></li>
				<li><p>2024.10</p><span>정적페이지 및 동적 기능 구현</span></li>
				<li><p>2024.11</p><span>검토 및 발표 준비</span></li>
				<li><p>2024.12</p><span>발표 리허설 및 프로젝트 종료</span></li>
			</ul>
		</div>
		<div class="policy">
			<h3><span>북버그 정책</span></h3>
			<p><img src="/resources/imgs/support/gettoknow/rb_1705-2.png">독자가 원하는 어떤 곳에서든 어느 기기를 통해서든 독서할 수 있습니다.<img src="/resources/imgs/support/gettoknow/rb_1705-3.png"></p>
		</div>
		<div class="primary-feature">
			<h3><span>북버그 메인 기능</span></h3>
			<p>북버그는 편리하고 편안하게 집에서 독서하는 과정을 줄여 쉽게 독서를 접할 수 있게 하고싶은 아이디어에서 시작 되었습니다. 그 중 가장 중요한 기능이 도서의 정보를 단순한 상품의 스펙보다 가치있는 정보를 제공하기 위해 만들어졌습니다. 그 기능이 바로 '도서 검색'이고 이것을 마리아db의 heidiSQL를 사용해서 매퍼에서 CRUD를 구현해냈습니다. 바로 그 다음이 도서정보이고 철저히 사용자 입장에서 고민해보았습니다. 스프링의 의존성 주입을 하여 페이지에 공통으로 들어가는 헤더를 활용하여 독자가 1클릭으로 원하는 정보를 찾을 수 있게끔 하였습니다. 그리고 도서 정보는 직접 읽지 않으면 그 정보에 대해 접근하기 어려워 커뮤니티 즉 게시판을 구현하여 독자들이 적극적으로 후기를 남기고 소통할 수 있기를 바랐습니다. 또 대여시스템이 없다면 아무리 좋은 정보를 접하더라도 아무 의미가 없을 것입니다. 직접 온라인으로 대여하기도 하지만 직접 받으러 올 경우일 때도 대여할 수 있도록 관리자 기능에 대여가능하도록 하였습니다. 
			또한 '희망도서신청'은 독자들이 찾아내지 못한 책을 직접 신청하여 '신청 ▶ 접수 ▶ 구매 ▶ 소장'이거나 이미  구매중일 경우에는 '취소'를 통해 신청인이 상황을 빠르게 확인 할 수있습니다.</p>
		</div>
		<div class="findus">
		<h3><span>북버그 위치</span></h3>
		<p><img src="/resources/imgs/support/gettoknow/rb_1705-2.png">여러분이 필요한 순간 어느 곳,
		어떤 기기를 통해서든 찾을 수 있습니다.<img src="/resources/imgs/support/gettoknow/rb_1705-3.png"></p>
		</div>
	</div>
</div>
<div class="gettoknow-btn">
	<a href="/book/search" class="btn btn-default">도서 검색</a>
	<a href="/board/list?num=1" class="btn btn-default">커뮤니티</a>
	<a href="/admin/member/suggestion/register" class="btn btn-default">희망 도서 신청하러 가기</a>
</div>
</section>
<%@ include file="../includes/footer.jsp" %>


