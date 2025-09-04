<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../../includes/admin-header.jsp" %>
<script src="/resources/js/adm-script.js"></script>
<script src="/resources/ckeditor/ckeditor.js"></script>
<link rel="stylesheet" href="/resources/css/admin/advice.css">
<script>
$(function(){
	$('#delete-advice').click(function(){
		if(confirm('삭제 하시겠습니까?')==true){
			$(this).attr('href','/admin/member/advice/delete?advice_no=${advo.advice_no}&advice_client=${advo.advice_client}&num=${num}');
		}
	});
});

</script>


	<div class="bn bn-advice-view">
		<h2>advice <span>inquiry</span></h2>
	</div>
	
	<section>

		<c:if test="${member != null or staff != null}">
		<div class="mb-advice-view">
		
			<table>
				<tr>
					<td><label>등록번호</label></td><td>${advo.advice_no}</td>
					<td><label>문의타입</label></td><td>${advo.advice_type }</td>
				</tr>
				<tr>
					<td><label>등록일</label></td><td><fmt:formatDate value="${advo.advice_reg_date }" pattern="yyyy-MM-dd"/> </td>
					<td><label>문의자</label>	</td><td>${advo.advice_client}(${member.member_name })</td>
				</tr>
				<tr>
					<td><label>문의 제목</label></td><td colspan="3">${advo.advice_title }</td>
					
				</tr>
				<tr><td colspan="4"><label>문의내용</label></td></tr>
				<c:if test="${advo.advice_thumbnail != null }">
				<tr>
					<td colspan="4">
						<div class="mb-advice-img">
							<img id="img" src="/libraryUploadImg/${advo.advice_thumbnail}">
							<div class="bigImg"><img src="/libraryUploadImg/${advo.advice_thumbnail}"></div>
							<div class="bg"></div>
						</div>
					</td>
				</tr>
				</c:if>
				<tr><td colspan="4">${advo.advice_content }</td></tr>
				
			</table>
			
			<div class="viewBtn">
				<c:if test="${staff != null and member == null }">
				<a href="/admin/member/advice/list?num=${num }" class="btn btn-default center">목록</a>
				<a href="/admin/member/advice/update?advice_no=${advo.advice_no }&num=${num }" class="btn btn-default center">수정하기</a>
				<a id="delete-advice" href="" class="btn btn-default center">삭제하기</a>
				</c:if>
				
				<c:if test="${staff == null and member != null }">
				<a href="/admin/member/advice/mylist?advice_client=${advo.advice_client }&num=${num }" class="btn btn-default center">목록</a>
				<a href="/admin/member/advice/memberUpdate?advice_no=${advo.advice_no }&num=${num }" class="btn btn-default center">수정하기</a>
				</c:if>
			</div>
		</div>
		</c:if>
		
		<%-- 댓글 작성 --%>
		<c:if test="${staff != null and member == null }">
		<div class="mb-answer-input">
			<form name="answerFrm" action="/admin/answer/register" method="post">
				<input type="hidden" name="advice_no" value="${advo.advice_no }">
				<input type="hidden" name="num" value="${num }">
			
				<ul class="answer-reg">
					<li>
						<div class="answer-writer">
						<input type="text" name="respondent" value="${staff.staff_id }" readonly>
						</div>
						<c:if test="${staff!=null and member==null}">
						<button type="submit" class="btn btn-default">댓글작성하기</button>
						</c:if>
					</li>
					<li>
						<textarea name="content" id="contents"></textarea>
						<script>
						var ckeditor_config = {
							width: '100%',
							height: '100px',
							resize_enable: false,
							enterMode: CKEDITOR.ENTER_BR,
							shiftEnterMode: CKEDITOR.ENTER_P,
							filebrowserUploadUrl: "/common/ckUpload"
						};
						
						CKEDITOR.replace("contents", ckeditor_config);
					</script>
					</li>
				</ul>
			</form>
		</div>
		</c:if>
		
		<%-- 댓글 목록 --%>
		<c:forEach items="${anList }" var="answer" varStatus="status">
		<ul class="answer-list">
			<li>
				<c:if test="${member==null and staff!=null }">
				<c:if test="${staff!=null }">
				<p><span>${answer.respondent }</span></p>
				</c:if> 
				</c:if> 
				<div class="adviceBtn">
					<p><a>등록</a>&nbsp;&nbsp;<fmt:formatDate value="${answer.reg_date }" pattern="yyyy년 MM월dd일"/>&nbsp;
					<a>수정</a>&nbsp;&nbsp;<fmt:formatDate value="${answer.up_date }" pattern="yyyy년 MM월dd일"/></p>
				</div> 
			</li>
			<li><div class="content">${answer.content }</div></li>
			<li>
			<c:if test="${member!=null or staff != null }">
				<c:if test="${member.member_id == answer.respondent or staff.staff_id==answer.respondent or member.member_id=='admin' or staff.staff_id=='admin' }">
					<div class="answerBtn">
						<a href="/admin/answer/update?advice_no=${advo.advice_no }&answer_no=${answer.answer_no }&num=${num}" class="btn btn-default">수정</a>
						<a id="deleteAnswer" href="" class="${status.index }deleteAnswer btn btn-default">삭제</a>
					</div>
					<script>
						$('.${status.index }deleteAnswer').click(function(){
							if(confirm("정말 삭제하시겠습니까?")==true){
								$(this).attr('href', '/admin/answer/delete?advice_no=${advo.advice_no}&answer_no=${answer.answer_no}&num=${num}');	
							}
							
						});
					</script>
				</c:if>
			</c:if>
			</li>
		</ul>
		</c:forEach>
	</section>


<%@ include file="../../../includes/footer.jsp" %>










