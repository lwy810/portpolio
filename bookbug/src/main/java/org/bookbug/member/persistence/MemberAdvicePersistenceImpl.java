package org.bookbug.member.persistence;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.bookbug.member.vo.AdviceVO;
import org.bookbug.member.vo.AnswerVO;
import org.springframework.stereotype.Repository;


@Repository
public class MemberAdvicePersistenceImpl implements MemberAdvicePersistence{
	
	@Inject
	private SqlSession sql;
	
	private static String namespace = "org.member.mappers.advice";

	@Override
	public void register(AdviceVO advo) throws Exception {
		sql.insert(namespace+".register", advo);
	}

	@Override
	public List<AdviceVO> getAdList(int displayPost, int postNum, String searchType, String keyword) throws Exception {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("displayPost", displayPost);
		map.put("postNum", postNum);
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		return sql.selectList(namespace+".getAdList", map);
	}

	@Override
	public int getCount(String searchType, String keyword) throws Exception {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		return sql.selectOne(namespace+".getCount", map);
	}

	@Override
	public AdviceVO getOneInquiry(int advice_no) throws Exception {
		return sql.selectOne(namespace+".getOneInquiry", advice_no);
	}

	@Override
	public List<AdviceVO> getMyList(int displayPost, int postNum, String advice_client) throws Exception {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("displayPost", displayPost);
		map.put("postNum", postNum);
		map.put("advice_client", advice_client);
		return sql.selectList(namespace+".getMyList", map);
	}

	@Override
	public int getMyCount(String advice_client) throws Exception {
		return sql.selectOne(namespace+".getMyCount", advice_client);
	}

	@Override
	public void updateInquiry(AdviceVO advo) throws Exception {
		sql.update(namespace+".updateInquiry", advo);
		
	}

	@Override
	public void deleteOne(int advice_no) throws Exception {
		sql.delete(namespace+".deleteOne", advice_no);
	}

	@Override
	public int upReplyCnt(AnswerVO anvo) throws Exception {
		return sql.update(namespace+".upReplyCnt", anvo);
	}

	@Override
	public int downReplyCnt(AnswerVO anvo) throws Exception {
		return sql.update(namespace+".downReplyCnt", anvo);
	}

	@Override
	public void updateMemberInquiry(AdviceVO advo) throws Exception {
		sql.update(namespace+".updateMemberInquiry", advo);
	}
}
