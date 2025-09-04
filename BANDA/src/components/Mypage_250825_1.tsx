import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, StarsBackground } from './Common';
import type { CoreGoal } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const MyPage: React.FC = () => {
  const { currentUser } = useAuth();
  console.log(currentUser)

  const navigate = useNavigate()
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // <--- 로그아웃 시 Context의 logout 함수 호출
    navigate('/'); // 로그아웃 후 로그인 페이지로 이동
  };

  const GoToInfoUpdate = () => {
    navigate('/settings');
  };

  const AvatarUpdate = () => {
    navigate('/avatarselector');
  };


  const [showAttendancePopup, setShowAttendancePopup] = useState<boolean>(false);
  const [attendanceCount, setAttendanceCount] = useState<number>(3);

  const currentLevel = 7;
  const currentXP = 124;
  const maxXP = 200;
  const xpProgress = (currentXP / maxXP) * 100;

  const dailyQuote = "작은 별들이 모여 큰 우주를 만듭니다. 오늘도 한 걸음 더 나아가세요! ✨";

  const handleAttendance = () => {
    setShowAttendancePopup(true);
    setAttendanceCount(prev => prev + 1);
    setTimeout(() => {
      setShowAttendancePopup(false);
    }, 2000);
  };

  const coreGoals: CoreGoal[] = [
    { name: "운동", completed: 3, total: 5, progress: 60 },
    { name: "독서", completed: 2, total: 4, progress: 50 },
    { name: "식습관", completed: 4, total: 5, progress: 80 },
    { name: "자기계발", completed: 1, total: 3, progress: 33 },
  ];

  const overallProgress = Math.round(coreGoals.reduce((sum, goal) => sum + goal.progress, 0) / coreGoals.length);

  return (
    <div className="page-container">
      <StarsBackground count={12} />
      
      <div className="content-wrapper">
        {/* Header with Level */}
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
            Lv.{currentLevel} 우주 탐험가
          </h1>
          <div className="mypage-xp-text">
            {currentXP}/{maxXP} XP
          </div>
          <div className="mypage-xp-bar">
            <div 
              className="mypage-xp-fill"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </Card>

        {/* Daily Quote */}
        <Card className="mypage-quote-card">
          <div className="mypage-quote-icon">💫</div>
          <h2 className="mypage-quote-title">
            오늘의 한마디
          </h2>
          <p className="mypage-quote-text">
            "{dailyQuote}"
          </p>
        </Card>

        {/* Attendance Check */}
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

        {/* Goal Summary */}
        <Card className='mypage-mymission'>
          <h2 className="mypage-goals-title">
            내 목표 현황
          </h2>
          
          {/* Main Goal Display */}
          <div className="mypage-main-goal">
            <h3 className="mypage-main-goal-text">
              발전하는 나
            </h3>
          </div>

          {/* Core Goals Progress */}
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



      {/* Attendance Popup */}
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