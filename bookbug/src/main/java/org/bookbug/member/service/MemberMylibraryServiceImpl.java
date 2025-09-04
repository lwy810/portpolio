package org.bookbug.member.service;

import java.util.List;

import javax.inject.Inject;

import org.bookbug.admin.vo.BorrowVO;
import org.bookbug.member.persistence.MemberMylibraryPersistence;
import org.bookbug.member.vo.InterestedBookVO;
import org.bookbug.member.vo.ReservationBookVO;
import org.springframework.stereotype.Service;

@Service
public class MemberMylibraryServiceImpl implements MemberMylibraryService {

	@Inject
	private MemberMylibraryPersistence memberMylibraryPersistence;
	
	@Override
	public List<BorrowVO> getMyBorrowedCurrentList(int displayPost, int postNum, String searchType, String keyword,
			String member_id) throws Exception {
		return memberMylibraryPersistence.getMyBorrowedCurrentList(displayPost, postNum, searchType, keyword, member_id);
	}

	public List<BorrowVO> getMyBorrowedList(int displayPost, int postNum, String searchType, String keyword,
			String member_id) throws Exception {
		return memberMylibraryPersistence.getMyBorrowedList(displayPost, postNum, searchType, keyword, member_id);
	}
	
	
	@Override
	public int getReservationRegisterCount(String book_id) throws Exception {
		System.out.println("===== 3 book_id : "+book_id);
		return memberMylibraryPersistence.getReservationRegisterCount(book_id);
	}
	
	@Override
	public int getReservationBookCount(String member_id) throws Exception {
		return memberMylibraryPersistence.getReservationBookCount(member_id);
	}
	
	@Override
	public int reservationRegister(ReservationBookVO brvo) throws Exception {
		return memberMylibraryPersistence.reservationRegister(brvo);
	}
	
	@Override
	public List<ReservationBookVO> getReservationBookList(int displayPost, int postNum, String searchType,
			String keyword, String member_id) throws Exception {
		return memberMylibraryPersistence.getReservationBookList(displayPost, postNum, searchType, keyword, member_id);
	}

	@Override
	public int getInterestedRegisterCount(String book_id) throws Exception {
		return memberMylibraryPersistence.getInterestedRegisterCount(book_id);
	}
	
	@Override
	public int getInterestedBookCount(String member_id) throws Exception {
		return memberMylibraryPersistence.getInterestedBookCount(member_id);
	}
	
	
	@Override
	public int interestedRegister(InterestedBookVO ibvo) throws Exception {
		return memberMylibraryPersistence.interestedRegister(ibvo);
	}

	@Override
	public List<InterestedBookVO> getInterestedBookList(int displayPost, int postNum, String searchType, String keyword,
			String member_id) throws Exception {
		return memberMylibraryPersistence.getInterestedBookList(displayPost, postNum, searchType, keyword, member_id);
	}

	@Override
	public List<InterestedBookVO> getInterestedBookCard(String searchType, String keyword,
			String member_id) throws Exception {
		return memberMylibraryPersistence.getInterestedBookCard(searchType, keyword, member_id);
	}




}
