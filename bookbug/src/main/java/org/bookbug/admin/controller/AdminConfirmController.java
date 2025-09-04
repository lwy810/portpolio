package org.bookbug.admin.controller;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.bookbug.admin.service.AdminConfirmServiceImpl;
import org.bookbug.admin.service.AdminMemberService;
import org.bookbug.admin.service.AdminStaffService;
import org.bookbug.admin.vo.StaffVO;
import org.bookbug.member.vo.MemberVO;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/admin/confirm/*")
public class AdminConfirmController {

	@Inject
	private AdminConfirmServiceImpl confirmService;
	
	@Inject
	private BCryptPasswordEncoder bcryptPasswordEncoder;
	
	@Inject
	private AdminMemberService memberService;
	
	@Inject
	private AdminStaffService staffService;
	
	@GetMapping("/login")
	public void login() throws Exception{}
	
	@PostMapping("/login")
	public String login(MemberVO mvo, HttpSession session, RedirectAttributes rttr) throws Exception {
		String url = null;
		MemberVO dbmvo = confirmService.login(mvo);
		
		String member_pwd = mvo.getMember_pwd();
		
		if(dbmvo  == null) {
			session.setAttribute("member", null);
			rttr.addFlashAttribute("member_id", false);
			url = "redirect:/admin/confirm/login";
		} else {
			boolean passMatch = bcryptPasswordEncoder.matches(member_pwd, dbmvo.getMember_pwd());
			
			if(passMatch) {
				session.setAttribute("member", dbmvo);
				url = "redirect:/admin/member/mypage?member_id="+dbmvo.getMember_id();
			} else {
				session.setAttribute("member", null);
				rttr.addFlashAttribute("member_pwd", false);
				url = "redirect:/admin/confirm/login";
			}
		}
		
		return url;
	}
	
	
	@PostMapping("/staffLogin")
	public String staffLogin (StaffVO svo, HttpSession session, RedirectAttributes rttr) throws Exception {
		String url = null;
		StaffVO dbsvo = confirmService.staffLogin(svo);
		
		String staff_pwd = svo.getStaff_pwd();
		
		if(dbsvo  == null) {
			session.setAttribute("staff", null);
			rttr.addFlashAttribute("staff_id", false);
			url = "redirect:/admin/confirm/login";
		} else {
			boolean passMatch = bcryptPasswordEncoder.matches(staff_pwd, dbsvo.getStaff_pwd());
			
			if (passMatch) {
				session.setAttribute("staff", dbsvo);
				url = "redirect:/admin/staff/mypage?staff_id="+dbsvo.getStaff_id();
			
			} else {
				session.setAttribute("staff", null);
				rttr.addFlashAttribute("staff_pwd", false);
				url = "redirect:/admin/confirm/login";
			}
		}
		
		return url;
	}
	
	@GetMapping("/logout")
	public String logout(HttpSession session) throws Exception{
		session.invalidate();
		return "redirect:/admin/confirm/login";
	}
	
	@GetMapping("/pwdModify")
	public void pwdModify() throws Exception {}
	
	@PostMapping("/pwdModify")
	public String pwdModify(
			@RequestParam("modify_pwd") String modify_pwd,  StaffVO svo, MemberVO mvo, RedirectAttributes rttr) throws Exception {
		String member_pwd = mvo.getMember_pwd();
		String staff_pwd = svo.getStaff_pwd();
		MemberVO db_mvo = new MemberVO();
		StaffVO db_svo = new StaffVO();
		String current_pwd = null, url = null;
		
		if (member_pwd != null) {
			current_pwd = member_pwd;
			
			db_mvo = memberService.getMypage(mvo.getMember_id());
			String db_pwd = db_mvo.getMember_pwd();
			boolean passMatch = bcryptPasswordEncoder.matches(current_pwd, db_pwd);
			
			if (passMatch) {
				String encode_pwd = bcryptPasswordEncoder.encode(modify_pwd);
				mvo.setMember_pwd(encode_pwd);	
				
				confirmService.memberPwdModify(mvo);
				url = "redirect:/admin/member/mypage?member_id="+mvo.getMember_id();
			} else {
				rttr.addFlashAttribute("current_pwd", false);
				url = "redirect:/admin/staff/pwdModify?staff_id="+svo.getStaff_id();
			}
		} else if (staff_pwd != null ){
			current_pwd = staff_pwd;
			System.out.println("============staff_id : "+svo.getStaff_id());
			db_svo = staffService.getMypage(svo.getStaff_id());
			String db_pwd = db_svo.getStaff_pwd();
			boolean passMatch = bcryptPasswordEncoder.matches(current_pwd, db_pwd);
			
			if (passMatch) {
				String encode_pwd = bcryptPasswordEncoder.encode(modify_pwd);
				svo.setStaff_pwd(encode_pwd);	
				
				confirmService.staffPwdModify(svo);
				url = "redirect:/admin/staff/mypage?staff_id="+svo.getStaff_id();
			} else {
				rttr.addFlashAttribute("current_pwd", false);
				url = "redirect:/admin/staff/pwdModify?staff_id="+svo.getStaff_id();
			}
		}

		return url;
		
	}
	
	@GetMapping("/pwdConfirm")
	public void pwdConfirm() throws Exception {}

	@PostMapping("/pwdConfirm")
	public String pwdConfirm(
			@RequestParam("modify_pwd") String modify_pwd,  StaffVO svo, MemberVO mvo, RedirectAttributes rttr, Model model) throws Exception {
		String member_pwd = mvo.getMember_pwd();
		String staff_pwd = svo.getStaff_pwd();
		MemberVO db_mvo = new MemberVO();
		StaffVO db_svo = new StaffVO();
		String current_pwd = null, url = null;
		
		if (member_pwd != null) {
			current_pwd = member_pwd;
			db_mvo = memberService.getMypage(mvo.getMember_id());
			
			String db_pwd = db_mvo.getMember_pwd();
			
			boolean passMatch = bcryptPasswordEncoder.matches(current_pwd, db_pwd);
			
			if (passMatch) {
				model.addAttribute("member", db_mvo);
				url = "redirect:/admin/member/memberModify?member_id="+mvo.getMember_id();
			} else {
				rttr.addFlashAttribute("current_pwd", false);
				url = "redirect:/admin/member/mypage?member_id="+mvo.getMember_id();
			}
		} else if (staff_pwd != null ){
			current_pwd = staff_pwd;
			
			db_svo = staffService.getMypage(svo.getStaff_id());
			String db_pwd = db_svo.getStaff_pwd();
			boolean passMatch = bcryptPasswordEncoder.matches(current_pwd, db_pwd);
			
			if (passMatch) {
				model.addAttribute("staff", db_mvo);
				url = "redirect:/admin/staff/memberModify?member_id="+svo.getStaff_id();
			} else {
				rttr.addFlashAttribute("current_pwd", false);
				url = "redirect:/admin/staff/mypage?staff_id="+svo.getStaff_id();
			}
		}
	
		return url;
		
	}
		
	@GetMapping("/deleteConfirm")
	public void pwdDeleteConfirm() throws Exception {}
	
	
}
