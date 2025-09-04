package org.bookbug.member.controller;

import java.util.List;

import javax.inject.Inject;

import org.bookbug.member.service.AdviceAnswerServiceImpl;
import org.bookbug.member.service.MemberAdviceServiceImpl;
import org.bookbug.member.service.UploadFileService;
import org.bookbug.member.vo.AdviceVO;
import org.bookbug.member.vo.AnswerVO;
import org.bookbug.util.PageDTO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/admin/member/advice/*")
public class MemberAdviceController {

 @Inject
 private MemberAdviceServiceImpl memberAdviceService;
 
 @Inject
 private UploadFileService uploadFileService;
 
 @Inject
 private AdviceAnswerServiceImpl adviceAnswerService;
 
 @GetMapping("/register")
 public void register() throws Exception{}
 
 
 @PostMapping("/register")
 public String register(AdviceVO advo,
		 @RequestParam("file") MultipartFile file) throws Exception{
	 if(file!=null) {
		 String savedFileName = uploadFileService.upload(file);
		 advo.setAdvice_thumbnail(savedFileName);
	 }else {
		 advo.setAdvice_thumbnail(advo.getAdvice_thumbnail());
	 }
	 memberAdviceService.register(advo);
	 return "redirect:/admin/member/advice/mylist?advice_client="+advo.getAdvice_client()+"&num=1";
 }
 
 @GetMapping("/list")
 public void getAdList(
		 @RequestParam("num") int num,
		 @RequestParam(value="searchType", required=false, defaultValue="title") String searchType,
		 @RequestParam(value="keyword", required=false, defaultValue="") String keyword,
		 Model model) throws Exception{
	 PageDTO page = new PageDTO();
	 page.setNum(num);
	 page.setCount(memberAdviceService.getCount(searchType, keyword));
	 page.setSearchType(searchType);
	 page.setKeyword(keyword);
	 List<AdviceVO> adList = memberAdviceService.getAdList(page.getDisplayPost(), page.getPostNum(), searchType, keyword);
	 model.addAttribute("select", num);
	 model.addAttribute("page", page);
	 model.addAttribute("adList", adList);
 }
 
 @GetMapping("/view")
 public void getOneInquiry(
		 @RequestParam("num") int num,
		 @RequestParam("advice_no") int advice_no, Model model) throws Exception{
	 AdviceVO advo = memberAdviceService.getOneInquiry(advice_no);
	 List<AnswerVO> anList = adviceAnswerService.getAnswerList(advice_no);
	 model.addAttribute("num", num);
	 model.addAttribute("anList", anList);
	 model.addAttribute("advo", advo);
 }
 
 @GetMapping("/mylist")
 public void getMyList(
		 @RequestParam("num") int num,
		 @RequestParam("advice_client") String advice_client, Model model) throws Exception{
	 if(advice_client!=null) {
		 PageDTO page = new PageDTO();
		 page.setNum(num);
		 page.setCount(memberAdviceService.getMyCount(advice_client));
		 page.setSearchType("");
		 page.setKeyword("");
		 List<AdviceVO> adList = memberAdviceService.getMyList(page.getDisplayPost(), page.getPostNum(), advice_client);	
		 model.addAttribute("adList", adList);
		 model.addAttribute("num", num);
		 model.addAttribute("page", page);	 
	 }
 }
	 @GetMapping("/update")
	 public void updateInquiry(
		 @RequestParam("num") int num,
		 @RequestParam("advice_no") int advice_no,
		 Model model) throws Exception{
		
	 AdviceVO adVo = memberAdviceService.getOneInquiry(advice_no);	
	 model.addAttribute("num", num);
	 model.addAttribute("advo", adVo);
	 }

	
	 @PostMapping("/update")
	 public String updateInquiry(AdviceVO advo,
			 @RequestParam("advice_no") int advice_no,
			 @RequestParam("file") MultipartFile file)throws Exception{
	 String savedFileName = uploadFileService.upload(file);
	 if(savedFileName!=null) {
		 advo.setAdvice_thumbnail(savedFileName);	 
	 }
	 memberAdviceService.updateInquiry(advo);
	 return "redirect:/admin/member/advice/view?advice_no="+advo.getAdvice_no()+"&num=1";
	}
	 
	 @GetMapping("/memberUpdate")
	 public void updateMemberAdvice(
		 @RequestParam("num") int num,
		 @RequestParam("advice_no") int advice_no,
		 Model model) throws Exception{
	 AdviceVO adVo = memberAdviceService.getOneInquiry(advice_no);	
	 model.addAttribute("num", num);
	 model.addAttribute("advo", adVo);
	 }

	
	 @PostMapping("/memberUpdate")
	 public String updateMemberAdvice(AdviceVO advo, 
			 @RequestParam("advice_no") int advice_no,
			 @RequestParam("file") MultipartFile file)throws Exception{
		 String savedFileName = uploadFileService.upload(file);
		 if(savedFileName!=null) {
			 advo.setAdvice_thumbnail(savedFileName);	 
		 }
		memberAdviceService.updateMemberInquiry(advo);
	 return "redirect:/admin/member/advice/view?advice_no="+advo.getAdvice_no()+"&num=1";
	}
	 
	 @GetMapping("/delete")
	 public String deleteOne(@RequestParam("advice_no") int advice_no,
			 @RequestParam("advice_client") String advice_client,
			 @RequestParam("num") int num, Model model) throws Exception{
		 memberAdviceService.deleteOne(advice_no);
		 return "redirect:/admin/member/advice/list?num="+num;
	 }
}

