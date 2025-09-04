import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';
import { Button, Card } from './Common';
import './Settings.css';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, login } = useAuth();
  console.log(currentUser)
  
  // 현재 사용자 정보로 초기화
  const [nickname, setNickname] = useState(currentUser?.user_nickname || '');
  const [email, setEmail] = useState(currentUser?.user_email || '');
  const [password, setPassword] = useState('');
  const [mbti, setMbti] = useState(currentUser?.user_mbti || '');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const mbtiOptions = ['선택하세요', 'ISFP', 'ENFP', 'ISTP', 'INTJ'];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // 유효성 검사
    if (!nickname.trim() || !email.trim()) {
      setError('닉네임과 이메일은 필수입니다.');
      setLoading(false);
      return;
    }

    if (password && password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      setLoading(false);
      return;
    }

    if (!mbti || mbti === '선택하세요') {
      setError('MBTI를 선택해주세요.');
      setLoading(false);
      return;
    }

    try {
      // 업데이트할 데이터 객체 생성
      const updateData: any = {
        user_nickname: nickname,
        user_mbti: mbti
      };

      // 비밀번호가 입력된 경우에만 포함
      if (password) {
        updateData.user_password = password;
      }

      // Supabase에서 현재 사용자 정보 업데이트
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update(updateData)
        .eq('user_email', currentUser?.user_email);

      if (updateError) {
        console.error('업데이트 에러:', updateError);
        setError('정보 수정 중 오류가 발생했습니다.');
        return;
      }

      // AuthContext의 사용자 정보도 업데이트
      const updatedUser = {
        ...currentUser!,
        user_nickname: nickname,
        user_mbti: mbti
      };
      
      login(updatedUser);

      setSuccess('정보가 성공적으로 수정되었습니다!');
      setPassword(''); // 비밀번호 필드 초기화

      // 2초 후 마이페이지로 이동
      setTimeout(() => {
        navigate('/mypage');
      }, 2000);

    } catch (err: any) {
      console.error('Settings error:', err);
      setError('알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate('/mypage');
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <Card className='info-update-form'>
          <div>
            <button 
              onClick={goBack}
            >
              ← 
            </button>
            <h2>설정</h2>
          </div>

          {/* 에러/성공 메시지 */}
          {error && (
            <div>
              ⚠️ {error}
            </div>
          )}
          
          {success && (
            <div>
              ✅ {success}
            </div>
          )}

          <form onSubmit={handleSave}>
            {/* 이메일 */}
            <div style={{ marginBottom: '20px' }}>
              <label>
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                readOnly
              />
            </div>

            {/* 닉네임 */}
            <div>
              <label>
                닉네임
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </div>

            {/* 비밀번호 */}
            <div>
              <label>
                비밀번호 (변경 시에만 입력)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="새 비밀번호 (최소 6자)"
              />
            </div>

            {/* MBTI */}
            <div>
              <label>
                MBTI
              </label>
              <select
                value={mbti}
                onChange={(e) => setMbti(e.target.value)}
                required
              >
                {mbtiOptions.map((option) => (
                  <option key={option} value={option === '선택하세요' ? '' : option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? '저장 중...' : '저장하기 💾'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Settings;