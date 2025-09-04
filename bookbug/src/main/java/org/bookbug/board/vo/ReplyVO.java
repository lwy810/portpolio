package org.bookbug.board.vo;

import java.util.Date;

import lombok.Data;

@Data
public class ReplyVO {

	private int reply_num;
	private int article_num;
	private String reply_writer;
	private String reply_thumbnail;
	private String reply_content;
	private Date reply_reg_date;
	private Date reply_up_date;
	
	
	public int getReply_num() {
		return reply_num;
	}
	public void setReply_num(int reply_num) {
		this.reply_num = reply_num;
	}
	public int getArticle_num() {
		return article_num;
	}
	public void setArticle_num(int article_num) {
		this.article_num = article_num;
	}
	public String getReply_writer() {
		return reply_writer;
	}
	public void setReply_writer(String reply_writer) {
		this.reply_writer = reply_writer;
	}
	public String getReply_thumbnail() {
		return reply_thumbnail;
	}
	public void setReply_thumbnail(String reply_thumbnail) {
		this.reply_thumbnail = reply_thumbnail;
	}
	public String getReply_content() {
		return reply_content;
	}
	public void setReply_content(String reply_content) {
		this.reply_content = reply_content;
	}
	public Date getReply_reg_date() {
		return reply_reg_date;
	}
	public void setReply_reg_date(Date reply_reg_date) {
		this.reply_reg_date = reply_reg_date;
	}
	public Date getReply_up_date() {
		return reply_up_date;
	}
	public void setReply_up_date(Date reply_up_date) {
		this.reply_up_date = reply_up_date;
	}
	

	
}

