import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './EmployeePermission.css';

const VITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const VITE_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

interface Employee {
  employee_no: number;
  employee_name: string;
  employee_department: string;
  employee_email: string;
}

interface Permission {
  employee_no: number;
  employee_name: string;
  role: 'admin' | 'manager' | 'staff' | 'viewer';
  inventory_view: boolean;
  inventory_edit: boolean;
  order_view: boolean;
  order_create: boolean;
  order_approve: boolean;
  stock_in: boolean;
  stock_out: boolean;
  reports_view: boolean;
  user_manage: boolean;
}

const ROLE_PERMISSIONS = {
  admin: {
    inventory_view: true,
    inventory_edit: true,
    order_view: true,
    order_create: true,
    order_approve: true,
    stock_in: true,
    stock_out: true,
    reports_view: true,
    user_manage: true,
  },
  manager: {
    inventory_view: true,
    inventory_edit: true,
    order_view: true,
    order_create: true,
    order_approve: true,
    stock_in: true,
    stock_out: true,
    reports_view: true,
    user_manage: false,
  },
  staff: {
    inventory_view: true,
    inventory_edit: false,
    order_view: true,
    order_create: true,
    order_approve: false,
    stock_in: true,
    stock_out: true,
    reports_view: false,
    user_manage: false,
  },
  viewer: {
    inventory_view: true,
    inventory_edit: false,
    order_view: true,
    order_create: false,
    order_approve: false,
    stock_in: false,
    stock_out: false,
    reports_view: false,
    user_manage: false,
  },
};

interface EmployeePermissionProps {
  currentUserRole: string;
  currentUserId: number;
}

function EmployeePermission({ currentUserRole, currentUserId }: EmployeePermissionProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [filteredPermissions, setFilteredPermissions] = useState<Permission[]>([]);
  const [displayedPermissions, setDisplayedPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedEmployee, setSelectedEmployee] = useState<Permission | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // 페이징 관련 상태
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('employee')
          .select('employee_no, employee_name, employee_department, employee_email')
          .order('employee_name');

        if (data && !error) {
          setEmployees(data);
          const dummyPermissions: Permission[] = data.map(emp => ({
            employee_no: emp.employee_no,
            employee_name: emp.employee_name,
            role: emp.employee_department === '관리자' ? 'admin' : 'staff',
            ...ROLE_PERMISSIONS[emp.employee_department === '관리자' ? 'admin' : 'staff']
          }));
          setPermissions(dummyPermissions);
        }
      } catch (err) {
        console.error('Error fetching employees:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // 권한에 따라 조회 가능한 직원 필터링 및 페이징 처리
  useEffect(() => {
    if (permissions.length > 0) {
      const viewablePermissions = permissions.filter(permission => canViewEmployee(permission));
      setFilteredPermissions(viewablePermissions);
      setTotalCount(viewablePermissions.length);
      setCurrentPage(1);
    }
  }, [permissions, currentUserRole, currentUserId]);

  // 페이징 처리된 데이터 설정
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredPermissions.slice(startIndex, endIndex);
    setDisplayedPermissions(paginatedData);
  }, [filteredPermissions, currentPage]);

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin': return '시스템 관리자';
      case 'manager': return '부서 관리자';
      case 'staff': return '일반 직원';
      case 'viewer': return '조회 전용';
      default: return '미설정';
    }
  };

  // 권한별 접근 제어 함수들
  const canViewEmployee = (employeePermission: Permission): boolean => {
    // 시스템 관리자는 모든 직원 정보 조회 가능
    if (currentUserRole === 'admin') return true;
    
    // 부서 관리자는 같은 부서 직원만 조회 가능
    if (currentUserRole === 'manager') {
      const currentUserDept = employees.find(emp => emp.employee_no === currentUserId)?.employee_department;
      const targetUserDept = employees.find(emp => emp.employee_no === employeePermission.employee_no)?.employee_department;
      return currentUserDept === targetUserDept;
    }
    
    // 일반 직원과 조회 전용은 본인 정보만 조회 가능
    return employeePermission.employee_no === currentUserId;
  };

  const canEditEmployee = (employeePermission: Permission): boolean => {
    // 시스템 관리자는 모든 직원 권한 수정 가능
    if (currentUserRole === 'admin') return true;
    
    // 부서 관리자는 같은 부서 직원의 권한만 수정 가능 (단, 본인보다 높은 권한은 수정 불가)
    if (currentUserRole === 'manager') {
      const currentUserDept = employees.find(emp => emp.employee_no === currentUserId)?.employee_department;
      const targetUserDept = employees.find(emp => emp.employee_no === employeePermission.employee_no)?.employee_department;
      return currentUserDept === targetUserDept && employeePermission.role !== 'admin';
    }
    
    // 일반 직원과 조회 전용은 권한 수정 불가
    return false;
  };

  const canViewRole = (role: string): boolean => {
    // 시스템 관리자는 모든 권한 등급 조회 가능
    if (currentUserRole === 'admin') return true;
    
    // 부서 관리자는 admin 권한 제외하고 조회 가능
    if (currentUserRole === 'manager') return role !== 'admin';
    
    // 일반 직원과 조회 전용은 본인 권한만 조회 가능
    return false;
  };

  const getRoleStyle = (role: string) => {
    switch (role) {
      case 'admin': return { bg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: 'white' };
      case 'manager': return { bg: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: 'white' };
      case 'staff': return { bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white' };
      case 'viewer': return { bg: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)', color: 'white' };
      default: return { bg: '#f1f5f9', color: '#64748b' };
    }
  };

  const handleRoleChange = (employeeNo: number, newRole: 'admin' | 'manager' | 'staff' | 'viewer') => {
    const targetPermission = permissions.find(perm => perm.employee_no === employeeNo);
    
    if (!targetPermission) return;
    
    // 권한 수정 가능 여부 확인
    if (!canEditEmployee(targetPermission)) {
      alert('이 직원의 권한을 수정할 권한이 없습니다.');
      return;
    }
    
    // 권한 등급 변경 제한
    if (currentUserRole === 'manager' && newRole === 'admin') {
      alert('부서 관리자는 시스템 관리자 권한을 부여할 수 없습니다.');
      return;
    }
    
    setPermissions(prev => prev.map(perm => 
      perm.employee_no === employeeNo 
        ? { ...perm, role: newRole, ...ROLE_PERMISSIONS[newRole] }
        : perm
    ));
  };

  const openPermissionModal = (permission: Permission) => {
    // 권한 수정 가능 여부 확인
    if (!canEditEmployee(permission)) {
      alert('이 직원의 권한을 수정할 권한이 없습니다.');
      return;
    }
    
    setSelectedEmployee({ ...permission });
    setShowModal(true);
  };

  const savePermissions = () => {
    if (selectedEmployee) {
      setPermissions(prev => prev.map(perm => 
        perm.employee_no === selectedEmployee.employee_no ? selectedEmployee : perm
      ));
      setShowModal(false);
      setSelectedEmployee(null);
    }
  };

  const updatePermission = (key: keyof Permission, value: boolean) => {
    if (selectedEmployee) {
      setSelectedEmployee(prev => prev ? { ...prev, [key]: value } : null);
    }
  };

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

  if (loading) {
    return (
      <div className="employee-permission-container">
        <div className="employee-permission-loading-container">
          <div>
            <div className="employee-permission-spinner"></div>
            <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>권한 데이터를 로딩 중입니다...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-permission-container">
      <div className="employee-permission-header">
        <div className="employee-permission-header-left">
          <h1 className="employee-permission-title">🔒 권한 관리</h1>
          <p className="employee-permission-subtitle">직원들의 시스템 접근 권한을 체계적으로 관리하고 제어할 수 있습니다</p>
          <div className="employee-permission-user-info">
            <strong>현재 사용자:</strong> {getRoleText(currentUserRole)} | 
            <strong>접근 가능:</strong> {totalCount}명의 직원
          </div>
        </div>
        <div className="employee-permission-security-badge">
          <div className="employee-permission-security-label">보안 등급</div>
          <div className="employee-permission-security-level">HIGH</div>
        </div>
      </div>

      <div className="employee-permission-stats-grid">
        {[
          { 
            title: '시스템 관리자', 
            count: permissions.filter(p => p.role === 'admin').length,
            color: '#ef4444',
            bg: '#fecaca',
            icon: '👑',
            subtext: '최고 권한'
          },
          { 
            title: '부서 관리자', 
            count: permissions.filter(p => p.role === 'manager').length,
            color: '#3b82f6',
            bg: '#dbeafe',
            icon: '🏢',
            subtext: '관리 권한'
          },
          { 
            title: '일반 직원', 
            count: permissions.filter(p => p.role === 'staff').length,
            color: '#10b981',
            bg: '#dcfce7',
            icon: '👤',
            subtext: '기본 권한'
          },
          { 
            title: '조회 전용', 
            count: permissions.filter(p => p.role === 'viewer').length,
            color: '#6b7280',
            bg: '#f1f5f9',
            icon: '👁️',
            subtext: '읽기 전용'
          }
        ].map((stat, index) => (
          <div
            key={index}
            className="employee-permission-stat-card"
          >
            <div className="employee-permission-stat-header">
              <div>
                <div className="employee-permission-stat-title">{stat.title}</div>
                <div className="employee-permission-stat-number" style={{ color: stat.color }}>{stat.count}</div>
                <div className="employee-permission-stat-subtext">{stat.subtext}</div>
              </div>
              <div className="employee-permission-stat-icon" style={{ background: stat.bg }}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="employee-permission-section">
        <div className="employee-permission-section-header">
          <h3 className="employee-permission-section-title">📋 직원별 권한 현황</h3>
          {totalCount > 0 && (
            <div className="employee-permission-pagination-info">
              총 {totalCount}명 중 {startIndex + 1}-{endIndex}명 표시 (페이지 {currentPage}/{totalPages})
            </div>
          )}
        </div>

        {totalCount === 0 ? (
          <div className="employee-permission-empty-state">
            <div className="employee-permission-empty-icon">🔒</div>
            <h3 className="employee-permission-empty-title">권한 데이터가 없습니다</h3>
            <p className="employee-permission-empty-text">조회 권한이 없거나 직원 데이터가 없습니다.</p>
          </div>
        ) : (
          <>
            <div className="employee-permission-grid">
              {displayedPermissions.map((permission) => {
                const roleStyle = getRoleStyle(permission.role);
                const activePermissions = [
                  permission.inventory_view,
                  permission.inventory_edit,
                  permission.order_view,
                  permission.order_create,
                  permission.order_approve,
                  permission.stock_in,
                  permission.stock_out,
                  permission.reports_view,
                  permission.user_manage
                ].filter(Boolean).length;
                const totalPermissions = 9;
                const progressPercent = (activePermissions / totalPermissions) * 100;

                return (
                  <div
                    key={permission.employee_no}
                    className="employee-permission-card"
                  >
                    <div className="employee-permission-employee-header">
                      <div className="employee-permission-employee-info">
                        <div 
                          className="employee-permission-employee-avatar" 
                          style={{ background: roleStyle.bg }}
                        >
                          {permission.employee_name.charAt(0)}
                        </div>
                        <div>
                          <div className="employee-permission-employee-name">{permission.employee_name}</div>
                          <div className="employee-permission-employee-dept">
                            {employees.find(emp => emp.employee_no === permission.employee_no)?.employee_department}
                          </div>
                        </div>
                      </div>
                      <select
                        value={permission.role}
                        onChange={(e) => handleRoleChange(permission.employee_no, e.target.value as any)}
                        className="employee-permission-role-select"
                        style={{ background: roleStyle.bg, color: roleStyle.color }}
                        disabled={!canEditEmployee(permission)}
                      >
                        {canViewRole('admin') && <option value="admin">시스템 관리자</option>}
                        {canViewRole('manager') && <option value="manager">부서 관리자</option>}
                        <option value="staff">일반 직원</option>
                        <option value="viewer">조회 전용</option>
                      </select>
                    </div>

                    <div className="employee-permission-grid2">
                      {[
                        { key: 'inventory_view', label: '재고 조회', value: permission.inventory_view },
                        { key: 'inventory_edit', label: '재고 수정', value: permission.inventory_edit },
                        { key: 'order_approve', label: '발주 승인', value: permission.order_approve },
                        { key: 'user_manage', label: '사용자 관리', value: permission.user_manage }
                      ].map((item) => (
                        <div key={item.key} className="employee-permission-item">
                          <span className="employee-permission-label">{item.label}</span>
                          <div 
                            className="employee-permission-dot"
                            style={{
                              background: item.value ? '#10b981' : '#ef4444'
                            }}
                          ></div>
                        </div>
                      ))}
                    </div>

                    <div className="employee-permission-progress-section">
                      <div className="employee-permission-progress-header">
                        <span>권한 활성화율</span>
                        <span>{Math.round(progressPercent)}%</span>
                      </div>
                      <div className="employee-permission-progress-bar">
                        <div 
                          className="employee-permission-progress-fill"
                          style={{
                            background: roleStyle.bg,
                            width: `${progressPercent}%`
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="employee-permission-action-section">
                      <div className="employee-permission-badge-container">
                        {permission.inventory_view && (
                          <div className="employee-permission-badge" style={{ background: '#dbeafe', color: '#1e40af' }}>
                            👁️ 조회
                          </div>
                        )}
                        {permission.order_approve && (
                          <div className="employee-permission-badge" style={{ background: '#dcfce7', color: '#166534' }}>
                            ✅ 승인
                          </div>
                        )}
                        {permission.user_manage && (
                          <div className="employee-permission-badge" style={{ background: '#fce7f3', color: '#be185d' }}>
                            ⚙️ 관리
                          </div>
                        )}
                      </div>
                      
                      {canEditEmployee(permission) && (
                        <button
                          onClick={() => openPermissionModal(permission)}
                          className="employee-permission-detail-button"
                        >
                          상세 설정
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 페이징 컨트롤 */}
            {totalPages > 1 && (
              <div className="employee-permission-pagination">
                <button
                  className={`employee-permission-pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                >
                  &laquo;
                </button>
                
                <button
                  className={`employee-permission-pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>

                {getPageNumbers().map(pageNum => (
                  <button
                    key={pageNum}
                    className={`employee-permission-pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  className={`employee-permission-pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>

                <button
                  className={`employee-permission-pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
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

      {/* 권한 상세 설정 모달 */}
      {showModal && selectedEmployee && (
        <div className="employee-permission-modal" onClick={() => setShowModal(false)}>
          <div className="employee-permission-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="employee-permission-modal-header">{selectedEmployee.employee_name} 권한 설정</h3>
            
            <div>
              {[
                { key: 'inventory_view', label: '재고 조회' },
                { key: 'inventory_edit', label: '재고 수정' },
                { key: 'order_view', label: '발주 조회' },
                { key: 'order_create', label: '발주 생성' },
                { key: 'order_approve', label: '발주 승인' },
                { key: 'stock_in', label: '입고 처리' },
                { key: 'stock_out', label: '출고 처리' },
                { key: 'reports_view', label: '보고서 조회' },
                { key: 'user_manage', label: '사용자 관리' }
              ].map((item) => (
                <div key={item.key} className="employee-permission-modal-item">
                  <span>{item.label}</span>
                  <input
                    type="checkbox"
                    checked={selectedEmployee[item.key as keyof Permission] as boolean}
                    onChange={(e) => updatePermission(item.key as keyof Permission, e.target.checked)}
                  />
                </div>
              ))}
            </div>

            <div className="employee-permission-modal-actions">
              <button
                onClick={() => setShowModal(false)}
                className="employee-permission-button employee-permission-cancel-button"
              >
                취소
              </button>
              <button
                onClick={savePermissions}
                className="employee-permission-button employee-permission-save-button"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeePermission;