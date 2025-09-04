package org.bookbug.book.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.bookbug.book.service.BookService;
import org.bookbug.book.vo.BookVO;
import org.bookbug.book.vo.CategoryVO;
import org.bookbug.member.service.UploadFileService;
import org.bookbug.util.PageDTO;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/book/*")
public class BookController {
	
	@Inject
	private BookService bookService;
	
	@Inject
	private UploadFileService uploadFileService;
	
	
	@GetMapping("/search") 
	public void search() throws Exception {};
	
	@GetMapping("/subject-search") 
	public void subjectSearch(@RequestParam("category_depth_1") String category_depth_1, Model model) throws Exception {
		System.out.println(category_depth_1);
		
		List <String> getCategory2List =  bookService.getCategory2List(category_depth_1);	
		
		List <CategoryVO> db_category_list_0 = new ArrayList <CategoryVO>();
		List <CategoryVO> db_category_list_1 = new ArrayList <CategoryVO>();
		List <CategoryVO> db_category_list_2 = new ArrayList <CategoryVO>();
		List <CategoryVO> db_category_list_3 = new ArrayList <CategoryVO>();
		List <CategoryVO> db_category_list_4 = new ArrayList <CategoryVO>();
		List <CategoryVO> db_category_list_5 = new ArrayList <CategoryVO>();
		List <CategoryVO> db_category_list_6 = new ArrayList <CategoryVO>();
		List <CategoryVO> db_category_list_7 = new ArrayList <CategoryVO>();
		List <CategoryVO> db_category_list_8 = new ArrayList <CategoryVO>();
		List <CategoryVO> db_category_list_9 = new ArrayList <CategoryVO>();
		

		for (int i=0; i<getCategory2List.size(); i++) {
			System.out.println(getCategory2List.get(i));
			if (i == 0) {
				db_category_list_0 = bookService.getCategorySubList(getCategory2List.get(i));
			} else if (i == 1 ) {
				db_category_list_1 = bookService.getCategorySubList(getCategory2List.get(i));
			} else if (i == 2 ) {
				db_category_list_2 = bookService.getCategorySubList(getCategory2List.get(i));
			} else if (i == 3 ) {
				db_category_list_3 = bookService.getCategorySubList(getCategory2List.get(i));
			} else if (i == 4 ) {
				db_category_list_4 = bookService.getCategorySubList(getCategory2List.get(i));
			} else if (i == 5 ) {
				db_category_list_5 = bookService.getCategorySubList(getCategory2List.get(i));
			} else if (i == 6 ) {
				db_category_list_6 = bookService.getCategorySubList(getCategory2List.get(i));
			} else if (i == 7 ) {
				db_category_list_7 = bookService.getCategorySubList(getCategory2List.get(i));
			} else if (i == 8 ) {
				db_category_list_8 = bookService.getCategorySubList(getCategory2List.get(i));
			} else if (i == 9 ) {
				db_category_list_9 = bookService.getCategorySubList(getCategory2List.get(i));
			}
		}
		
		model.addAttribute("db_category_list_0", db_category_list_0);
		model.addAttribute("db_category_list_1", db_category_list_1);
		model.addAttribute("db_category_list_2", db_category_list_2);
		model.addAttribute("db_category_list_3", db_category_list_3);
		model.addAttribute("db_category_list_4", db_category_list_4);
		model.addAttribute("db_category_list_5", db_category_list_5);
		model.addAttribute("db_category_list_6", db_category_list_6);
		model.addAttribute("db_category_list_7", db_category_list_7);
		model.addAttribute("db_category_list_8", db_category_list_8);
		model.addAttribute("db_category_list_9", db_category_list_9);

	}
	

	@GetMapping("/list") 
	public void getBookList(
			@RequestParam("num") int num,
			@RequestParam(value="searchType", required=false, defaultValue="") String searchType,
			@RequestParam(value="keyword", required=false, defaultValue="") String keyword,
			@RequestParam(value="searchType2", required=false, defaultValue="") String searchType2,
			@RequestParam(value="keyword2", required=false, defaultValue="") String keyword2, Model model) throws Exception {
			
		System.out.println("==========1. num : "+num);
		PageDTO page = new PageDTO();
		page.setSearchType(searchType);
		page.setKeyword(keyword);
		page.setSearchType2(searchType2);
		page.setKeyword2(keyword2);
		page.setSearchTypeKeyword(searchType, keyword);
		 page.setSearchTypeKeyword2(searchType2, keyword2);
		 
		String setSearchType = page.getSearchType();
		String setKeyword = page.getKeyword();
		String setSearchType2 = page.getSearchType2();
		String setKeyword2 = page.getKeyword2();
		
		String setSearchTypeKeyword = page.getSearchTypeKeyword();
		String setSearchTypeKeyword2 = page.getSearchTypeKeyword2();
		System.out.println("==========searchType : "+setSearchType);
		System.out.println("==========keyword : "+setKeyword);
		System.out.println("==========searchType : "+setSearchType2);
		System.out.println("==========keyword : "+setKeyword2);
		System.out.println("==========setSearchTypeKeyword : "+setSearchTypeKeyword);
		System.out.println("==========setSearchTypeKeyword2 : "+setSearchTypeKeyword2);
		page.setNum(num);
		page.setCount(bookService.getBookCount(searchType, keyword));
		
		int postNum = page.getPostNum();
		int displayPost = page.getDisplayPost();
		
		System.out.println("==========con1 postNum : "+postNum);
		System.out.println("==========con2 displayPost : "+displayPost);
		
		String getsearchType= page.getSearchType();
		String getKeyword= page.getKeyword();
		String getsearchType2= page.getSearchType2();
		String getKeyword2= page.getKeyword2();
		
		if (getKeyword2 == "" || (getsearchType.equals(getsearchType2) == true && getKeyword.equals(getKeyword2) == true)) {
			System.out.println("==========con2 postNum : "+page.getPostNum());
			System.out.println("==========con2 displayPost : "+page.getDisplayPost());
			List <BookVO> bookVo = bookService.getBookList(postNum, displayPost, searchType, keyword);
			for(int i=0; i<bookVo.size(); i++) {
				System.out.println(bookVo.get(i).getBook_id());
			}
			model.addAttribute("book_list", bookVo);
			
		} else if (getKeyword2 != null && (getsearchType.equals(getsearchType2) == false )) {
			List <BookVO> bookReSearchVo = bookService.getReSearchList(postNum, displayPost, searchType, keyword, searchType2, keyword2);
			model.addAttribute("book_list", bookReSearchVo);
		}

		model.addAttribute("page", page);
		model.addAttribute("selectNum", num);
	}
	
	
	@GetMapping("/register") 
	public void register(Model model) throws Exception {
		List <String> db_category_depth_1 =  bookService.getCategoryDepth_1();	
		model.addAttribute("category_depth1_list", db_category_depth_1);
	};
	
	@PostMapping("/categoryDepth2Search") 
	@ResponseBody()
	public List <String> categorySearch(HttpServletRequest request, Model model) throws Exception {
		String category_depth_1 = request.getParameter("category_depth_1");
		System.out.println(category_depth_1);
		String result = null;
		List <String> db_category_depth_2 = new ArrayList <String>();
		
		if (category_depth_1 != "키워드1") {
			db_category_depth_2 =  bookService.getCategoryDepth_2(category_depth_1);

			for (int i=0; i<db_category_depth_2.size(); i++) {
				System.out.println(db_category_depth_2.get(i));
			}
			
			model.addAttribute("category_depth2_list", db_category_depth_2);

			if (db_category_depth_2 != null) {
				result ="success";
			}
			System.out.println(result);
		}
		
		return db_category_depth_2;
	};
	
	@PostMapping("/categoryDepth3Search") 
	@ResponseBody()
	public List <CategoryVO> categoryDepth3Search(HttpServletRequest request, Model model) throws Exception {
		String category_depth_2 = request.getParameter("category_depth_2");
		
		System.out.println(category_depth_2);
		String result = null;
		List <CategoryVO> cvo = new ArrayList <CategoryVO>();
		
		
		cvo =  bookService.getCategoryNumberName(category_depth_2);
		
		for (int i=0; i<cvo.size(); i++) {
			System.out.println(cvo.get(i));
		}
		
		model.addAttribute("category_number_name_list", cvo);
		
		if (cvo != null) {
			result ="success";
		}
		System.out.println(result);
		
		return cvo;
	};
	

	@Transactional
	@PostMapping("/register")
	public String register(
			BookVO bvo, CategoryVO cvo, 
			@RequestParam("file") MultipartFile file) throws Exception {
		
		System.out.println(file);
		String savedFileName = uploadFileService.upload(file);
		
		bvo.setBook_thumbnail(savedFileName);
		
		bvo.setAuthorSign(bvo.getBook_author(), bvo.getBook_title());
		String authorSign = bvo.getAuthorSign();
				
		LocalDateTime localDateTime = LocalDateTime.now();
		int year = localDateTime.getYear();
		String category_number = cvo.getCategory_number();
		
		int book_category_count = bookService. getBook_category_count(category_number);
//		System.out.println("================== book_count : " +book_category_count);
		book_category_count = book_category_count + 1;
		bvo.setBook_count(book_category_count);
		String book_count = bvo.getBook_count();
			
		String book_id = bvo.getBook_type()+"-"+category_number+"-"+year+"-"+book_count;
		System.out.println("=============== book_count : "+book_count);
		
		bvo.setBook_id(book_id);
		
		bvo.setPre_book_category_type(category_number);
		String book_category_type = bvo.getPre_book_category_type();
		
		int same_book_count = bookService. getSameBook_count(bvo.getBook_title())+1;
	
		String book_callnumber = category_number + "."+authorSign+".v"+same_book_count;
		System.out.println(book_callnumber);
		
		bvo.setBook_callnumber(book_callnumber);
		bvo.setBook_category_type(book_category_type);
		bvo.setBook_category(category_number);
		
		bookService.register(bvo);
	
		return "redirect:/book/list?num=1";
	}
		
	
	@GetMapping("/subject-search-list") 
	public void getSubjectList (
			@RequestParam("num") int num,
			@RequestParam("book_category") String book_category, Model model) throws Exception {
		System.out.println("===========category_number :"+book_category);
		
		int count = bookService.getSubjectCount(book_category);
		System.out.println("==============3. num : "+num);
		PageDTO page = new PageDTO();
		page.setNum(num);
		page.setCount(count);
		System.out.println("==============4. num: "+num);
		System.out.println("5. count=========="+count);
		List <BookVO> bvo = bookService.getSubjectList(page.getPostNum(), page.getDisplayPost(), book_category);
	
		System.out.println(bvo.size());

		System.out.println("==============12. num : "+num);
		model.addAttribute("book_list", bvo);
		model.addAttribute("select", num);
		model.addAttribute("page", page);	
	}
	
	
	@Transactional
	@GetMapping("/view") 
	public void getBookOne ( 
			@RequestParam("book_id") String book_id, 
			@RequestParam("book_category_type") String book_category_type, Model model) throws Exception {

		System.out.println("===========book_id :"+book_id);
		
		List <BookVO> bvo = bookService.getBookOne(book_id);
		String book_category = bvo.get(0).getBook_category();
		
		List <CategoryVO> cvo = bookService.getCategoryList(book_category);
		
		List <String> category_depth_1 =  bookService.getCategoryDepth_1();	
		List <String> category_depth_2 = bookService.getCategoryDepth_2(cvo.get(0).getCategory_depth_1());
		List <CategoryVO> category_name = bookService.getCategoryNumberName(cvo.get(0).getCategory_depth_2());
		
		model.addAttribute("category_depth1_list", category_depth_1);
		model.addAttribute("category_depth2_list", category_depth_2);
		model.addAttribute("category_name_list", category_name);
		
		model.addAttribute("category_list", cvo);
		model.addAttribute("book_list", bvo);
	}
	
	
	@Transactional
	@PostMapping("/bookModify") 
	public String bookModify (@RequestParam("file") MultipartFile file, BookVO bvo, CategoryVO cvo) throws Exception {
		
		System.out.println(file);
		String savedFileName = uploadFileService.upload(file);
		
		String authorSign = null, book_count = null, category_number = null, book_id = null,
				book_category_type = null, book_callnumber = null;
		int book_category_count = 0, year = 0, same_book_count = 0;
		
		 bvo.setSearch_book_id(bvo.getBook_id());
		 
		List <BookVO> db_bvo = bookService.getBookOne(bvo.getBook_id());
		
//		System.out.println("=============db_bvo size : "+db_bvo.size());
		
		String db_bvo_book_author = db_bvo.get(0).getBook_author();
		String db_bvo_book_type = db_bvo.get(0).getBook_type();
		String db_bvo_book_category = db_bvo.get(0).getBook_category();
		
		boolean book_author_match = db_bvo_book_author.equals(bvo.getBook_author());
		boolean book_type_match = db_bvo_book_type.equals(bvo.getBook_type());
		boolean book_category_match = db_bvo_book_category.equals(bvo.getBook_category());
		
		bvo.setBook_thumbnail(savedFileName);
		
		if (book_author_match == false) {
			bvo.setAuthorSign(bvo.getBook_author(), bvo.getBook_title());
			authorSign = bvo.getAuthorSign();

			same_book_count = bookService. getSameBook_count(bvo.getBook_title())+1;	
			book_callnumber = category_number + "."+authorSign+".v"+same_book_count;	

			bvo.setBook_callnumber(book_callnumber);		
		}
				
		if (book_type_match == false || book_category_match == false ) {
			
			if (db_bvo_book_category.equals(bvo.getBook_author()) == false) {
				
				LocalDateTime localDateTime = LocalDateTime.now();
				year = localDateTime.getYear();
				category_number = cvo.getCategory_number();
				
				bvo.setPre_book_category_type(category_number);
				book_category_type = bvo.getPre_book_category_type();

				book_category_count = bookService. getBook_category_count(category_number);
				
				book_category_count = book_category_count + 1;
				bvo.setBook_count(book_category_count);
				book_count = bvo.getBook_count();
				
				bvo.setBook_category_type(book_category_type);
				bvo.setBook_category(category_number);
			}

			 book_id = bvo.getBook_type()+"-"+category_number+"-"+year+"-"+book_count;
			 bvo.setBook_id(book_id);
		}
		
		bookService.bookModify(bvo);
		
		return "redirect:/book/list?num=1";
	}
	
	
	@PostMapping("/bookDelete") 
	public String bookDelete (String Book_id) throws Exception {
		bookService.bookDelete(Book_id);

		return "redirect:/book/list?num=1";

	}
	
	
	@GetMapping("/new-book") 
	public void getNewBookList(
			@RequestParam("num") int num,
			@RequestParam(value="searchType", required=false, defaultValue="") String searchType,
			@RequestParam(value="keyword", required=false, defaultValue="") String keyword,
			@RequestParam(value="book_category_type", required=false, defaultValue="all") String book_category_type,
			@RequestParam(value="registerPeriod", required=false, defaultValue="oneMonth") String registerPeriod, Model model) throws Exception {
			
		System.out.println("==========1. num : "+num);
		PageDTO page = new PageDTO();
		page.setSearchType(searchType);
		page.setKeyword(keyword);
		page.setBook_category_type(book_category_type);
		page.setRegisterPeriod(registerPeriod);
		page.setSearchTypeKeyword(searchType, keyword);
		 
		System.out.println("==========searchType : "+searchType);
		System.out.println("==========keyword : "+keyword);
		System.out.println("==========book_category_type : "+book_category_type);
		System.out.println("==========registerPeriod : "+registerPeriod);

		page.setNum(num);
		page.setCount(bookService.getNewBookCount(registerPeriod, book_category_type, searchType, keyword));
		
		int count =page.getCount();
		int displayPost = page.getDisplayPost();
		int postNum = page.getPostNum();
		System.out.println("=============count : "+count);
		System.out.println("==========postNum : "+postNum);
		System.out.println("==========displayPost : "+displayPost);

		String getsearchType= page.getSearchType();
		String getKeyword= page.getKeyword();

		
		List <BookVO> new_book_list = bookService.getNewBookList(postNum, displayPost, registerPeriod, book_category_type, searchType, keyword);
		for(int i=0; i<new_book_list.size(); i++) {
			System.out.println(new_book_list.get(i).getBook_id());
		}

		model.addAttribute("new_book_list", new_book_list);
		model.addAttribute("page", page);
		model.addAttribute("selectNum", num);
	}
	
	@GetMapping("/borrow-best") 
	public void getBorrowBestList(
			@RequestParam("num") int num,
			@RequestParam(value="searchType", required=false, defaultValue="") String searchType,
			@RequestParam(value="keyword", required=false, defaultValue="") String keyword,
			@RequestParam(value="book_category_type", required=false, defaultValue="all") String book_category_type,
			@RequestParam(value="registerPeriod", required=false, defaultValue="oneMonth") String registerPeriod, Model model) throws Exception {
			
		System.out.println("==========1. num : "+num);
		PageDTO page = new PageDTO();
		page.setSearchType(searchType);
		page.setKeyword(keyword);
		page.setBook_category_type(book_category_type);
		page.setRegisterPeriod(registerPeriod);
		page.setSearchTypeKeyword(searchType, keyword);
		 
		System.out.println("==========searchType : "+searchType);
		System.out.println("==========keyword : "+keyword);
		System.out.println("==========book_category_type : "+book_category_type);
		System.out.println("==========registerPeriod : "+registerPeriod);

		page.setNum(num);
		page.setCount(bookService.getNewBookCount(registerPeriod, book_category_type, searchType, keyword));
		
		int count =page.getCount();
		int displayPost = page.getDisplayPost();
		int postNum = page.getPostNum();
		System.out.println("=============count : "+count);
		System.out.println("==========postNum : "+postNum);
		System.out.println("==========displayPost : "+displayPost);

		String getsearchType= page.getSearchType();
		String getKeyword= page.getKeyword();

		
		List <BookVO> getBorrowBestList = bookService.getBorrowBestList(postNum, displayPost, registerPeriod, book_category_type, searchType, keyword);
		for(int i=0; i<getBorrowBestList.size(); i++) {
			System.out.println(getBorrowBestList.get(i).getBook_id());
		}

		model.addAttribute("getBorrowBestList", getBorrowBestList);
		model.addAttribute("page", page);
		model.addAttribute("selectNum", num);
	}
	
	
	
	
	
	
	
	


}
