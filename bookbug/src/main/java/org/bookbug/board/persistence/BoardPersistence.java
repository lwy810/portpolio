package org.bookbug.board.persistence;

import java.util.List;

import org.bookbug.board.vo.BoardVO;
import org.bookbug.board.vo.ReplyVO;

public interface BoardPersistence {
	
	public void register(BoardVO bvo) throws Exception;
	
	public BoardVO getBoardOne(int article_num) throws Exception;
	
	public int getCount(String searchType, String keyword) throws Exception;
	
	public void delete(int article_num) throws Exception;
	
	public void update(BoardVO bvo) throws Exception;
	
	public void upCount(int article_num) throws Exception;
	
	public List<BoardVO> getBoardList(int displayPost, int postNum, String searchType, String keyword) throws Exception;

	public void upReplyCnt(ReplyVO rvo) throws Exception;
	
	public void downReplyCnt(ReplyVO rvo) throws Exception;
	
}
