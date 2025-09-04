package org.bookbug.util;

import lombok.Data;

@Data
public class PageDTO {
	
	private int num; // 현재 페이지 번호 : pageCalc()에서 사용하므로 사용자가 페이지 번호 버튼을 클릭할 때 현재 페이지 번호를 Controller에서 수집해서 설정한다.	
	private int count; 	// 게시물 총 개수 : pageCalc()에서 사용하므로 게시물 총 개수를 Controller에서 얻어서 설정한다.
	// 페이징 처리는 'num 변수'와 'count 변수'의 값에 따라 결정된다.
	
	private int displayPost; // 페이지에 출력할 게시물 시작 번호(limit의 첫번째 값:Controller에서 Persistence까지 전달)	
	private int postNum = 6; // 페이지에 출력할 게시물 개수(limit의 두번째 값:Controller에서 Persistence까지 전달)
	
	private int pageNum; // 블럭 페이지 번호
	private int pageNumCnt = 5; // 블럭 페이지에 표시할 페이지의 개수
	private int startPageNum; // 블럭 페이지의 첫번째 페이지 번호
	private int endPageNum; // 블럭 페이지의 마지막 페이지 번호
	// 이전, 다음 버튼 표시 여부
	private boolean prev;
	private boolean next;
	
	
	
	// 검색 유형과 검색어
	private String searchType;
	private String keyword;
	private String searchType2;
	private String keyword2;
	private String searchTypeKeyword;
	private String searchTypeKeyword2;
	private String registerPeriod;
	private String book_category_type;
	private String book_category;
	
	public void setSearchTypeKeyword(String searchType, String keyword) {
		if (searchType.equals("") || keyword.equals("")) {
			searchTypeKeyword = "";
		} else {
			searchTypeKeyword = "&amp;searchType="+searchType+"&amp;keyword="+keyword;
		}
	}
	
	public String getSearchTypeKeyword() {
		if (searchType.equals("") || keyword.equals("")) {
			return "";
		} else {
			return "&searchType="+searchType+"&keyword="+keyword;
		}
	}
	
	public void setSearchTypeKeyword2(String searchType2, String keyword2) {
		if (searchType.equals("") || keyword.equals("")) {
			searchTypeKeyword2 = "";
		} else {
			searchTypeKeyword2 = "&amp;searchType2="+searchType2+"&amp;keyword2="+keyword2;
		}
	}
	
	public String getSearchTypeKeyword2() {
		if (searchType2.equals("") || keyword2.equals("")) {
			return "";
		} else {
			return "&searchType2="+searchType2+"&keyword2="+keyword2;
		}
	}
	
	public void setCount(int count) { // 게시물 총 개수를 얻어 설정하고 pageCalc()을 호출한다.
		this.count = count;
		pageCalc();
	}
	
	private void pageCalc() {
		// 게시물 번호가 136번일 때 현재 페이지 번호(num(11.3:올림) = 136/12)는 12이다.
		// num이 12이므로 endPageNum은 15이고, startPageNum은 11이다. 따라서 게시물 번호 136번의 블럭 페이지 번호는 3번이다.
		endPageNum = (int) (Math.ceil((double) num / (double) pageNumCnt)) * pageNumCnt;
		startPageNum = endPageNum - (pageNumCnt - 1);
		
		// 게시물 번호가 136번이 마지막 게시물인 경우 페이지 개수는 11.3개가 필요하므로 페이지 번호는 올림처리하여 페이지 번호 버튼은 12번까지 필요하다. 하지만 페이지 번호 버튼은 15번까지 출력된다. 따라서 블럭 페이지의 마지막 페이지 번호에 대한 재계산이 필요하다.
		// endPageNum은 15이고, endPageNum_tmp는 12이므로 13, 14, 15 페이비 번호 버튼은 불필요하다.(11~15)
		int endPageNum_tmp = (int) (Math.ceil((double) count / (double) postNum)); // 12
		if (endPageNum > endPageNum_tmp) { // 15 > 12 가 true이므로 endPageNum에 12를 저장한다.
			endPageNum = endPageNum_tmp; // 페이지 번호 버튼은 12번까지 출력된다.
		}
		
		// 이전, 다음 버튼 표시 여부 설정
		prev = startPageNum == 1 ? false : true;
		next = endPageNum * postNum >= count ? false : true;
		
		displayPost = (num - 1) * postNum; // 각 페이지에 출력할 '게시물 시작 번호'를 얻는다.
	}

	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public int getDisplayPost() {
		return displayPost;
	}
	public void setDisplayPost(int displayPost) {
		this.displayPost = displayPost;
	}
	public int getPostNum() {
		return postNum;
	}
	public void setPostNum(int postNum) {
		this.postNum = postNum;
	}
	public int getPageNum() {
		return pageNum;
	}
	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}
	public int getPageNumCnt() {
		return pageNumCnt;
	}
	public void setPageNumCnt(int pageNumCnt) {
		this.pageNumCnt = pageNumCnt;
	}
	public int getStartPageNum() {
		return startPageNum;
	}
	public void setStartPageNum(int startPageNum) {
		this.startPageNum = startPageNum;
	}
	public int getEndPageNum() {
		return endPageNum;
	}
	public void setEndPageNum(int endPageNum) {
		this.endPageNum = endPageNum;
	}
	public boolean isPrev() {
		return prev;
	}
	public void setPrev(boolean prev) {
		this.prev = prev;
	}
	public boolean isNext() {
		return next;
	}
	public void setNext(boolean next) {
		this.next = next;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	public int getCount() {
		return count;
	}
	public void setSearchTypeKeyword(String searchTypeKeyword) {
		this.searchTypeKeyword = searchTypeKeyword;
	}

	public String getKeyword2() {
		return keyword2;
	}

	public void setKeyword2(String keyword2) {
		this.keyword2 = keyword2;
	}

	public String getSearchType2() {
		return searchType2;
	}

	public void setSearchType2(String searchType2) {
		this.searchType2 = searchType2;
	}

	public String getRegisterPeriod() {
		return registerPeriod;
	}

	public void setRegisterPeriod(String registerPeriod) {
		this.registerPeriod = registerPeriod;
	}

	public String getBook_category_type() {
		return book_category_type;
	}

	public void setBook_category_type(String book_category_type) {
		this.book_category_type = book_category_type;
	}

	public String getBook_category() {
		return book_category;
	}

	public void setBook_category(String book_category) {
		this.book_category = book_category;
	}
	
	
	
}












