package org.bookbug.book.vo;

import java.util.Date;

public class BookVO {

	private String book_id;
	private String book_thumbnail;
	private String book_title;
	private String book_subtitle;
	private String book_category_type;
	private String book_category;
	private String book_callnumber;
	private String book_type;
	private String book_position;
	private String book_author;
	private String book_publisher;
	private int book_publisher_year;
	private String book_detail;
	private String book_isbn;
	private String book_rental_able;
	private int book_borrow_cnt;
	private Date book_reg_date;
	private Date book_up_date;
	
	
	private String authorSign;
	private String pre_book_category_type;
	private String book_count;
	private String search_book_id;
	
	public void setAuthorSign(String book_author, String book_title) {
		
		String book_title_initial = null, choValue = null, jungValue = null;
		 
		String[] cho = { "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"};
	    String[] jung = {"ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ" };
	    String[] choValue_Arr = { "1", "1", "19", "2", "2", "29", "3", "4", "4", "5", "5", "6", "7", "7", "8", "87", "88", "89", "9" };
	    String[] jungValue1_Arr = { "2", "3", "3", "3", "4", "4", "4", "4", "5", "5", "5", "5", "5", "6", "6", "6", "6", "6", "7", "7", "8"};
	    String[] jungValue2_Arr = { "2", "2", "2", "2", "3", "3", "3", "3", "4", "4", "4", "4", "4", "5", "5", "5", "5", "5", "5", "5", "6"};
	    
	   
    	String db_book_title = book_title.replaceAll(" ", "");
    	String author_first_initial = book_author.substring(0, 1);
    	
    	if (db_book_title.indexOf(")") > 0) {
    		int book_title_initial_index = db_book_title.indexOf(")");
    		System.out.println("book_title_initial_index : "+book_title_initial_index);
    		book_title_initial = db_book_title.substring(book_title_initial_index+1, book_title_initial_index+2);
    		System.out.println("book_title_initial : "+book_title_initial);
    	} else {
    		book_title_initial = db_book_title.substring(0, 1);
    	}
    	
    	char author_second_initial = book_author.charAt(0);
    	System.out.println("===================== author_second_initial : "+author_second_initial);
		int unicode = author_second_initial - 0xAC00;
		System.out.println("===================== unicode : "+unicode);
		int choCode = unicode / (21 * 28);
		System.out.println("===================== choCode : "+choCode);
		String author_second_initial_cho = cho[choCode];
		choValue = choValue_Arr[choCode];
		System.out.println("===========1-1. book_author_cho"+author_second_initial_cho);
		System.out.println("===========1-2. book_author_cho"+ choValue);
		
		int jungCode = (unicode % (21 * 28)) / 28;

		if (author_second_initial_cho != "ㅊ") {
			jungValue = jungValue1_Arr[jungCode];
		} else {
			jungValue = jungValue2_Arr[jungCode];
		}
		
		authorSign = author_first_initial+choValue+jungValue+book_title_initial; 
	}
	
	public String getAuthorSign() {
		return authorSign;
	}
	
	public void setPre_book_category_type(String category_number) {
		
		if (category_number.substring(0,1).equals("0")) {
			pre_book_category_type = "총류";
		} else if (category_number.substring(0,1).equals("1")) {
			pre_book_category_type = "철학";
		} else if (category_number.substring(0,1).equals("2")) {
			pre_book_category_type = "종교";
		} else if (category_number.substring(0,1).equals("3")) {
			pre_book_category_type = "사회과학";
		} else if (category_number.substring(0,1).equals("4")) {
			pre_book_category_type = "자연과학";
		} else if (category_number.substring(0,1).equals("5")) {
			pre_book_category_type = "기술과학";
		} else if (category_number.substring(0,1).equals("6")) {
			pre_book_category_type = "예술";
		} else if (category_number.substring(0,1).equals("7")) {
			pre_book_category_type = "언어";
		} else if (category_number.substring(0,1).equals("8")) {
			pre_book_category_type = "문학";
		} else if (category_number.substring(0,1).equals("9")) {
			pre_book_category_type = "역사";
		}
	} 
	
	public String getPre_book_category_type() {
		return pre_book_category_type;
	}
	
	public void setBook_count(int book_category_count) {
		
		if ((book_category_count+"").length() == 1) {
			book_count = "00" + book_category_count;
		}  else if ((book_category_count+"").length() == 2) {
			book_count = "0" + book_category_count;
		} else if ((book_category_count+"").length() == 3) {
			book_count = Integer.toString(book_category_count);
		}
	}
	
	public String getBook_count() {
		return book_count;
	}
	

	public void setSearch_book_id (String book_id) {
		search_book_id = book_id;
	}

	public String getSearch_book_id() {
		return search_book_id;
	}
	
	
	
	
	public String getBook_id() {
		return book_id;
	}
	public void setBook_id(String book_id) {
		this.book_id = book_id;
	}
	public String getBook_thumbnail() {
		return book_thumbnail;
	}
	public void setBook_thumbnail(String book_thumbnail) {
		this.book_thumbnail = book_thumbnail;
	}
	public String getBook_title() {
		return book_title;
	}
	public void setBook_title(String book_title) {
		this.book_title = book_title;
	}
	public String getBook_subtitle() {
		return book_subtitle;
	}
	public void setBook_subtitle(String book_subtitle) {
		this.book_subtitle = book_subtitle;
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
	public String getBook_callnumber() {
		return book_callnumber;
	}
	public void setBook_callnumber(String book_callnumber) {
		this.book_callnumber = book_callnumber;
	}
	public String getBook_type() {
		return book_type;
	}
	public void setBook_type(String book_type) {
		this.book_type = book_type;
	}
	public String getBook_position() {
		return book_position;
	}
	public void setBook_position(String book_position) {
		this.book_position = book_position;
	}
	public String getBook_author() {
		return book_author;
	}
	public void setBook_author(String book_author) {
		this.book_author = book_author;
	}
	public String getBook_publisher() {
		return book_publisher;
	}
	public void setBook_publisher(String book_publisher) {
		this.book_publisher = book_publisher;
	}
	public int getBook_publisher_year() {
		return book_publisher_year;
	}
	public void setBook_publisher_date(int book_publisher_year) {
		this.book_publisher_year = book_publisher_year;
	}
	public String getBook_detail() {
		return book_detail;
	}
	public void setBook_detail(String book_detail) {
		this.book_detail = book_detail;
	}
	public String getBook_isbn() {
		return book_isbn;
	}
	public void setBook_isbn(String book_isbn) {
		this.book_isbn = book_isbn;
	}
	public String getBook_rental_able() {
		return book_rental_able;
	}
	public void setBook_rental_able(String book_rental_able) {
		this.book_rental_able = book_rental_able;
	}
	public int getBook_borrow_cnt() {
		return book_borrow_cnt;
	}
	public void setBook_borrow_cnt(int book_borrow_cnt) {
		this.book_borrow_cnt = book_borrow_cnt;
	}
	public Date getBook_reg_date() {
		return book_reg_date;
	}
	public void setBook_reg_date(Date book_reg_date) {
		this.book_reg_date = book_reg_date;
	}
	public Date getBook_up_date() {
		return book_up_date;
	}
	public void setBook_up_date(Date book_up_date) {
		this.book_up_date = book_up_date;
	}
}
