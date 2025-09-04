package org.bookbug.admin.vo;

import java.util.Date;

import lombok.Data;

@Data
public class BorrowVO {
	
	private int borrow_id;
	private String member_id;
	private String book_id;
	private String borrow_start;
	private String borrow_end;
	private String borrow_state;
	private Date borrow_reg_date;
	private Date borrow_up_date;
	
	// 도서 대출 등록, 수정, 삭제 : 불필요, ★도서 대출 목록 : 필요(JOIN 문)
	
	private String book_title;
	private String book_thumbnail;
	private String book_category;
	private String book_type;
	private String book_author;
	private String book_position;
	private String book_publisher;
	private String book_publisher_year;
	private String book_datail;
	private String book_isbn;
	private String book_rental_able;
	
	private String member_name;
	private String member_gender;
	private String member_phone;
	private String member_birthday;
	private String member_zipcode;
	private String member_address;
	
	
	public int getBorrow_id() {
		return borrow_id;
	}
	public void setBorrow_id(int borrow_id) {
		this.borrow_id = borrow_id;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	public String getBook_id() {
		return book_id;
	}
	public void setBook_id(String book_id) {
		this.book_id = book_id;
	}
	public String getBorrow_start() {
		return borrow_start;
	}
	public void setBorrow_start(String borrow_start) {
		this.borrow_start = borrow_start;
	}
	public String getBorrow_end() {
		return borrow_end;
	}
	public void setBorrow_end(String borrow_end) {
		this.borrow_end = borrow_end;
	}
	public String getBorrow_state() {
		return borrow_state;
	}
	public void setBorrow_state(String borrow_state) {
		this.borrow_state = borrow_state;
	}
	public Date getBorrow_reg_date() {
		return borrow_reg_date;
	}
	public void setBorrow_reg_date(Date borrow_reg_date) {
		this.borrow_reg_date = borrow_reg_date;
	}
	public Date getBorrow_up_date() {
		return borrow_up_date;
	}
	public void setBorrow_up_date(Date borrow_up_date) {
		this.borrow_up_date = borrow_up_date;
	}
	public String getBook_title() {
		return book_title;
	}
	public void setBook_title(String book_title) {
		this.book_title = book_title;
	}
	public String getBook_category() {
		return book_category;
	}
	public void setBook_category(String book_category) {
		this.book_category = book_category;
	}
	public String getBook_type() {
		return book_type;
	}
	public void setBook_type(String book_type) {
		this.book_type = book_type;
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
	public String getBook_publisher_year() {
		return book_publisher_year;
	}
	public void setBook_publisher_year(String book_publisher_year) {
		this.book_publisher_year = book_publisher_year;
	}
	public String getBook_datail() {
		return book_datail;
	}
	public void setBook_datail(String book_datail) {
		this.book_datail = book_datail;
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
	public String getMember_name() {
		return member_name;
	}
	public void setMember_name(String member_name) {
		this.member_name = member_name;
	}
	public String getMember_gender() {
		return member_gender;
	}
	public void setMember_gender(String member_gender) {
		this.member_gender = member_gender;
	}
	public String getMember_phone() {
		return member_phone;
	}
	public void setMember_phone(String member_phone) {
		this.member_phone = member_phone;
	}
	public String getMember_birthday() {
		return member_birthday;
	}
	public void setMember_birthday(String member_birthday) {
		this.member_birthday = member_birthday;
	}
	public String getMember_zipcode() {
		return member_zipcode;
	}
	public void setMember_zipcode(String member_zipcode) {
		this.member_zipcode = member_zipcode;
	}
	public String getMember_address() {
		return member_address;
	}
	public void setMember_address(String member_address) {
		this.member_address = member_address;
	}
	public String getBook_thumbnail() {
		return book_thumbnail;
	}
	public void setBook_thumbnail(String book_thumbnail) {
		this.book_thumbnail = book_thumbnail;
	}
	public String getBook_position() {
		return book_position;
	}
	public void setBook_position(String book_position) {
		this.book_position = book_position;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
