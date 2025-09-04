import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, StarsBackground } from './Common';
import type { CoreGoal } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const MyPage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  // 🔧 네비게이션 함수들을 useCallback으로 메모이제이션
  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  const GoToInfoUpdate = useCallback(() => {
    navigate('/settings');
  }, [navigate]);

  const AvatarUpdate = useCallback(() => {
    navigate('/avatarselector');
  }, [navigate]);

  const [showAttendancePopup, setShowAttendancePopup] = useState<boolean>(false);
  const [attendanceCount, setAttendanceCount] = useState<number>(3);


  // XP 진행률
  const xpProgress = useMemo(() => {
    if (!profile) return 0;
    if (!profile.xp_to_next_level) return 0;
    return Math.min(
      100,
      Math.max(0, (profile.current_xp / profile.xp_to_next_level) * 100)
    );
  }, [profile]);




  // 🔧 상수값들을 useMemo로 메모이제이션 (필요시)
  const gameStats = useMemo(() => ({
    currentLevel: 7,
    currentXP: 124,
    maxXP: 200
  }), []);

  const xpProgress = useMemo(() => {
    return (gameStats.currentXP / gameStats.maxXP) * 100;
  }, [gameStats.currentXP, gameStats.maxXP]);

  const dailyQuote = "작은 별들이 모여 큰 우주를 만듭니다. 오늘도 한 걸음 더 나아가세요! ✨";

  // 🔧 출석 체크 함수를 useCallback으로 메모이제이션
  const handleAttendance = useCallback(() => {
    setShowAttendancePopup(true);
    setAttendanceCount(prev => prev + 1);
    setTimeout(() => {
      setShowAttendancePopup(false);
    }, 2000);
  }, []);

  // 🔧 목표 데이터를 useMemo로 메모이제이션
  const coreGoals: CoreGoal[] = useMemo(() => [
    { name: "운동", completed: 3, total: 5, progress: 60 },
    { name: "독서", completed: 2, total: 4, progress: 50 },
    { name: "식습관", completed: 4, total: 5, progress: 80 },
    { name: "자기계발", completed: 1, total: 3, progress: 33 },
  ], []);

  const overallProgress = useMemo(() => {
    return Math.round(coreGoals.reduce((sum, goal) => sum + goal.progress, 0) / coreGoals.length);
  }, [coreGoals]);

  return (
    <div className="page-container">
      <StarsBackground count={12} />
      
      <div className="content-wrapper">
        <Button
          onClick={GoToInfoUpdate}
          className="mypage-attendance-button, info_update_button"
        >
          정보 수정 📅
        </Button>

        <Card className="mypage-profile-card">
          <button type="button" className='avatar_update' onClick={AvatarUpdate}>+</button>
          <div className="mypage-avatar">
            <img src={currentUser?.user_avatar} width='70px' height='70px' alt="기본 이미지" />
          </div>
          <h1 className="mypage-level-title">
            Lv.{gameStats.currentLevel} 우주 탐험가
          </h1>
          <div className="mypage-xp-text">
            {gameStats.currentXP}/{gameStats.maxXP} XP
          </div>
          <div className="mypage-xp-bar">
            <div 
              className="mypage-xp-fill"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </Card>

        <Card className="mypage-quote-card">
          <div className="mypage-quote-icon">💫</div>
          <h2 className="mypage-quote-title">
            오늘의 한마디
          </h2>
          <p className="mypage-quote-text">
            "{dailyQuote}"
          </p>
        </Card>

        <Card className="mypage-attendance-card">
          <div className="mypage-attendance-content">
            <div>
              <h3 className="mypage-attendance-title">
                출석체크
              </h3>
              <p className="mypage-attendance-count">
                {attendanceCount}일 연속 출석 중
              </p>
            </div>
            <Button
              onClick={handleAttendance}
              className="mypage-attendance-button"
            >
              출석 체크 📅
            </Button>
          </div>
        </Card>

        <Card className='mypage-mymission'>
          <h2 className="mypage-goals-title">
            내 목표 현황
          </h2>
          
          <div className="mypage-main-goal">
            <h3 className="mypage-main-goal-text">
              발전하는 나
            </h3>
          </div>

          <div className="mypage-goals-list">
            {coreGoals.map((goal, index) => (
              <div key={index}>
                <div className="mypage-goal-item">
                  <div className="mypage-goal-info">
                    <span className="mypage-goal-name">
                      {goal.name}
                    </span>
                    <span className="mypage-goal-stars">
                      {goal.completed}/{goal.total} ⭐
                    </span>
                  </div>
                  <span className="mypage-goal-progress">
                    {goal.progress}%
                  </span>
                </div>
                <div className="mypage-progress-bars">
                  {[...Array(goal.total)].map((_, i) => (
                    <div
                      key={i}
                      className={`mypage-progress-bar ${
                        i < goal.completed ? 'mypage-progress-completed' : 'mypage-progress-empty'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mypage-overall-progress">
            전체 달성률 : {overallProgress}%
          </div>
        </Card>
        
        <Button 
          className='mypage-logout-button'
          onClick={handleLogout}
          type="button"
        >
          로그아웃 🚀
        </Button>  
      </div>

      {showAttendancePopup && (
        <div className="popup-overlay">
          <Card className="popup-card">
            <div className="popup-icon">🎉</div>
            <h3 className="popup-title">
              {attendanceCount}일 연속 출석!
            </h3>
            <div className="popup-stars">⭐</div>
            <p className="popup-message">
              보상으로 별 1개를 획득했어요!
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};