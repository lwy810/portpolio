package org.bookbug.member.controller;

import java.util.List;

import javax.inject.Inject;

import org.bookbug.member.service.MemberSuggestionServiceImpl;
import org.bookbug.member.service.UploadFileService;
import org.bookbug.member.vo.SuggestionVO;
import org.bookbug.util.PageDTO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/admin/member/suggestion/*")
public class MemberSuggestionController {

	@Inject
	private MemberSuggestionServiceImpl memberSuggestionService;
	
	@Inject
	private UploadFileService uploadFileService;
	
	@GetMapping("/register")
	public void register() throws Exception{}
	
	@PostMapping("/register")
	public String register(SuggestionVO sgvo,
			@RequestParam("file") MultipartFile file, 
			@RequestParam("suggestion_select") String suggestion_select, 
			@RequestParam("input_direct") String input_direct) throws Exception{
		String savedFileName = uploadFileService.upload(file);
		sgvo.setSuggestion_thumbnail(savedFileName);
		if(suggestion_select!=null) {
			if(suggestion_select.equals("direct")) {
				sgvo.setSuggestion_email(sgvo.getSuggestion_email()+"@"+input_direct);
			}else {
				sgvo.setSuggestion_email(sgvo.getSuggestion_email()+"@"+suggestion_select);	
			}
		}
		memberSuggestionService.register(sgvo);
		return "redirect:/admin/member/suggestion/mylist?&suggestion_proposer="+sgvo.getSuggestion_proposer()+"&num=1";
	}
	
	@GetMapping("/list")
	public void getList(
			@RequestParam("num") int num, 
			@RequestParam(value="searchType", required=false, defaultValue="booktitle") String searchType,
			@RequestParam(value="keyword", required=false, defaultValue="") String keyword,
			Model model) throws Exception{
		PageDTO page = new PageDTO();
		page.setNum(num);
		page.setCount(memberSuggestionService.getCount(searchType, keyword));
		page.setSearchType(searchType);
		page.setKeyword(keyword);
		List<SuggestionVO> sgList =  memberSuggestionService.getSgList(page.getDisplayPost(), page.getPostNum(),searchType, keyword);
		model.addAttribute("page", page);
		model.addAttribute("select", num);
		model.addAttribute("sgList", sgList);
	}
	
	/*작업중 20241203*/
	@GetMapping("/view")
	public void getOneRecord(
			@RequestParam(value="suggestion_proposer", required=false, defaultValue="") String suggestion_proposer, 
			@RequestParam("suggestion_no") int suggestion_no, 
			@RequestParam("num") int num,
			Model model) throws Exception{
		SuggestionVO sgvo = memberSuggestionService.getOneRecord(suggestion_no);
		model.addAttribute("num", num);
		model.addAttribute("suggestion", sgvo);
	}
	
	@GetMapping("/mylist")
	public void mylist(
			@RequestParam("num") int num,
			@RequestParam("suggestion_proposer") String suggestion_proposer, Model model) throws Exception {
		if(suggestion_proposer!=null) {
			PageDTO page = new PageDTO();
			page.setNum(num);
			page.setCount(memberSuggestionService.getMyCount(suggestion_proposer));
			page.setSearchType("");
			page.setKeyword("");
			List<SuggestionVO> sgList = memberSuggestionService.getMyList(page.getDisplayPost(), page.getPostNum(), suggestion_proposer);
			model.addAttribute("page", page);
			model.addAttribute("num", num);
			model.addAttribute("sgList", sgList);
		}
		
	}
	
	@GetMapping("/update")
	public void getOneUpdate(
			@RequestParam("num") int num,
			@RequestParam("suggestion_no") int suggestion_no,
			Model model) throws Exception{
		SuggestionVO sgvo = memberSuggestionService.getOneRecord(suggestion_no);
		model.addAttribute("suggestion", sgvo);
		model.addAttribute("num", num);
	}
	
	@PostMapping("/update")
	public String getOneUpdate(SuggestionVO sgvo,
			@RequestParam("num") int num,
		@RequestParam("file") MultipartFile file) throws Exception{
		String savedFilename = uploadFileService.upload(file);
		if(savedFilename!=null) {
			sgvo.setSuggestion_thumbnail(savedFilename);
		}
		memberSuggestionService.getOneUpdate(sgvo);
		return "redirect:/admin/member/suggestion/view?suggestion_no="+sgvo.getSuggestion_no()+"&num="+num;
	}
	
	@GetMapping("/delete")
	public String deleteOne(@RequestParam("suggestion_no")int suggestion_no,
			@RequestParam("suggestion_proposer")String suggestion_proposer,
			@RequestParam("num") int num) throws Exception{
		memberSuggestionService.deleteOne(suggestion_no);
		return "redirect:/admin/member/suggestion/mylist?suggestion_proposer="+suggestion_proposer+"&num="+num;
	}
	
	@GetMapping("/updateStatus")
	public String updateStatus(
			@RequestParam("suggestion_status") String suggestion_status,
			@RequestParam("suggestion_no") int suggestion_no) throws Exception{
		memberSuggestionService.updateStatus(suggestion_no, suggestion_status);
		return "redirect:/admin/member/suggestion/list?num=1";
	}
	
	@GetMapping("/deleteRow")
	public String deleteRow(
			@RequestParam("suggestion_no") int suggestion_no) throws Exception{
		memberSuggestionService.deleteRow(suggestion_no);
		return "redirect:/admin/member/suggestion/list?num=1";
	}
	
}
