package org.bookbug.board.persistence;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.bookbug.board.vo.BoardVO;
import org.bookbug.board.vo.ReplyVO;
import org.springframework.stereotype.Repository;

@Repository
public class BoardPersistenceImpl implements BoardPersistence {

	@Inject
	private SqlSession sql;
	
	private static String namespace="org.member.mappers.board";

	@Override
	public List<BoardVO> getBoardList(int displayPost, int postNum, String searchType, String keyword) throws Exception {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("displayPost", displayPost);
		map.put("postNum", postNum);
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		return sql.selectList(namespace+".getBoardList", map);
	}

	@Override
	public void register(BoardVO bvo) throws Exception {
		//System.out.println("===4===");
		sql.insert(namespace+".register", bvo);
	}

	@Override
	public BoardVO getBoardOne(int article_num) throws Exception {
		return sql.selectOne(namespace+".getBoardOne", article_num);
	}

	@Override
	public int getCount(String searchType, String keyword) throws Exception {
		HashMap map = new HashMap();
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		return sql.selectOne(namespace+".getCount", map);
		
	}

	@Override
	public void delete(int article_num) throws Exception {
		sql.delete(namespace+".delete", article_num);
	}

	@Override
	public void update(BoardVO bvo) throws Exception {
		sql.update(namespace+".update", bvo);
	}

	@Override
	public void upCount(int article_num) throws Exception {
		sql.update(namespace+".upCount", article_num);
	}
	
	@Override
	public void upReplyCnt(ReplyVO rvo) throws Exception {
		sql.update(namespace+".upReplyCnt", rvo);
	}
	
	@Override
	public void downReplyCnt(ReplyVO rvo) throws Exception {
		sql.update(namespace+".downReplyCnt", rvo);
	}
	
	
}
