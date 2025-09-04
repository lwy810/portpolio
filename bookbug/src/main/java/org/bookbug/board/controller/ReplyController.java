package org.bookbug.board.controller;

import javax.inject.Inject;

import org.bookbug.board.service.ReplyService;
import org.bookbug.board.vo.ReplyVO;
import org.bookbug.member.vo.ProfileVO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/reply/*")
public class ReplyController {

	@Inject
	private ReplyService replyService;
	
	
	@GetMapping("/register")
	public void register() throws Exception {}
	
	
	@PostMapping("/register")
	public String register(ReplyVO rvo, int num) throws Exception {
		ProfileVO prvo = replyService.getProfile(rvo.getReply_writer());
		if(prvo!=null) {
			rvo.setReply_thumbnail(prvo.getProfile_thumbnail());
			System.out.println("profile_thumbnail:"+rvo.getReply_thumbnail());
		}
		replyService.register(rvo);
		
		return "redirect:/board/view?article_num="+rvo.getArticle_num()+"&num="+num;
	}
	
	
	
	@GetMapping("/update")
	public void update(
			@RequestParam("article_num") int article_num,
			@RequestParam("reply_num") int reply_num,
			Model model
			) throws Exception {
		ReplyVO rvo = new ReplyVO();
		rvo.setArticle_num(article_num);
		rvo.setReply_num(reply_num);
		ReplyVO revo = replyService.getReplyOne(rvo);
		model.addAttribute("reply", revo);
	}
	
	
	@PostMapping("/update")
	public String update(ReplyVO rvo) throws Exception {
		replyService.update(rvo);
		
		return "redirect:/board/view?article_num="+rvo.getArticle_num()+"&num=1";
	}
	
	@GetMapping("/delete")
	public String delete(
			@RequestParam("article_num") int article_num,
			@RequestParam("reply_num") int reply_num,
			@RequestParam("num") int num) throws Exception {
		System.out.println("==replycontroller==article_num?"+article_num);
		ReplyVO rvo = new ReplyVO();
		rvo.setArticle_num(article_num);
		rvo.setReply_num(reply_num);
		replyService.delete(rvo);
		
		return "redirect:/board/view?article_num="+article_num+"&num="+num;
	}

	
}
