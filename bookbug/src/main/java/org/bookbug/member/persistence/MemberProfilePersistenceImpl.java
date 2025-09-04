package org.bookbug.member.persistence;

import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.bookbug.member.vo.ProfileVO;
import org.springframework.stereotype.Repository;

@Repository
public class MemberProfilePersistenceImpl implements MemberProfilePersistence{

	@Inject
	private SqlSession sql;
	
	private static String namespace = "org.member.mappers.profile";

	@Override
	public void registerProfile(ProfileVO prvo) throws Exception {
		System.out.println("registerProfile thumbnail:"+prvo.getProfile_thumbnail());
		sql.insert(namespace+".registerProfile", prvo);
	}

	@Override
	public ProfileVO getProfile(String member_id) throws Exception {
		return sql.selectOne(namespace+".getProfile", member_id);
	}

	@Override
	public void getProfileUpdate(ProfileVO prvo) throws Exception {
		sql.update(namespace+".getProfileUpdate", prvo);
	}

}
