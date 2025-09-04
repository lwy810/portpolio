import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Screen } from '../types';
import { useAuth } from '../contexts/AuthContext';
import type { MouseEvent } from 'react';
import { Button } from './Common';

interface NavigationProps {
  currentScreen: Screen;
}

export const BottomNavigation: React.FC<NavigationProps> = ({ currentScreen }) => { 
  // const { currentUser } = useAuth();
  const navigate = useNavigate();
  // 🔧 마우스 이벤트 핸들러를 useCallback으로 메모이제이션
  const handleMouseEnter = useCallback((e: MouseEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).style.transform = 'scale(1.05)';
  }, []);

  const handleMouseLeave = useCallback((e: MouseEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).style.transform = 'scale(1)';
  }, []);


  // // 🔧 console.log를 useEffect로 이동
  // useEffect(() => {
  //   console.log(currentUser);
  // }, [currentUser]);

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
          const isActive = currentScreen === `/${tab.id}`;
          
          return (
            <Button
              key={tab.id}
              onClick={() => navigate(`/${tab.id}`)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`bottom-nav-tab ${isActive ? 'bottom-nav-tab-active' : 'bottom-nav-tab-inactive'}`}
            >
              <span className="bottom-nav-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};