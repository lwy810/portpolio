package org.bookbug.board.controller;

import java.util.List;

import javax.inject.Inject;

import org.bookbug.board.service.NoticeService;
import org.bookbug.board.vo.NoticeVO;
import org.bookbug.member.service.UploadFileService;
import org.bookbug.util.PageDTO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/board/notice/*")
public class NoticeController {
	
	@Inject
	private NoticeService noticeService;
	
	@Inject
	private UploadFileService uploadFileService;
	
	@GetMapping("/register")
	public void register() throws Exception{}
	
	@PostMapping("/register")
	public String register(NoticeVO nvo,
			@RequestParam("file") MultipartFile file) throws Exception{
		String savedFilename = uploadFileService.upload(file);
		nvo.setNotice_thumbnail(savedFilename);
		noticeService.register(nvo);
		return "redirect:/board/notice/list?num=1";
	}
	
	@GetMapping("/list")
	public void getNoticeList(@RequestParam("num") int num,
			@RequestParam(value="searchType", required=false, defaultValue="") String searchType,
			@RequestParam(value="keyword", required=false, defaultValue="") String keyword,
			Model model) throws Exception{
		PageDTO page = new PageDTO();
		page.setNum(num);
		page.setCount(noticeService.getNoticeCount(searchType, keyword));                                                                                                                                                                                                                                                                                                                                                                                                                                   
		page.setSearchType(searchType);
		page.setKeyword(keyword);
		System.out.println("======keyword : "+keyword );
		System.out.println("======searchType : "+searchType );
		List<NoticeVO> ntList = noticeService.getNoticeList(page.getDisplayPost(), page.getPostNum(), searchType, keyword);
		System.out.println("=============== ntlist : "+ntList);
		
		
		if (ntList.isEmpty() == true) {
			model.addAttribute("ntList", null);
			model.addAttribute("select", num);
			System.out.println("============ntList : null");
		} else {
			model.addAttribute("select", num);
			model.addAttribute("page", page);
			model.addAttribute("ntList", ntList);
		} 
	}
	
	@GetMapping("/view")
	public void getView(
			@RequestParam("num") int num,
			@RequestParam("notice_no") int notice_no, Model model) throws Exception{
		NoticeVO ntvo = noticeService.getView(notice_no);
		model.addAttribute("notice", ntvo);
		model.addAttribute("num", num);
	}
	
	@GetMapping("/update")
	public void getUpdateView(
			@RequestParam("num") int num,
			@RequestParam("notice_no") int notice_no, Model model) throws Exception{
		NoticeVO ntvo = noticeService.getView(notice_no);
		model.addAttribute("notice", ntvo);
		model.addAttribute("num", num);
	}
	
	@PostMapping("/update")
	public String getUpdateView(
			NoticeVO nvo,
			@RequestParam("file") MultipartFile file,
			@RequestParam("num") int num,
			@RequestParam("notice_no") int notice_no, Model model) throws Exception{
			String savedFilename = uploadFileService.upload(file);
			nvo.setNotice_thumbnail(savedFilename);
			noticeService.getUpdateNotice(nvo);
		return "redirect:/board/notice/list?num="+num;
	}
	
	@GetMapping("/delete")
	public String getDeleteView(
			@RequestParam("num") int num,
			@RequestParam("notice_no") int notice_no) throws Exception{
		noticeService.getDeleteView(notice_no);
		System.out.println("notice_no:"+notice_no);
		return "redirect:/board/notice/list?num="+num;
	}
}
