package org.bookbug.board.controller;

import java.util.List;

import javax.inject.Inject;

import org.bookbug.board.service.BoardService;
import org.bookbug.board.service.ReplyService;
import org.bookbug.board.vo.BoardVO;
import org.bookbug.board.vo.ReplyVO;
import org.bookbug.member.vo.ProfileVO;
import org.bookbug.util.PageDTO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/board/*")
public class BoardController {
	
	@Inject
	private BoardService boardService;
	
	@Inject
	private ReplyService replyService;
	

	@GetMapping("/register")
	public void register() throws Exception{
		//System.out.println("===1===");
	}
	
	@PostMapping("/register")
	public String register(BoardVO bvo) throws Exception{
		ProfileVO prvo = boardService.getProfile(bvo.getArticle_writer());
		if(prvo!=null) {
			bvo.setArticle_thumbnail(prvo.getProfile_thumbnail());
		}
		boardService.register(bvo);
		return "redirect:/board/list?num=1";
	}
	
	@GetMapping("/view")
	public void getBoardOne(@RequestParam("article_num") int article_num, @RequestParam("num") int num, Model model) throws Exception{
		BoardVO bvo = boardService.getBoardOne(article_num);
		boardService.upCount(article_num);
		List<ReplyVO> replyList = replyService.getReplyList(article_num);
		model.addAttribute("replyList", replyList);
		model.addAttribute("bvo", bvo);
		model.addAttribute("num", num);
	}
	
	@GetMapping("/list")
	public void getBoardList(
			@RequestParam("num") int num,
			@RequestParam(value="searchType", required=false, defaultValue="title") String searchType,
			@RequestParam(value="keyword", required=false, defaultValue="") String keyword,
			Model model) throws Exception{
		System.out.println(searchType);
		System.out.println(keyword);
		PageDTO page = new PageDTO();
		page.setNum(num);
		//System.out.println("==bcontroller==pagenum="+page.getNum());
		page.setCount(boardService.getCount(searchType, keyword));
		page.setSearchType(searchType);
		page.setKeyword(keyword);
		List<BoardVO> bList = boardService.getBoardList(page.getDisplayPost(), page.getPostNum(), searchType, keyword);
		model.addAttribute("page", page);
		model.addAttribute("list", bList);
		model.addAttribute("select", num);
	}
	
	@GetMapping("/delete")
	public String delete(@RequestParam("article_num") int article_num, @RequestParam("num") int num) throws Exception{
			boardService.delete(article_num);
		return "redirect:/board/list?num="+num;
	}
	
	@GetMapping("/update")
	public void update(@RequestParam("article_num") int article_num, 
			@RequestParam("num") int num, Model model) throws Exception{
			BoardVO bvo = boardService.getBoardOne(article_num);
			model.addAttribute("num", num);
			model.addAttribute("update", bvo);	
	}
	
	@PostMapping("/update")
	public String update(BoardVO bvo, @RequestParam("num") int num, Model model) throws Exception{
			boardService.update(bvo);
		return "redirect:/board/view?article_num="+bvo.getArticle_num()+"&num="+num;	
	}
}
