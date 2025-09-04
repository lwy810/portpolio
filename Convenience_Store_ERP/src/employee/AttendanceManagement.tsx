import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './AttendanceManagement.css';

const VITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const VITE_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

interface Employee {
  employee_no: number;
  employee_name: string;
  employee_department: string;
}

interface Attendance {
  id?: number;
  employee_name: string;
  attendance_date: string;
  check_in_time: string;
  check_out_time: string;
  attendance_status: 'present' | 'absent' | 'late' | 'early_leave';
  work_hours: number;
}

function AttendanceManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState<boolean>(false);

  // 페이징 관련 상태
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const itemsPerPage = 8;

  // 통계용 상태
  const [attendanceStats, setAttendanceStats] = useState({ present: 0, absent: 0, late: 0 });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data, error, count } = await supabase
          .from('employee')
          .select('employee_no, employee_name, employee_department', { count: 'exact' })
          .order('employee_no');

        if (data && !error) {
          console.log('직원 데이터 로드:', data, '총 개수:', count);
          setEmployees(data);
          setTotalCount(count || data.length);
        } else {
          console.error('직원 데이터 로드 실패:', error);
        }
      } catch (err) {
        console.error('직원 데이터 조회 오류:', err);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (employees.length > 0) {
      setCurrentPage(1);
      fetchAttendanceData(1);
      fetchAttendanceStats();
    }
  }, [selectedDate, employees]);

  useEffect(() => {
    if (employees.length > 0) {
      fetchAttendanceData(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    const handleAttendanceUpdate = (event: CustomEvent) => {
      console.log('출근 업데이트 감지:', event.detail);
      fetchAttendanceData(currentPage);
      fetchAttendanceStats();
    };

    window.addEventListener('attendanceUpdated', handleAttendanceUpdate as EventListener);
    
    return () => {
      window.removeEventListener('attendanceUpdated', handleAttendanceUpdate as EventListener);
    };
  }, [selectedDate, employees, currentPage]);

  const fetchAttendanceData = async (page: number = 1) => {
    setLoading(true);
    
    try {
      console.log('출근 데이터 조회 시작 - 날짜:', selectedDate, '페이지:', page);
      
      if (employees.length === 0) {
        setAttendances([]);
        setLoading(false);
        return;
      }

      // 페이징을 위한 범위 계산
      const startIndex = (page - 1) * itemsPerPage;
      
      // 현재 페이지에 해당하는 직원들만 추출
      const pageEmployees = employees.slice(startIndex, startIndex + itemsPerPage);
      console.log('현재 페이지 직원들:', pageEmployees);

      // 현재 페이지 직원들의 employee_no 배열
      const employeeNos = pageEmployees.map(emp => emp.employee_no);

      // Supabase에서 해당 직원들의 출근 데이터만 조회
      const { data: dbAttendanceData, error: dbError } = await supabase
        .from('attendance')
        .select('*')
        .eq('attendance_date', selectedDate)
        .in('employee_no', employeeNos)
        .order('id');

      console.log('DB 출근 데이터:', dbAttendanceData, 'DB 오류:', dbError);

      // 현재 페이지 직원들의 출근 데이터 처리
      const processedAttendances: Attendance[] = pageEmployees.map(emp => {
        console.log(`${emp.employee_name} 출근 데이터 확인 중...`);
        
        const empAttendance = dbAttendanceData?.find(a => {
          const nameMatch = a.employee_name === emp.employee_name;
          const noMatch = a.employee_no === emp.employee_no;
          return nameMatch || noMatch;
        });
        
        if (empAttendance) {
          // 출근 데이터가 존재하는 경우
          let workHours = 0;
          if (empAttendance.check_in_time && empAttendance.check_out_time) {
            const checkIn = new Date(`2000-01-01 ${empAttendance.check_in_time}`);
            const checkOut = new Date(`2000-01-01 ${empAttendance.check_out_time}`);
            workHours = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
          }
          
          // 상태 결정 로직
          let status: 'present' | 'absent' | 'late' | 'early_leave' = 'present';
          
          if (!empAttendance.check_in_time) {
            status = 'absent';
          } else {
            const checkInTime = new Date(`2000-01-01 ${empAttendance.check_in_time}`);
            const standardTime = new Date(`2000-01-01 09:00:00`);
            
            if (checkInTime > standardTime) {
              status = 'late';
            } else if (empAttendance.check_out_time) {
              const checkOutTime = new Date(`2000-01-01 ${empAttendance.check_out_time}`);
              const standardEndTime = new Date(`2000-01-01 17:00:00`);
              
              if (checkOutTime < standardEndTime) {
                status = 'early_leave';
              }
            }
          }
          
          return {
            employee_no: emp.employee_no,
            employee_name: emp.employee_name,
            attendance_date: selectedDate,
            check_in_time: empAttendance.check_in_time || '',
            check_out_time: empAttendance.check_out_time || '',
            attendance_status: status,
            work_hours: Math.max(0, workHours)
          };
        } else {
          // 출근 데이터가 없는 경우 (결근)
          return {
            employee_no: emp.employee_no,
            employee_name: emp.employee_name,
            attendance_date: selectedDate,
            check_in_time: '',
            check_out_time: '',
            attendance_status: 'absent',
            work_hours: 0
          };
        }
      });
      
      console.log('최종 처리된 출근 데이터:', processedAttendances);
      setAttendances(processedAttendances);

    } catch (err) {
      console.error('출근 데이터 조회 오류:', err);
      setAttendances([]);
    }
    
    setLoading(false);
  };

  // 통계용 전체 출근 데이터 조회
  const fetchAttendanceStats = async () => {
    try {
      if (employees.length === 0) return;

      const { data: allAttendanceData, error } = await supabase
        .from('attendance')
        .select('employee_no, employee_name, check_in_time, check_out_time')
        .eq('attendance_date', selectedDate);

      if (error) {
        console.error('통계 데이터 조회 오류:', error);
        return;
      }

      let presentCount = 0;
      let absentCount = 0;
      let lateCount = 0;

      employees.forEach(emp => {
        const empAttendance = allAttendanceData?.find(a => 
          a.employee_name === emp.employee_name || a.employee_no === emp.employee_no
        );

        if (empAttendance && empAttendance.check_in_time) {
          const checkInTime = new Date(`2000-01-01 ${empAttendance.check_in_time}`);
          const standardTime = new Date(`2000-01-01 09:00:00`);
          
          if (checkInTime > standardTime) {
            lateCount++;
          } else {
            presentCount++;
          }
        } else {
          absentCount++;
        }
      });

      setAttendanceStats({ present: presentCount, absent: absentCount, late: lateCount });
    } catch (error) {
      console.error('통계 조회 중 오류:', error);
    }
  };

  // 페이징 계산
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalCount);

  // 페이지 버튼 생성
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

  const getStatusText = (attendance_status: string) => {
    switch (attendance_status) {
      case 'present': return '출근';
      case 'absent': return '결근';
      case 'late': return '지각';
      case 'early_leave': return '조퇴';
      default: return '미확인';
    }
  };

  const getStatusColor = (attendance_status: string) => {
    switch (attendance_status) {
      case 'present': return { bg: '#dcfce7', color: '#166534' };
      case 'absent': return { bg: '#fecaca', color: '#991b1b' };
      case 'late': return { bg: '#fef3c7', color: '#92400e' };
      case 'early_leave': return { bg: '#fed7aa', color: '#9a3412' };
      default: return { bg: '#f1f5f9', color: '#475569' };
    }
  };

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <div className="attendance-header-left">
          <h1 className="attendance-title">📊 출근 관리</h1>
          <p className="attendance-subtitle">직원들의 출근 현황을 실시간으로 관리하고 모니터링할 수 있습니다</p>
        </div>
        <div className="attendance-date-selector">
          <div className="attendance-date-label">📅 조회 날짜</div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="attendance-date-input"
          />
        </div>
      </div>

      <div className="attendance-stats-grid">
        {[
          { 
            title: '출근', 
            count: attendanceStats.present,
            color: '#10b981',
            bg: '#dcfce7',
            icon: '✅'
          },
          { 
            title: '결근', 
            count: attendanceStats.absent,
            color: '#ef4444',
            bg: '#fecaca',
            icon: '❌'
          },
          { 
            title: '지각', 
            count: attendanceStats.late,
            color: '#f59e0b',
            bg: '#fef3c7',
            icon: '⏰'
          },
          { 
            title: '총 직원', 
            count: totalCount,
            color: '#3b82f6',
            bg: '#dbeafe',
            icon: '👥'
          }
        ].map((stat, index) => (
          <div key={index} className="attendance-stat-card">
            <div className="attendance-stat-header">
              <div>
                <div className="attendance-stat-title">{stat.title}</div>
                <div className="attendance-stat-number" style={{ color: stat.color }}>{stat.count}</div>
                <div className="attendance-stat-percent">
                  {totalCount > 0 ? 
                    Math.round((stat.count / totalCount) * 100) : 0}% 
                  {index < 3 ? ` ${stat.title}률 ` : ' 전체'}
                </div>
              </div>
              <div className="attendance-stat-icon" style={{ background: stat.bg }}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="attendance-section">
        <div className="attendance-section-header">
          <h3 className="attendance-section-title">📋 {selectedDate} 출근 현황</h3>
          {totalCount > 0 && (
            <div className="attendance-pagination-info">
              <span style={{ color: '#6b7280', fontSize: '14px' }}>
                총 {totalCount}명 중 {startIndex + 1}-{endIndex}명 표시 (페이지 {currentPage}/{totalPages})
              </span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="attendance-loading-container">
            <div>
              <div className="attendance-spinner"></div>
              <p className="attendance-spinner-text">출근 데이터를 로딩 중입니다...</p>
            </div>
          </div>
        ) : attendances.length === 0 && totalCount === 0 ? (
          <div className="attendance-loading-container">
            <div>
              <p style={{ color: '#6b7280' }}>해당 날짜에 출근 데이터가 없습니다.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="attendance-grid">
              {attendances.map((attendance) => {
                const statusStyle = getStatusColor(attendance.attendance_status);
                return (
                  <div key={attendance.employee_no} className="attendance-card">
                    <div className="attendance-employee-header">
                      <div className="attendance-employee-info">
                        <div className="attendance-employee-avatar">
                          {attendance.employee_name.charAt(0)}
                        </div>
                        <div className="attendance-employee-name">{attendance.employee_name}</div>
                      </div>
                      <div className="attendance-status-badge" style={{ background: statusStyle.bg, color: statusStyle.color }}>
                        <div className="attendance-status-dot" style={{ background: statusStyle.color }}></div>
                        {getStatusText(attendance.attendance_status)}
                      </div>
                    </div>

                    <div className="attendance-time-grid">
                      <div className="attendance-time-item">
                        <span className="attendance-time-label">출근시간</span>
                        <span className="attendance-time-value">{attendance.check_in_time || '-'}</span>
                      </div>
                      <div className="attendance-time-item">
                        <span className="attendance-time-label">퇴근시간</span>
                        <span className="attendance-time-value">{attendance.check_out_time || '-'}</span>
                      </div>
                      <div className="attendance-time-item">
                        <span className="attendance-time-label">근무시간</span>
                        <span className="attendance-time-value">
                          {attendance.work_hours > 0 && !isNaN(attendance.work_hours) 
                            ? `${attendance.work_hours.toFixed(1)}시간` 
                            : '-'}
                        </span>
                      </div>
                      <div className="attendance-time-item">
                        <span className="attendance-time-label">상태</span>
                        <span className="attendance-time-value">
                          {(() => {
                            if (!attendance.work_hours || attendance.work_hours <= 0 || isNaN(attendance.work_hours)) {
                              return attendance.check_in_time ? '🟡 근무중' : '⚪ 미출근';
                            }
                            
                            const progress = (attendance.work_hours / 8) * 100;
                            if (progress >= 100) return '🟢 완료';
                            if (progress >= 75) return '🔵 거의완료';
                            if (progress >= 50) return '🟡 진행중';
                            if (progress >= 25) return '🟠 시작';
                            return '🔴 초기';
                          })()}
                        </span>
                      </div>
                    </div>

                    {attendance.work_hours > 0 && !isNaN(attendance.work_hours) && (
                      <div className="attendance-progress-section">
                        <div className="attendance-progress-header">
                          <span>근무 진행률</span>
                          <span>{Math.round((attendance.work_hours / 8) * 100)}%</span>
                        </div>
                        <div className="attendance-progress-bar">
                          <div 
                            className="attendance-progress-fill"
                            style={{
                              width: `${Math.min((attendance.work_hours / 8) * 100, 100)}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 페이징 컨트롤 */}
            {totalPages > 1 && (
              <div className="attendance-pagination">
                <button
                  className={`attendance-pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                >
                  &laquo;
                </button>
                
                <button
                  className={`attendance-pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>

                {getPageNumbers().map(pageNum => (
                  <button
                    key={pageNum}
                    className={`attendance-pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  className={`attendance-pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>

                <button
                  className={`attendance-pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
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
    </div>
  );
}

export default AttendanceManagement;