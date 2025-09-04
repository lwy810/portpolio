package org.bookbug.member.vo;

import java.util.Date;

import lombok.Data;

@Data
public class AnswerVO {
	
	private int answer_no;
	private int advice_no;
	private String content;
	private String respondent;
	private Date reg_date;
	private Date up_date;
	
	public int getAnswer_no() {
		return answer_no;
	}
	public void setAnswer_no(int answer_no) {
		this.answer_no = answer_no;
	}
	public int getAdvice_no() {
		return advice_no;
	}
	public void setAdvice_no(int advice_no) {
		this.advice_no = advice_no;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getRespondent() {
		return respondent;
	}
	public void setRespondend(String respondent) {
		this.respondent = respondent;
	}
	public Date getReg_date() {
		return reg_date;
	}
	public void setReg_date(Date reg_date) {
		this.reg_date = reg_date;
	}
	public Date getUp_date() {
		return up_date;
	}
	public void setUp_date(Date up_date) {
		this.up_date = up_date;
	}
	
	
	
	
}
