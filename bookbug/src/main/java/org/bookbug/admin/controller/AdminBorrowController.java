package org.bookbug.admin.controller;

import java.util.List;

import javax.inject.Inject;

import org.bookbug.admin.service.AdminBorrowService;
import org.bookbug.admin.vo.BorrowVO;
import org.bookbug.book.persistence.BookPersistence;
import org.bookbug.book.vo.BookVO;
import org.bookbug.member.persistence.MemberMylibraryPersistence;
import org.bookbug.member.vo.MemberVO;
import org.bookbug.util.PageDTO;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/admin/borrow/*")
public class AdminBorrowController {
	
	@Inject
	private AdminBorrowService adminBorrowService;
	
	@Inject
	private BookPersistence bookPersistence;
	
	@Inject
	private MemberMylibraryPersistence memberMylibraryPersistence;
	
	
	@GetMapping("/register")
	public void register() throws Exception{}
	
	@Transactional
	@PostMapping("/register")
	public String register(BorrowVO brvo) throws Exception{
		brvo.setBorrow_state("대출중");
		String book_rental_able = "대출 불가";
		adminBorrowService.register(brvo);
		bookPersistence.bookBorrowCntUp(brvo.getBook_id());
		bookPersistence.bookBorrowModify(book_rental_able, brvo.getBook_id());
		return "redirect:/admin/borrow/list?num=1";
	}
	
	@GetMapping("/reg-member")
	public void getMember() throws Exception{}
	
	@Transactional
	@PostMapping("/reg-member")
	public void getMember(MemberVO mvo, Model model) throws Exception{
		List<MemberVO> mList = adminBorrowService.getMember(mvo.getMember_name());
		String member_id = null;
		int borrowCurrentCnt = 0;
		
		for (int i=0 ;i<mList.size(); i++) {
			member_id = mList.get(i).getMember_id();
			System.out.println("=============member_id : "+member_id);
			borrowCurrentCnt = memberMylibraryPersistence.getMyBorrowedCurrentCount(member_id);
			System.out.println("=============borrowCurrentCnt : "+borrowCurrentCnt);
			mList.get(i).setMember_borrowCnt(borrowCurrentCnt);
			
		}
		
		model.addAttribute("mList", mList);
	}
	
	@GetMapping("/reg-book")
	public void getBook() throws Exception{}
	
	@PostMapping("/reg-book")
	public void getBook(BookVO bkvo, Model model) throws Exception{
		List<BookVO> bkList = adminBorrowService.getBook(bkvo.getBook_title());
		model.addAttribute("bkList", bkList);
	}
	
	@GetMapping("/list")
	public void getBorrowedList(BorrowVO brvo,
			@RequestParam("num") int num,
			@RequestParam(value="searchType", required=false, defaultValue="") String searchType, 
			@RequestParam(value="keyword", required=false, defaultValue="") String keyword, Model model) throws Exception{
		System.out.println("=============searchType : "+searchType);
		System.out.println("=============keyword : "+keyword);
		
		
		PageDTO page = new PageDTO();
		page.setNum(num);
		page.setCount(adminBorrowService.getCount(searchType, keyword));
		int count = page.getCount();
		System.out.println("=============count : "+count);
		page.setSearchType(searchType);
		page.setKeyword(keyword);
		
		List<BorrowVO> brList = adminBorrowService.getBorrowedList(page.getDisplayPost(), page.getPostNum(), searchType, keyword);
		 
		for(int i =0;i<brList.size();i++) {
			String start = brList.get(i).getBorrow_start();
			String end = brList.get(i).getBorrow_end();
			String stdate = start.substring(0, 10);
			String eddate = end.substring(0, 10);
			brvo.setBorrow_start(stdate);
			brvo.setBorrow_end(eddate);
		}
		 
		if (brList.isEmpty() == true) {
			System.out.println("=============brList : null");
			model.addAttribute("brList", null);
			model.addAttribute("select", num);
		} else {
			System.out.println("=============brList : exist");
			model.addAttribute("select",num);
			model.addAttribute("page", page);
			model.addAttribute("brList", brList);
		}
	}

	@Transactional
	@GetMapping("/update-state")
	public String getUpdateState(
			@RequestParam("borrow_state") String borrow_state,
			@RequestParam("book_id") String book_id,
			@RequestParam("borrow_id") int borrow_id) throws Exception{
		String book_rental_able = null;
		
		
		if (borrow_state.equals("대출중")) {
			book_rental_able = "대출 불가";
		} else if (borrow_state.equals("반납")) {
			book_rental_able = "대출 가능";
		}
		
		adminBorrowService.getUpdateState(borrow_state, borrow_id, book_id);
		bookPersistence.bookBorrowModify(book_rental_able, book_id);
		return "redirect:/admin/borrow/list?num=1";
	}
}







