import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';
import './Settings.css';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, login } = useAuth();
  
  useEffect(() => {
    console.log('Current User Data:', currentUser);
  }, [currentUser])

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
      {/* Stars Background */}
      <div className="stars-background">
        {[...Array(30)].map((_, i) => (
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

      <div className="content-wrapper">
        <div className="settings-container">
          {/* Header */}
          <div className="settings-header">
            <button onClick={goBack} className="settings-back-button">
              ← 
            </button>
            <h2 className="settings-title">설정</h2>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="settings-error-message">
              ⚠️ {error}
            </div>
          )}
          
          {success && (
            <div className="settings-success-message">
              ✅ {success}
            </div>
          )}

          {/* Settings Form */}
          <form onSubmit={handleSave} className="settings-form">
            {/* Email */}
            <div className="settings-form-group">
              <label className="settings-form-label">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="settings-input settings-input-readonly"
                required
                readOnly
              />
            </div>

            {/* Nickname */}
            <div className="settings-form-group">
              <label className="settings-form-label">닉네임</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="settings-input"
                required
              />
            </div>

            {/* Password */}
            <div className="settings-form-group">
              <label className="settings-form-label">
                비밀번호 (변경 시에만 입력)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="새 비밀번호 (최소 6자)"
                className="settings-input"
              />
            </div>

            {/* MBTI */}
            <div className="settings-form-group">
              <label className="settings-form-label">MBTI</label>
              <select
                value={mbti}
                onChange={(e) => setMbti(e.target.value)}
                className="settings-select"
                required
              >
                {mbtiOptions.map((option) => (
                  <option key={option} value={option === '선택하세요' ? '' : option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={loading}
              className="settings-save-button"
            >
              {loading ? '저장 중...' : '저장하기 💾'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;