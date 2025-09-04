package org.bookbug.member.vo;

import java.util.Date;

import lombok.Data;

@Data
public class AdviceVO {
	
	private int advice_no;
	private String advice_thumbnail;
	private String advice_client;
	private String advice_title;
	private String advice_type;
	private String advice_content;
	private String advice_filename;
	private int advice_filesize;
	private int reply_cnt;
	private String advice_ip;
	private String advice_status;
	private Date advice_reg_date;
	private Date advice_up_date;
	
	public int getAdvice_no() {
		return advice_no;
	}
	public void setAdvice_no(int advice_no) {
		this.advice_no = advice_no;
	}
	public String getAdvice_thumbnail() {
		return advice_thumbnail;
	}
	public void setAdvice_thumbnail(String advice_thumbnail) {
		this.advice_thumbnail = advice_thumbnail;
	}
	public String getAdvice_client() {
		return advice_client;
	}
	public void setAdvice_client(String advice_client) {
		this.advice_client = advice_client;
	}
	public String getAdvice_title() {
		return advice_title;
	}
	public void setAdvice_title(String advice_title) {
		this.advice_title = advice_title;
	}
	public String getAdvice_type() {
		return advice_type;
	}
	public void setAdvice_type(String advice_type) {
		this.advice_type = advice_type;
	}
	public String getAdvice_content() {
		return advice_content;
	}
	public void setAdvice_content(String advice_content) {
		this.advice_content = advice_content;
	}
	public String getAdvice_filename() {
		return advice_filename;
	}
	public void setAdvice_filename(String advice_filename) {
		this.advice_filename = advice_filename;
	}
	public int getAdvice_filesize() {
		return advice_filesize;
	}
	public void setAdvice_filesize(int advice_filesize) {
		this.advice_filesize = advice_filesize;
	}
	public int getReply_cnt() {
		return reply_cnt;
	}
	public void setReply_cnt(int reply_cnt) {
		this.reply_cnt = reply_cnt;
	}

	public String getAdvice_ip() {
		return advice_ip;
	}
	public void setAdvice_ip(String advice_ip) {
		this.advice_ip = advice_ip;
	}
	public String getAdvice_status() {
		return advice_status;
	}
	public void setAdvice_status(String advice_status) {
		this.advice_status = advice_status;
	}
	public Date getAdvice_reg_date() {
		return advice_reg_date;
	}
	public void setAdvice_reg_date(Date advice_reg_date) {
		this.advice_reg_date = advice_reg_date;
	}
	public Date getAdvice_up_date() {
		return advice_up_date;
	}
	public void setAdvice_up_date(Date advice_up_date) {
		this.advice_up_date = advice_up_date;
	}
	
	
	
	
}
