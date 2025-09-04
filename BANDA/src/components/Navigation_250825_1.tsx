import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Screen } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  currentScreen: Screen;
}

export const BottomNavigation: React.FC<NavigationProps> = ({ currentScreen }) => { 
  const { currentUser } = useAuth();
  console.log(currentUser)

  const navigate = useNavigate(); // ✅ useNavigate 훅 사용

  const navigationTabs = [
    { id: 'mandala' as Screen, icon: '🎯', label: '목표' },
    { id: 'missions' as Screen, icon: '🌟', label: '미션' },
    { id: 'statistics' as Screen, icon: '📊', label: '통계' },
    { id: 'mypage' as Screen, icon: '👤', label: '마이' }
  ];

  return (
    <div className="bottom-nav">
      <div className="bottom-nav-content">
        {navigationTabs.map(tab => {
          // ✅ currentScreen과 `/${tab.id}`를 비교
          const isActive = currentScreen === `/${tab.id}`;
          
          return (
            <button
              key={tab.id}
              onClick={() => navigate(`/${tab.id}`)}
              className={`bottom-nav-tab ${isActive ? 'bottom-nav-tab-active' : 'bottom-nav-tab-inactive'}`}
            >
              <span className="bottom-nav-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};