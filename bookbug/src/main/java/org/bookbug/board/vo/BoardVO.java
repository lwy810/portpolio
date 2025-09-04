package org.bookbug.board.vo;

import java.util.Date;

import lombok.Data;

@Data
public class BoardVO {
	
	private int article_num;
	private String article_writer;
	private String article_thumbnail;
	private String article_title;
	private String article_content;
	private String article_filename;
	private int article_filesize;
	private int article_views;
	private int reply_cnt;
	private Date article_reg_date;
	private Date article_up_date;
	public int getArticle_num() {
		return article_num;
	}
	public void setArticle_num(int article_num) {
		this.article_num = article_num;
	}
	public String getArticle_writer() {
		return article_writer;
	}
	public void setArticle_writer(String article_writer) {
		this.article_writer = article_writer;
	}
	public String getArticle_thumbnail() {
		return article_thumbnail;
	}
	public void setArticle_thumbnail(String article_thumbnail) {
		this.article_thumbnail = article_thumbnail;
	}
	public String getArticle_title() {
		return article_title;
	}
	public void setArticle_title(String article_title) {
		this.article_title = article_title;
	}
	public String getArticle_content() {
		return article_content;
	}
	public void setArticle_content(String article_content) {
		this.article_content = article_content;
	}
	public String getArticle_filename() {
		return article_filename;
	}
	public void setArticle_filename(String article_filename) {
		this.article_filename = article_filename;
	}
	public int getArticle_filesize() {
		return article_filesize;
	}
	public void setArticle_filesize(int article_filesize) {
		this.article_filesize = article_filesize;
	}
	public int getArticle_views() {
		return article_views;
	}
	public void setArticle_views(int article_views) {
		this.article_views = article_views;
	}
	public int getReply_cnt() {
		return reply_cnt;
	}
	public void setReply_cnt(int reply_cnt) {
		this.reply_cnt = reply_cnt;
	}
	public Date getArticle_reg_date() {
		return article_reg_date;
	}
	public void setArticle_reg_date(Date article_reg_date) {
		this.article_reg_date = article_reg_date;
	}
	public Date getArticle_up_date() {
		return article_up_date;
	}
	public void setArticle_up_date(Date article_up_date) {
		this.article_up_date = article_up_date;
	}
	
	
	
	
}
