package org.bookbug.member.controller;

import java.time.LocalDateTime;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.bookbug.admin.persistence.AdminMemberPersistence;
import org.bookbug.admin.service.AdminBorrowService;
import org.bookbug.admin.vo.BorrowVO;
import org.bookbug.member.service.MemberMylibraryService;
import org.bookbug.member.vo.InterestedBookVO;
import org.bookbug.member.vo.MemberVO;
import org.bookbug.member.vo.ReservationBookVO;
import org.bookbug.util.PageDTO;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/admin/member/mylibrary")
public class MemberMylibraryController {

	@Inject
	private MemberMylibraryService memberMylibraryService;
	
	@Inject
	private AdminBorrowService adminBorrowService;
	
	@Inject
	private AdminMemberPersistence adminMemberPersistence;
	

	@GetMapping("/borrow_current_list")
	public void getMyBorrowedCurrentList (
			@RequestParam("num") int num, 
			@RequestParam("member_id") String member_id,
			@RequestParam(value="searchType", required=false, defaultValue="") String searchType,
			@RequestParam(value="keyword", required=false, defaultValue="") String keyword,
			Model model
			) throws Exception{
		
		PageDTO page = new PageDTO();
		page.setNum(num);
		page.setCount(adminBorrowService.getMemberCount(member_id));
		page.setKeyword(keyword);
		page.setSearchType(searchType);
		
		List<BorrowVO> brvo = memberMylibraryService.getMyBorrowedCurrentList(page.getDisplayPost(), page.getPostNum(), searchType, keyword, member_id);
		
		for (int i=0; i<brvo.size(); i++) {
			System.out.println("============brvo : "+brvo.get(i).getBorrow_start());
			System.out.println("============brvo : "+brvo.get(i).getBorrow_end());
			System.out.println("============brvo : "+brvo.get(i).getBorrow_state());
			System.out.println("============brvo : "+brvo.get(i).getBook_title());
		}
		System.out.println("============page : "+page.getCount());
		System.out.println("============brvo : "+num);

		
		model.addAttribute("selectNum", num);
		model.addAttribute("page", page);
		model.addAttribute("borrow_current_list", brvo);
	}
	
	@GetMapping("/borrow_list")
	public void getMyBorrowedList (
			@RequestParam("num") int num, 
			@RequestParam("member_id") String member_id,
			@RequestParam(value="searchType", required=false, defaultValue="") String searchType,
			@RequestParam(value="keyword", required=false, defaultValue="") String keyword,
			Model model
			) throws Exception{
		
		PageDTO page = new PageDTO();
		page.setNum(num);
		page.setCount(adminBorrowService.getMemberCount(member_id));
		page.setKeyword(keyword);
		page.setSearchType(searchType);
		
		List<BorrowVO> brvo = memberMylibraryService.getMyBorrowedList(page.getDisplayPost(), page.getPostNum(), searchType, keyword, member_id);
		
		for (int i=0; i<brvo.size(); i++) {
			System.out.println("============brvo : "+brvo.get(i).getBorrow_start());
			System.out.println("============brvo : "+brvo.get(i).getBorrow_end());
			System.out.println("============brvo : "+brvo.get(i).getBorrow_state());
			System.out.println("============brvo : "+brvo.get(i).getBook_title());
		}
		System.out.println("============page : "+page.getCount());
		System.out.println("============brvo : "+num);

		
		model.addAttribute("selectNum", num);
		model.addAttribute("page", page);
		model.addAttribute("borrow_list", brvo);
	}
	
	
	@PostMapping("/reservationRegister")
	@ResponseBody
	@Transactional
	public String reservationRegister (HttpServletRequest request, Model model) throws Exception {
		String member_id = request.getParameter("member_id");
		String book_id = request.getParameter("book_id");
		String msg = null;
		
		int semiCount = memberMylibraryService.getReservationRegisterCount(book_id);
		System.out.println("1 : "+semiCount);
		System.out.println("2 book_id: "+book_id);
		
		if (semiCount > 0) {
			msg = "finish";
		} else {

			LocalDateTime currentDate = LocalDateTime.now();
			
			String currentYear = Integer.toString(currentDate.getYear());
			String currentMonth = Integer.toString(currentDate.getMonthValue());
			String currentDay = Integer.toString(currentDate.getDayOfMonth());
			
			if (currentMonth.length() == 1) {currentMonth = "0"+currentMonth;}
			
			if (currentDay.length() == 1) {currentDay = "0"+currentDay;}
			
			MemberVO mvo = adminMemberPersistence.getMypage(member_id);
			System.out.println(mvo.getMember_reservationCnt());
			int db_reservationCnt = mvo.getMember_reservationCnt()+1;
			System.out.println(db_reservationCnt);
			
			String reservationCnt = Integer.toString(db_reservationCnt);
			
			if (reservationCnt.length() == 1) {reservationCnt = "00"+reservationCnt;}
			else if (reservationCnt.length() == 2) {reservationCnt = "0"+reservationCnt;}
			
			System.out.println(currentYear);
			System.out.println(currentMonth);
			System.out.println(currentDay);
			
			String reservation_num = member_id+"_"+currentYear+currentMonth+currentDay+"_"+reservationCnt;
			
			ReservationBookVO brvo = new ReservationBookVO();
			brvo.setReservation_num(reservation_num);
			brvo.setMember_id(member_id);
			brvo.setBook_id(book_id);
			
			int result = memberMylibraryService.reservationRegister(brvo);
			System.out.println("2 : "+result);
			
			if (result > 0 ) {
				adminMemberPersistence.reservationCntUp(member_id);
				msg = "success";
				System.out.println();
			}
		}
		
		return msg;
	}
	
	
	@GetMapping("/reservation_book_list")
	public void getReservationBookList (
			@RequestParam("num") int num, 
			@RequestParam("member_id") String member_id,
			@RequestParam(value="searchType", required=false, defaultValue="") String searchType,
			@RequestParam(value="keyword", required=false, defaultValue="") String keyword,
			Model model
			) throws Exception{
		
		System.out.println("=============== member_id : "+member_id);
		
		PageDTO page = new PageDTO();
		page.setNum(num);
		int count =memberMylibraryService.getReservationBookCount(member_id);
		page.setCount(count);
		page.setKeyword(keyword);
		page.setSearchType(searchType);
		
		List<ReservationBookVO> rbvo = memberMylibraryService.getReservationBookList(page.getDisplayPost(), page.getPostNum(), searchType, keyword, member_id);
		
		if (rbvo != null) {
			for (int i=0; i<rbvo.size(); i++) {
				if (rbvo.get(i).getBorrow_end() != null) {
					System.out.println("============1. rbvo Borrow_end: "+rbvo.get(i).getBorrow_end());
					String getBorrow_end = rbvo.get(i).getBorrow_end().substring(0,10);
					rbvo.get(i).setBorrow_end(getBorrow_end);
					System.out.println("============2. rbvo Borrow_end: "+rbvo.get(i).getBorrow_end());
				}
			}
		}
		
		
		model.addAttribute("selectNum", num);
		model.addAttribute("page", page);
		model.addAttribute("reservation_book_list", rbvo);
	}
	
	
	@PostMapping("/interestedRegister")
	@ResponseBody
	@Transactional
	public String interestedRegister (HttpServletRequest request, Model model) throws Exception {
		String member_id = request.getParameter("member_id");
		String book_id = request.getParameter("book_id");
		String msg = null;
		
		int semiCount = memberMylibraryService.getInterestedRegisterCount(book_id);
		
		if (semiCount != 0) {
			msg = "finish";
		} else {
			LocalDateTime currentDate = LocalDateTime.now();
			
			String currentYear = Integer.toString(currentDate.getYear());
			String currentMonth = Integer.toString(currentDate.getMonthValue());
			String currentDay = Integer.toString(currentDate.getDayOfMonth());
			
			if (currentMonth.length() == 1) {currentMonth = "0"+currentMonth;}
			
			if (currentDay.length() == 1) {currentDay = "0"+currentDay;}
			
			MemberVO mvo = adminMemberPersistence.getMypage(member_id);
			System.out.println(mvo.getMember_interestedCnt());
			int db_interestedCnt = mvo.getMember_interestedCnt()+1;
			System.out.println(db_interestedCnt);
			
			String interestedCnt = Integer.toString(db_interestedCnt);

			if (interestedCnt.length() == 1) {interestedCnt = "00"+interestedCnt;}
			else if (interestedCnt.length() == 2) {interestedCnt = "0"+interestedCnt;}
			
			System.out.println(currentYear);
			System.out.println(currentMonth);
			System.out.println(currentDay);
			
			String interested_book_num = member_id+"_"+currentYear+currentMonth+currentDay+"_"+interestedCnt;
			
			InterestedBookVO ibvo = new InterestedBookVO();
			ibvo.setInterested_book_num(interested_book_num);
			ibvo.setMember_id(member_id);
			ibvo.setBook_id(book_id);
			
			int result = memberMylibraryService.interestedRegister(ibvo);

			if (result > 0 ) {
				adminMemberPersistence.interestedCntUp(member_id);
				msg = "success";
			} 
		}
		
		return msg;
	}
	
	
	@GetMapping("/interested_book_list")
	public void getInterestedBookList (
			@RequestParam("num") int num, 
			@RequestParam("member_id") String member_id,
			@RequestParam(value="searchType", required=false, defaultValue="") String searchType,
			@RequestParam(value="keyword", required=false, defaultValue="") String keyword,
			Model model
			) throws Exception{
		
		System.out.println("=============== member_id : "+member_id);
		
		PageDTO page = new PageDTO();
		page.setNum(num);
		int count =memberMylibraryService.getReservationBookCount(member_id);
		page.setCount(count);
		page.setKeyword(keyword);
		page.setSearchType(searchType);
		
		List<InterestedBookVO> ibvo = memberMylibraryService.getInterestedBookList(page.getDisplayPost(), page.getPostNum(), searchType, keyword, member_id);
		System.out.println(ibvo.size());
		
		for (int i=0; i<ibvo.size(); i++) {
			
			System.out.println("============ibvo Book_id() : "+ibvo.get(i).getBook_id());
			System.out.println("============ibvo Interested_Book_num: "+ibvo.get(i).getInterested_Book_num());
		}
		
		System.out.println("============page : "+page.getCount());
		System.out.println("============ibvo : "+num);

		model.addAttribute("selectNum", num);
		model.addAttribute("page", page);
		model.addAttribute("interested_book_list", ibvo);
	}
	
	@GetMapping("/interested_book_card")
	public void getInterestedBookCard (
			@RequestParam("num") int num, 
			@RequestParam("member_id") String member_id,
			@RequestParam(value="searchType", required=false, defaultValue="") String searchType,
			@RequestParam(value="keyword", required=false, defaultValue="") String keyword,
			Model model
			) throws Exception{
		
		System.out.println("=============== member_id : "+member_id);
		
		PageDTO page = new PageDTO();
		page.setNum(num);
		int count =memberMylibraryService.getReservationBookCount(member_id);
		page.setCount(count);
		page.setKeyword(keyword);
		page.setSearchType(searchType);
		
		List<InterestedBookVO> ibvo = memberMylibraryService.getInterestedBookCard(searchType, keyword, member_id);
		System.out.println(ibvo.size());
		
		for (int i=0; i<ibvo.size(); i++) {
			
			System.out.println("============ibvo Book_id() : "+ibvo.get(i).getBook_id());
			System.out.println("============ibvo Interested_Book_num: "+ibvo.get(i).getInterested_Book_num());
		}
		
		System.out.println("============page : "+page.getCount());
		System.out.println("============ibvo : "+num);

		model.addAttribute("selectNum", num);
		model.addAttribute("page", page);
		model.addAttribute("interested_book_list", ibvo);
	}
	
	
	
	
}
