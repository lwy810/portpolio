<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../includes/admin-header.jsp" %>
<script src="/resources/js/adm-script.js"></script>
<script src="/resources/ckeditor/ckeditor.js"></script>
<link rel="stylesheet" href="/resources/css/admin/notice.css">
<script>
 $(function(){
	$('#delete-notice').click(function(){
		if(confirm('정말 삭제하시겠습니까?')==true){
			$(this).attr('href', '/board/notice/delete?notice_no=${notice.notice_no }&num=${num }');
		}
	}); 
	
		
 });
</script>
	<div class="bn bn-notice-view">
		<h2>notice <span>view</span></h2>
	</div>
	
	<section>

		<c:if test="${member!=null or staff!=null}">
		<div class="mb-notice-view">
		
			<table>
				<tr>
					<td><label>등록번호</label></td><td>${notice.notice_no}</td>
					<td><label>분류</label></td><td>${notice.notice_type }</td>
				</tr>
				<tr>
					<td><label>등록일</label></td><td><fmt:formatDate value="${notice.notice_reg_date }" pattern="yyyy-MM-dd"/> </td>
					<td><label>작성자</label>	</td><td>${notice.notice_writer}(${member.member_name })</td>
				</tr>
				<tr>
					<td><label>제목</label></td><td colspan="3">${notice.notice_title }</td>
					
				</tr>
				<tr>
					<td colspan="4">
					<c:if test="${notice.notice_thumbnail != null }">
						<div class="mb-notice-img">
							<h5>이미지 파일 첨부</h5>
							<img id="img" src="/libraryUploadImg/${notice.notice_thumbnail}">
							<div class="bigImg"><img src="/libraryUploadImg/${notice.notice_thumbnail}"></div>
							<div class="bg"></div>
						</div>
					</c:if>
					</td>
				</tr>
				<tr><td colspan="4"><label>내용</label></td></tr>
				<tr><td colspan="4">${notice.notice_content }</td></tr>
			</table>
			
			<div class="viewBtn">
				<c:if test="${staff!=null and member==null }">
				<a href="/board/notice/update?notice_no=${notice.notice_no }&num=${num }" class="btn btn-default center">수정하기</a>
				<a id="delete-notice" href="" class="btn btn-default center">삭제하기</a>
				</c:if>
				
				<c:if test="${staff!=null or member!=null }">
				<a href="/board/notice/list?num=${num }" class="btn btn-default center">목록</a>
				</c:if>
			</div>
		</div>
		</c:if>
	</section>


<%@ include file="../../includes/footer.jsp" %>










