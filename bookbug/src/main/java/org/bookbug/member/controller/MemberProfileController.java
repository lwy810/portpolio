package org.bookbug.member.controller;

import javax.inject.Inject;

import org.bookbug.member.service.MemberProfileService;
import org.bookbug.member.service.UploadFileService;
import org.bookbug.member.vo.ProfileVO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/admin/member/profile/*")
public class MemberProfileController {

	@Inject
	private MemberProfileService memberProfileService;
	
	@Inject
	private UploadFileService uploadFileService;
	
	

	@PostMapping("/registerProfile")
	public String registerProfile(ProfileVO prvo,
			@RequestParam("file") MultipartFile file) throws Exception{
		
		ProfileVO profile = memberProfileService.getProfile(prvo.getMember_id());
		String savedFilename = uploadFileService.upload(file);
		
		if(profile!=null){
			if(savedFilename!=null) {
				prvo.setProfile_thumbnail(savedFilename);
			}
			memberProfileService.getProfileUpdate(prvo);
		}else {
			if(savedFilename!=null) {
				prvo.setProfile_thumbnail(savedFilename);
			}
			memberProfileService.registerProfile(prvo);
		}
		
		return "redirect:/admin/member/mypage?member_id="+prvo.getMember_id(); 
	}
	
}
