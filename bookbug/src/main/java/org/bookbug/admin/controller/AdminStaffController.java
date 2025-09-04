package org.bookbug.admin.controller;

import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.bookbug.admin.service.AdminStaffServiceImpl;
import org.bookbug.admin.vo.StaffVO;
import org.bookbug.util.PageDTO;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/admin/staff/*")
public class AdminStaffController {

	@Inject
	private AdminStaffServiceImpl staffService;
	
	@Inject
	private BCryptPasswordEncoder bcryptPasswordEncoder;
	
	@GetMapping("/register")
	public void register() throws Exception {}
	
	@PostMapping("/register")
	public String registerStaff(StaffVO svo) throws Exception {
//		System.out.println("==============con staff_id"+svo.getStaff_id());
		
		String staff_pwd = bcryptPasswordEncoder.encode(svo.getStaff_pwd());
		svo.setStaff_pwd(staff_pwd);
		int result = staffService.registerStaff(svo);
//		System.out.println(result);
		String url = null;
		
		if(result == 1) {
			url = "redirect:/admin/staff/mypage?staff_id="+svo.getStaff_id();
		} else {
			url = "redirect:/admin/confirm/login";
		}
		return url;
	}
	
	
	@GetMapping("/mypage")
	public void getMypage(@RequestParam("staff_id") String staff_id, Model model ) throws Exception {
		StaffVO svo = staffService.getMypage(staff_id);
		model.addAttribute("staff", svo);
	}
	
	@GetMapping("/staffModify")
	public void staffModify(@RequestParam("staff_id") String staff_id, Model model) throws Exception {
		StaffVO svo = staffService.getMypage(staff_id);
		model.addAttribute("modify", svo);
	}
	
	
	@GetMapping("/list")
	public void getStaffList(
		@RequestParam("num") int num,
		@RequestParam(value="searchType", required=false, defaultValue="")String searchType,
		@RequestParam(value="keyword", required=false, defaultValue="")String keyword, Model model) throws Exception{
		PageDTO page = new PageDTO();
		page.setNum(num);
		page.setCount(staffService.getCount(searchType, keyword));
		page.setSearchType(searchType);
		page.setKeyword(keyword);
		List<StaffVO> staffList = staffService.getStaffList(page.getDisplayPost(), page.getPostNum(), searchType, keyword);
		System.out.println("staffList:"+staffList);
		model.addAttribute("page", page);
		model.addAttribute("select", num);
		model.addAttribute("staffList", staffList);
	}
	
	
	
	
	@PostMapping("/staffModify")
	public String staffModify(StaffVO svo, HttpSession session, RedirectAttributes rttr) throws Exception {
		String pwd = svo.getStaff_pwd();
//		System.out.println("===========1.pwd : "+pwd);
		StaffVO db_svo = staffService.getMypage(svo.getStaff_id());
		
		boolean passMatch = bcryptPasswordEncoder.matches(pwd, db_svo.getStaff_pwd());
		String url = null;
		
		if(passMatch) {
			staffService.staffModify(svo);
			session.setAttribute("staff", db_svo);
			url = "redirect:/admin/staff/mypage?staff_id="+svo.getStaff_id();
		} else {
			rttr.addFlashAttribute("staff_pwd", false);
			url = "redirect:/admin/staff/staffModify?staff_id="+svo.getStaff_id();
		}
		return url;
	
	}

	@PostMapping("/staffDelete")
	public String staffDelete(StaffVO svo, RedirectAttributes rttr) throws Exception {
		String url = null;
		String staff_id = svo.getStaff_id();
		String staff_pwd = svo.getStaff_pwd();
//		System.out.println("================ 1. staff_id : "+staff_id);
//		System.out.println("================ 2. staff_pwd : "+staff_pwd);
		
		StaffVO db_svo = staffService.getMypage(svo.getStaff_id());
		String db_pwd = db_svo.getStaff_pwd();
//		System.out.println("================ 3. db_pwd : "+db_pwd);
		
		boolean passMatch = bcryptPasswordEncoder.matches(staff_pwd, db_pwd);
		
		if (passMatch) {
			staffService.staffDelete(staff_id);
			url = "redirect:/admin/confirm/login";
		} else {
			rttr.addFlashAttribute("staff_pwd",false);
			url = "redirect:/admin/confirn/pwdConfirm?staff_id="+svo.getStaff_id();
		}

		return url;
	}
	
	
}

















