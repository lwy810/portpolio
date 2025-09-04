package org.bookbug.member.vo;

import java.util.Date;

import lombok.Data;

@Data
public class ProfileVO {

	private String profile_thumbnail;
	private String member_id;
	private Date profile_reg_date;
	private Date profile_up_date;
	
	public String getProfile_thumbnail() {
		return profile_thumbnail;
	}
	public void setProfile_thumbnail(String profile_thumbnail) {
		this.profile_thumbnail = profile_thumbnail;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	public Date getProfile_reg_date() {
		return profile_reg_date;
	}
	public void setProfile_reg_date(Date profile_reg_date) {
		this.profile_reg_date = profile_reg_date;
	}
	public Date getProfile_up_date() {
		return profile_up_date;
	}
	public void setProfile_up_date(Date profile_up_date) {
		this.profile_up_date = profile_up_date;
	}
	

}
