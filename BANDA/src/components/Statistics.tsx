import React, { useEffect } from 'react';
import { Card, StarsBackground } from './Common';
import type { WeeklyData } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const Statistics: React.FC = () => {
  const { currentUser } = useAuth();

  // 🔧 console.log를 useEffect로 이동
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  const weeklyData: WeeklyData[] = [
    { day: '월', stars: 3 },
    { day: '화', stars: 5 },
    { day: '수', stars: 2 },
    { day: '목', stars: 7 },
    { day: '금', stars: 4 },
    { day: '토', stars: 6 },
    { day: '일', stars: 8 },
  ];

  const todayStars = currentUser?.user_total_stars;
  const maxStars = Math.max(...weeklyData.map(d => d.stars));
  const totalWeeklyStars = weeklyData.reduce((sum, d) => sum + d.stars, 0);

  return (
    <div className="page-container">
      <StarsBackground />

      <div className="content-wrapper">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">
            📊 내 우주 통계
          </h1>
          <p className="page-subtitle">
            별을 모아 나만의 우주를 만들어가고 있어요!
          </p>
        </div>

        {/* Today's Stars */}
        <Card className="stats-today-card">
          <h2 className="stats-today-title">
            오늘 획득한 별
          </h2>
          <div className="stats-today-stars">
            <span className="stats-today-number">
              {todayStars}
            </span>
            <span className="stats-today-icon">⭐</span>
          </div>
          <p className="stats-today-message">
            훌륭해요! 오늘도 목표를 향해 나아갔어요
          </p>
        </Card>

        {/* Weekly Chart */}
        <Card className="stats-weekly-chart">
          <h2 className="stats-weekly-title">
            이번 주 별 획득 현황
          </h2>
          
          <div className="stats-chart-rows">
            {weeklyData.map((data) => (
              <div key={data.day} className="stats-chart-row">
                <div className="stats-day-label">
                  {data.day}
                </div>
                <div className="stats-progress-bar">
                  <div 
                    className="stats-progress-fill"
                    style={{
                      width: `${(data.stars / maxStars) * 100}%`
                    }}
                  />
                </div>
                <div className="stats-stars-count">
                  {data.stars}⭐
                </div>
              </div>
            ))}
          </div>

          <div className="stats-weekly-summary">
            이번 주 총 {totalWeeklyStars}개의 별을 획득했어요! ✨
          </div>
        </Card>

        {/* Achievement Summary */}
        <Card className='success_summary'>
          <h2 className="stats-weekly-title">
            달성 요약
          </h2>
          
          <div className="stats-achievement-grid">
            {[
              { icon: '🏆', label: '이 달성률', value: '78%' },
              { icon: '🔥', label: '연속 달성', value: '5일' },
              { icon: '📈', label: '이번 달', value: '124⭐' },
              { icon: '🌟', label: '레벨', value: 'Lv.7' }
            ].map((item, index) => (
              <div key={index} className="stats-achievement-item">
                <div className="stats-achievement-icon">
                  {item.icon}
                </div>
                <div className="stats-achievement-label">
                  {item.label}
                </div>
                <div className="stats-achievement-value">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};