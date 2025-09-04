package org.bookbug.board.persistence;

import java.util.List;

import org.bookbug.board.vo.NoticeVO;

public interface NoticePersistence {

	public void register(NoticeVO nvo) throws Exception;
	
	public int getNoticeCount(String searchType, String keyword) throws Exception;
	
	public List<NoticeVO> getNoticeList(int displayPost, int postNum, String searchType, String keyword);
	
	public NoticeVO getView(int notice_no)throws Exception;
	
	public void getUpdateNotice(NoticeVO nvo) throws Exception;
	
	public void getDeleteView(int notice_no) throws Exception;
}
