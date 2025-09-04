import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { MouseEvent } from 'react';
import { Button, Card, Input, StarsBackground } from './Common';
import type { MandalaData } from '../types';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'


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


export const MandalaChart: React.FC = () => {
  const { currentUser } = useAuth();
  console.log(currentUser)

  const navigate = useNavigate();
  const [mainGoal, setMainGoal] = useState<string>("발전하는 예진");
  const [selectedCore, setSelectedCore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiData, setApiData] = useState<MandalartData | null>(null);

  // 기본 만다라 차트 데이터 구조 (빈 상태)
  const defaultMandalaData: MandalaData = {
    center: { text: mainGoal, isMain: true },
    sections: []
  };

  const GoToGuide = () => {
    navigate('/guide');
  };

  // API 데이터를 MandalaData 형식으로 변환
  const convertApiDataToMandalaData = (data: MandalartData): MandalaData => {
    const sections = data.coreGoals.slice(0, 4).map((goal, index) => ({
      id: index,
      title: goal.title,
      isCore: true,
      goals: goal.details.slice(0, 5) // 8개의 세부 목표만 사용
    }));

    return {
      center: { text: data.finalGoal, isMain: true },
      sections
    };
  };

  // 현재 사용할 만다라 데이터 결정
  const getCurrentMandalaData = (): MandalaData => {
    if (apiData) {
      const converted = convertApiDataToMandalaData(apiData);
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

  // Gemini API 호출
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
      console.log('📤 API 요청 payload:', payload);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log('🔄 Response status:', response.status);
      console.log('🔄 Response headers:', response.headers);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    
      const data = await response.json();
      console.log('📥 전체 API 응답 데이터:', data);


      if (data.candidates && data.candidates.length > 0) {
        console.log('✅ Candidates 배열 수:', data.candidates.length);
        console.log('✅ Candidates 배열:', data.candidates);
        console.log('✅ 첫 번째 candidate:', data.candidates[0]);
        console.log('✅ Content parts:', data.candidates[0].content.parts);

        const jsonText = data.candidates[0].content.parts[0].text;
        console.log('📝 Raw JSON 텍스트:', jsonText);

        const parsedData : MandalartData = JSON.parse(jsonText);
        console.log('🎯 파싱된 최종 데이터:', parsedData);


        const { error: mandalaError } = await supabase
          .from('mandala_charts')
          .insert([
            {
              mandala_chart_id: `${currentUser?.user_email }_mandala_${(currentUser?.user_mandala_charts_count || 0) + 1}`,
              user_email: currentUser?.user_email,
              mandala_chart_title: mainGoal
              // created_at, renewed_at은 Supabase 기본값 또는 서버에서 처리될 수 있습니다.
            },
          ]);

        if (mandalaError) {
          console.error('❌ Supabase 저장 오류:', mandalaError);
          setError(`데이터 저장 중 오류가 발생했습니다: ${mandalaError.message}`);
          return;
        }

        const { data: existingChart, error: selectError } = await supabase
          .from('mandala_charts')
          .select('mandala_chart_id')
          .eq('user_email', currentUser?.user_email)
          .eq('mandala_chart_is_active', true)
          .eq('mandala_chart_title', mainGoal )
          .single();

        if (selectError) {
          console.error('❌ Supabase mandala_chart_id 조회 오류:', selectError);
          setError(`데이터 조회 중 오류가 발생했습니다: ${selectError.message}`);
          return;
        }

        const mandalaChartId = existingChart.mandala_chart_id;
        
        const coreGoalsToInsert = parsedData.coreGoals.flatMap((coreGoal) =>
          coreGoal.details.map((detail) => ({
            mandala_chart_id: mandalaChartId, // 외래 키 연결
            title: coreGoal.title,
            detail: detail,
          }))
        );

        // 3. 준비된 배열을 'core_goals' 테이블에 한 번에 삽입합니다 (벌크 인서트).
        const { error: coreGoalsError } = await supabase
          .from('core_goals')
          .insert(coreGoalsToInsert);

        if (coreGoalsError) {
          console.error('❌ Supabase 세부 목표 저장 오류:', coreGoalsError);
          setError(`세부 목표 저장 중 오류가 발생했습니다: ${coreGoalsError.message}`);
          return;
        }

        // const { parsedData: insertedData_core, error: coreError } = await supabase
        //   .from('mandala_charts')
        //   .insert([
        //     {
        //       mandala_chart_id: `${currentUser?.user_email || 'anonymous'}_${(currentUser?.user_mandala_charts_count || 0) + 1}`,
        //       user_email: currentUser?.user_email,
        //       mandala_chart_title: mainGoal,
        //       core_goal_title: insertedData_core[0][1].text,
        //       core_goal_position: insertedData_core[0][1]
        //       // created_at, renewed_at은 Supabase 기본값 또는 서버에서 처리될 수 있습니다.
        //     },
        //   ]);

        // if (coreError) {
        //   console.error('❌ Supabase 저장 오류:', coreError);
        //   setError(`데이터 저장 중 오류가 발생했습니다: ${coreError.message}`);
        //   return;
        // }


        //   if (mandalaError) {
        //     console.error('❌ Supabase 저장 오류:', mandalaError);
        //     setError(`데이터 저장 중 오류가 발생했습니다: ${mandalaError.message}`);
        //     return;
        //   }

        // const { data: insertedData_core, error: coreError } = await supabase
        //   .from('core_goals')
        //   .insert([
        //     {
        //       mandala_chart_id:
        //       user_email: currentUser?.user_email,
        //       mandala_chart_title: mainGoal
        //       // created_at, renewed_at은 Supabase 기본값 또는 서버에서 처리될 수 있습니다.
        //     },
        //   ]);

        //   if (mandalaError) {
        //     console.error('❌ Supabase 저장 오류:', coreError);
        //     setError(`데이터 저장 중 오류가 발생했습니다: ${coreError.message}`);
        //     return;
        //   }



        setApiData(parsedData);
        setMainGoal(parsedData.finalGoal);
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
              onClick={fetchMandalartPlan}
              disabled={isLoading}
              className="mandala-ai-button"
            >
              {isLoading ? '생성 중...' : 'AI로 채우기 🤖'}
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div style={{ color: 'red', textAlign: 'center', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        {/* Content */}
        {selectedCore !== null && selectedSection ? (
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
            
            {/* 2x3 pr 3x2 세부 목표 그리드 */}
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
                    {goal}{index}
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
                [1, 1], [1, 3], [3, 1], [3, 3] // 핵심목표 1, 2, 3, 4
              ];
              const coreIndex = corePositions.findIndex(([r, c]) => r === row && c === col);
              if (coreIndex !== -1 && mandalaData.sections[coreIndex]) {
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
              
              // 세부 목표들 배치
              let goalText = "";
              
              if (mandalaData.sections.length > 0) {
                // 핵심목표 1 영역 (좌상단 2x3)
                if (row <= 1 && col <= 2 && !(row === 1 && col === 1) && !(row === 2 && col === 2)) {
                  const section = mandalaData.sections[0];
                  if (section) {
                    const detailPositions = [
                      [0, 0], [0, 1], [0, 2],  // 세부목표 1-1, 1-2, 1-3
                      [1, 0],         [1, 2],  // 세부목표 1-4,      1-5
                    ];
                    const detailIndex = detailPositions.findIndex(([r, c]) => r === row && c === col);
                    if (detailIndex !== -1 && detailIndex < 5) {
                      goalText = section.goals[detailIndex] || "";
                    }
                  }
                }
                // 핵심목표 2 영역 (우상단 3x2)
                else if (row <= 2 && col >= 3 && !(row === 1 && col === 3) && !(row === 2 && col === 2)) {
                  const section = mandalaData.sections[1];
                  if (section) {
                    const detailPositions = [
                      [0, 3], [0, 4],  // 세부목표 2-1, 2-2
                              [1, 4],  // 세부목표      2-3
                      [2, 3], [2, 4]   // 세부목표 2-4, 2-5
                    ];
                    const detailIndex = detailPositions.findIndex(([r, c]) => r === row && c === col);
                    if (detailIndex !== -1 && detailIndex < 5) {
                      goalText = section.goals[detailIndex] || "";
                    }
                  }
                }
                // 핵심목표 3 영역 (좌하단 3x2)
                else if (row >= 2 && col <= 1 && !(row === 3 && col === 1) && !(row === 2 && col === 2)) {
                  const section = mandalaData.sections[2];
                  if (section) {
                    const detailPositions = [
                      [2, 0], [2, 1],    // 세부목표 3-1, 3-2
                      [3, 0],            // 세부목표 3-3
                      [4, 0], [4, 1],    // 세부목표 3-4, 3-5
                    ];
                    const detailIndex = detailPositions.findIndex(([r, c]) => r === row && c === col);
                    if (detailIndex !== -1 && detailIndex < 5) {
                      goalText = section.goals[detailIndex] || "";
                    }
                  }
                }
                // 핵심목표 4 영역 (우하단 2x3)
                else if (row >= 3 && col >= 2 && !(row === 3 && col === 3) && !(row === 2 && col === 2)) {
                  const section = mandalaData.sections[3];
                  if (section) {
                    const detailPositions = [
                      [3, 2],         [3, 4],  // 세부목표 4-1,      4-2
                      [4, 2], [4, 3], [4, 4]   // 세부목표 4-3, 4-4, 4-5
                    ];
                    const detailIndex = detailPositions.findIndex(([r, c]) => r === row && c === col);
                    if (detailIndex !== -1 && detailIndex < 5) {
                      goalText = section.goals[detailIndex] || "";
                    }
                  }
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
        <Button 
        onClick={GoToGuide}
        variant="secondary" 
        className="mandala-save-button">
          사용방법 💫
        </Button>
      </div>
    </div>
  );
};