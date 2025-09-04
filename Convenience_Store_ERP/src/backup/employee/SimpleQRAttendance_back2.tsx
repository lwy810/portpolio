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
  attendance_date: string;
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

  // QR 코드 생성 및 오늘의 출결 상태 확인
  useEffect(() => {
    if (currentUser) {
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

  const checkTodayStatus = () => {
    // localStorage 사용 안 함 - 항상 초기 상태
    setTodayStatus('none');
  };

  // 출근 처리
  const handleCheckIn = async () => {
    const now = new Date();
    const timeForDB = formatTime24Hour(now); // DB용 24시간 형식
    const timeForDisplay = formatTimeKorean(now); // 화면 표시용 한국어 형식
    
    const record: AttendanceRecord = {
      id: Date.now(),
      employee_name: currentUser.employee_name,
      employee_email: currentUser.employee_email,
      type: 'checkin',
      timestamp: timeForDisplay,
      attendance_date: today
    };

    try {
      // Supabase에 출근 기록 저장 (24시간 형식 사용)
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
      alert(`✅ 출근 처리 완료!\n시간: ${record.timestamp}`);

      // 출결관리 시스템에 업데이트 알림
      window.dispatchEvent(new CustomEvent('attendanceUpdated', {
        detail: { type: 'checkin', employee: currentUser, timestamp: record.timestamp }
      }));

      setTodayStatus('checkin');
      loadAttendanceRecords();

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
      attendance_date: today
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

  const getStatusColor = (attendance_status: string) => {
    switch (attendance_status) {
      case 'none': return '#6b7280';
      case 'checkin': return '#10b981';
      case 'checkout': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusText = (attendance_status: string) => {
    switch (attendance_status) {
      case 'none': return '미출근';
      case 'checkin': return '출근 완료';
      case 'checkout': return '퇴근 완료';
      default: return '미출근';
    }
  };

  const getStatusIcon = (attendance_status: string) => {
    switch (attendance_status) {
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
                    {record.attendance_date}
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