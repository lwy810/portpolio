package org.bookbug.member.service;

import javax.inject.Inject;

import org.bookbug.member.persistence.MemberProfilePersistence;
import org.bookbug.member.vo.ProfileVO;
import org.springframework.stereotype.Service;

@Service
public class MemberProfileServiceImpl implements MemberProfileService{

	@Inject
	private MemberProfilePersistence memberProfilePersistence;

	@Override
	public void registerProfile(ProfileVO prvo) throws Exception {
		memberProfilePersistence.registerProfile(prvo);		
	}

	@Override
	public ProfileVO getProfile(String member_id) throws Exception {
		return memberProfilePersistence.getProfile(member_id);
	}

	@Override
	public void getProfileUpdate(ProfileVO prvo) throws Exception {
		memberProfilePersistence.getProfileUpdate(prvo);		
	}



}
