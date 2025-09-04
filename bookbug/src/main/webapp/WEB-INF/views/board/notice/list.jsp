<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../includes/admin-header.jsp" %>
<script src="/resources/js/adm-script.js"></script>
<link rel="stylesheet" href="/resources/css/admin/notice.css">
<script>
	$(function(){
		
		$('#search-btn').click(function(){
		 	var searchType = $('#searchType').val();
		 	var keyword = $('#keyword').val();
			location.href="/board/notice/list?searchType="+searchType+"&keyword="+keyword+"&num=${select}";		 	
		});
		
	
	});
</script>
	<div class="bn bn-notice-list">
		<h2>notice <span>list</span></h2>
	</div>
	
	<section>
		<c:if test="${member!= null or staff!=null }">
		<div class="noticeCnt">공지사항 : 
		<c:if test="${!empty ntList}">${page.count } 건 </c:if>
		<c:if test="${empty ntList}">0 건</c:if>
		</div>
		
		<div class="searchbox">
			<select name="searchType" id="searchType">
				<option value="title">제목</option>
				<option value="type">분류</option>
				<c:if test="${staff.staff_id != null }">
				<option value="writer">작성자</option>
				</c:if>
				<option value="content">내용</option>
			</select>
			<input type="search" id="keyword" name="keyword"> 
			<button id="search-btn" type="button" class="btn btn-register">검색</button>
		</div>
		
		
		<div class="mb-notice-list">
			<c:if test="${empty ntList}">
			<p class="null_msg">검색된 게시물이 없습니다.</p>
			</c:if>
			<c:forEach items="${ntList }" var="notice" varStatus="status">
			<table>
			<tr>
				<th>번호</th>
				<th>분류</th>
				<c:if test="${staff.staff_id != null }">
				<th>작성자</th>
				</c:if>
				<th>제목</th>
				<th>수정일</th>
				<th>등록일</th>
			</tr>
		
			<tr>
				<td><input type="text" id="notice_no" name="notice_no" value="${notice.notice_no}" readonly></td>
				<td>${notice.notice_type}</td>
				<c:if test="${staff.staff_id != null }">
				<td>${notice.notice_writer}</td>
				</c:if>
				<td><strong>${notice.notice_title}</strong></td>
				<td><fmt:formatDate value="${notice.notice_up_date}" pattern="yyyy-MM-dd"/></td>
				<td><fmt:formatDate value="${notice.notice_reg_date}" pattern="yyyy-MM-dd"/></td>
			</tr>
			<c:if test="${notice.notice_thumbnail != null }">
			<tr>
				<td colspan="6">
					<div class="mb-notice-img">
					<img id="img${status.index }" src="/libraryUploadImg/${notice.notice_thumbnail}">
					<div class="bigImg${status.index }"><img src="/libraryUploadImg/${notice.notice_thumbnail}"></div>
					<div class="bg${status.index }"></div>
					</div>
				<script>
				$('.bigImg${status.index }').css('display', 'none');
				
				$('#img${status.index }').click(function(){
					$('.bigImg${status.index }').css('display','block');
					$('.bg${status.index }').css('display', 'block');
				});
				$('.bigImg${status.index }').click(function(){
					$('.bigImg${status.index }').css('display','none');
					$('.bg${status.index }').css('display', 'none');
				});
				</script>
				<style>
					#img {width:15%; cursor:pointer;}
					.bigImg${status.index } {display:none; width:100%; height:100%;}
					.bigImg${status.index } > img {width:30%; position:fixed; left:50%; top:50%; transform:translate(-50%,-50%); cursor:pointer; z-index:11;}
					.bg${status.index } {
						display:none; position: fixed; top:0; left:0; width:100vw; height:100vh; 
						background:rgba(0,0,0,0.5); backdrop-filter: blur(5px); z-index: 9; 
					}
				</style>
				</td>
			</tr>
			</c:if>
			<tr>
				<td colspan="6">
				<div class="content">${notice.notice_content}</div>
				</td>
			</tr>
			<tr>
				<td colspan="6">
				<div class="viewBtn">
					<c:if test="${staff!=null and member==null }">
					<a href="/board/notice/update?notice_no=${notice.notice_no }&num=${select}" class="btn btn-default center">수정하기</a>
					<a href="" class="btn btn-default center ${status.index }delete">삭제하기</a>
					</c:if>
				</div>
				</td>
			</tr>
		</table>
		
		<script>
			$('.${status.index }delete').click(function(){
				if(confirm('정말 삭제하시겠습니까?')==true){
					$('.${status.index }delete').attr('href', '/board/notice/delete?notice_no=${notice.notice_no }&num=${select }');
				}
			}); 
		</script>
		</c:forEach>
		</div>
		
		<%-- Page 객체(DTO)를 사용한 페이징 처리 --%>
		<ul class="pagenation">
			<c:if test="${page.prev}">
			<li><a href="/board/notice/list?num=${page.startPageNum - 1}" class="prev"><i class="bi bi-chevron-left"></i></a></li>
			</c:if>
			
			
			
			<c:if test="${!empty ntList}">
			<%-- 페이지 번호 버튼 --%>
			<c:forEach begin="${page.startPageNum}" end="${page.endPageNum}" var="num">
			<li>
				<c:if test="${select != num}">
				<a href="/board/notice/list?num=${num}${page.searchTypeKeyword}">${num}</a>
				</c:if>
				<c:if test="${select == num}">
				<a href="/board/notice/list?num=${num}${page.searchTypeKeyword}" class="active">${num}</a>
				</c:if>
			</li>
			</c:forEach>
			
			<c:if test="${page.next}">
			<li><a href="/board/notice/list?num=${page.endPageNum + 1}" class="next"><i class="bi bi-chevron-right"></i></a></li>
			</c:if>
			</c:if>
		</ul>
		</c:if>
		
		<div class="registerBtn">
			<c:if test="${staff.staff_id != null }">
				<a href="/admin/borrow/register" class="btn btn-default">대출입력하기</a>
				<a href="/admin/member/advice/list?num=1" class="btn btn-default">1:1문의 답변하기</a>
				<a href="/board/notice/register" class="btn btn-public register-btn">새로운 공지사항 작성하기</a>
			</c:if>	
		</div>
		
	</section>


<%@ include file="../../includes/footer.jsp" %>









