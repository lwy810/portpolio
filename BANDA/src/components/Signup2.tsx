import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { createClient } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient'

// Signup.css 파일을 임포트합니다.
import './Signup.css';

function Signup() {
  const navigate = useNavigate();

  const [user_nickname, setCustomerNickname] = useState<string>('');
  const [user_email, setCustomerEmail] = useState<string>('');
  const [user_password, setCustomerPassword] = useState<string>('');
  const [user_mbti, setCustomerMbti] = useState<string>(''); // 초기값은 빈 문자열로 유지
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // 예시 부서 목록
  const mbti = [
    '선택하세요', // 기본 선택 옵션
    'ISFP',
    'ENFP',
    'ISTP',
    'INTJ'
  ];

  const goToLoginPage = () => {
    navigate('/'); // 로그인 페이지로 이동
  };

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // 비밀번호 유효성 검사 (선택 사항: 더 복잡한 규칙 추가 가능)
    if (user_password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      setLoading(false);
      return;
    }

    // 부서 선택 유효성 검사
    if (user_mbti === '' || user_mbti === '선택하세요') {
      setError('MBTI를 선택해주세요.');
      setLoading(false);
      return;
    }

    try {
      // 1. 중복 이메일 확인

      const { data: existingUser, error: checkError } = await supabase
        .from('user_profiles')
        .select('user_email')
        .eq('user_email', user_email)
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116은 데이터 없음 오류 (즉, 중복 아님)
        console.error('이메일 중복 확인 에러:', checkError);
        setError('회원가입 중 오류가 발생했습니다.');
        return;
      }

      if (existingUser) {
        setError('이미 등록된 이메일 주소입니다.');
        setLoading(false);
        return;
      }

      // 2. 새로운 사용자 등록
      const { data, error: signupError } = await supabase
        .from('user_profiles')
        .insert([
          {
            user_nickname: user_nickname,
            user_email: user_email,
            user_password: user_password, // 경고: 실제 서비스에서는 반드시 비밀번호 해싱을 사용해야 합니다!
            user_mbti: user_mbti,
            // created_at, renewed_at은 Supabase 기본값 또는 서버에서 처리될 수 있습니다.
          },
        ]);

      if (signupError) {
        console.error('회원가입 에러:', signupError);
        setError('회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        return;
      }

      setSuccess('회원가입이 성공적으로 완료되었습니다. 로그인 페이지로 이동합니다.');
      // 회원가입 성공 후 로그인 페이지로 리다이렉트
      setTimeout(() => {
        navigate('/');
      }, 2000); // 2초 후 이동
    } catch (err: any) {
      setError(err.message || '회원가입 중 알 수 없는 오류가 발생했습니다.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
    
      <header className="signup-header">
        <nav>
          <div className="signup-nav-list">
              <p className="signup-logo-section">MandaAI</p>
          </div>
        </nav>
      </header>

      {/* Main Content - Signup Form */}
      <section className="signup-main-content">
        <div className="signup-card">
          <h2 className="signup-title">회원가입</h2>
          {/* Error Message */}
          {error && (
            <div className="signup-error-message">
              ⚠️ {error}
            </div>
          )}
          {/* Success Message */}
          {success && (
            <div className="signup-success-message">
              ✅ {success}
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="signup-form">
            {/* Email Input */}
            <div className="signup-form-group">
              <label htmlFor="employeeEmail">이메일 주소</label>
              <div className="signup-input-with-icon">
                <span className="signup-icon">&#9993;</span> {/* 이메일 아이콘 */}
                <input
                  className='signup_input_email'
                  type="email"
                  // id="employeeEmail"
                  value={user_email}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            {/* Name Input */}
            <div className="signup-form-group">
              <label htmlFor="employeeName">닉네임</label>
              <div className="signup-input-with-icon">
                <span className="signup-icon">&#128100;</span> {/* 사람 아이콘 */}
                <input
                  className='signup_input_name'
                  type="text"
                  // id="employeeName"
                  value={user_nickname}
                  onChange={(e) => setCustomerNickname(e.target.value)}
                  placeholder="닉네임을 입력하세요"
                  required
                />
              </div>
            </div>

    

            {/* Password Input */}
            <div className="signup-form-group">
              <label htmlFor="employeePwd">비밀번호</label>
              <div className="signup-input-with-icon">
                <span className="signup-icon">&#128274;</span> {/* 자물쇠 아이콘 */}
                <input
                  className='signup_input_pwd'
                  type="password"
                  // id="employeePwd"
                  value={user_password}
                  onChange={(e) => setCustomerPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요 (최소 6자)"
                  required
                />
              </div>
            </div>

            {/* Department Select Box */}
            <div className="signup-form-group">
              <label htmlFor="employeeDepartment">MPTI</label>
              <div className="signup-select-with-icon"> {/* select 전용 클래스 사용 */}
                <span className="signup-icon">&#9776;</span> {/* 목록 아이콘 */}
                <select
                  className='signup_select_department'
                  // id="employeeDepartment"
                  value={user_mbti}
                  onChange={(e) => setCustomerMbti(e.target.value)}
                  required
                >
                  {mbti.map((dept) => (
                    <option key={dept} value={dept === '선택하세요' ? '' : dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className={`signup-signup-button ${loading ? 'loading' : ''}`}
            >
              {loading ? '회원가입 중...' : '회원가입'}
            </button>
            <button className='signup-go-to-login-button' onClick={goToLoginPage}>
              로그인 페이지로 돌아가기
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Signup;