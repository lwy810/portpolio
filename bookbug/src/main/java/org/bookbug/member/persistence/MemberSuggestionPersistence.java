package org.bookbug.member.persistence;

import java.util.List;

import org.bookbug.member.vo.SuggestionVO;

public interface MemberSuggestionPersistence {
	
	public void register(SuggestionVO sgvo) throws Exception;
	
	public List<SuggestionVO> getSgList(int displayPost, int postNum,String searchType, String keyword) throws Exception;
	
	public SuggestionVO getOneRecord(int suggestion_no) throws Exception;
	
	public int getCount(String searchType, String keyword) throws Exception;
	
	public int getMyCount(String suggestion_proposer) throws Exception;
	
	public List<SuggestionVO> getMyList(int displayPost, int postNum, String suggestion_proposer) throws Exception;
	
	public void getOneUpdate(SuggestionVO sgvo) throws Exception;
	
	public void deleteOne(int suggestion_no) throws Exception;
	
	public void updateStatus(int suggestion_no, String suggestion_status) throws Exception;
	
	public void deleteRow(int suggestion_no) throws Exception;
}
