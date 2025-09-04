<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ include file="../includes/admin-header.jsp" %>
	<link rel="stylesheet" href="/resources/css/admin/board.css">
	<script src="/resources/ckeditor/ckeditor.js"></script>
	<script>
		$(function(){
			$('.view-content img').removeAttr('style');
			
			$('#board-delete').click(function(){
				if (confirm('정말 삭제하시겠습니까?') == true) {
					$('#board-delete').attr('href', '/board/delete?article_num=${bvo.article_num}&num=${num}');
				}
			});
			
						
		<%--	$('#replyDelBtn').click(function(){
				if (confirm('정말 댓글을 삭제하시겠습니까?') == true) {
					$('#replyDelBtn').attr('href', '/reply/delete?article_num=${reply.article_num}&rno=${reply.rno}');
				}
			});
			--%>
			
			
			
			
			// ※ 첨부 파일 보여주기
			(function( ) {
				var bno = $('#bno').val();
				
				$.getJSON('/board/getAttachList', {bno:bno}, function(arr) {
					
					console.log(arr);
					var str = '';
					
					$(arr).each(function(i, attach) {
						if (attach.fileType) {
							var fileCallPath =  encodeURIComponent( attach.uploadPath+ "/s_"+attach.uuid +"_"+attach.fileName);
							str += "<li data-path='"+attach.uploadPath+"' data-uuid='"+attach.uuid+"' data-filename='"+attach.fileName+"' data-type='"+attach.fileType+"' ><div>";
							str += "<img src='/display?fileName="+fileCallPath+"'>";
							str += "</div>";
							str +"</li>";
						} else {      
							str += "<li data-path='"+attach.uploadPath+"' data-uuid='"+attach.uuid+"' data-filename='"+attach.fileName+"' data-type='"+attach.fileType+"' ><div>";
							str += "<span> "+attach.fileName+"</span><br/>";
							str += "<img src='/resources/imgs/attach.png'></a>";
							str += "</div>";
							str +"</li>";
						}
					});
					
					$(".uploadResult ul").html(str);
				});
			})();
			
			
			// 첨부 파일 클릭 : 이미지일 경우 원본 이미지 파일 보여주기, 일반 파일일 경우 파일 다운로드 구현
			$('.uploadResult').on('click','li', function(e) {	
				var liObj = $(this);
				var path = encodeURIComponent(liObj.data("path")+"/" + liObj.data("uuid")+"_" + liObj.data("filename"));
			    
				if(liObj.data("type")) {
					showImage(path.replace(new RegExp(/\\/g),"/"));
			    } else {
					self.location ="/download?fileName="+path;
			    }
			});
			
			// 첨부 이미지 파일의 원본을 보여준다.
			function showImage(fileCallPath) {
				$(".bigPictureWrapper").fadeIn();
				$(".bigPicture").html("<img src='/display?fileName="+fileCallPath+"' >").fadeIn();
			}
			
			// 원본 이미지 클릭 시 원본 이미지 닫기
			$('.bigPictureWrapper').on('click', function(e){
				$('.bigPicture').fadeOut();
			    setTimeout(function() { $('.bigPictureWrapper').fadeOut(); }, 500);
			});
		});
	</script>
	
	<div class="bigPictureWrapper">
		<div class="bigPicture"></div>
	</div>
	
	<div class="bn bn-adm-board">
		<h2>board <span>view</span></h2>
	</div>
	
	<section>
		<div class="bd-view">
			<h4>${bvo.article_title}</h4>
			<div class="profile"></div>
			<ul class="bd-post-info">
				<li>@ ${bvo.article_writer}</li>
				<li>작성일 : <fmt:formatDate value="${bvo.article_reg_date}" pattern="yyyy년 MM월 dd일" /></li>
			</ul>
			<ul class="bd-view-info">
				<li>추천수 : 미구현</li>
			 	<li>댓글수 : ${bvo.reply_cnt}</li>
			</ul>
			<div class="view-content">${bvo.article_content}</div>
			
			<div class="bd-view-btn">
				<a href="/board/list?num=${num }" class="btn btn-default">목 록</a>
				<c:if test="${member != null or staff != null}">
				<c:if test="${member.member_name == bvo.article_writer or staff.staff_id == bvo.article_writer or member.member_id == 'admin' or staff.staff_id == 'admin'}">
				<a href="/board/update?article_num=${bvo.article_num}&num=${num }" class="btn btn-update">수 정</a>
				<a href="" id="board-delete" class="btn btn-delete">삭 제</a>
				</c:if>
				</c:if>
			</div>
		</div>
		
		
		<div class="uploadResult">
			<ul></ul>
		</div>
		
		
		<%-- 댓글 작성  --%>
		<c:if test="${member!=null or staff!=null }">
		<div class="reply-wrap">
			<form action="/reply/register" method="post">
				<input type="hidden" name="article_num" value="${bvo.article_num}" id="num">
				<input type="hidden" name="num" value="${num}" id="num">
				<ul class="reply-reg">
					<li>
					<c:if test="${member != null or staff != null}">
						<div class="reply-writer">
							<input type="text" name="reply_writer" value="${member.member_id}${staff.staff_name}" readonly class="input-frm input-bd">
						</div>
						
						<button type="submit" class="btn">댓글 작성</button>
						</c:if>
					</li>
					<li>
						<textarea name="reply_content" id="contents"></textarea>
						<script>
							var ckeditor_config = {
								width: '100%',
								height: '100px',
								resize_enable: false,
								enterMode: CKEDITOR.ENTER_BR,
								shiftEnterMode: CKEDITOR.ENTER_P,
								filebrowserUploadUrl: "/board/ckUpload"
							};
							
							CKEDITOR.replace("contents", ckeditor_config);
						</script>
					</li>
					<li>※ 로그인 하면 댓글을 작성할 수 있습니다.</li>
				</ul>
			</form>
		</div> 
		</c:if>	
			<%-- 댓글 목록  --%>
		<div>
			<c:forEach items="${replyList}" var="reply" varStatus="status">
			<ul class="reply-list">
				<li>
					<!-- 프로필 사진 영역 -->프사
				</li>
				<li>
				<p>@ ${reply.reply_writer} <span><fmt:formatDate value="${reply.reply_up_date}" pattern="yyyy년 MM월 dd일" /></span></p>
					<div class="reply-content">${reply.reply_content}</div>
					<c:if test="${member != null or staff != null}">
					<c:if test="${member.member_name == reply.reply_writer or staff.staff_name == reply.reply_writer or member.member_id == 'admin' or staff.staff_id == 'admin'}">
					<div class="reply-btn">
						<a href="/reply/update?article_num=${reply.article_num}&reply_num=${reply.reply_num}" class="btn btn-update">수 정</a>
						<a id="replyDelBtn" href="" class="btn btn-delete ${status.index }delete-reply">삭 제</a>
					</div>
					</c:if>
					</c:if>
					
				</li>
			</ul>
			<script>
					$('.${status.index }delete-reply').click(function(){
						if (confirm('정말 댓글을 삭제하시겠습니까?') == true) {
							$(this).attr('href', '/reply/delete?article_num=${reply.article_num}&reply_num=${reply.reply_num}&num=${num}');
						}
					});
					</script>
			</c:forEach>
		</div>
	</section>

<%@ include file="../includes/footer.jsp" %>














