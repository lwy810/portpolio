package org.bookbug.member.vo;

import java.util.Date;

import lombok.Data;

@Data
public class SuggestionVO {
	
	private int suggestion_no;
	private String suggestion_thumbnail;
	private String suggestion_proposer;
	private String suggestion_email;
	private String suggestion_booktitle;
	private String suggestion_author;
	private String suggestion_publisher;
	private String suggestion_publisher_year;
	private String suggestion_isbn;
	private int suggestion_price;
	private String suggestion_notification;
	private String suggestion_status;
	private Date suggestion_reg_date;
	
	
	public int getSuggestion_no() {
		return suggestion_no;
	}
	public void setSuggestion_no(int suggestion_no) {
		this.suggestion_no = suggestion_no;
	}
	public String getSuggestion_thumbnail() {
		return suggestion_thumbnail;
	}
	public void setSuggestion_thumbnail(String suggestion_thumbnail) {
		this.suggestion_thumbnail = suggestion_thumbnail;
	}
	public String getSuggestion_proposer() {
		return suggestion_proposer;
	}
	public void setSuggestion_proposer(String suggestion_proposer) {
		this.suggestion_proposer = suggestion_proposer;
	}
	public String getSuggestion_email() {
		return suggestion_email;
	}
	public void setSuggestion_email(String suggestion_email) {
		this.suggestion_email = suggestion_email;
	}
	public String getSuggestion_booktitle() {
		return suggestion_booktitle;
	}
	public void setSuggestion_booktitle(String suggestion_booktitle) {
		this.suggestion_booktitle = suggestion_booktitle;
	}
	public String getSuggestion_author() {
		return suggestion_author;
	}
	public void setSuggestion_author(String suggestion_author) {
		this.suggestion_author = suggestion_author;
	}
	public String getSuggestion_publisher() {
		return suggestion_publisher;
	}
	public void setSuggestion_publisher(String suggestion_publisher) {
		this.suggestion_publisher = suggestion_publisher;
	}
	public String getSuggestion_publisher_year() {
		return suggestion_publisher_year;
	}
	public void setSuggestion_publisher_year(String suggestion_publisher_year) {
		this.suggestion_publisher_year = suggestion_publisher_year;
	}
	public String getSuggestion_isbn() {
		return suggestion_isbn;
	}
	public void setSuggestion_isbn(String suggestion_isbn) {
		this.suggestion_isbn = suggestion_isbn;
	}
	public int getSuggestion_price() {
		return suggestion_price;
	}
	public void setSuggestion_price(int suggestion_price) {
		this.suggestion_price = suggestion_price;
	}
	public String getSuggestion_notification() {
		return suggestion_notification;
	}
	public void setSuggestion_notification(String suggestion_notification) {
		this.suggestion_notification = suggestion_notification;
	}
	public String getSuggestion_status() {
		return suggestion_status;
	}
	public void setSuggestion_status(String suggestion_status) {
		this.suggestion_status = suggestion_status;
	}
	public Date getSuggestion_reg_date() {
		return suggestion_reg_date;
	}
	public void setSuggestion_reg_date(Date suggestion_reg_date) {
		this.suggestion_reg_date = suggestion_reg_date;
	}
	
	
	
	
	
}
