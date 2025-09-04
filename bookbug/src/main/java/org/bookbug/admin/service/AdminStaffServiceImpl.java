package org.bookbug.admin.service;

import java.util.List;

import javax.inject.Inject;

import org.bookbug.admin.persistence.AdminStaffPersistenceImpl;
import org.bookbug.admin.vo.StaffVO;
import org.springframework.stereotype.Service;

@Service
public class AdminStaffServiceImpl implements AdminStaffService{
	
	@Inject
	private AdminStaffPersistenceImpl persistence;

	@Override
	public int registerStaff(StaffVO svo) throws Exception {
		System.out.println("==============ser staff_id"+svo.getStaff_id());
		return persistence.registerStaff(svo);
	}

	@Override
	public StaffVO getMypage(String staff_id) throws Exception {
		return persistence.getMypage(staff_id);
	}

	@Override
	public void staffModify(StaffVO svo) throws Exception {
		persistence.staffModify(svo);
	}

	@Override
	public void staffDelete(String staff_id) throws Exception {
		persistence.staffDelete(staff_id);
	}
	
	@Override
	public int getCount(String searchType, String keyword) throws Exception {
		return persistence.getCount(searchType, keyword);
	}
	
	@Override
	public List<StaffVO> getStaffList(int displayPost, int postNum, String searchType, String keyword)
			throws Exception {
		return persistence.getStaffList(displayPost, postNum, searchType, keyword);
	}

}
