package org.bookbug.admin.persistence;

import java.util.List;

import org.bookbug.admin.vo.BorrowVO;
import org.bookbug.book.vo.BookVO;
import org.bookbug.member.vo.MemberVO;

public interface AdminBorrowPersistence {

	public void register(BorrowVO brvo) throws Exception;
	
	public List<MemberVO> getMember(String member_name) throws Exception;
	
	public List<BookVO> getBook(String book_title) throws Exception;
	
	public int getCount(String searchType, String keyword) throws Exception;
	
	public int getMemberCount(String member_id) throws Exception;
	
	public List<BorrowVO> getBorrowedList(int displayPost, int postNum, String searchType, String keyword) throws Exception;
	
	public List<BorrowVO> getMyBorrowedList(int displayPost, int postNum, String searchType, String keyword, String member_id) throws Exception;
	
	public void getUpdateState(String borrow_state, int borrow_id)throws Exception;

}
