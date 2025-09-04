import React, { useState } from 'react';
import { Button, Card, Input, StarsBackground } from './Common';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';
// import { MyPage } from './Mypage';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const GoToSignup = () => {
    navigate('/signup');
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

  
    try {
      // Supabase에서 사용자 정보를 조회합니다.
      const { data, error: dbError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_email', email)
        .single();

      if (dbError) {
        console.error('DB 조회 에러:', dbError);
        setError('로그인 정보를 확인하는 중 오류가 발생했습니다.');
        return;
      }

      if (!data) {
        setError('잘못된 이메일 또는 비밀번호입니다.');
        return;
      }

      // 경고: 이 코드는 비밀번호를 평문으로 비교합니다.
      // 실제 서비스에서는 반드시 해싱된 비밀번호를 사용하세요.
      if (data.user_password === password) {
        console.log('로그인 성공:', data);
        const { customer_password, ...userDataWithoutPassword } = data;
        
        // AuthContext의 login 함수를 호출하여 상태를 업데이트합니다.
        login(userDataWithoutPassword);
        
        // 로그인 성공 후 마이페이지로 이동합니다.
        navigate('/mypage'); 
        // 참고: App.tsx의 라우트에서 '/mandala'와 같은 경로로 변경해주세요.
      } else {
        setError('잘못된 이메일 또는 비밀번호입니다.');
      }

    } catch (err: any) {
      setError(err.message || '로그인 중 오류가 발생했습니다.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <StarsBackground count={20} />
      
      <div className="login-form">
        <div className="login-header">
          <div className="login-icon">⭐</div>
          <h1 className="login-title">
            BANDA
          </h1>
          <p className="login-subtitle">
            별을 모아 나만의 우주를 만들어보세요
          </p>
        </div>

        {/* 오류 메시지 */}
        {error && (
            <div className="login-error-message">
              ⚠️ {error}
            </div>
        )}
        
        {/* 로그인 폼 */}
        <form onSubmit={handleLogin} className="login-form">
        <Card className='login-form-container' 
          style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">
                이메일
              </label>
              <Input 
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                비밀번호
              </label>
              <Input 
                type="password"
                placeholder="비밀번호를 입력하세요" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
            </div>
          <Button 
            onClick={() => handleLogin}
            style={{ width: '100%', padding: '12px' }}
            type="submit"
            disabled={loading}
          >
            {loading ? '로그인 중...' : '로그인 🚀'}
          </Button>
          <Button 
            onClick={GoToSignup}
            style={{ width: '100%', padding: '12px' }}
            type="button"
          >
            회원가입 🚀
          </Button>
          </div>
        </Card>
        </form>
      </div>
    </div>
  );
};