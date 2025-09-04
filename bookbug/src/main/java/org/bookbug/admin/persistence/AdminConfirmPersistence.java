package org.bookbug.admin.persistence;

import org.bookbug.admin.vo.StaffVO;
import org.bookbug.member.vo.MemberVO;

public interface AdminConfirmPersistence {

	public MemberVO signIn(MemberVO mvo) throws Exception;
	
	public StaffVO staffLogin(StaffVO svo) throws Exception;
	
	public  void memberPwdModify(MemberVO mvo) throws Exception;
	
	public  void staffPwdModify(StaffVO svo) throws Exception;

}
