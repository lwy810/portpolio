package org.bookbug.board.service;

import java.util.List;

import javax.inject.Inject;

import org.bookbug.board.persistence.BoardPersistenceImpl;
import org.bookbug.board.vo.BoardVO;
import org.bookbug.member.persistence.MemberProfilePersistence;
import org.bookbug.member.vo.ProfileVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BoardServiceImpl implements BoardService {

	@Inject
	private BoardPersistenceImpl boardPersistence;
	
	@Inject
	private MemberProfilePersistence profilePersistence;
	
	@Override
	public List<BoardVO> getBoardList(int displayPost, int postNum, String searchType, String keyword) throws Exception {
		return boardPersistence.getBoardList(displayPost, postNum, searchType, keyword);
	}

	@Override
	public void register(BoardVO bvo) throws Exception {
		//System.out.println("===3===");
		boardPersistence.register(bvo);
	}

	@Override
	public BoardVO getBoardOne(int article_num) throws Exception {
		return boardPersistence.getBoardOne(article_num);
	}

	@Override
	public int getCount(String searchType, String keyword) throws Exception {
		return boardPersistence.getCount(searchType, keyword);
		
	}

	@Override
	public void delete(int article_num) throws Exception {
		boardPersistence.delete(article_num);
	}

	@Override
	public void update(BoardVO bvo) throws Exception {
		boardPersistence.update(bvo);
	}

	@Override
	public void upCount(int article_num) throws Exception {
		boardPersistence.upCount(article_num);
	}
	
	@Transactional
	@Override
	public ProfileVO getProfile(String member_id) throws Exception {
		return profilePersistence.getProfile(member_id);
	}
	
}
