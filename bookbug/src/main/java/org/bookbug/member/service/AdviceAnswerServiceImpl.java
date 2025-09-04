package org.bookbug.member.service;

import java.util.List;

import javax.inject.Inject;

import org.bookbug.member.persistence.AdviceAnswerPersistenceImpl;
import org.bookbug.member.persistence.MemberAdvicePersistenceImpl;
import org.bookbug.member.vo.AnswerVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdviceAnswerServiceImpl implements AdviceAnswerService{
	
	@Inject
	private AdviceAnswerPersistenceImpl adviceAnswerPersistence;
	
	@Inject
	private MemberAdvicePersistenceImpl memberAdvicePersistence;

	@Transactional
	@Override
	public void register(AnswerVO anvo) throws Exception {
		adviceAnswerPersistence.register(anvo);
		memberAdvicePersistence.upReplyCnt(anvo);
	}

	@Override
	public List<AnswerVO> getAnswerList(int advice_no) throws Exception {
		return adviceAnswerPersistence.getAnswerList(advice_no);
	}

	@Override
	public AnswerVO getSelectAnswer(int advice_no, int answer_no) throws Exception {
		return adviceAnswerPersistence.getSelectAnswer(advice_no, answer_no);
	}

	@Override
	public void getOneUpdate(AnswerVO anvo) throws Exception {
		adviceAnswerPersistence.getOneUpdate(anvo);
	}

	@Override
	public void getOneDelete(AnswerVO anvo) throws Exception {
		adviceAnswerPersistence.getOneDelete(anvo);
		memberAdvicePersistence.downReplyCnt(anvo);
	}
	
}
