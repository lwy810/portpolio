package org.bookbug.admin.service;

import java.util.List;
import javax.inject.Inject;
import org.bookbug.admin.persistence.AdminMemberPersistenceImpl;
import org.bookbug.member.vo.AddressVO;
import org.bookbug.member.vo.MemberVO;
import org.springframework.stereotype.Service;

@Service
public class AdminMemberServiceImpl implements AdminMemberService{
	
	@Inject
	private AdminMemberPersistenceImpl persistence;
	
	@Override
	public MemberVO idCheck(String member_id) throws Exception {
		return persistence.idCheck(member_id);
	}

	@Override
	public List<AddressVO> getZipcode(String area3) throws Exception {
		return persistence.getZipcode(area3);
	}

	@Override
	public int registerMember(MemberVO mvo) {
		return persistence.registerMember(mvo); 
	}

	@Override
	public MemberVO getMypage(String member_id) throws Exception {
		return persistence.getMypage(member_id);
	}
	
	@Override
	public void memberModify(MemberVO svo) throws Exception {
		persistence.memberModify(svo);
	}

	@Override
	public void memberDelete(String member_id) throws Exception {
		persistence.memberDelete(member_id);
	}


	@Override
	public int getCount(String searchType, String keyword) throws Exception {
		return persistence.getCount(searchType, keyword);
	}

	@Override
	public List<MemberVO> getMemberList(int displayPost, int postNum, String searchType, String keyword)
			throws Exception {
		return persistence.getMemberList(displayPost, postNum, searchType, keyword);
	}

}
