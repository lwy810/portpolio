import React, { useState } from 'react';
import type { MouseEvent } from 'react';
import { Button, Card, Input, StarsBackground } from './Common';
import type { MandalaData } from '../types';
import { useAuth } from '../contexts/AuthContext';


export const MandalaChart: React.FC = () => {
  // API 호출을 위한 기본 설정
  const API_KEY = "AIzaSyBh6a4SerekVaEaoKABD__ZLbGkfl3JTLI";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;

  interface Goal {
    title: string;
    details: string[];
  }

  interface MandalartData {
    finalGoal: string;
    coreGoals: Goal[];
  }

  const [mainGoal, setMainGoal] = useState<string>('');
  const [selectedCore, setSelectedCore] = useState<number | null>(null);

  const { logout } = useAuth();

  const [mandalartData, setMandalartData] = useState<MandalartData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Gemini API 호출
  const fetchMandalartPlan = async () => {
    setIsLoading(true);
    setError(null);
    setMandalartData(null);

    const prompt = "토익 900점 달성을 위한 만다라트 계획표를 만들어줘. 최종 목표, 8가지 핵심 목표, 각 핵심 목표 아래 8가지 세부 목표를 포함해줘. 핵심목표와 세부목표는 간결하게 작성해줘.";
    
    const payload = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            "finalGoal": { "type": "STRING" },
            "coreGoals": {
              "type": "ARRAY",
              "items": {
                "type": "OBJECT",
                "properties": {
                  "title": { "type": "STRING" },
                  "details": {
                    "type": "ARRAY",
                    "items": { "type": "STRING" }
                  }
                },
                "propertyOrdering": ["title", "details"]
              }
            }
          }
        }
      }
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates.length > 0) {
        const jsonText = data.candidates[0].content.parts[0].text;
        const parsedData = JSON.parse(jsonText);
        setMandalartData(parsedData);
      } else {
        setError("API 응답이 올바르지 않습니다.");
      }
    } catch (e: any) {
      console.error('Error fetching data:', e);
      setError(`데이터를 가져오는 중 오류가 발생했습니다: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };
























  // 5x5 만다라 차트 데이터 구조
  const mandalaData: MandalaData = {
    // 중앙 목표
    center: { text: mainGoal, isMain: true },
    
    // 8개 핵심 영역과 각각의 세부 목표들
    sections: [
      {
        id: 0,
        title: "건강",
        isCore: true,
        goals: [
          "헬스장 주 3회 가기", "하루 물 2L 마시기", "일찍 잠자리에 들기",
          "매일 아침 스트레칭", "건강", "사이드 프로젝트",
          "고정지출 20만원 줄이기", "재테크", "동산 10분"
        ]
      },
      {
        id: 1,
        title: "성장",
        isCore: true,
        goals: [
          "하루 1시간 이터넷", "뉴스레터 창간", "대외활동",
          "12시 전에 자기", "성장", "사이드 프로젝트",
          "부수입 월 500만원", "적금 2천만원 저축", "뉴스레터 창간"
        ]
      },
      {
        id: 2,
        title: "재테크",
        isCore: true,
        goals: [
          "부수입 월 500만원", "적금 2천만원 저축", "네트워킹",
          "매달 300만원 절약", "재테크", "취미",
          "배달음식 일 2번만", "주식 수익 10% 달성", "밀리언달러 글로스"
        ]
      },
      {
        id: 3,
        title: "취미",
        isCore: true,
        goals: [
          "기타 배우기", "네트워킹", "기타 배우기",
          "가족 시간", "취미", "기타 배우기",
          "배달음식 일 2번만", "주식 수익 10% 달성", "밀리언달러 글로스"
        ]
      }
    ]
  };

  const selectedSection = mandalaData.sections.find(s => s.id === selectedCore);

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).style.transform = 'scale(1.05)';
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).style.transform = 'scale(1)';
  };

  return (
    <div className="page-container">
      <StarsBackground />
      
      <div className="content-wrapper">
        {/* Header */}
        <div className="mandala-header">
          <h1 className="page-title">
            ⭐ 만다라 차트
          </h1>
          
          <div className="mandala-input-group">
            <Input
              value={mainGoal}
              onChange={(e) => setMainGoal(e.target.value)}
              placeholder="최상위 목표를 입력하세요"
            />
            <Button 
              onClick={logout}
              className="mandala-ai-button">
              AI로 채우기 🤖
            </Button>
          </div>
        </div> 

        {/* Content */}
        {selectedCore !== null ? (
          // 선택된 섹션의 3x3 세부 목표 화면
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Button 
                onClick={() => setSelectedCore(null)}
                variant="ghost"
                className="mandala-back-button"
              >
                ← 뒤로
              </Button>
              <h2 style={{ color: 'var(--galaxy-text)', fontSize: 'clamp(16px, 3.5vw, 20px)' }}>
                {selectedSection?.title}
              </h2>
            </div>
            
            {/* 3x3 세부 목표 그리드 */}
            <div className="mandala-detail-grid">
              {selectedSection?.goals.map((goal, index) => (
                <Card
                  key={index}
                  className={`mandala-detail-cell ${
                    index === 4 ? 'mandala-detail-center' : 
                    (index === 1 || index === 3 || index === 5 || index === 7) ? 
                    'mandala-detail-core' : 'mandala-detail-goal'
                  }`}
                >
                  <div style={{ 
                    color: index === 4 ? 'white' : 'var(--galaxy-text)',
                    lineHeight: '1.1'
                  }}>
                    {goal}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // 메인 만다라 차트 화면 (5x5 형태)
          <div className="mandala-grid">
            {/* 5x5 그리드 생성 */}
            {Array.from({ length: 25 }, (_, index) => {
              const row = Math.floor(index / 5);
              const col = index % 5;
              
              // 중앙 (2,2) - 메인 목표
              if (row === 2 && col === 2) {
                return (
                  <Card key={index} className="mandala-cell mandala-center">
                    <div className="text">
                      {mainGoal}
                    </div>
                  </Card>
                );
              }
              
              // 핵심 목표 영역들 (검은색)
              const corePositions: [number, number][] = [
                [1, 1], [1, 3], [3, 1], [3, 3] // 건강, 성장, 재테크, 취미
              ];
              const coreIndex = corePositions.findIndex(([r, c]) => r === row && c === col);
              if (coreIndex !== -1) {
                const coreGoal = mandalaData.sections[coreIndex];
                return (
                  <Card
                    key={index}
                    onClick={() => setSelectedCore(coreGoal.id)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="mandala-cell mandala-core"
                  >
                    <div className="text">
                      {coreGoal.title}
                    </div>
                  </Card>
                );
              }
              
              // 세부 목표들 (회색)
              let goalText = "";
              let sectionId = -1;
              let goalIndex = -1;
              
              // 건강 영역 (좌상단)
              if (row <= 2 && col <= 2 && !(row === 1 && col === 1) && !(row === 2 && col === 2)) {
                sectionId = 0;
                goalIndex = row * 3 + col;
                if (goalIndex !== 4) { // 중앙 제외
                  goalText = mandalaData.sections[0].goals[goalIndex] || "";
                }
              }
              // 성장 영역 (우상단)
              else if (row <= 2 && col >= 2 && !(row === 1 && col === 3) && !(row === 2 && col === 2)) {
                sectionId = 1;
                goalIndex = row * 3 + (col - 2);
                if (goalIndex !== 4) {
                  goalText = mandalaData.sections[1].goals[goalIndex] || "";
                }
              }
              // 재테크 영역 (좌하단)
              else if (row >= 2 && col <= 2 && !(row === 3 && col === 1) && !(row === 2 && col === 2)) {
                sectionId = 2;
                goalIndex = (row - 2) * 3 + col;
                if (goalIndex !== 4) {
                  goalText = mandalaData.sections[2].goals[goalIndex] || "";
                }
              }
              // 취미 영역 (우하단)
              else if (row >= 2 && col >= 2 && !(row === 3 && col === 3) && !(row === 2 && col === 2)) {
                sectionId = 3;
                goalIndex = (row - 2) * 3 + (col - 2);
                if (goalIndex !== 4) {
                  goalText = mandalaData.sections[3].goals[goalIndex] || "";
                }
              }
              
              return (
                <Card
                  key={index}
                  className={`mandala-cell ${goalText ? 'mandala-goal' : 'mandala-empty'}`}
                >
                  <div className="text">
                    {goalText}
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Save Button */}
        <Button variant="secondary" className="mandala-save-button">
          저장하기 💫
        </Button>
      </div>
    </div>
  );
};