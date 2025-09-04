package org.bookbug.member.persistence;

import java.util.List;

import org.bookbug.admin.vo.BorrowVO;
import org.bookbug.member.vo.InterestedBookVO;
import org.bookbug.member.vo.ReservationBookVO;

public interface MemberMylibraryPersistence {

	public List<BorrowVO> getMyBorrowedCurrentList(int displayPost, int postNum, String searchType, String keyword, String member_id)throws Exception;
	
	public List<BorrowVO> getMyBorrowedList(int displayPost, int postNum, String searchType, String keyword, String member_id)throws Exception;
	
	public int reservationRegister(ReservationBookVO brvo) throws Exception;
	
	public int getReservationBookCount(String member_id) throws Exception;
	
	public List<ReservationBookVO> getReservationBookList(int displayPost, int postNum, String searchType, String keyword, String member_id) throws Exception;

	public int getInterestedBookCount(String member_id) throws Exception;

	public int interestedRegister(InterestedBookVO ibvo) throws Exception;

	public List<InterestedBookVO> getInterestedBookList(int displayPost, int postNum, String searchType, String keyword, String member_id) throws Exception;

	public List<InterestedBookVO> getInterestedBookCard(String searchType, String keyword, String member_id) throws Exception;
	
	public int getReservationRegisterCount(String book_id) throws Exception;
	
	public int getInterestedRegisterCount(String book_id) throws Exception;
	
	public int getMyBorrowedCurrentCount(String member_id) throws Exception;
	
}
