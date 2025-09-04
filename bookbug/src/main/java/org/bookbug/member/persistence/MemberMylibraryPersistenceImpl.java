package org.bookbug.member.persistence;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.bookbug.admin.vo.BorrowVO;
import org.bookbug.member.vo.InterestedBookVO;
import org.bookbug.member.vo.ReservationBookVO;
import org.springframework.stereotype.Repository;

@Repository
public class MemberMylibraryPersistenceImpl implements MemberMylibraryPersistence {

	@Inject 
	private SqlSession sql;
	
	private static String namespace = "org.member.mappers.mylibrary";
	
	
	@Override
	public int reservationRegister(ReservationBookVO brvo) throws Exception {
		return sql.insert(namespace+".reservationRegister", brvo);
	}
	
	@Override
	public int getReservationBookCount(String member_id) throws Exception {
		return sql.selectOne(namespace+".getReservationBookCount", member_id);
	}
	
	@Override
	public int getReservationRegisterCount(String book_id) throws Exception {
		
		System.out.println("4 book_id: "+book_id);
		return sql.selectOne(namespace+".getReservationRegisterCount", book_id);
	}

	@Override
	public List<BorrowVO> getMyBorrowedCurrentList(int displayPost, int postNum, String searchType, String keyword,
			String member_id) throws Exception {
		HashMap  map = new HashMap();
		
		map.put("displayPost", displayPost);
		map.put("postNum", postNum);
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		map.put("member_id", member_id);
		
		return sql.selectList(namespace+".getMyBorrowedCurrentList", map);
	}
	
	@Override
	public List<BorrowVO> getMyBorrowedList(int displayPost, int postNum, String searchType, String keyword,
			String member_id) throws Exception {
		HashMap  map = new HashMap();
		
		map.put("displayPost", displayPost);
		map.put("postNum", postNum);
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		map.put("member_id", member_id);
		
		return sql.selectList(namespace+".getMyBorrowedList", map);
	}
	


	@Override
	public List<ReservationBookVO> getReservationBookList(int displayPost, int postNum, String searchType, String keyword, String member_id) throws Exception {
		
			HashMap  map = new HashMap();
			map.put("displayPost", displayPost);
			map.put("postNum", postNum);
			map.put("searchType", searchType);
			map.put("keyword", keyword);
			map.put("member_id", member_id);
			
			return sql.selectList(namespace+".getReservationBookList", map);
	}

	
	@Override
	public int getInterestedBookCount(String member_id) throws Exception {
		return sql.selectOne(namespace+".getInterestedBookCount", member_id);
	}
	
	@Override
	public int getInterestedRegisterCount(String book_id) throws Exception {
		return sql.selectOne(namespace+".getInterestedRegisterCount", book_id);
	}
	
	@Override
	public int interestedRegister(InterestedBookVO ibvo) throws Exception {
		return sql.insert(namespace+".interestedRegister", ibvo);
	}

	@Override
	public List<InterestedBookVO> getInterestedBookList(int displayPost, int postNum, String searchType, String keyword,
			String member_id) throws Exception {
		
		HashMap  map = new HashMap();
		
		map.put("displayPost", displayPost);
		map.put("postNum", postNum);
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		map.put("member_id", member_id);
		
		return sql.selectList(namespace+".getInterestedBookList", map);
	}

	@Override
	public int getMyBorrowedCurrentCount(String member_id) throws Exception {
		return sql.selectOne(namespace+".getMyBorrowedCurrentCount", member_id);
	}

	@Override
	public List<InterestedBookVO> getInterestedBookCard(String searchType, String keyword,
			String member_id) throws Exception {
		HashMap  map = new HashMap();
		
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		map.put("member_id", member_id);
		
		return sql.selectList(namespace+".getInterestedBookCard", map);
	}

}
