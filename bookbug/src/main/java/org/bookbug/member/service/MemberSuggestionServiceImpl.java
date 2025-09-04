package org.bookbug.member.service;

import java.util.List;

import javax.inject.Inject;

import org.bookbug.member.persistence.MemberSuggestionPersistence;
import org.bookbug.member.vo.SuggestionVO;
import org.springframework.stereotype.Service;

@Service
public class MemberSuggestionServiceImpl implements MemberSuggestionService{

	@Inject
	private MemberSuggestionPersistence memberSuggestionPersistence;
	
	
	@Override
	public void register(SuggestionVO sgvo) throws Exception {
		memberSuggestionPersistence.register(sgvo);
	}


	@Override
	public List<SuggestionVO> getSgList(int displayPost, int postNum, String searchType, String keyword) throws Exception {
		return  memberSuggestionPersistence.getSgList(displayPost, postNum,searchType, keyword);
	}


	@Override
	public SuggestionVO getOneRecord(int suggestion_no) throws Exception {
		return memberSuggestionPersistence.getOneRecord(suggestion_no);
	}


	@Override
	public int getCount(String searchType, String keyword) throws Exception {
		return memberSuggestionPersistence.getCount(searchType,keyword);
	}


	@Override
	public List<SuggestionVO> getMyList(int displayPost, int postNum, String suggestion_proposer) throws Exception {
		return memberSuggestionPersistence.getMyList(displayPost, postNum, suggestion_proposer);
	}


	@Override
	public int getMyCount(String suggestion_proposer) throws Exception {
		return memberSuggestionPersistence.getMyCount(suggestion_proposer);
	}


	@Override
	public void getOneUpdate(SuggestionVO sgvo) throws Exception {
		memberSuggestionPersistence.getOneUpdate(sgvo);
	}


	@Override
	public void deleteOne(int suggestion_no) throws Exception {
		memberSuggestionPersistence.deleteOne(suggestion_no);
	}


	@Override
	public void updateStatus(int suggestion_no, String suggestion_status) throws Exception {
		memberSuggestionPersistence.updateStatus(suggestion_no, suggestion_status);		
	}


	@Override
	public void deleteRow(int suggestion_no) throws Exception {
		memberSuggestionPersistence.deleteRow(suggestion_no);
	}

}
