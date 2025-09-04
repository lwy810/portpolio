import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './EmployeeSearch.css';

const VITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const VITE_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

interface Employee {
  employee_no: number;
  employee_name: string;
  employee_id: string;
  employee_pwd: string;
  employee_email: string;
  employee_department: string;
  employee_phone?: string;
  employee_birth?: string;
  employee_grade?: string;
  employee_created_at?: string;
  employee_renewed_at?: string;
}

function EmployeeSearch() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [displayedEmployees, setDisplayedEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // 검색 필터 상태
  const [searchName, setSearchName] = useState<string>('');
  const [searchDepartment, setSearchDepartment] = useState<string>('');
  const [searchGrade, setSearchGrade] = useState<string>('');
  const [searchEmail, setSearchEmail] = useState<string>('');
  
  // 부서 및 직급 목록
  const [departments, setDepartments] = useState<string[]>([]);
  const [grades, setGrades] = useState<string[]>([]);

  // 페이징 관련 상태
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const itemsPerPage = 9;

  // 선택된 직원 상세 정보
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // 직원 데이터 가져오기
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: supabaseError } = await supabase
          .from('employee')
          .select('*')
          .order('employee_name', { ascending: true });

        if (supabaseError) {
          throw new Error(supabaseError.message);
        }

        if (data) {
          setEmployees(data as Employee[]);
          setFilteredEmployees(data as Employee[]);
          
          // 부서 및 직급 목록 추출
          const uniqueDepartments = [...new Set(data.map(emp => emp.employee_department).filter(Boolean))];
          const uniqueGrades = [...new Set(data.map(emp => emp.employee_grade).filter(Boolean))];
          setDepartments(uniqueDepartments);
          setGrades(uniqueGrades);
        }
      } catch (err: any) {
        setError(err.message || '데이터를 가져오는 데 실패했습니다.');
        console.error('Error fetching employees:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // 검색 필터 적용
  useEffect(() => {
    let filtered = employees;

    // 이름으로 필터링
    if (searchName.trim()) {
      filtered = filtered.filter(emp => 
        emp.employee_name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    // 부서로 필터링
    if (searchDepartment) {
      filtered = filtered.filter(emp => emp.employee_department === searchDepartment);
    }

    // 직급으로 필터링
    if (searchGrade) {
      filtered = filtered.filter(emp => emp.employee_grade === searchGrade);
    }

    // 이메일로 필터링
    if (searchEmail.trim()) {
      filtered = filtered.filter(emp => 
        emp.employee_email.toLowerCase().includes(searchEmail.toLowerCase())
      );
    }

    setFilteredEmployees(filtered);
    setTotalCount(filtered.length);
    setCurrentPage(1); // 필터링 시 첫 페이지로 리셋
  }, [searchName, searchDepartment, searchGrade, searchEmail, employees]);

  // 페이징 처리된 데이터 설정
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredEmployees.slice(startIndex, endIndex);
    setDisplayedEmployees(paginatedData);
  }, [filteredEmployees, currentPage]);

  // 페이징 계산
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalCount);

  // 페이지 번호 생성
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 검색 초기화
  const resetSearch = () => {
    setSearchName('');
    setSearchDepartment('');
    setSearchGrade('');
    setSearchEmail('');
  };

  const openEmployeeModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="employee-search-container">
        <div className="employee-search-loading-container">
          <div>
            <div className="employee-search-spinner"></div>
            <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>직원 데이터를 로딩 중입니다...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="employee-search-container">
        <div className="employee-search-error-container">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>오류 발생</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-search-container">
      <div className="employee-search-header">
        <h1 className="employee-search-title">🔍 직원 검색</h1>
        <p className="employee-search-subtitle">다양한 조건으로 직원 정보를 빠르고 정확하게 검색할 수 있습니다</p>
      </div>

      {/* 검색 필터 섹션 */}
      <div className="employee-search-section">
        <h2 className="employee-search-section-title">🎯 검색 필터</h2>
        <div className="employee-search-form-group">
          <button
            onClick={resetSearch}
            className="employee-search-reset-button"
          >
            🔄 초기화
          </button>
        </div>
        <div className="employee-search-grid">
          <div className="employee-search-form-group">
            <label className="employee-search-label">직원명</label>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="이름을 입력하세요"
              className="employee-search-input"
            />
          </div>

          <div className="employee-search-form-group">
            <label className="employee-search-label">부서</label>
            <select
              value={searchDepartment}
              onChange={(e) => setSearchDepartment(e.target.value)}
              className="employee-search-select"
            >
              <option value="">전체 부서</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="employee-search-form-group">
            <label className="employee-search-label">직급</label>
            <select
              value={searchGrade}
              onChange={(e) => setSearchGrade(e.target.value)}
              className="employee-search-select"
            >
              <option value="">전체 직급</option>
              {grades.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>

          <div className="employee-search-form-group">
            <label className="employee-search-label">이메일</label>
            <input
              type="email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              className="employee-search-input"
            />
          </div>
        </div>
      </div>

      {/* 검색 결과 요약 */}
      <div className="employee-search-stats-bar">
        <div className="employee-search-stats-text">
          총 <span className="employee-search-highlight">{employees.length}명</span> 중 
          <span className="employee-search-highlight"> {totalCount}명</span> 검색됨
        </div>
        {totalCount > 0 && (
          <div className="employee-search-pagination-info">
            {startIndex + 1}-{endIndex}명 표시 (페이지 {currentPage}/{totalPages})
          </div>
        )}
      </div>

      {/* 검색 결과 */}
      <div className="employee-search-results-container">
        {totalCount === 0 ? (
          <div className="employee-search-empty-state">
            <div className="employee-search-empty-icon">🔍</div>
            <h3 className="employee-search-empty-title">검색 결과가 없습니다</h3>
            <p className="employee-search-empty-text">검색 조건을 변경해보세요.</p>
          </div>
        ) : (
          <>
            <div className="employee-search-employee-grid">
              {displayedEmployees.map((employee) => (
                <div
                  key={employee.employee_no}
                  className="employee-search-employee-card"
                  onClick={() => openEmployeeModal(employee)}
                >
                  <div className="employee-search-employee-header">
                    <div className="employee-search-employee-avatar">
                      {employee.employee_name.charAt(0)}
                    </div>
                    <div className="employee-search-employee-info">
                      <div className="employee-search-employee-name">{employee.employee_name}</div>
                      <div className="employee-search-employee-dept">{employee.employee_department}</div>
                    </div>
                  </div>

                  <div className="employee-search-employee-details">
                    <div className="employee-search-detail-item">
                      <div className="employee-search-detail-label">직원 ID</div>
                      <div className="employee-search-detail-value">{employee.employee_id}</div>
                    </div>
                    <div className="employee-search-detail-item">
                      <div className="employee-search-detail-label">직급</div>
                      <div className="employee-search-detail-value">{employee.employee_grade || '-'}</div>
                    </div>
                    <div className="employee-search-detail-item">
                      <div className="employee-search-detail-label">이메일</div>
                      <div className="employee-search-detail-value">{employee.employee_email}</div>
                    </div>
                    <div className="employee-search-detail-item">
                      <div className="employee-search-detail-label">등록일</div>
                      <div className="employee-search-detail-value">
                        {employee.employee_created_at 
                          ? new Date(employee.employee_created_at).toLocaleDateString()
                          : '-'
                        }
                      </div>
                    </div>
                  </div>

                  <button className="employee-search-view-button">
                    👁️ 상세 정보 보기
                  </button>
                </div>
              ))}
            </div>

            {/* 페이징 컨트롤 */}
            {totalPages > 1 && (
              <div className="employee-search-pagination">
                <button
                  className={`employee-search-pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                >
                  &laquo;
                </button>
                
                <button
                  className={`employee-search-pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>

                {getPageNumbers().map(pageNum => (
                  <button
                    key={pageNum}
                    className={`employee-search-pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  className={`employee-search-pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>

                <button
                  className={`employee-search-pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  &raquo;
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* 직원 상세 정보 모달 */}
      {showModal && selectedEmployee && (
        <div className="employee-search-modal" onClick={() => setShowModal(false)}>
          <div className="employee-search-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="employee-search-modal-header">
              <div className="employee-search-modal-avatar">
                {selectedEmployee.employee_name.charAt(0)}
              </div>
              <div>
                <h3 className="employee-search-modal-title">{selectedEmployee.employee_name}</h3>
                <p className="employee-search-modal-subtitle">{selectedEmployee.employee_department}</p>
              </div>
            </div>

            <div className="employee-search-modal-grid">
              <div className="employee-search-modal-detail-item">
                <div className="employee-search-modal-detail-label">직원 번호</div>
                <div className="employee-search-modal-detail-value">{selectedEmployee.employee_no}</div>
              </div>
              <div className="employee-search-modal-detail-item">
                <div className="employee-search-modal-detail-label">직원 ID</div>
                <div className="employee-search-modal-detail-value">{selectedEmployee.employee_id}</div>
              </div>
              <div className="employee-search-modal-detail-item">
                <div className="employee-search-modal-detail-label">이메일</div>
                <div className="employee-search-modal-detail-value">{selectedEmployee.employee_email}</div>
              </div>
              <div className="employee-search-modal-detail-item">
                <div className="employee-search-modal-detail-label">전화번호</div>
                <div className="employee-search-modal-detail-value">{selectedEmployee.employee_phone || '-'}</div>
              </div>
              <div className="employee-search-modal-detail-item">
                <div className="employee-search-modal-detail-label">생년월일</div>
                <div className="employee-search-modal-detail-value">{selectedEmployee.employee_birth || '-'}</div>
              </div>
              <div className="employee-search-modal-detail-item">
                <div className="employee-search-modal-detail-label">직급</div>
                <div className="employee-search-modal-detail-value">{selectedEmployee.employee_grade || '-'}</div>
              </div>
              <div className="employee-search-modal-detail-item">
                <div className="employee-search-modal-detail-label">등록일</div>
                <div className="employee-search-modal-detail-value">
                  {selectedEmployee.employee_created_at 
                    ? new Date(selectedEmployee.employee_created_at).toLocaleDateString()
                    : '-'
                  }
                </div>
              </div>
              <div className="employee-search-modal-detail-item">
                <div className="employee-search-modal-detail-label">수정일</div>
                <div className="employee-search-modal-detail-value">
                  {selectedEmployee.employee_renewed_at 
                    ? new Date(selectedEmployee.employee_renewed_at).toLocaleDateString()
                    : '-'
                  }
                </div>
              </div>
            </div>

            <div className="employee-search-modal-actions">
              <button
                onClick={() => setShowModal(false)}
                className="employee-search-close-button"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeSearch;