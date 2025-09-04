package org.bookbug.member.service;

import java.util.List;

import javax.inject.Inject;

import org.bookbug.member.persistence.AdviceAnswerPersistence;
import org.bookbug.member.persistence.MemberAdvicePersistenceImpl;
import org.bookbug.member.vo.AdviceVO;
import org.bookbug.member.vo.AnswerVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberAdviceServiceImpl implements MemberAdviceService{

	@Inject
	private MemberAdvicePersistenceImpl memberAdvicePersistence;

	@Inject
	private AdviceAnswerPersistence adviceAnswerPersistence;
	
	@Override
	public void register(AdviceVO advo) throws Exception {
		memberAdvicePersistence.register(advo);
	}

	@Override
	public List<AdviceVO> getAdList(int displayPost, int postNum, String searchType, String keyword) throws Exception {
		return memberAdvicePersistence.getAdList(displayPost, postNum, searchType, keyword);
	}

	@Override
	public int getCount(String searchType, String keyword) throws Exception {
		return memberAdvicePersistence.getCount(searchType, keyword);
	}

	@Override
	public AdviceVO getOneInquiry(int advice_no) throws Exception {
		return memberAdvicePersistence.getOneInquiry(advice_no);
	}

	@Override
	public List<AdviceVO> getMyList(int displayPost, int postNum, String advice_client) throws Exception {
		return memberAdvicePersistence.getMyList(displayPost, postNum, advice_client);
	}

	@Override
	public int getMyCount(String advice_client) throws Exception {
		return memberAdvicePersistence.getMyCount(advice_client);
	}

	@Override
	public void updateInquiry(AdviceVO advo) throws Exception {
		memberAdvicePersistence.updateInquiry(advo);
		
	}
	@Transactional
	@Override
	public void deleteOne(int advice_no) throws Exception {
		adviceAnswerPersistence.deleteAllAnswer(advice_no);
		memberAdvicePersistence.deleteOne(advice_no);
	}

	@Override
	public int upReplyCnt(AnswerVO anvo) throws Exception {
		return memberAdvicePersistence.upReplyCnt(anvo);
	}

	@Override
	public int downReplyCnt(AnswerVO anvo) throws Exception {
		return memberAdvicePersistence.downReplyCnt(anvo);
	}

	@Override
	public void updateMemberInquiry(AdviceVO advo) throws Exception {
		memberAdvicePersistence.updateMemberInquiry(advo);		
	}
}
