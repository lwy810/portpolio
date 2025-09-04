package org.bookbug.admin.service;

import javax.inject.Inject;

import org.bookbug.admin.persistence.AdminConfirmPersistenceImpl;
import org.bookbug.admin.vo.StaffVO;
import org.bookbug.member.vo.MemberVO;
import org.springframework.stereotype.Service;

@Service
public class AdminConfirmServiceImpl implements AdminConfirmService{
	
	@Inject
	private AdminConfirmPersistenceImpl persistence;

	@Override
	public MemberVO login(MemberVO mvo) throws Exception {
		return persistence.signIn(mvo);
	}

	@Override
	public StaffVO staffLogin(StaffVO svo) throws Exception {
		return persistence.staffLogin(svo);
	}

	@Override
	public void memberPwdModify(MemberVO mvo) throws Exception {
		persistence.memberPwdModify(mvo);
	}
	
	@Override
	public void staffPwdModify(StaffVO svo) throws Exception {
		persistence.staffPwdModify(svo);
	}

	
}
