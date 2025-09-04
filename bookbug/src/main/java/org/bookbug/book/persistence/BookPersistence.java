package org.bookbug.book.persistence;

import java.util.List;

import org.bookbug.book.vo.BookVO;
import org.bookbug.book.vo.CategoryVO;

public interface BookPersistence {

	public void register(BookVO bookvo) throws Exception;
	
	public List <String> getCategoryDepth_1() throws Exception;
	
	public List <String> getCategoryDepth_2(String category_depth_1) throws Exception;
	
	public List <String> getCategory2List(String category_depth_1) throws Exception;
	
	public List<CategoryVO> getCategorySubList(String category_depth_2) throws Exception;

	public List<CategoryVO> getCategoryNumberName(String category_depth_2) throws Exception;

	public int getSameBook_count(String book_title) throws Exception;
	
	public int getBook_category_count(String category_number) throws Exception;
	
	public List <BookVO> getBookList(int postNum, int displayPost, String searchType, String keyword) throws Exception;
	
	public List <BookVO> getReSearchList(int postNum, int displayPost, String searchType, String keyword, String searchType2,  String keyword2) throws Exception;
	
	public void getUpdateBookStateNow(String borrow_state, String book_id) throws Exception;
	
	public List <BookVO> getSubjectList (int postNum, int displayPost, String book_category) throws Exception;

	public List <BookVO> getBookOne (String book_id) throws Exception;
	
	public List<CategoryVO> getCategoryList(String book_category) throws Exception;
	
	public int getBookCount (String searchType, String keyword) throws Exception;
	
	public int getSubjectCount(String book_category)  throws Exception;
	
	public void bookModify(BookVO bvo)  throws Exception;
	
	public void bookDelete (String Book_id) throws Exception;
	
	public void bookBorrowCntUp (String book_id) throws Exception;

	public int getNewBookCount(String registerPeriod, String book_category_type, String searchType, String keyword) throws Exception;
	
	public List<BookVO> getNewBookList(int postNum, int displayPost, String registerPeriod, String book_category_type, String searchType, String keyword) throws Exception;

	public void bookBorrowModify(String book_rental_able, String book_id) throws Exception;
	
	public List<BookVO> getBorrowBestList(int postNum, int displayPost, String registerPeriod, String book_category_type, String searchType, String keyword) throws Exception;

}
