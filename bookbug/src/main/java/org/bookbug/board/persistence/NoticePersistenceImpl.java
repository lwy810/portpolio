package org.bookbug.board.persistence;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.bookbug.board.vo.NoticeVO;
import org.springframework.stereotype.Repository;

@Repository
public class NoticePersistenceImpl implements NoticePersistence{

	@Inject
	private SqlSession sql;
	
	private static String namespace = "org.gettoknow.mappers.notice";

	@Override
	public void register(NoticeVO nvo) throws Exception {
		sql.insert(namespace+".register", nvo);
	}

	@Override
	public int getNoticeCount(String searchType, String keyword) throws Exception {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		return sql.selectOne(namespace+".getNoticeCount", map);
	}

	@Override
	public List<NoticeVO> getNoticeList(int displayPost, int postNum, String searchType, String keyword) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("displayPost", displayPost);
		map.put("postNum", postNum);
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		return sql.selectList(namespace+".getNoticeList", map);
	}

	@Override
	public NoticeVO getView(int notice_no) throws Exception {
		return sql.selectOne(namespace+".getView", notice_no);
	}

	@Override
	public void getUpdateNotice(NoticeVO nvo) throws Exception {
		sql.update(namespace+".getUpdateNotice", nvo);
	}

	@Override
	public void getDeleteView(int notice_no) throws Exception {
		sql.delete(namespace+".getDeleteView", notice_no);
	}
	
	
	
}
