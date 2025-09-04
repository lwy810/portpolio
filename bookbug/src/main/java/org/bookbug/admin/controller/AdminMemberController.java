package org.bookbug.admin.controller;

import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.bookbug.admin.service.AdminMemberServiceImpl;
import org.bookbug.member.service.MemberProfileService;
import org.bookbug.member.vo.AddressVO;
import org.bookbug.member.vo.MemberVO;
import org.bookbug.member.vo.ProfileVO;
import org.bookbug.util.PageDTO;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/admin/member/*")
public class AdminMemberController {

	@Inject
	private AdminMemberServiceImpl memberService;
	
	@Inject
	private BCryptPasswordEncoder bcryptPasswordEncoder;
	
	@Inject
	private MemberProfileService memberProfileService;

	// register
	@GetMapping("/register")
	public void registerMember() {}
	
	//memberIdCheck
	@PostMapping("/memberIdCheck")
	@ResponseBody
	public String memberIdCheck(HttpServletRequest request) throws Exception {
		String id = request.getParameter("member_id");
		System.out.println("============ 1. member_id : "+id);
		MemberVO mvo = memberService.idCheck(id);
		String result = null;
		if (mvo != null ) {	result = "success";}
		return result;
	}
	
	@GetMapping("/reg-address")
	public void getZipcode() throws Exception {}

	//zipcode
	@PostMapping("/reg-address")
	public void getZipcode(AddressVO avo, Model model) throws Exception {
		List<AddressVO> avoList = memberService.getZipcode(avo.getArea3()); 
		model.addAttribute("avoList", avoList);
//		System.out.println("======controller:"+avoList);
	}
	
	// register
	@PostMapping("/register")
	public String registerMember(@RequestParam("member_prefer") String [] member_prefer, MemberVO mvo) throws Exception {
		String pwd = bcryptPasswordEncoder.encode(mvo.getMember_pwd());
		mvo.setMember_pwd(pwd);
		String[] list = {"SF소설", "역사","비문학","만화","실용"};
		
		char [] value = new char [list.length];
		if(member_prefer != null) {
			for(int i=0; i<list.length; i++) {
				for(int j=0; j<member_prefer.length; j++) {
					if(list[i].equals(member_prefer[j])) {
						value[i] = '1';
					} else {
						value[i] = '0';
					}
				}
			}
		}
		
		mvo.setMember_prefer(new String(value));
		int result = memberService.registerMember(mvo);
		String url = null;
		
		if (result == 1) {
			url = "redirect:/admin/member/mypage?member_id="+mvo.getMember_id();
		} else {
			url = "redirect:/admin/member/register";
		}
		return url;
	}

	@GetMapping("/mypage")
	public void getMypage(@RequestParam("member_id") String member_id, Model model ) throws Exception {
		MemberVO mvo = memberService.getMypage(member_id);
		ProfileVO prvo = memberProfileService.getProfile(member_id);
		
		model.addAttribute("profile", prvo);
		model.addAttribute("member", mvo);
	}
	
	@GetMapping("/memberModify")
	public void memberModify(@RequestParam("member_id") String member_id, Model model) throws Exception {
		MemberVO mvo = memberService.getMypage(member_id);
		model.addAttribute("modify", mvo);
	}
	
	@PostMapping("/memberModify")
	public String memberModify(MemberVO mvo, HttpSession session, RedirectAttributes rttr) throws Exception {
		String pwd = mvo.getMember_pwd();
//		System.out.println("===========1.pwd : "+pwd);
		MemberVO db_mvo = memberService.getMypage(mvo.getMember_id());
		
		boolean passMatch = bcryptPasswordEncoder.matches(pwd, db_mvo.getMember_pwd());
		String url = null;
		
		if(passMatch) {
			memberService.memberModify(mvo);
			session.setAttribute("member", db_mvo);
			url = "redirect:/admin/member/mypage?member_id="+mvo.getMember_id();
		} else {
			rttr.addFlashAttribute("staff_pwd", false);
			url = "redirect:/admin/member/memberModify?staff_id="+mvo.getMember_id();
		}
		return url;
	
	}
	

	@PostMapping("/memberDelete")
	public String memberDelete(MemberVO mvo, RedirectAttributes rttr) throws Exception {
		String url = null;
		String member_id = mvo.getMember_id();
		String member_pwd = mvo.getMember_pwd();
//		System.out.println("================ 1. member_id : "+member_id);
//		System.out.println("================ 2. member_pwd : "+member_pwd);
		
		MemberVO db_mvo = memberService.getMypage(mvo.getMember_id());
		String db_pwd = db_mvo.getMember_pwd();
//		System.out.println("================ 3. db_pwd : "+db_pwd);
		
		boolean passMatch = bcryptPasswordEncoder.matches(member_pwd, db_pwd);
		
		if (passMatch) {
			memberService.memberDelete(member_id);
			url = "redirect:/admin/confirm/login";
		} else {
			rttr.addFlashAttribute("staff_pwd",false);
			url = "redirect:/admin/confirn/pwdConfirm?staff_id="+mvo.getMember_id();
		}

		return url;
	}
	
	@GetMapping("/list")
	public void getMemberList(
		@RequestParam("num") int num,
		@RequestParam(value="searchType", required=false, defaultValue="")String searchType,
		@RequestParam(value="keyword", required=false, defaultValue="")String keyword, Model model) throws Exception{
		PageDTO page = new PageDTO();
		page.setNum(num);
		page.setCount(memberService.getCount(searchType, keyword));
		page.setSearchType(searchType);
		page.setKeyword(keyword);
		List<MemberVO> memberList = memberService.getMemberList(page.getDisplayPost(), page.getPostNum(), searchType, keyword);
		System.out.println("memberList:"+memberList);
		model.addAttribute("page", page);
		model.addAttribute("select", num);
		model.addAttribute("memberList", memberList);
	}

	
}