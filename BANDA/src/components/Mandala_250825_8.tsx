import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { MouseEvent } from 'react';
import { Button, Card, Input, StarsBackground } from './Common';
import type { MandalaData } from '../types';
import { useNavigate } from 'react-router-dom';
import { MandalaDAO, type MandalartInsertData, type MandalaChartInsert, type CoreGoalInsert, type SubGoalInsert } from './Dao';

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
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiData, setApiData] = useState<MandalartData | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // 🔧 조건부 로직을 useEffect로 이동하여 매 렌더링마다 실행되지 않도록 함
  
  useEffect(() => {
    if (currentUser?.user_mandala_charts_count === 0) {
      console.log(`"만다라 없음 : "${currentUser?.user_mandala_charts_count}`);
    } else {
      console.log(`"만다라 있음 : "${currentUser?.user_mandala_charts_count}`);
    }
  }, [currentUser?.user_mandala_charts_count]);

    // 🔧 console.log를 useEffect로 이동
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  // 🔧 기본 만다라 데이터를 useMemo로 메모이제이션
  const defaultMandalaData: MandalaData = useMemo(() => ({
    center: { text: mainGoal, isMain: true },
    sections: []
  }), [mainGoal]);

  // 🔧 네비게이션 함수를 useCallback으로 메모이제이션
  const GoToGuide = useCallback(() => {
    navigate('/guide');
  }, [navigate]);

  // 🔧 API 데이터 변환 함수를 useCallback으로 메모이제이션
  const convertApiDataToMandalaData = useCallback((data: MandalartData, mandalaChartId: string): MandalaData => {
    const sections = data.coreGoals?.slice(0, 4).map((coreGoal, CoreIndex) => ({
      core_goal_id: CoreIndex,
      mandala_chart_id: mandalaChartId,
      core_goal_title: coreGoal.core_goal_title || '',
      isCore: true,
      subGoals: coreGoal.subGoals?.slice(0, 5).map((subGoal, subIndex) => ({
        core_goal_id: coreGoal.core_goal_id,
        sub_goal_id: subIndex,
        sub_goal_title: subGoal.sub_goal_title || '',
        isCore: true,
      })) || []
    })) || [];

    return {
      center: { text: data.finalGoal || mainGoal, isMain: true },
      sections
    };
  }, [mainGoal]);

  // 🔧 만다라 차트 ID를 useMemo로 메모이제이션
  const mandalaChartId = useMemo(() => {
    return `${currentUser?.user_email}_mandala_${(currentUser?.user_mandala_charts_count || 0) + 1}`;
  }, [currentUser?.user_email, currentUser?.user_mandala_charts_count]);

  // 🔧 현재 만다라 데이터 가져오는 함수를 useMemo로 메모이제이션
  const mandalaData = useMemo((): MandalaData => {
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
  }, [apiData, convertApiDataToMandalaData, mandalaChartId, mainGoal, defaultMandalaData]);

  // 🔧 DAO 변환 함수를 useCallback으로 메모이제이션
  const convertToInsertData = useCallback((parsedData: MandalartData): MandalartInsertData => {
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
    
    const coreGoals: CoreGoalInsert[] = parsedData.coreGoals.map((coreGoal: CoreGoalProps, index: number) => ({
      mandala_chart_id: mandalaChartId,
      core_goal_id: `${index + 1}`,
      core_goal_title: coreGoal.core_goal_title || ''
    }));

    const subGoals: SubGoalInsert[] = [];
    parsedData.coreGoals.forEach((coreGoal: CoreGoalProps, coreIndex: number) => {
      if (coreGoal.subGoals && coreGoal.subGoals.length > 0) {
        coreGoal.subGoals.forEach((subGoal: SubGoalProps, subIndex: number) => {
          subGoals.push({
            sub_goal_id: `${coreIndex + 1}_${subIndex + 1}`,
            core_goal_id: `${coreIndex + 1}`,
            sub_goal_title: subGoal.sub_goal_title || ''
          });
        });
      }
    });

    console.log('📄 변환된 insertData:', {
      mandalaChart,
      coreGoals,
      subGoals: subGoals.length
    });
  
    return {
      mandalaChart,
      coreGoals,
      subGoals
    };
  }, [currentUser?.user_email, mandalaChartId, mainGoal]);

  // 🔧 API 호출 함수를 useCallback으로 메모이제이션 (DB 저장 로직 제거)
  const fetchMandalartPlan = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIsSaved(false); // 새로운 데이터 생성 시 저장 상태 초기화

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
      
      const transformedData: MandalartData = {
        finalGoal: parsedData.finalGoal || mainGoal,
        mandala_chart_id: mandalaChartId,
        coreGoals: parsedData.coreGoals?.map((coreGoal: any, index: number) => ({
          core_goal_id: index + 1,
          mandala_chart_id: mandalaChartId,
          core_goal_title: coreGoal.core_goal_title || coreGoal.title || '',
          subGoals: coreGoal.subGoals?.map((subGoal: any, subIndex: number) => ({
            core_goal_id: index + 1,
            sub_goal_id: subIndex + 1,
            sub_goal_title: subGoal.sub_goal_title || subGoal || ''
          })) || coreGoal.details?.map((detail: string, subIndex: number) => ({
            core_goal_id: index + 1,
            sub_goal_id: subIndex + 1,
            sub_goal_title: detail || ''
          })) || []
        })) || []
      };

      console.log('📄 변환된 데이터:', transformedData);
      setApiData(transformedData);
      console.log('✅ 만다라트 생성 완료 (저장은 별도 버튼으로)');

    } catch (error) {
      console.error('❌ API 호출 실패:', error);
      setError(`처리 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  }, [mainGoal, mandalaChartId]);

  // 🔧 선택된 섹션을 useMemo로 메모이제이션
  const selectedSection = useMemo(() => {
    return mandalaData.sections?.find(s => s.core_goal_id === selectedCore);
  }, [mandalaData.sections, selectedCore]);

  // 🔧 마우스 이벤트 핸들러를 useCallback으로 메모이제이션
  const handleMouseEnter = useCallback((e: MouseEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).style.transform = 'scale(1.05)';
  }, []);

  const handleMouseLeave = useCallback((e: MouseEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).style.transform = 'scale(1)';
  }, []);

  // 🔧 저장 핸들러 - 오직 여기서만 DB에 저장
  const handleSave = useCallback(async () => {
    if (!apiData) {
      setError('저장할 데이터가 없습니다. 먼저 AI로 만다라트를 생성해주세요.');
      return;
    }
    
    if (!currentUser?.user_email) {
      setError('사용자 인증이 필요합니다. 다시 로그인해주세요.');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      
      console.log('💾 DB 저장 시작');
      const insertData = convertToInsertData(apiData);
      
      // 🎯 이 부분이 저장하기 버튼을 눌렀을 때만 실행됨
      await MandalaDAO.insertMandalartWithManualRollback(insertData);
      await MandalaDAO.setMandalaChartCountUp(currentUser.user_email);
      
      setIsSaved(true);
      console.log('✅ DB 저장 완료');
      alert('만다라트가 성공적으로 저장되었습니다! 💫');
      
    } catch (error) {
      console.error('❌ 저장 실패:', error);
      setError(`저장 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsSaving(false);
    }
  }, [apiData, convertToInsertData, currentUser?.user_email]);

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
          onClick={handleSave}
          disabled={isSaving || !apiData || isSaved}
        >
          {isSaving ? '저장 중...' : isSaved ? '저장 완료 ✅' : '저장하기 💫'}
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