package org.bookbug.admin.persistence;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.bookbug.admin.vo.StaffVO;
import org.bookbug.member.vo.MemberVO;
import org.springframework.stereotype.Repository;

@Repository
public class AdminConfirmPersistenceImpl implements AdminConfirmPersistence{

	@Inject
	private SqlSession sql;
	
	private static String namespace="org.admin.mappers.confirm";

	@Override
	public MemberVO signIn(MemberVO mvo) throws Exception {
		return sql.selectOne(namespace+".login", mvo);
	}

	@Override
	public StaffVO staffLogin(StaffVO svo) throws Exception {
		return sql.selectOne(namespace+".staffLogin", svo); 
	}

	@Override
	public void memberPwdModify(MemberVO mvo) throws Exception {
		sql.update(namespace+".memberPwdModify", mvo);	
	}
	
	@Override
	public void staffPwdModify(StaffVO svo) throws Exception {
		sql.update(namespace+".staffPwdModify", svo);	
	}


	
	

}
