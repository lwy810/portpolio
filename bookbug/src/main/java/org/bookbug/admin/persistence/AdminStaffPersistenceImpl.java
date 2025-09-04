package org.bookbug.admin.persistence;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.bookbug.admin.vo.StaffVO;
import org.springframework.stereotype.Repository;

@Repository
public class AdminStaffPersistenceImpl implements AdminStaffPersistence {

	@Inject
	private SqlSession sql;
	
	private static String namespace="org.admin.mappers.staff";

	@Override
	public int registerStaff(StaffVO svo) throws Exception {
		//System.out.println("==============perstaff_id"+svo.getStaff_id());
		return sql.insert(namespace+".register", svo);
	}

	@Override
	public StaffVO getMypage(String staff_id) throws Exception {
		return sql.selectOne(namespace+".getMypage", staff_id);
	}

	@Override
	public void staffModify(StaffVO svo) throws Exception {
		sql.update(namespace+".staffModify", svo);
	}

	@Override
	public void staffDelete(String staff_id) throws Exception {
		sql.delete(namespace+".staffDelete", staff_id);
	}
	
	@Override
	public int getCount(String searchType, String keyword) throws Exception {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		return sql.selectOne(namespace+".getCount", map);
	}
	
	@Override
	public List<StaffVO> getStaffList(int displayPost, int postNum, String searchType, String keyword)
			throws Exception {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("displayPost", displayPost);
		map.put("postNum", postNum);
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		return sql.selectList(namespace+".getStaffList", map);
	}
	
}
