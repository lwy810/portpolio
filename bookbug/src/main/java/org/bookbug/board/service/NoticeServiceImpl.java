package org.bookbug.board.service;

import java.util.List;

import javax.inject.Inject;

import org.bookbug.board.persistence.NoticePersistence;
import org.bookbug.board.vo.NoticeVO;
import org.springframework.stereotype.Service;

@Service
public class NoticeServiceImpl implements NoticeService{

	@Inject
	private NoticePersistence noticePersistence;

	@Override
	public void register(NoticeVO nvo) throws Exception {
		noticePersistence.register(nvo);		
	}

	@Override
	public int getNoticeCount(String searchType, String keyword) throws Exception {
		return noticePersistence.getNoticeCount(searchType, keyword);
	}

	@Override
	public List<NoticeVO> getNoticeList(int displayPost, int postNum, String searchType, String keyword) {
		return noticePersistence.getNoticeList(displayPost, postNum, searchType, keyword);
	}

	@Override
	public NoticeVO getView(int notice_no) throws Exception {
		return noticePersistence.getView(notice_no);
	}

	@Override
	public void getUpdateNotice(NoticeVO nvo) throws Exception {
		noticePersistence.getUpdateNotice(nvo);		
	}

	@Override
	public void getDeleteView(int notice_no) throws Exception {
		noticePersistence.getDeleteView(notice_no);		
	}
}
