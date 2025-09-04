package org.bookbug.board.vo;

import java.util.Date;

import lombok.Data;

@Data
public class NoticeVO {

	private int notice_no;
	private String notice_type;
	private String notice_writer;
	private String notice_title;
	private String notice_content;
	private	String notice_thumbnail;
	private int notice_fixed;
	private	Date notice_reg_date;
	private Date notice_up_date;
	
	
	public int getNotice_no() {
		return notice_no;
	}
	public void setNotice_no(int notice_no) {
		this.notice_no = notice_no;
	}
	public String getNotice_type() {
		return notice_type;
	}
	public void setNotice_type(String notice_type) {
		this.notice_type = notice_type;
	}
	public String getNotice_writer() {
		return notice_writer;
	}
	public void setNotice_writer(String notice_writer) {
		this.notice_writer = notice_writer;
	}
	public String getNotice_title() {
		return notice_title;
	}
	public void setNotice_title(String notice_title) {
		this.notice_title = notice_title;
	}
	public String getNotice_content() {
		return notice_content;
	}
	public void setNotice_content(String notice_content) {
		this.notice_content = notice_content;
	}
	public String getNotice_thumbnail() {
		return notice_thumbnail;
	}
	public void setNotice_thumbnail(String notice_thumbnail) {
		this.notice_thumbnail = notice_thumbnail;
	}
	public int getNotice_fixed() {
		return notice_fixed;
	}
	public void setNotice_fixed(int notice_fixed) {
		this.notice_fixed = notice_fixed;
	}
	public Date getNotice_reg_date() {
		return notice_reg_date;
	}
	public void setNotice_reg_date(Date notice_reg_date) {
		this.notice_reg_date = notice_reg_date;
	}
	public Date getNotice_up_date() {
		return notice_up_date;
	}
	public void setNotice_up_date(Date notice_up_date) {
		this.notice_up_date = notice_up_date;
	}
	

}

