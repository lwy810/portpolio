import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import QRCode from 'qrcode';
import './SimpleQRAttendance.css';

const VITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const VITE_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// Supabase 클라이언트 초기화
const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

interface AttendanceRecord {
  id: number;
  employee_name: string;
  employee_email: string;
  type: 'checkin' | 'checkout';
  timestamp: string;
  date: string;
}

interface AttendanceData {
  id?: number;
  employee_name: string;
  employee_email: string;
  attendance_date: string;
  check_in_time?: string;
  check_out_time?: string;
  attendance_status: string;
}

interface SimpleQRAttendanceProps {
  currentUser: {
    employee_name: string;
    employee_email: string;
    employee_department: string;
  };
}

function SimpleQRAttendance({ currentUser }: SimpleQRAttendanceProps) {
  const [qrCode, setQrCode] = useState<string>('');
  const [qrImage, setQrImage] = useState<string>('');
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [currentAttendance, setCurrentAttendance] = useState<AttendanceData | null>(null);
  const [todayStatus, setTodayStatus] = useState<'none' | 'checkin' | 'checkout'>('none');

  // 오늘 날짜
  const today = new Date().toISOString().split('T')[0];

  // 24시간 형식으로 시간 포맷팅
  const formatTime24Hour = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  // 한국어 시간 포맷팅 (화면 표시용)
  const formatTimeKorean = (date: Date) => {
    return date.toLocaleTimeString('ko-KR');
  };

  // QR 코드 이미지 생성 함수
  const generateQRImage = async (qrData: string) => {
    try {
      const qrImageUrl = await QRCode.toDataURL(qrData, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrImage(qrImageUrl);
    } catch (err) {
      console.error('QR 코드 생성 실패:', err);
    }
  };

  // 오늘 출근 상태 확인
  const checkTodayStatus = async () => {
    if (!currentUser?.employee_email) return;

    try {
      // 오늘 출근 데이터 조회
      const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .eq('employee_email', currentUser.employee_email)
        .eq('attendance_date', today)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116은 "데이터 없음" 오류
        console.error('출근 상태 조회 오류:', error);
        setTodayStatus('none');
        setCurrentAttendance(null);
        return;
      }

      if (data) {
        console.log('오늘 출근 데이터:', data);
        setCurrentAttendance(data);
        
        // 상태 결정
        if (data.check_in_time && data.check_out_time) {
          setTodayStatus('checkout');
        } else if (data.check_in_time) {
          setTodayStatus('checkin');
        } else {
          setTodayStatus('none');
        }
      } else {
        console.log('오늘 출근 데이터 없음');
        setTodayStatus('none');
        setCurrentAttendance(null);
      }
    } catch (err) {
      console.error('출근 상태 확인 중 오류:', err);
      setTodayStatus('none');
      setCurrentAttendance(null);
    }
  };

  // QR 코드 생성 및 오늘의 출결 상태 확인
  useEffect(() => {
    if (currentUser) {
      console.log('현재 사용자 정보:', currentUser);
      const qrData = {
        employee_name: currentUser.employee_name,
        employee_email: currentUser.employee_email,
        timestamp: new Date().toISOString()
      };
      const qrString = JSON.stringify(qrData);
      setQrCode(JSON.stringify(qrData, null, 2));
      generateQRImage(qrString);
    }
    checkTodayStatus();
  }, [currentUser]);

  // 출근 처리
  const handleCheckIn = async () => {
    const now = new Date();
    const timeForDB = formatTime24Hour(now); // DB용 24시간 형식
    const timeForDisplay = formatTimeKorean(now); // 화면 표시용 한국어 형식
    
    console.log('출근 처리 - 사용자 정보:', currentUser);
    
    const record: AttendanceRecord = {
      id: Date.now(),
      employee_name: currentUser.employee_name,
      employee_email: currentUser.employee_email,
      type: 'checkin',
      timestamp: timeForDisplay,
      date: today
    };

    try {
      // Supabase에 출근 기록 저장 (24시간 형식 사용)
      console.log('DB에 저장할 데이터:', {
        employee_name: currentUser.employee_name,
        employee_email: currentUser.employee_email,
        attendance_date: today,
        check_in_time: timeForDB,
        attendance_status: '출근'
      });

      const { error: supabaseError } = await supabase
        .from('attendance')
        .insert([{
          employee_name: currentUser.employee_name,
          employee_email: currentUser.employee_email,
          attendance_date: today,
          check_in_time: timeForDB, // 24시간 형식으로 저장
          attendance_status: '출근'
        }]);

      if (supabaseError) {
        console.error('Supabase 저장 실패:', supabaseError);
        alert('❌ 출근 처리 실패: ' + supabaseError.message);
        return;
      }

      // 출근 처리 완료 알림
      alert(`✅ 출근 처리 완료!\n이메일: ${currentUser.employee_email}\n시간: ${record.timestamp}`);

      // 출결관리 시스템에 업데이트 알림
      window.dispatchEvent(new CustomEvent('attendanceUpdated', {
        detail: { type: 'checkin', employee: currentUser, timestamp: record.timestamp }
      }));

      setTodayStatus('checkin');
      loadAttendanceRecords();
      // 오늘 상태 다시 확인
      checkTodayStatus();

    } catch (err) {
      console.error('출근 처리 오류:', err);
      alert('❌ 출근 처리 중 오류가 발생했습니다.');
    }
  };

  // 퇴근 처리
  const handleCheckOut = async () => {
    if (todayStatus !== 'checkin') {
      alert('❌ 먼저 출근 처리를 해주세요!');
      return;
    }

    const now = new Date();
    const timeForDB = formatTime24Hour(now); // DB용 24시간 형식
    const timeForDisplay = formatTimeKorean(now); // 화면 표시용 한국어 형식
    
    const record: AttendanceRecord = {
      id: Date.now(),
      employee_name: currentUser.employee_name,
      employee_email: currentUser.employee_email,
      type: 'checkout',
      timestamp: timeForDisplay,
      date: today
    };

    try {
      // Supabase에 퇴근 기록 업데이트 (24시간 형식 사용)
      const { error: supabaseError } = await supabase
        .from('attendance')
        .update({
          check_out_time: timeForDB, // 24시간 형식으로 저장
          attendance_status: '퇴근'
        })
        .eq('employee_email', currentUser.employee_email)
        .eq('attendance_date', today);

      if (supabaseError) {
        console.error('Supabase 업데이트 실패:', supabaseError);
        alert('❌ 퇴근 처리 실패: ' + supabaseError.message);
        return;
      }

      // 퇴근 처리 완료 알림
      alert(`✅ 퇴근 처리 완료!\n시간: ${record.timestamp}`);

      // 출결관리 시스템에 업데이트 알림
      window.dispatchEvent(new CustomEvent('attendanceUpdated', {
        detail: { type: 'checkout', employee: currentUser, timestamp: record.timestamp }
      }));

      setTodayStatus('checkout');
      loadAttendanceRecords();
      // 오늘 상태 다시 확인
      checkTodayStatus();

    } catch (err) {
      console.error('퇴근 처리 오류:', err);
      alert('❌ 퇴근 처리 중 오류가 발생했습니다.');
    }
  };

  // 출결 기록 불러오기 (localStorage 사용하지 않음)
  const loadAttendanceRecords = () => {
    setAttendanceRecords([]); // 빈 배열로 설정
  };

  useEffect(() => {
    loadAttendanceRecords();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'none': return '#6b7280';
      case 'checkin': return '#10b981';
      case 'checkout': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'none': return '미출근';
      case 'checkin': return '출근 완료';
      case 'checkout': return '퇴근 완료';
      default: return '미출근';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'none': return '🏠';
      case 'checkin': return '🟢';
      case 'checkout': return '✅';
      default: return '🏠';
    }
  };

  return (
    <div className="qr-attendance-container">
      {/* 헤더 */}
      <div className="qr-attendance-header">
        <h1 className="qr-attendance-title">
          📱 QR 출퇴근 시스템
        </h1>
        <p className="qr-attendance-subtitle">
          {currentUser.employee_name}님의 출퇴근 관리
        </p>
      </div>

      {/* 현재 상태 */}
      <div className="qr-attendance-main-card">
        <div className="qr-attendance-status-icon">
          {getStatusIcon(todayStatus)}
        </div>
        <h2 className="qr-attendance-status-title" style={{ color: getStatusColor(todayStatus) }}>
          {getStatusText(todayStatus)}
        </h2>
        <p className="qr-attendance-date-info">
          오늘 날짜: {today}
        </p>

        {/* 현재 출근 정보 표시 */}
        {currentAttendance && (
          <div style={{
            background: '#e0f2fe',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1rem',
            border: '1px solid #0284c7'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#0284c7' }}>📋 오늘 출근 정보</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.9rem' }}>
              <div>
                <strong>출근시간:</strong> {currentAttendance.check_in_time || '-'}
              </div>
              <div>
                <strong>퇴근시간:</strong> {currentAttendance.check_out_time || '-'}
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <strong>상태:</strong> 
                <span style={{ 
                  color: todayStatus === 'checkout' ? '#059669' : todayStatus === 'checkin' ? '#0284c7' : '#6b7280',
                  marginLeft: '0.5rem'
                }}>
                  {currentAttendance.attendance_status}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* QR 코드 영역 */}
        <div className="qr-code-section">
          <h3 className="qr-code-title">개인 QR 코드</h3>
          
          {/* QR 코드 이미지 */}
          {qrImage ? (
            <div className="qr-code-image-container">
              <img 
                src={qrImage} 
                alt="QR Code" 
                className="qr-code-image"
              />
              <p className="qr-code-description">
                이 QR 코드를 스캔하여 출근/퇴근을 기록하세요
              </p>
            </div>
          ) : (
            <div className="qr-code-loading">
              <div className="qr-code-loading-icon">⳺</div>
              <p className="qr-code-loading-text">QR 코드를 생성 중입니다...</p>
            </div>
          )}
          
          {/* QR 코드 데이터 (개발용) */}
          <details className="qr-code-details">
            <summary className="qr-code-summary">
              QR 코드 데이터 보기 (개발용)
            </summary>
            <div className="qr-code-data">
              {qrCode}
            </div>
          </details>
        </div>

        {/* 출퇴근 버튼 */}
        <div className="qr-attendance-buttons">
          <button
            onClick={handleCheckIn}
            disabled={todayStatus !== 'none'}
            className={`qr-attendance-button ${todayStatus === 'none' ? 'checkin-enabled' : ''}`}
          >
            🌅 출근
          </button>

          <button
            onClick={handleCheckOut}
            disabled={todayStatus !== 'checkin'}
            className={`qr-attendance-button ${todayStatus === 'checkin' ? 'checkout-enabled' : ''}`}
          >
            🌆 퇴근
          </button>
        </div>
      </div>

      {/* 최근 출결 기록 */}
      <div className="qr-attendance-records-card">
        <h3 className="qr-attendance-records-title">📊 최근 출결 기록</h3>
        
        {attendanceRecords.length === 0 ? (
          <p className="qr-attendance-no-records">
            아직 출결 기록이 없습니다.
          </p>
        ) : (
          <div className="qr-attendance-records-list">
            {attendanceRecords.slice(0, 10).map((record) => (
              <div key={record.id} className="qr-attendance-record-item">
                <div className="qr-attendance-record-info">
                  <div className="qr-attendance-record-type">
                    {record.type === 'checkin' ? '🌅 출근' : '🌆 퇴근'}
                  </div>
                  <div className="qr-attendance-record-date">
                    {record.date}
                  </div>
                </div>
                <div className={`qr-attendance-record-time ${record.type}`}>
                  {record.timestamp}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SimpleQRAttendance;