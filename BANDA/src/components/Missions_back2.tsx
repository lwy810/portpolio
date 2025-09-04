import React, { useState } from 'react';
import { Button, Card, StarsBackground } from './Common';
import type { Mission } from '../types.ts';
import { useAuth } from '../contexts/AuthContext';

export const DailyMissions: React.FC = () => {
  const { currentUser } = useAuth();
  console.log(currentUser)

  const [missions, setMissions] = useState<Mission[]>([
    {
      id: "1",
      title: "아침 스트레칭 10분",
      description: "하루를 활기차게 시작하세요",
      tip: "💡 목과 어깨를 중심으로 천천히 스트레칭하세요",
      completed: false
    },
    {
      id: "2", 
      title: "감사 일기 3줄 쓰기",
      description: "오늘 감사한 일들을 적어보세요",
      tip: "💡 작은 것부터 큰 것까지, 무엇이든 좋습니다",
      completed: false
    },
    {
      id: "3",
      title: "물 한 잔 마시기",
      description: "충분한 수분 섭취는 건강의 기본",
      tip: "💡 미지근한 물이 몸에 부담을 덜 줍니다",
      completed: false
    },
    {
      id: "4",
      title: "5분 명상하기",
      description: "마음을 평온하게 만들어보세요",
      tip: "💡 호흡에만 집중하며 잡념을 내려놓으세요",
      completed: false
    }
  ]);
  const [loading, setLoading] = useState(false);

  // AI 미션 제안 함수
  const suggestAIMission = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: '당신은 건강, 자기계발, 습관 형성에 도움을 주는 AI입니다.' },
            { role: 'user', content: '오늘 할 수 있는 간단한 미션 하나만 추천해줘. 제목, 설명, 팁을 각각 한 문장으로.' }
          ],
          max_tokens: 100,
        }),
      });

      const data = await response.json();
      // 예시 응답: "제목: ...\n설명: ...\n팁: ..."
      const content = data.choices?.[0]?.message?.content || '';
      const [titleLine, descLine, tipLine] = content.split('\n');
      const title = titleLine?.replace('제목:', '').trim();
      const description = descLine?.replace('설명:', '').trim();
      const tip = tipLine?.replace('팁:', '').trim();

      setMissions(prev => [
        ...prev,
        {
          id: `ai${Date.now()}`,
          title: title || 'AI 미션',
          description: description || '',
          tip: tip || '',
          completed: false,
        }
      ]);
    } catch (e) {
      alert('AI 미션 제안에 실패했습니다.');
    }
    setLoading(false);
  };

  const toggleMissionCompletion = (missionId: string) => {
    setMissions(prev => prev.map(mission =>
      mission.id === missionId 
        ? { ...mission, completed: !mission.completed }
        : mission
    ));
  };

  const completedCount = missions.filter(m => m.completed).length;

  return (
    <div className="page-container">
      <StarsBackground />
      
      <div className="content-wrapper">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">
            🌟 오늘의 AI 미션
          </h1>
          <div className="mission-progress">
            <span className="mission-progress-text">진행도:</span>
            <span className="mission-progress-count">{completedCount}/{missions.length} ⭐</span>
          </div>
          <Button onClick={suggestAIMission} variant="primary" style={{ marginTop: 12 }} disabled={loading}>
            {loading ? 'AI 미션 생성 중...' : 'AI 미션 제안 받기'}
          </Button>
        </div>

        {/* Mission Cards */}
        <div className="mission-list">
          {missions.map((mission) => (
            <Card key={mission.id}>
              <div className="mission-card-content">
                <div className="mission-header">
                  <div className="mission-info">
                    <h3 className={`mission-title ${mission.completed ? 'mission-title-completed' : 'mission-title-active'}`}>
                      {mission.title}
                    </h3>
                    <p className="mission-description">
                      {mission.description}
                    </p>
                  </div>
                  <Button
                    onClick={() => toggleMissionCompletion(mission.id)}
                    variant="ghost"
                    className="mission-complete-button"
                  >
                    {mission.completed ? '⭐' : '☆'}
                  </Button>
                </div>
                
                <div className="mission-tip">
                  {mission.tip}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};