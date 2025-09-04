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
      const { data, error } = await supabase
        .from('employee')
        .select('employee_no, employee_name, employee_department')
        .order('employee_name');
      
      if (data && !error) {
        setEmployees(data);
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
      // 출결 데이터 새로고침
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
      // Supabase attendance 테이블의 출결 데이터 조회
      const { data: attendanceData, error } = await supabase
        .from('attendance')
        .select('*')
        .eq('attendance_date', selectedDate);

      // 로컬 스토리지에서 모든 출결 데이터 확인
      const localAttendanceData: any[] = [];
      
      // 로컬 스토리지의 모든 키를 확인하여 출결 데이터 찾기
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(`attendance_${selectedDate}_`)) {
          const attendanceData = localStorage.getItem(key);
          if (attendanceData) {
            try {
              const parsed = JSON.parse(attendanceData);
              const email = key.split('_')[2]; // attendance_날짜_이메일 형식에서 이메일 추출
              
              if (parsed.checkin) {
                localAttendanceData.push({
                  employee_name: parsed.checkin.employee_name,
                  employee_email: email,
                  attendance_date: selectedDate,
                  check_in_time: parsed.checkin.timestamp,
                  check_out_time: parsed.checkout ? parsed.checkout.timestamp : null,
                  attendance_status: parsed.checkout ? '퇴근' : '출근'
                });
                
              }
            } catch (e) {
              console.error('로컬 스토리지 데이터 파싱 오류: ', e);
            }
          }
        }
      });

       // 실제 데이터와 로컬 데이터 병합 처리
      const allAttendanceData = [...(attendanceData || []), ...localAttendanceData];
      
      if (error && localAttendanceData.length === 0) {
        console.error('출결 데이터 가져오기 실패:', error);
         // 오류 발생 시, 더미 데이터 사용
        const dummyAttendances: Attendance[] = employees.map(emp => ({
          employee_no: emp.employee_no,
          employee_name: emp.employee_name,
          attendance_date: selectedDate,
          check_in_time: Math.random() > 0.1 ? '09:00' : '',
          check_out_time: Math.random() > 0.1 ? '18:00' : '',
          attendance_status: Math.random() > 0.8 ? 'absent' : Math.random() > 0.7 ? 'late' : 'present',
          work_hours: Math.random() > 0.1 ? 8 : 0
        }));
        setAttendances(dummyAttendances);
      } else {
         // 로컬 스토리지에 출결 데이터가 있는 경우, 직원 데이터베이스가 없어도 표시
        if (localAttendanceData.length > 0 && employees.length === 0) {
          // 직원 데이터베이스가 없는 경우, 로컬 스토리지 데이터만으로 출결 정보 생성
          const localAttendances: Attendance[] = localAttendanceData.map((data, index) => {
            const status = data.attendance_status === '출근' ? 'present' : 
                          data.attendance_status === '퇴근' ? 'present' :
                          data.attendance_status === '지각' ? 'late' :
                          data.attendance_status === '조퇴' ? 'early_leave' : 'absent';
            
            // 근무 시간 계산
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
              attendance_status: status,
              work_hours: workHours
            };
          });
          
          setAttendances(localAttendances);
        } else {
           // 직원 데이터베이스가 있는 경우, 기존 로직 사용
          const realAttendances: Attendance[] = employees.map(emp => {
            const empAttendance = allAttendanceData.find(a => a.employee_name === emp.employee_name);
            
            if (empAttendance) {
              // 출결 데이터가 있는 경우
              const status = empAttendance.attendance_status === '출근' ? 'present' : 
                            empAttendance.attendance_status === '퇴근' ? 'present' :
                            empAttendance.attendance_status === '지각' ? 'late' :
                            empAttendance.attendance_status === '조퇴' ? 'early_leave' : 'absent';
              
              // 근무 시간 계산
              let workHours = 0;
              if (empAttendance.check_in_time && empAttendance.check_out_time) {
                const checkIn = new Date(`2000-01-01 ${empAttendance.check_in_time}`);
                const checkOut = new Date(`2000-01-01 ${empAttendance.check_out_time}`);
                workHours = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
              }
              
              return {
                employee_no: emp.employee_no,
                employee_name: emp.employee_name,
                attendance_date: selectedDate,
                check_in_time: empAttendance.check_in_time || '',
                check_out_time: empAttendance.check_out_time || '',
                attendance_status: status,
                work_hours: workHours
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
          
          setAttendances(realAttendances);
        }
      }
    } catch (err) {
      console.error('출결 데이터 가져오기 오류:', err);
      // 오류 시 더미 데이터 사용
      const dummyAttendances: Attendance[] = employees.map(emp => ({
        employee_no: emp.employee_no,
        employee_name: emp.employee_name,
        attendance_date: selectedDate,
        check_in_time: Math.random() > 0.1 ? '09:00' : '',
        check_out_time: Math.random() > 0.1 ? '18:00' : '',
        attendance_status: Math.random() > 0.8 ? 'absent' : Math.random() > 0.7 ? 'late' : 'present',
        work_hours: Math.random() > 0.1 ? 8 : 0
      }));
      setAttendances(dummyAttendances);
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
            count: employees.length,
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
                  {employees.length > 0 ? Math.round((stat.count / employees.length) * 100) : 0}% 
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