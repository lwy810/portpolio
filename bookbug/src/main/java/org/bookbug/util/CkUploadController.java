package org.bookbug.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.google.gson.JsonObject;

@Controller
@RequestMapping("/common/*")
public class CkUploadController {
	
	@ResponseBody
	@RequestMapping(value = "/ckUpload")
    public void communityImageUpload(HttpServletRequest req, HttpServletResponse resp, MultipartHttpServletRequest multiFile) throws Exception {
		PrintWriter printWriter = null;
		OutputStream out = null;
		MultipartFile file = multiFile.getFile("upload");
		System.out.println("=============== file :"+file);
		
		if(file != null) {
			if(file.getSize() >0 && StringUtils.isNotBlank(file.getName())) {
				if(file.getContentType().toLowerCase().startsWith("image/")) {
				    try {
				    	 
			            String fileName = file.getOriginalFilename();
			            byte[] bytes = file.getBytes();
			           
			            String uploadPath = req.getSession().getServletContext().getRealPath("/resources/images/ckupload"); // 저장경로
			            
			            File uploadFile = new File(uploadPath);
			            if (!uploadFile.exists()) {
			            	uploadFile.mkdir();
			            }
			            
			            String fileName2 = UUID.randomUUID().toString();
			            uploadPath = uploadPath + "/" + fileName2 +fileName;
			            
			            out = new FileOutputStream(new File(uploadPath));
			            out.write(bytes);
			            
			            printWriter = resp.getWriter();
			            String fileUrl = req.getContextPath() + "/resources/images/ckupload/" +fileName2 +fileName; // url경로
			            System.out.println("========== fileUrl :" + fileUrl);
			            
			            JsonObject json = new JsonObject();
			            json.addProperty("uploaded", 1);
			            json.addProperty("fileName", fileName);
			            json.addProperty("url", fileUrl);
			            printWriter.print(json);
			        }
				    catch (IOException e) { e.printStackTrace(); }
				    finally { if (out != null) { out.close(); } if (printWriter != null) { printWriter.close(); } }
				}
			}
		}
	}
	
}
