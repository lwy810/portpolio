package org.bookbug.board.vo;

import lombok.Data;

@Data
public class BoardAttachVO {

	private String uuid; // UUID
	private String uploadPath; // 업로드 경로
	private String fileName; // 원본 파일의 이름
	private String fileType; // 파일의 유형
	private int bno; // 게시물 번호
	
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public String getUploadPath() {
		return uploadPath;
	}
	public void setUploadPath(String uploadPath) {
		this.uploadPath = uploadPath;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getFileType() {
		return fileType;
	}
	public void setFileType(String fileType) {
		this.fileType = fileType;
	}
	public int getBno() {
		return bno;
	}
	public void setBno(int bno) {
		this.bno = bno;
	}
	
	
	
	
}
