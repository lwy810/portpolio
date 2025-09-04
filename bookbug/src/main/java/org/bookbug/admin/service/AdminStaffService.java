package org.bookbug.admin.service;

import java.util.List;

import org.bookbug.admin.vo.StaffVO;

public interface AdminStaffService {
	
	public int registerStaff(StaffVO svo) throws Exception;
	
	public StaffVO getMypage(String staff_id) throws Exception;
	
	public  void staffModify(StaffVO svo) throws Exception;
	
	public void staffDelete(String staff_id) throws Exception;
	
	public int getCount(String searchType, String keyword) throws Exception;
	
	public List<StaffVO> getStaffList(int displayPost, int postNum, String searchType, String keyword) throws Exception;
	
}
