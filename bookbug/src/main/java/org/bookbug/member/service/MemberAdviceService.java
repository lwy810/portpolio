package org.bookbug.member.service;

import java.util.List;

import org.bookbug.member.vo.AdviceVO;
import org.bookbug.member.vo.AnswerVO;

public interface MemberAdviceService {

	public void register(AdviceVO advo) throws Exception;
	
	public List<AdviceVO> getAdList(int displayPost, int postNum, String searchType, String keyword) throws Exception;
	
	public int getCount(String searchType, String keyword) throws Exception;

	public int getMyCount(String advice_client) throws Exception;
	
	public AdviceVO getOneInquiry(int advice_no) throws Exception;
	
	public List<AdviceVO> getMyList(int displayPost, int postNum, String advice_client) throws Exception;
	
	public void updateInquiry(AdviceVO advo) throws Exception;
	
	public void deleteOne(int advice_no) throws Exception;
	
	public int upReplyCnt(AnswerVO anvo) throws Exception;
	
	public int downReplyCnt(AnswerVO anvo) throws Exception;
	
	public void updateMemberInquiry(AdviceVO advo) throws Exception;
}
