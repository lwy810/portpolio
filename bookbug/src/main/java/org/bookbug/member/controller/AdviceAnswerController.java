package org.bookbug.member.controller;

import javax.inject.Inject;

import org.bookbug.member.service.AdviceAnswerServiceImpl;
import org.bookbug.member.vo.AnswerVO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/admin/answer/*")
public class AdviceAnswerController {

	@Inject
	private AdviceAnswerServiceImpl adviceAnswerService;
	
	
	
	@PostMapping("/register")
	public String register(AnswerVO anvo,
			@RequestParam("num") int num) throws Exception {
		
		adviceAnswerService.register(anvo);
		return "redirect:/admin/member/advice/view?advice_no="+anvo.getAdvice_no()+"&num="+num;
	}
	
	@GetMapping("/update")
	public void getOneUpdate(
			@RequestParam("num") int num,
			@RequestParam("advice_no") int advice_no,
			@RequestParam("answer_no") int answer_no,
			Model model) throws Exception{
		AnswerVO anvo = adviceAnswerService.getSelectAnswer(advice_no, answer_no);
		model.addAttribute("answer", anvo);
		model.addAttribute("num", num);
	}
	
	@PostMapping("/update")
	public void getOneUpdate(AnswerVO anvo) throws Exception {
		adviceAnswerService.getOneUpdate(anvo);
	}
}
