package org.bookbug.member.vo;

import java.util.Date;

public class ReservationBookVO {

	private String reservation_num;
	private String member_id;
	private String book_id;
	private Date reservation_date;
	
	// 도서 대출 등록, 수정, 삭제 : 불필요, ★도서 대출 목록 : 필요(JOIN 문)
	
	private String book_thumbnail;
	private String book_title;
	private String book_subtitle;
	private String book_category_type;
	private String book_category;
	private String book_type;
	private String book_position;
	private String book_author;
	private String book_publisher;
	private String book_publisher_date;
	private String book_detail;
	private String book_isbn;
	private String book_rental_able;
	
	
	private String borrow_start;
	private String borrow_end;
	private String borrow_state;
	private Date borrow_reg_date;
	private Date borrow_up_date;
	
	
	
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
	public String getReservation_num() {
		return reservation_num;
	}
	public void setReservation_num(String reservation_num) {
		this.reservation_num = reservation_num;
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
	public Date getReservation_date() {
		return reservation_date;
	}
	public void setReservation_date(Date reservation_date) {
		this.reservation_date = reservation_date;
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
	public String getBook_publisher_date() {
		return book_publisher_date;
	}
	public void setBook_publisher_date(String book_publisher_date) {
		this.book_publisher_date = book_publisher_date;
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
	
}
