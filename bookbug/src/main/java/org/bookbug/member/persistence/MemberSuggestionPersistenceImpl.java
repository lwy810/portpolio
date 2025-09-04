package org.bookbug.member.persistence;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.bookbug.member.vo.SuggestionVO;
import org.springframework.stereotype.Repository;

@Repository
public class MemberSuggestionPersistenceImpl implements MemberSuggestionPersistence{

	@Inject
	private SqlSession sql;
	
	private static String namespace="org.member.mappers.suggestion";
	
	@Override
	public void register(SuggestionVO sgvo) throws Exception {
		sql.insert(namespace+".register", sgvo);
	}

	@Override
	public List<SuggestionVO> getSgList(int displayPost, int postNum, String searchType, String keyword) throws Exception {
		HashMap map = new HashMap();
		map.put("displayPost", displayPost);
		map.put("postNum", postNum);
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		return sql.selectList(namespace+".getSgList", map);
	}

	@Override
	public SuggestionVO getOneRecord(int suggestion_no) throws Exception {
		return sql.selectOne(namespace+".getOneRecord", suggestion_no);
	}

	@Override
	public int getCount(String searchType, String keyword) throws Exception {
		HashMap map = new HashMap();
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		return sql.selectOne(namespace+".getCount", map);
	}

	@Override
	public List<SuggestionVO> getMyList(int displayPost, int postNum, String suggestion_proposer) throws Exception {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("displayPost", displayPost);
		map.put("postNum", postNum);
		map.put("suggestion_proposer", suggestion_proposer);
		return sql.selectList(namespace+".getMyList", map);
	}

	@Override
	public int getMyCount(String suggestion_proposer) throws Exception {
		return sql.selectOne(namespace+".getMyCount", suggestion_proposer);
	}

	@Override
	public void getOneUpdate(SuggestionVO sgvo) throws Exception {
		sql.update(namespace+".getOneUpdate", sgvo);
		
	}

	@Override
	public void deleteOne(int suggestion_no) throws Exception {
		sql.delete(namespace+".deleteOne", suggestion_no);
	}

	@Override
	public void updateStatus(int suggestion_no, String suggestion_status) throws Exception {
		HashMap<String, Object>	map = new HashMap<String, Object>();
		map.put("suggestion_no", suggestion_no);
		map.put("suggestion_status", suggestion_status);
		sql.update(namespace+".updateStatus", map);
	}

	@Override
	public void deleteRow(int suggestion_no) throws Exception {
		sql.delete(namespace+".deleteRow", suggestion_no);
	}

}
