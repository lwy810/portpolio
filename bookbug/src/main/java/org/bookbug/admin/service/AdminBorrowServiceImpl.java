package org.bookbug.admin.service;

import java.util.List;

import javax.inject.Inject;

import org.bookbug.admin.persistence.AdminBorrowPersistence;
import org.bookbug.admin.vo.BorrowVO;
import org.bookbug.book.persistence.BookPersistence;
import org.bookbug.book.vo.BookVO;
import org.bookbug.member.vo.MemberVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminBorrowServiceImpl implements AdminBorrowService{

	@Inject
	private AdminBorrowPersistence adminBorrowPersistence;
	
	@Inject
	private BookPersistence bookPersistence;

	@Override
	public void register(BorrowVO brvo) throws Exception {
		adminBorrowPersistence.register(brvo);		
	}

	@Override
	public List<MemberVO> getMember(String member_name) throws Exception {
		return adminBorrowPersistence.getMember(member_name);
	}

	@Override
	public List<BookVO> getBook(String book_title) throws Exception {
		return adminBorrowPersistence.getBook(book_title);
	}

	@Override
	public int getCount(String searchType, String keyword) throws Exception {
		return adminBorrowPersistence.getCount(searchType, keyword);
	}

	@Override
	public List<BorrowVO> getBorrowedList(int displayPost, int postNum, String searchType, String keyword) throws Exception {
		return adminBorrowPersistence.getBorrowedList(displayPost, postNum, searchType, keyword);
	}

	@Override
	public int getMemberCount(String member_id) throws Exception {
		return adminBorrowPersistence.getMemberCount(member_id);
	}

	@Override
	public List<BorrowVO> getMyBorrowedList(int displayPost, int postNum, String searchType, String keyword, String member_id)
			throws Exception {
		return adminBorrowPersistence.getMyBorrowedList(displayPost, postNum, searchType, keyword, member_id);
	}
	
	@Transactional
	@Override
	public void getUpdateState(String borrow_state, int borrow_id, String book_id) throws Exception {
		adminBorrowPersistence.getUpdateState(borrow_state, borrow_id);
		bookPersistence.getUpdateBookStateNow(borrow_state, book_id);
	}

}
