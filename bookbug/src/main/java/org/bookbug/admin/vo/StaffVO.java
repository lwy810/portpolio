package org.bookbug.admin.vo;

import java.util.Date;

import lombok.Data;

@Data
public class StaffVO {

	private String staff_id;
	private String staff_pwd;
	private String staff_name;
	private String staff_gender;
	private String staff_phone;
	private String staff_birthday;
	private int staff_level;
	private int staff_department;
	private Date staff_reg_date;
	private Date staff_up_date;
	
	public String getStaff_id() {
		return staff_id;
	}
	public void setStaff_id(String staff_id) {
		this.staff_id = staff_id;
	}
	public String getStaff_pwd() {
		return staff_pwd;
	}
	public void setStaff_pwd(String staff_pwd) {
		this.staff_pwd = staff_pwd;
	}
	public String getStaff_name() {
		return staff_name;
	}
	public void setStaff_name(String staff_name) {
		this.staff_name = staff_name;
	}
	public String getStaff_gender() {
		return staff_gender;
	}
	public void setStaff_gender(String staff_gender) {
		this.staff_gender = staff_gender;
	}
	public String getStaff_phone() {
		return staff_phone;
	}
	public void setStaff_phone(String staff_phone) {
		this.staff_phone = staff_phone;
	}
	public String getStaff_birthday() {
		return staff_birthday;
	}
	public void setStaff_birthday(String staff_birthday) {
		this.staff_birthday = staff_birthday;
	}
	public int getStaff_level() {
		return staff_level;
	}
	public void setStaff_level(int staff_level) {
		this.staff_level = staff_level;
	}
	public int getStaff_department() {
		return staff_department;
	}
	public void setStaff_department(int staff_department) {
		this.staff_department = staff_department;
	}
	public Date getStaff_reg_date() {
		return staff_reg_date;
	}
	public void setStaff_reg_date(Date staff_reg_date) {
		this.staff_reg_date = staff_reg_date;
	}
	public Date getStaff_up_date() {
		return staff_up_date;
	}
	public void setStaff_up_date(Date staff_up_date) {
		this.staff_up_date = staff_up_date;
	}
	
}
