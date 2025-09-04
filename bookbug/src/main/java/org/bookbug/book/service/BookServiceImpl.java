package org.bookbug.book.service;

import java.util.List;

import javax.inject.Inject;

import org.bookbug.book.persistence.BookPersistence;
import org.bookbug.book.vo.BookVO;
import org.bookbug.book.vo.CategoryVO;
import org.springframework.stereotype.Service;

@Service
public class BookServiceImpl implements BookService {

	@Inject
	private BookPersistence bookPersistence;
	
	@Override
	public void register(BookVO bookvo) throws Exception {
		bookPersistence.register(bookvo);
	}

	@Override
	public List<String> getCategoryDepth_1() throws Exception {
		return bookPersistence.getCategoryDepth_1();
	}

	@Override
	public List<String> getCategoryDepth_2(String category_depth_1) throws Exception {
		return bookPersistence.getCategoryDepth_2(category_depth_1);
	}

	@Override
	public List<CategoryVO> getCategoryNumberName(String category_depth_2) throws Exception {
		return bookPersistence.getCategoryNumberName(category_depth_2);
	}

	@Override
	public int getSameBook_count(String book_title) throws Exception {
		return bookPersistence.getSameBook_count(book_title);
	}
	
	@Override
	public int getBook_category_count(String category_number) throws Exception {
		return bookPersistence.getBook_category_count(category_number);
	}

	@Override
	public List<BookVO> getBookList(int postNum, int displayPost, String searchType, String keyword) throws Exception {
		System.out.println("==========ser postNum : "+postNum);
		System.out.println("==========ser displayPost : "+displayPost);
		return bookPersistence.getBookList(postNum, displayPost, searchType, keyword);
	}
	
	@Override
	public List<BookVO> getReSearchList(int displayPost, int postNum,String searchType, String keyword, String searchType2, String keyword2) throws Exception {
		return bookPersistence.getReSearchList(displayPost, postNum, searchType, keyword, searchType2, keyword2);
	}

	@Override
	public List<String> getCategory2List(String category_depth_1) throws Exception {
		return bookPersistence.getCategory2List(category_depth_1);
	}

	@Override
	public List<CategoryVO> getCategorySubList(String category_depth_2) throws Exception {
		return bookPersistence.getCategorySubList(category_depth_2);
	}

	@Override
	public List<BookVO> getSubjectList(int postNum, int displayPost, String book_category) throws Exception {
		System.out.println("=========6. service displayPost"+ displayPost);
		System.out.println("=========7. service postNum"+ postNum);
		System.out.println("=========8. service category_number"+ book_category);
		return bookPersistence.getSubjectList(postNum, displayPost, book_category);
	}

	@Override
	public List<BookVO> getBookOne(String book_id) throws Exception {
		return bookPersistence.getBookOne(book_id);
	}
	
	@Override
	public List<CategoryVO> getCategoryList(String book_category) throws Exception {
		return bookPersistence.getCategoryList(book_category);
	}

	@Override
	public int getBookCount(String searchType, String keyword) throws Exception {
		return bookPersistence.getBookCount(searchType, keyword);
	}

	@Override
	public int getSubjectCount(String book_category) throws Exception {
		System.out.println("=========1. suc category_number"+ book_category);
		return bookPersistence.getSubjectCount(book_category);
	}

	@Override
	public void bookModify(BookVO bvo) throws Exception {
		bookPersistence.bookModify(bvo);
	}

	@Override
	public void bookDelete(String Book_id) throws Exception {
		bookPersistence.bookDelete(Book_id);
	}

	@Override
	public int getNewBookCount(String registerPeriod, String book_category_type, String searchType, String keyword)
			throws Exception {
		return bookPersistence.getNewBookCount(registerPeriod, book_category_type, searchType, keyword);
	}

	@Override
	public List<BookVO> getNewBookList(
			int postNum, int displayPost, String registerPeriod, String book_category_type, String searchType, String keyword) 
					throws Exception {
		
		System.out.println("==========ser postNum : "+postNum);
		System.out.println("==========ser displayPost : "+displayPost);
		return bookPersistence.getNewBookList(postNum, displayPost, registerPeriod, book_category_type, searchType, keyword);
	}
	
	@Override
	public List<BookVO> getBorrowBestList(
			int postNum, int displayPost, String registerPeriod, String book_category_type, String searchType, String keyword) 
					throws Exception {
		
		System.out.println("==========ser postNum : "+postNum);
		System.out.println("==========ser displayPost : "+displayPost);
		return bookPersistence.getBorrowBestList(postNum, displayPost, registerPeriod, book_category_type, searchType, keyword);
	}

}
