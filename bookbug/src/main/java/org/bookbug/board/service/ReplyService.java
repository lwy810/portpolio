package org.bookbug.board.service;

import java.util.List;

import org.bookbug.board.vo.ReplyVO;
import org.bookbug.member.vo.ProfileVO;

public interface ReplyService {
	public void register(ReplyVO rvo) throws Exception;
	public List<ReplyVO> getReplyList(int article_num) throws Exception;
	public ReplyVO getReplyOne(ReplyVO rvo)throws Exception;
	public void update(ReplyVO rvo) throws Exception;
	public void delete(ReplyVO rvo) throws Exception;
	public void boardReplyDelete(int article_num) throws Exception;
	public ProfileVO getProfile(String member_id) throws Exception;
}
