package org.bookbug.board.persistence;

import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.bookbug.board.vo.ReplyVO;
import org.springframework.stereotype.Repository;

@Repository
public class ReplyPersistenceImpl implements ReplyPersistence{

	@Inject
	private SqlSession sql;
	
	private static String namespace="org.board.mappers.reply";

	
	@Override
	public void register(ReplyVO rvo) throws Exception {
		sql.insert(namespace+".register", rvo);
	}


	@Override
	public List<ReplyVO> getReplyList(int article_num) {
		return sql.selectList(namespace+".getReplyList", article_num);
	}


	@Override
	public ReplyVO getReplyOne(ReplyVO rvo) throws Exception {
		return sql.selectOne(namespace+".getReplyOne", rvo);
	}


	@Override
	public void update(ReplyVO rvo) throws Exception {
		sql.update(namespace+".update", rvo);
	}


	@Override
	public void delete(ReplyVO rvo) throws Exception {
		sql.delete(namespace+".delete", rvo);
	}


	@Override
	public void boardReplyDelete(int article_num) throws Exception {
		sql.delete(namespace+".boardReplyDelete", article_num);
		
	}
	

	

}
