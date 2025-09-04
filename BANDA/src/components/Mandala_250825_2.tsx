import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { MouseEvent } from 'react';
import { Button, Card, Input, StarsBackground } from './Common';
import type { MandalaData } from '../types';
import { useNavigate } from 'react-router-dom';
import { MandalaDAO, type MandalartInsertData, type MandalaChartInsert, type CoreGoalInsert } from './Dao';

const API_KEY = "AIzaSyBh6a4SerekVaEaoKABD__ZLbGkfl3JTLI";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;

export interface MandalartData {
  finalGoal: string;
  mandala_chart_id: string;
  coreGoals: CoreGoalProps[];
}

export interface CoreGoalProps {
  core_goal_id: number;
  mandala_chart_id: string;
  core_goal_title: string;
  subGoals: SubGoalProps[];
}

export interface SubGoalProps {
  core_goal_id: number;
  sub_goal_id: number;
  sub_goal_title: string;
}

export const MandalaChart: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [mainGoal, setMainGoal] = useState<string>("발전하는 예진");
  const [selectedCore, setSelectedCore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiData, setApiData] = useState<MandalartData | null>(null);

  const defaultMandalaData: MandalaData = {
    center: { text: mainGoal, isMain: true },
    sections: []
  };

  const GoToGuide = () => {
    navigate('/guide');
  };

  const convertApiDataToMandalaData = (data: MandalartData, mandalaChartId: string): MandalaData => {
    const sections = data.coreGoals?.slice(0, 4).map((coreGoal, CoreIndex) => ({
      core_goal_id: CoreIndex,
      mandala_chart_id: mandalaChartId,
      core_goal_title: coreGoal.core_goal_title || '',
      isCore: true,
      subGoals: coreGoal.subGoals?.slice(0, 5).map((subGoal, subIndex) => ({
        core_goal_id: CoreIndex,
        sub_goal_id: subIndex,
        sub_goal_title: subGoal.sub_goal_title || '',
        isCore: true,
      })) || []
    })) || [];

    return {
      center: { text: data.finalGoal || mainGoal, isMain: true },
      sections
    };
  };

  const getCurrentMandalaData = (): MandalaData => {
    const mandalaChartId = `${currentUser?.user_email}_mandala_${(currentUser?.user_mandala_charts_count || 0) + 1}`;

    if (apiData) {
      const converted = convertApiDataToMandalaData(apiData, mandalaChartId);
      return {
        ...converted,
        center: { text: mainGoal, isMain: true }
      };
    }
    return {
      ...defaultMandalaData,
      center: { text: mainGoal, isMain: true }
    };
  };

  const mandalaData = getCurrentMandalaData();

  // MandalartData를 DAO 형식으로 변환하는 헬퍼 함수
  const convertToInsertData = (parsedData: MandalartData): MandalartInsertData => {
    const mandalaChartId = `${currentUser?.user_email}_mandala_${(currentUser?.user_mandala_charts_count || 0) + 1}`;

    if (!currentUser?.user_email) {
      throw new Error('사용자 정보가 없습니다.');
    }

    if (!parsedData.coreGoals || parsedData.coreGoals.length === 0) {
      throw new Error('핵심 목표 데이터가 없습니다.');
    }

    const mandalaChart: MandalaChartInsert = {
      mandala_chart_id: mandalaChartId,
      user_email: currentUser.user_email,
      mandala_chart_title: parsedData.finalGoal || mainGoal
    };
    
    const coreGoals: CoreGoalInsert[] = parsedData.coreGoals.map((coreGoal: CoreGoalProps) => ({
      core_goal_id: coreGoal.core_goal_id,
      mandala_chart_id: mandalaChartId,
      core_goal_title: coreGoal.core_goal_title || ''
    }));
   
    return {
      mandalaChart,
      coreGoals
    };
  };

  const fetchMandalartPlan = async () => {
    setIsLoading(true);
    setError(null);

    const prompt = `${mainGoal}을 위한 만다라트 계획표를 만들어줘. 최종 목표, 4가지 핵심 목표, 각 핵심 목표 아래 5가지 세부 목표를 포함해줘. 핵심목표와 세부목표는 간결하게 작성해줘.`;
    
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
                  "core_goal_title": { "type": "STRING" },
                  "subGoals": {
                    "type": "ARRAY",
                    "items": {
                      "type": "OBJECT",
                      "properties": {
                        "sub_goal_title": { "type": "STRING" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    try {
      console.log('📤 API 요청 시작');

      // 1. Gemini API 호출
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('API 응답에 candidates가 없습니다.');
      }

      const jsonText = data.candidates[0].content.parts[0].text;
      const parsedData = JSON.parse(jsonText);
      console.log('🎯 파싱된 API 데이터:', parsedData);
      
      // API 응답 데이터 구조 변환
      const transformedData: MandalartData = {
        finalGoal: parsedData.finalGoal || mainGoal,
        mandala_chart_id: `${currentUser?.user_email}_mandala_${(currentUser?.user_mandala_charts_count || 0) + 1}`,
        coreGoals: parsedData.coreGoals?.map((coreGoal: any, index: number) => ({
          core_goal_id: index,
          mandala_chart_id: `${currentUser?.user_email}_mandala_${(currentUser?.user_mandala_charts_count || 0) + 1}`,
          core_goal_title: coreGoal.core_goal_title || coreGoal.title || '',
          subGoals: coreGoal.subGoals?.map((subGoal: any, subIndex: number) => ({
            core_goal_id: index,
            sub_goal_id: subIndex,
            sub_goal_title: subGoal.sub_goal_title || subGoal || ''
          })) || coreGoal.details?.map((detail: string, subIndex: number) => ({
            core_goal_id: index,
            sub_goal_id: subIndex,
            sub_goal_title: detail || ''
          })) || []
        })) || []
      };

      console.log('🔄 변환된 데이터:', transformedData);

      // 2. DAO를 사용하여 데이터베이스에 저장
      try {
        const insertData = convertToInsertData(transformedData);
        console.log('💾 DB 저장 데이터:', insertData);
        
        await MandalaDAO.insertMandalartWithTransaction(insertData);
        console.log('✅ DB 저장 완료');
      } catch (dbError) {
        console.error('❌ DB 저장 실패:', dbError);
        // DB 저장 실패해도 UI는 업데이트 (사용자 경험 유지)
        setError(`데이터 생성은 완료되었지만 저장 중 오류가 발생했습니다: ${dbError instanceof Error ? dbError.message : String(dbError)}`);
      }

      // 3. 성공시 상태 업데이트
      setApiData(transformedData);
      console.log('✅ 전체 프로세스 완료');

    } catch (error) {
      console.error('❌ API 호출 실패:', error);
      setError(`처리 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedSection = mandalaData.sections?.find(s => s.core_goal_id === selectedCore);

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
        <div className="mandala-header">
          <h1 className="page-title">⭐ 만다라 차트</h1>
          
          <div className="mandala-input-group">
            <Input
              value={mainGoal}
              onChange={(e) => setMainGoal(e.target.value)}
              placeholder="최상위 목표를 입력하세요"
            />
            <Button 
              onClick={fetchMandalartPlan}
              disabled={isLoading}
              className="mandala-ai-button"
            >
              {isLoading ? '생성 중...' : 'AI로 채우기 🤖'}
            </Button>
          </div>
        </div>

        {error && (
          <div style={{ color: 'red', textAlign: 'center', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        {selectedCore !== null && selectedSection ? (
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
                {selectedSection.core_goal_title}
              </h2>
            </div>
            
            <div className="mandala-detail-grid">
              {selectedSection.subGoals?.map((subGoal, index) => (
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
                    {subGoal.sub_goal_title}
                  </div>
                </Card>
              )) || []}
            </div>
          </div>
        ) : (
          <div className="mandala-grid">
            {Array.from({ length: 25 }, (_, index) => {
              const row = Math.floor(index / 5);
              const col = index % 5;
              
              if (row === 2 && col === 2) {
                return (
                  <Card key={index} className="mandala-cell mandala-center">
                    <div className="text">{mainGoal}</div>
                  </Card>
                );
              }
              
              const corePositions: [number, number][] = [
                [1, 1], [1, 3], [3, 1], [3, 3]
              ];
              const coreIndex = corePositions.findIndex(([r, c]) => r === row && c === col);
              if (coreIndex !== -1 && mandalaData.sections?.[coreIndex]) {
                const coreGoal = mandalaData.sections[coreIndex];
                return (
                  <Card
                    key={index}
                    onClick={() => setSelectedCore(coreGoal.core_goal_id)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="mandala-cell mandala-core"
                  >
                    <div className="text">{coreGoal.core_goal_title}</div>
                  </Card>
                );
              }
              
              let goalText = "";
              
              if (mandalaData.sections && mandalaData.sections.length > 0) {
                if (row <= 1 && col <= 2 && !(row === 1 && col === 1) && !(row === 2 && col === 2)) {
                  const section = mandalaData.sections[0];
                  if (section?.subGoals) {
                    const detailPositions = [
                      [0, 0], [0, 1], [0, 2],
                      [1, 0],         [1, 2],
                    ];
                    const detailIndex = detailPositions.findIndex(([r, c]) => r === row && c === col);
                    if (detailIndex !== -1 && detailIndex < section.subGoals.length) {
                      goalText = section.subGoals[detailIndex]?.sub_goal_title || "";
                    }
                  }
                }
                else if (row <= 2 && col >= 3 && !(row === 1 && col === 3) && !(row === 2 && col === 2)) {
                  const section = mandalaData.sections[1];
                  if (section?.subGoals) {
                    const detailPositions = [
                      [0, 3], [0, 4],
                              [1, 4],
                      [2, 3], [2, 4]
                    ];
                    const detailIndex = detailPositions.findIndex(([r, c]) => r === row && c === col);
                    if (detailIndex !== -1 && detailIndex < section.subGoals.length) {
                      goalText = section.subGoals[detailIndex]?.sub_goal_title || "";
                    }
                  }
                }
                else if (row >= 2 && col <= 1 && !(row === 3 && col === 1) && !(row === 2 && col === 2)) {
                  const section = mandalaData.sections[2];
                  if (section?.subGoals) {
                    const detailPositions = [
                      [2, 0], [2, 1],
                      [3, 0],
                      [4, 0], [4, 1],
                    ];
                    const detailIndex = detailPositions.findIndex(([r, c]) => r === row && c === col);
                    if (detailIndex !== -1 && detailIndex < section.subGoals.length) {
                      goalText = section.subGoals[detailIndex]?.sub_goal_title || "";
                    }
                  }
                }
                else if (row >= 3 && col >= 2 && !(row === 3 && col === 3) && !(row === 2 && col === 2)) {
                  const section = mandalaData.sections[3];
                  if (section?.subGoals) {
                    const detailPositions = [
                      [3, 2],         [3, 4],
                      [4, 2], [4, 3], [4, 4]
                    ];
                    const detailIndex = detailPositions.findIndex(([r, c]) => r === row && c === col);
                    if (detailIndex !== -1 && detailIndex < section.subGoals.length) {
                      goalText = section.subGoals[detailIndex]?.sub_goal_title || "";
                    }
                  }
                }
              }
              
              return (
                <Card
                  key={index}
                  className={`mandala-cell ${goalText ? 'mandala-goal' : 'mandala-empty'}`}
                >
                  <div className="text">{goalText}</div>
                </Card>
              );
            })}
          </div>
        )}

        <Button 
          variant="secondary" 
          className="mandala-save-button"
          onClick={async () => {
            if (!apiData) {
              setError('저장할 데이터가 없습니다. 먼저 AI로 만다라트를 생성해주세요.');
              return;
            }
            
            try {
              setIsLoading(true);
              const insertData = convertToInsertData(apiData);
              await MandalaDAO.insertMandalartWithTransaction(insertData);
              alert('만다라트가 성공적으로 저장되었습니다! 💫');
            } catch (error) {
              console.error('저장 실패:', error);
              setError(`저장 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`);
            } finally {
              setIsLoading(false);
            }
          }}
          disabled={isLoading || !apiData}
        >
          {isLoading ? '저장 중...' : '저장하기 💫'}
        </Button>
        <Button 
          onClick={GoToGuide}
          variant="secondary" 
          className="mandala-save-button"
        >
          사용방법 💫
        </Button>
      </div>
    </div>
  );
};