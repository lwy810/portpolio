package org.bookbug.member.service;

import java.io.File;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UploadFileService {

	public String upload(MultipartFile file) {
		System.out.println("===file:"+file);
		boolean result = false;
		String uniqueName = null, fileExtension = null, directroyPath = null;
		System.out.println("============= 빈 파일 여부: "+file.isEmpty());
		

		// File 저장
		if (file.isEmpty() == false) {
			
			String current_date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
			System.out.println("=========현재 날짜 : "+current_date);
			directroyPath = current_date.replace("/", File.separator);
			System.out.println("=========변환 날짜 : "+directroyPath);
			
			
			String fileOriName = file.getOriginalFilename();
			fileExtension = fileOriName.substring(fileOriName.lastIndexOf("."), fileOriName.length());
			String uploadDir = "C:\\bookbug\\fileupload\\";
			System.out.println("====upload:"+uploadDir);
			UUID uuid = UUID.randomUUID();
			uniqueName = uuid.toString().replaceAll("-", "");
			System.out.println("====uniqueName:"+uniqueName);
			File saveFile = new File(uploadDir + "\\" + 	directroyPath + "\\" + uniqueName  +  fileExtension);
			System.out.println("====saveFile :"+saveFile);
			if (!saveFile.exists()) saveFile.mkdirs();
			try {
				file.transferTo(saveFile);
				result = true;
			}
			catch (Exception e) { e.printStackTrace(); }
		}
		
		if (result) {
			System.out.println("========== FILE UPLOAD SUCCESS!!");
			return "\\"+directroyPath + "\\" + uniqueName  +  fileExtension;
		} else {
			System.out.println("========== FILE UPLOAD FAIL!!");
			return null;
		}
	}
	
	public String modifyDelete(MultipartFile file, String originalFile) {
		System.out.println("===file:"+file);
		boolean result = false;
		String uniqueName = null, fileExtension = null, directroyPath = null;
		System.out.println("============= 빈 파일 여부: "+file.isEmpty());
		
		if (file.isEmpty() == false) {

			
		}
	
		return uniqueName;
	
	}
	
	
}