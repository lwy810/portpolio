package org.bookbug.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller // 컨트롤러 빈으로 스프링에 등록한다.
public class HomeController { // HandlerMapping
	
	@GetMapping("/")
	public String home() throws Exception {return "/index";}
	
	@GetMapping("/ebook")
	public void ebook() throws Exception {}
	
	@GetMapping("/support")
	public void support() throws Exception {}
	
	@GetMapping("/culture")
	public void culture() throws Exception {}
	
	@GetMapping("/gettoknow")
	public String gettoknow() throws Exception { return "/gettoknow/gettoknow"; }
	
	@GetMapping("/subpage-01")
	public String subPage1() throws Exception {return "/ebook-sub-page-01";}
	
	@GetMapping("/subpage-02")
	public String subPage2() throws Exception {return "/ebook-sub-page-02";}

	@RequestMapping(value = "/tag")
	@ResponseBody // 문자열 반환값이 태그일 때 <body> 내부에 반환값을 tag.jsp에 추가하는 애너테이션
	public String tag() throws Exception {return "<h1>http://localhost:8080/tag</h1>";}
		
}



















