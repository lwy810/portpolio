package org.bookbug.member.service;

import java.util.List;

import org.bookbug.member.vo.AnswerVO;

public interface AdviceAnswerService {

	public void register(AnswerVO anvo) throws Exception;
	
	public List<AnswerVO> getAnswerList(int advice_no) throws Exception;
	
	public AnswerVO getSelectAnswer(int advice_no, int answer_no)throws Exception;
	
	public void getOneUpdate(AnswerVO anvo) throws Exception;
	
	public void getOneDelete(AnswerVO anvo) throws Exception;
	
}
