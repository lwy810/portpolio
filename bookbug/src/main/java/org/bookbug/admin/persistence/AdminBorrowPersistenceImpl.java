package org.bookbug.admin.persistence;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.bookbug.admin.vo.BorrowVO;
import org.bookbug.book.vo.BookVO;
import org.bookbug.member.vo.MemberVO;
import org.springframework.stereotype.Repository;

@Repository
public class AdminBorrowPersistenceImpl implements AdminBorrowPersistence{

	@Inject
	private SqlSession sql;
	
	private static String namespace="org.admin.mappers.borrow";

	@Override
	public void register(BorrowVO brvo) throws Exception {
		sql.insert(namespace+".register", brvo);
	}

	@Override
	public List<MemberVO> getMember(String member_name) throws Exception {
		return sql.selectList(namespace+".getMember", member_name);
	}

	@Override
	public List<BookVO> getBook(String book_title) throws Exception {
		return sql.selectList(namespace+".getBook", book_title);
	}

	@Override
	public int getCount(String searchType, String keyword) throws Exception {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		return sql.selectOne(namespace+".getCount", map);
	}

	@Override
	public List<BorrowVO> getBorrowedList(int displayPost, int postNum, String searchType, String keyword) throws Exception {
		//System.out.println("persistence==searchType:"+searchType);
		//System.out.println("persistence==keyword:"+keyword);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("displayPost", displayPost);
		map.put("postNum", postNum);
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		return sql.selectList(namespace+".getBorrowedList", map);
	}

	@Override
	public int getMemberCount(String member_id) throws Exception {
		return sql.selectOne(namespace+".getMemberCount", member_id);
	}

	@Override
	public List<BorrowVO> getMyBorrowedList(int displayPost, int postNum, String searchType, String keyword, String member_id)
			throws Exception {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("displayPost", displayPost);
		map.put("postNum", postNum);
		map.put("keyword", keyword);
		map.put("member_id", member_id);
		return sql.selectList(namespace+".getMyBorrowedList", map);
	}

	@Override
	public void getUpdateState(String borrow_state, int borrow_id) throws Exception {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("borrow_state", borrow_state);
		map.put("borrow_id", borrow_id);
		sql.update(namespace+".getUpdateState", map);
	}
}
