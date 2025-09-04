import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();

  const [user_nickname, setCustomerNickname] = useState<string>('');
  const [user_email, setCustomerEmail] = useState<string>('');
  const [user_password, setCustomerPassword] = useState<string>('');
  const [user_mbti, setCustomerMbti] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const mbti = [
    '선택하세요',
    'ISFP',
    'ENFP', 
    'ISTP',
    'INTJ'
  ];

  const goToLoginPage = () => {
    navigate('/');
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
    <div className="login-container">
      {/* Stars Background */}
      <div className="stars-background">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            ⭐
          </div>
        ))}
      </div>

      <div className="login-form">
        {/* Header */}
        <div className="login-header">
<<<<<<< HEAD
          <div className="login-icon">⭐</div>
          <h1 className="login-title">BANDA</h1>
=======
          <div className="login-icon">🌌</div>
          <h1 className="login-title">MandaAI</h1>
>>>>>>> 89af60585cdb45c63f4aa665e207511a9695a5c4
          <p className="login-subtitle">새로운 계정을 만들어보세요</p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="card" style={{ 
            backgroundColor: 'rgba(239, 68, 68, 0.1)', 
            borderColor: '#ef4444',
            marginBottom: '16px',
            color: '#fca5a5'
          }}>
            ⚠️ {error}
          </div>
        )}
        
        {success && (
          <div className="card" style={{ 
            backgroundColor: 'rgba(34, 197, 94, 0.1)', 
            borderColor: '#22c55e',
            marginBottom: '16px',
            color: '#86efac'
          }}>
            ✅ {success}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="card">
          {/* Email Input */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">이메일 주소</label>
            <input
              className="input"
              type="email"
              id="email"
              value={user_email}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          {/* Nickname Input */}
          <div className="form-group">
            <label className="form-label" htmlFor="nickname">닉네임</label>
            <input
              className="input"
              type="text"
              id="nickname"
              value={user_nickname}
              onChange={(e) => setCustomerNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label className="form-label" htmlFor="password">비밀번호</label>
            <input
              className="input"
              type="password"
              id="password"
              value={user_password}
              onChange={(e) => setCustomerPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요 (최소 6자)"
              required
            />
          </div>

          {/* MBTI Select */}
          <div className="form-group">
            <label className="form-label" htmlFor="mbti">MBTI</label>
            <select
              className="input"
              id="mbti"
              value={user_mbti}
              onChange={(e) => setCustomerMbti(e.target.value)}
              required
              style={{ cursor: 'pointer' }}
            >
              {mbti.map((type) => (
                <option 
                  key={type} 
                  value={type === '선택하세요' ? '' : type}
                  style={{ 
                    backgroundColor: 'var(--galaxy-blue)', 
                    color: 'var(--galaxy-text)' 
                  }}
                >
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className={`button button-primary ${loading ? 'button-disabled' : ''}`}
            style={{ width: '100%', marginBottom: '12px' }}
          >
            {loading ? '회원가입 중...' : '회원가입'}
          </button>

          {/* Back to Login */}
          <button
            type="button"
            onClick={goToLoginPage}
            className="signup-link"
            style={{ marginTop: '8px' }}
          >
            이미 계정이 있으신가요? 로그인하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;