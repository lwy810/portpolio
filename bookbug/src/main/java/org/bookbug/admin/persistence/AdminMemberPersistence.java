package org.bookbug.admin.persistence;

import java.util.List;

import org.bookbug.member.vo.AddressVO;
import org.bookbug.member.vo.MemberVO;

public interface AdminMemberPersistence {
	
	public MemberVO idCheck(String member_id) throws Exception;
	
	public List<AddressVO> getZipcode(String area3) throws Exception;
	
	public int registerMember(MemberVO mvo);
	
	public MemberVO getMypage(String member_id) throws Exception;
	
	public  void memberModify(MemberVO svo) throws Exception;
	
	public void memberDelete(String member_id) throws Exception;
	
	public void borrowCntUp(String member_id) throws Exception;
	
	public void reservationCntUp(String member_id) throws Exception;
	
	public void interestedCntUp(String member_id) throws Exception;
	
public int getCount(String searchType, String keyword) throws Exception;
	
	public List<MemberVO> getMemberList(int displayPost, int postNum, String searchType, String keyword) throws Exception;
	
}
