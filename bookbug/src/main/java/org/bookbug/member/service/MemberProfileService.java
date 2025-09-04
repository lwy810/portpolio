package org.bookbug.member.service;

import org.bookbug.member.vo.ProfileVO;

public interface MemberProfileService {
	
	public void registerProfile(ProfileVO prvo) throws Exception;
	
	public ProfileVO getProfile(String member_id) throws Exception;
	
	public void getProfileUpdate(ProfileVO prvo) throws Exception;
	
	
}
