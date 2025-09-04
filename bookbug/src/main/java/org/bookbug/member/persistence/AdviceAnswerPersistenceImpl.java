package org.bookbug.member.persistence;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.bookbug.member.vo.AnswerVO;
import org.springframework.stereotype.Repository;

@Repository
public class AdviceAnswerPersistenceImpl implements AdviceAnswerPersistence{
	
	@Inject
	private SqlSession sql;
	
	private static String namespace="org.bookbug.mappers.answer";

	@Override
	public void register(AnswerVO anvo) throws Exception {
		sql.insert(namespace+".register", anvo);
	}

	@Override
	public List<AnswerVO> getAnswerList(int advice_no) throws Exception {
		return sql.selectList(namespace+".getAnswerList", advice_no);
	}

	@Override
	public AnswerVO getSelectAnswer(int advice_no, int answer_no) throws Exception {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("advice_no", advice_no);
		map.put("answer_no", answer_no);
		return sql.selectOne(namespace+".getSelectAnswer", map);
	}

	@Override
	public void getOneUpdate(AnswerVO anvo) throws Exception {
		sql.update(namespace+".getOneUpdate", anvo);
		
	}

	@Override
	public void getOneDelete(AnswerVO anvo) throws Exception {
		sql.delete(namespace+".getOneDelete", anvo);
	}

	@Override
	public void deleteAllAnswer(int advice_no) throws Exception {
		sql.delete(namespace+".deleteAllAnswer", advice_no);
	}
}
