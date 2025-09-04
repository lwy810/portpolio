import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';


const AvatarSelector: React.FC = () => {
  const { currentUser, login } = useAuth();
  const navigate = useNavigate();

  const GoToMyPage = () => {
    navigate('/mypage');
    console.log(currentUser)
  };

  const avatars = [
    { src: '/src/images/level1.png', level: 1, name: '기본' },
    { src: '/src/images/level2.png', level: 2, name: '레벨2' },
    { src: '/src/images/level3.png', level: 3, name: '레벨3' },
    { src: '/src/images/level4.png', level: 4, name: '레벨4' },
  ];

  const handleAvatarSelect = async (avatarSrc: string) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ user_avatar: avatarSrc })
        .eq('user_email', currentUser?.user_email);

      if (error) {
        console.error('아바타 변경 오류:', error);
        return;
      }

      const updatedUser = { ...currentUser!, user_avatar: avatarSrc };
      login(updatedUser);
    } catch (err) {
      console.error('아바타 변경 실패:', err);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="card" style={{ maxWidth: '300px', margin: '20px' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--galaxy-text)' }}>
          아바타 선택
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '20px' }}>
          {avatars.map((avatar) => {
            const isUnlocked = (currentUser?.user_level || 1) >= avatar.level;
            const isSelected = currentUser?.user_avatar === avatar.src;
            
            return (
              <button
                key={avatar.src}
                onClick={() => isUnlocked && handleAvatarSelect(avatar.src)}
                disabled={!isUnlocked}
                style={{
                  padding: '10px',
                  border: isSelected ? '1px solid var(--galaxy-accent)' : '1px solid var(--galaxy-light)',
                  borderRadius: '8px',
                  background: isSelected ? 'var(--galaxy-accent)' : 
                             isUnlocked ? 'var(--galaxy-card)' : 'var(--galaxy-blue)',
                  cursor: isUnlocked ? 'pointer' : 'not-allowed',
                  opacity: isUnlocked ? 1 : 0.3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  position: 'relative'
                }}
              >
                <div style={{ 
                  width: '60px', 
                  height: '60px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent'
                }}>
                  {isUnlocked ? (
                    <img 
                      src={avatar.src} 
                      alt={avatar.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '50%'
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: '24px' }}>🔒</div>
                  )}
                </div>
                
                <div style={{ 
                  fontSize: '10px', 
                  color: isSelected ? 'white' : 'var(--galaxy-text)',
                  textAlign: 'center'
                }}>
                  {avatar.name}
                </div>
                
                <div style={{ 
                  fontSize: '8px', 
                  color: isSelected ? 'white' : 'var(--galaxy-light)'
                }}>
                  Lv.{avatar.level}
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={GoToMyPage}
          className="button button-ghost close-button"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default AvatarSelector;