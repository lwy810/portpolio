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
  employee_no: number;
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

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data, error } = await supabase
          .from('employee')
          .select('employee_no, employee_name, employee_department')
          .order('employee_name');
        
        if (data && !error) {
          console.log('직원 데이터 로드:', data);
          setEmployees(data);
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
    fetchAttendanceData();
  }, [selectedDate, employees]);

  // SimpleQRAttendance에서 발생하는 출결 업데이트 이벤트 감지
  useEffect(() => {
    const handleAttendanceUpdate = (event: CustomEvent) => {
      console.log('출결 업데이트 감지:', event.detail);
      fetchAttendanceData();
    };

    window.addEventListener('attendanceUpdated', handleAttendanceUpdate as EventListener);
    
    return () => {
      window.removeEventListener('attendanceUpdated', handleAttendanceUpdate as EventListener);
    };
  }, [selectedDate, employees]);

  const fetchAttendanceData = async () => {
    setLoading(true);
    
    try {
      console.log('출결 데이터 조회 시작 - 날짜:', selectedDate);
      
      // Supabase에서 출결 데이터 조회
      const { data: dbAttendanceData, error: dbError } = await supabase
        .from('attendance')
        .select('*')
        .eq('attendance_date', selectedDate);

      console.log('DB 출결 데이터:', dbAttendanceData, 'DB 오류:', dbError);

      // 로컬 스토리지에서 출결 데이터 수집
      const localAttendanceData: any[] = [];
      
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(`attendance_${selectedDate}_`)) {
          const storedData = localStorage.getItem(key);
          if (storedData) {
            try {
              const parsed = JSON.parse(storedData);
              const email = key.replace(`attendance_${selectedDate}_`, '');
              
              console.log('로컬 스토리지 데이터:', key, parsed);
              
              if (parsed.checkin) {
                localAttendanceData.push({
                  employee_name: parsed.checkin.employee_name,
                  employee_email: email,
                  attendance_date: selectedDate,
                  check_in_time: parsed.checkin.timestamp,
                  check_out_time: parsed.checkout ? parsed.checkout.timestamp : null,
                  attendance_status: parsed.checkout ? 'present' : 'present' // 출근은 present로 통일
                });
              }
            } catch (e) {
              console.error('로컬 스토리지 데이터 파싱 오류:', e);
            }
          }
        }
      });

      console.log('로컬 스토리지 출결 데이터:', localAttendanceData);

      // DB 데이터와 로컬 데이터 병합
      const allAttendanceData = [...(dbAttendanceData || []), ...localAttendanceData];
      console.log('병합된 출결 데이터:', allAttendanceData);

      if (employees.length === 0) {
        // 직원 데이터가 없는 경우, 로컬 데이터만으로 표시
        if (localAttendanceData.length > 0) {
          const localAttendances: Attendance[] = localAttendanceData.map((data, index) => {
            let workHours = 0;
            if (data.check_in_time && data.check_out_time) {
              const checkIn = new Date(`2000-01-01 ${data.check_in_time}`);
              const checkOut = new Date(`2000-01-01 ${data.check_out_time}`);
              workHours = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
            }
            
            return {
              employee_no: index + 1,
              employee_name: data.employee_name,
              attendance_date: selectedDate,
              check_in_time: data.check_in_time || '',
              check_out_time: data.check_out_time || '',
              attendance_status: data.check_out_time ? 'present' : 'present',
              work_hours: Math.max(0, workHours)
            };
          });
          
          setAttendances(localAttendances);
        } else {
          // 데이터가 전혀 없는 경우 빈 배열
          setAttendances([]);
        }
      } else {
        // 직원 데이터가 있는 경우, 각 직원별로 출결 데이터 매칭
        const processedAttendances: Attendance[] = employees.map(emp => {
          // DB 데이터에서 먼저 찾기
          let empAttendance = dbAttendanceData?.find(a => 
            a.employee_name === emp.employee_name || 
            a.employee_no === emp.employee_no
          );
          
          // DB에 없으면 로컬 데이터에서 찾기
          if (!empAttendance) {
            empAttendance = localAttendanceData.find(a => 
              a.employee_name === emp.employee_name
            );
          }
          
          if (empAttendance) {
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
              // 9시 이후 출근은 지각
              const checkInTime = new Date(`2000-01-01 ${empAttendance.check_in_time}`);
              const standardTime = new Date(`2000-01-01 09:00:00`);
              
              if (checkInTime > standardTime) {
                status = 'late';
              } else if (empAttendance.check_out_time) {
                // 17시 이전 퇴근은 조퇴
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
            // 출결 데이터가 없는 경우 (결근)
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
        
        setAttendances(processedAttendances);
      }

    } catch (err) {
      console.error('출결 데이터 조회 오류:', err);
      // 오류 발생 시 빈 배열로 설정
      setAttendances([]);
    }
    
    setLoading(false);
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
            count: attendances.filter(a => a.attendance_status === 'present').length,
            color: '#10b981',
            bg: '#dcfce7',
            icon: '✅'
          },
          { 
            title: '결근', 
            count: attendances.filter(a => a.attendance_status === 'absent').length,
            color: '#ef4444',
            bg: '#fecaca',
            icon: '❌'
          },
          { 
            title: '지각', 
            count: attendances.filter(a => a.attendance_status === 'late').length,
            color: '#f59e0b',
            bg: '#fef3c7',
            icon: '⏰'
          },
          { 
            title: '총 직원', 
            count: Math.max(employees.length, attendances.length),
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
                  {Math.max(employees.length, attendances.length) > 0 ? 
                    Math.round((stat.count / Math.max(employees.length, attendances.length)) * 100) : 0}% 
                  {index < 3 ? ` ${stat.title}률` : ' 전체'}
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
        </div>

        {loading ? (
          <div className="attendance-loading-container">
            <div>
              <div className="attendance-spinner"></div>
              <p className="attendance-spinner-text">출근 데이터를 로딩 중입니다...</p>
            </div>
          </div>
        ) : attendances.length === 0 ? (
          <div className="attendance-loading-container">
            <div>
              <p style={{ color: '#6b7280' }}>해당 날짜에 출결 데이터가 없습니다.</p>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default AttendanceManagement;