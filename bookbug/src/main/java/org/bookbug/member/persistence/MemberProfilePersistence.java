package org.bookbug.member.persistence;

import java.util.List;

import org.bookbug.member.vo.ProfileVO;

public interface MemberProfilePersistence {
	
	public void registerProfile(ProfileVO prvo) throws Exception;
	
	public ProfileVO getProfile(String member_id) throws Exception;
	
	public void getProfileUpdate(ProfileVO prvo) throws Exception;
	
}
