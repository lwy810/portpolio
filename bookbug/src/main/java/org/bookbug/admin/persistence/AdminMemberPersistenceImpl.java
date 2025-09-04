package org.bookbug.admin.persistence;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.bookbug.member.vo.AddressVO;
import org.bookbug.member.vo.MemberVO;
import org.springframework.stereotype.Repository;

@Repository
public class AdminMemberPersistenceImpl implements AdminMemberPersistence{

	@Inject
	private SqlSession sql;
	
	private static String namespace="org.admin.mappers.member";


	@Override
	public MemberVO idCheck(String member_id) throws Exception {
		return sql.selectOne(namespace+".idcheck", member_id);
	}

	@Override
	public List<AddressVO> getZipcode(String area3) throws Exception {
		return sql.selectList(namespace+".reg-address", area3);
	}
	
	@Override
	public int registerMember(MemberVO mvo) {
		return sql.insert(namespace+".register", mvo);
	}

	@Override
	public MemberVO getMypage(String member_id) throws Exception {
		return sql.selectOne(namespace+".mypage", member_id);
	}
	
	@Override
	public void memberModify(MemberVO mvo) throws Exception {
		sql.update(namespace+".memberModify", mvo);
	}
	
	@Override
	public void memberDelete(String member_id) throws Exception {
		sql.delete(namespace+".memberDelete", member_id);
	}

	@Override
	public void borrowCntUp(String member_id) throws Exception {
		sql.update(namespace+".borrowCntUp", member_id);
	}

	@Override
	public void reservationCntUp(String member_id) throws Exception {
		sql.update(namespace+".reservationCntUp", member_id);
	}
	
	@Override
	public void interestedCntUp(String member_id) throws Exception {
		sql.update(namespace+".interestedCntUp", member_id);
	}


	@Override
	public int getCount(String searchType, String keyword) throws Exception {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		return sql.selectOne(namespace+".getCount", map);
	}

	@Override
	public List<MemberVO> getMemberList(int displayPost, int postNum, String searchType, String keyword)
			throws Exception {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("displayPost", displayPost);
		map.put("postNum", postNum);
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		return sql.selectList(namespace+".getMemberList", map);
	}


}
