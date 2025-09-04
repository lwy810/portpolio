package org.bookbug.member.vo;

import java.util.Date;

import lombok.Data;

@Data
public class MemberVO {
	
	private String member_id;
	private String member_pwd;
	private String member_name;
	private String member_gender;
	private String member_phone;
	private String member_birthday;
	private String member_zipcode;
	private String member_address;
	private String member_prefer;
	private int member_borrowCnt;
	private int member_reservationCnt;
	private int member_interestedCnt;
	private Date member_reg_date;
	private Date member_up_date;
	
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	public String getMember_pwd() {
		return member_pwd;
	}
	public void setMember_pwd(String member_pwd) {
		this.member_pwd = member_pwd;
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
	public String getMember_prefer() {
		return member_prefer;
	}
	public void setMember_prefer(String member_prefer) {
		this.member_prefer = member_prefer;
	}
	public Date getMember_reg_date() {
		return member_reg_date;
	}
	public void setMember_reg_date(Date member_reg_date) {
		this.member_reg_date = member_reg_date;
	}
	public Date getMember_up_date() {
		return member_up_date;
	}
	public void setMember_up_date(Date member_up_date) {
		this.member_up_date = member_up_date;
	}
	public int getMember_borrowCnt() {
		return member_borrowCnt;
	}
	public void setMember_borrowCnt(int member_borrowCnt) {
		this.member_borrowCnt = member_borrowCnt;
	}
	public int getMember_reservationCnt() {
		return member_reservationCnt;
	}
	public void setMember_reservationCnt(int member_reservationCnt) {
		this.member_reservationCnt = member_reservationCnt;
	}
	public int getMember_interestedCnt() {
		return member_interestedCnt;
	}
	public void setMember_interestedCnt(int member_interestedCnt) {
		this.member_interestedCnt = member_interestedCnt;
	}
	
	
	
	
	
}
