package org.bookbug.board.service;

import java.util.List;

import javax.inject.Inject;

import org.bookbug.board.persistence.BoardPersistence;
import org.bookbug.board.persistence.ReplyPersistence;
import org.bookbug.board.vo.ReplyVO;
import org.bookbug.member.persistence.MemberProfilePersistence;
import org.bookbug.member.vo.ProfileVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReplyServiceImpl implements ReplyService{

	@Inject
	private ReplyPersistence replyPersistence;

	@Inject
	private BoardPersistence boardPersistence;
	
	@Inject
	private MemberProfilePersistence profilePersistence;
	
	
	@Transactional
	@Override
	public void register(ReplyVO rvo) throws Exception {
		replyPersistence.register(rvo);
		boardPersistence.upReplyCnt(rvo);
	}

	@Override
	public List<ReplyVO> getReplyList(int article_num) throws Exception{
		return replyPersistence.getReplyList(article_num); 
	}

	@Override
	public ReplyVO getReplyOne(ReplyVO rvo) throws Exception {
		return replyPersistence.getReplyOne(rvo);
	}

	@Override
	public void update(ReplyVO rvo) throws Exception {
		replyPersistence.update(rvo);
	}

	@Transactional
	@Override
	public void delete(ReplyVO rvo) throws Exception {
		replyPersistence.delete(rvo);
		boardPersistence.downReplyCnt(rvo);
	}

	@Override
	public void boardReplyDelete(int article_num) throws Exception {
		replyPersistence.boardReplyDelete(article_num);
		
	}

	@Transactional
	@Override
	public ProfileVO getProfile(String member_id) throws Exception {
		return profilePersistence.getProfile(member_id);
	}

	

}
