package org.bookbug.book.persistence;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.bookbug.book.vo.BookVO;
import org.bookbug.book.vo.CategoryVO;
import org.springframework.stereotype.Repository;

@Repository
public class BookPersistenceImpl implements BookPersistence {

	@Inject
	private SqlSession sql;
	
	private static String namespace ="org.member.mappers.book";
	

	@Override
	public void register(BookVO bookvo) throws Exception {
		sql.insert(namespace+".register", bookvo);
	}

	@Override
	public List<String> getCategoryDepth_1() throws Exception {
		return sql.selectList(namespace+".getCategoryDepth_1");
	}

	@Override
	public List<String> getCategoryDepth_2(String category_depth_1) throws Exception {
		return sql.selectList(namespace+".getCategoryDepth_2", category_depth_1);
	}
	
	@Override
	public List<CategoryVO> getCategoryNumberName(String category_depth_2) throws Exception {
		return sql.selectList(namespace+".getCategoryNumberName", category_depth_2);
	}

	@Override
	public int getSameBook_count(String book_title) throws Exception {
		return sql.selectOne(namespace+".getSameBook_count", book_title);
	}
	
	@Override
	public int getBook_category_count(String category_number) throws Exception {
		return sql.selectOne(namespace+".getBook_category_count", category_number);
	}

	@Override
	public List<BookVO> getBookList(int postNum, int displayPost, String searchType, String keyword) throws Exception {
		HashMap map = new HashMap();
		
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		map.put("postNum", postNum);
		map.put("displayPost", displayPost);
		
		System.out.println("==========my postNum : "+postNum);
		System.out.println("==========my displayPost : "+displayPost);
		return sql.selectList(namespace+".getBookList", map);
	}
	
	@Override
	public List<BookVO> getReSearchList(int postNum, int displayPost, String searchType, String keyword, String searchType2, String keyword2) throws Exception {
		HashMap map = new HashMap();
		
		map.put("searchType", searchType);
		map.put("keyword", keyword);
		map.put("searchType2", searchType2);
		map.put("keyword2", keyword2);
		map.put("postNum", postNum);
		map.put("displayPost", displayPost);
		
		return sql.selectList(namespace+".getReSearchList", map);
	}

	@Override
	public List<String> getCategory2List(String category_depth_1) throws Exception {
		return sql.selectList(namespace+".getCategory2List", category_depth_1);
	}

	@Override
	public List<CategoryVO> getCategorySubList(String category_depth_2) throws Exception {
		return sql.selectList(namespace+".getCategorySubList", category_depth_2);
	}
	
	@Override
	public void getUpdateBookStateNow(String borrow_state, String book_id) throws Exception {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("borrow_state", borrow_state);
		map.put("book_id", book_id);
		sql.update(namespace+".getUpdateBookStateNow", map);
	}

	@Override
	public List<BookVO> getSubjectList(int postNum, int displayPost, String book_category) throws Exception {
		HashMap map = new HashMap();
		System.out.println("=========9. my displayPost"+ displayPost);
		System.out.println("=========10. my postNum"+ postNum);
		System.out.println("=========11. my book_category"+ book_category);
		map.put("postNum", postNum);
		map.put("displayPost", displayPost);
		map.put("book_category", book_category);
		
		return sql.selectList(namespace+".getSubjectList", map);
	}

	@Override
	public List<BookVO> getBookOne(String book_id) throws Exception {
		return sql.selectList(namespace+".getBookOne", book_id);
	}

	@Override
	public List<CategoryVO> getCategoryList(String book_category) throws Exception {
		return sql.selectList(namespace+".getCategoryList", book_category);
	}

	@Override
	public int getBookCount(String searchType, String keyword) throws Exception {
		HashMap map = new HashMap();
		
		map.put("searchType", searchType);
		map.put("keyword", keyword);

		return sql.selectOne(namespace+".getBookCount", map);
	}

	@Override
	public int getSubjectCount(String book_category) throws Exception {
		System.out.println("=========2. my book_category"+ book_category);
		return sql.selectOne(namespace+".getSubjectCount", book_category);
	}

	@Override
	public void bookModify(BookVO bvo) throws Exception {
		sql.update(namespace+".bookModify", bvo);
	}

	@Override
	public void bookDelete(String Book_id) throws Exception {
		sql.delete(namespace+".bookDelete", Book_id);
	}

	@Override
	public void bookBorrowCntUp(String book_id) throws Exception {
		sql.update(namespace+".bookBorrowCntUp", book_id);
	}

	@Override
	public int getNewBookCount(String registerPeriod, String book_category_type, String searchType, String keyword)
			throws Exception {
		HashMap map = new HashMap();

		map.put("registerPeriod", registerPeriod);
		map.put("book_category_type", book_category_type);
		map.put("searchType", searchType);
		map.put("keyword", keyword);

		return sql.selectOne(namespace+".getNewBookCount", map);
	}

	@Override
	public List<BookVO> getNewBookList(
			int postNum, int displayPost, String registerPeriod, String book_category_type, String searchType, String keyword
			) throws Exception {
		
		HashMap map = new HashMap();

		map.put("postNum", postNum);
		map.put("displayPost", displayPost);
		map.put("registerPeriod", registerPeriod);
		map.put("book_category_type", book_category_type);
		map.put("searchType", searchType);
		map.put("keyword", keyword);

		System.out.println("==========my postNum : "+postNum);
		System.out.println("==========my displayPost : "+displayPost);
		
		return sql.selectList(namespace+".getNewBookList", map);
	}

	@Override
	public void bookBorrowModify(String book_rental_able, String book_id) throws Exception {
		HashMap map = new HashMap();

		map.put("book_rental_able", book_rental_able);
		map.put("book_id", book_id);
		
		System.out.println("=============book_rental_able : "+book_rental_able);
		System.out.println("=============book_id : "+book_id);
		sql.update(namespace+".bookBorrowModify", map);
	}
	
	@Override
	public List<BookVO> getBorrowBestList(
			int postNum, int displayPost, String registerPeriod, String book_category_type, String searchType, String keyword
			) throws Exception {
		
		HashMap map = new HashMap();

		map.put("postNum", postNum);
		map.put("displayPost", displayPost);
		map.put("registerPeriod", registerPeriod);
		map.put("book_category_type", book_category_type);
		map.put("searchType", searchType);
		map.put("keyword", keyword);

		System.out.println("==========my postNum : "+postNum);
		System.out.println("==========my displayPost : "+displayPost);
		
		return sql.selectList(namespace+".getBorrowBestList", map);
	}

}
