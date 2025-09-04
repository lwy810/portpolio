import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
<<<<<<< HEAD
import { useAuth } from "../contexts/AuthContext";

// Gemini API 설정
const GEMINI_API_KEY = "AIzaSyBh6a4SerekVaEaoKABD__ZLbGkfl3JTLI";

=======
import { openai } from "../openaiClient";
import { useAuth } from "../contexts/AuthContext";

>>>>>>> 89af60585cdb45c63f4aa665e207511a9695a5c4
type Mission = {
  title: string;
  description: string;
  tip?: string;
<<<<<<< HEAD
  mission_is_completed?: boolean;
};

type DBMission = {
  mission_title: string;
  mission_description: string;
  mission_tip?: string;
  mission_is_completed?: boolean;
};

const Missions: React.FC = () => {
  const { currentUser } = useAuth();
  const [missions, setMissions] = useState<DBMission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Gemini API 키 가져오기
  const getGeminiApiKey = () => {
    return import.meta.env.VITE_GEMINI_API_KEY || GEMINI_API_KEY;
  };

  // DB에서 미션 불러오기
  const fetchMissions = async () => {
    if (!currentUser) return;
    
    try {
      const { data, error } = await supabase
        .from("daily_missions")
        .select("mission_title, mission_description, mission_tip, mission_is_completed")
        .eq("user_email", currentUser.user_email)
        .eq("mission_date", new Date().toISOString().split("T")[0]);

      if (error) {
        console.error("fetch error:", error);
        setError(`미션 불러오기 실패: ${error.message}`);
      } else {
        setMissions(data || []);
        setError("");
      }
    } catch (err) {
      console.error("fetch error:", err);
      setError("미션 불러오기 중 오류가 발생했습니다.");
    }
  };

  // Gemini API 호출 함수
  const generateMissionsWithGemini = async (prompt: string) => {
    console.log("Gemini API로 미션 생성 중...");
    
    const apiKey = getGeminiApiKey();
    
    if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
      throw new Error("Gemini API 키가 설정되지 않았습니다. API 키를 설정해주세요.");
    }
    
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`
    
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt + "\n\n중요: 반드시 유효한 JSON 형식으로만 응답해주세요. 다른 설명이나 텍스트는 포함하지 마세요. JSON 외의 어떤 문자도 앞뒤에 추가하지 마세요."
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API 에러 응답:", errorText);
      throw new Error(`Gemini API 오류 (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    console.log("Gemini 전체 응답:", data);

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error("Gemini 응답 구조 오류:", data);
      throw new Error("Gemini에서 유효한 응답을 받지 못했습니다.");
    }

    const rawText = data.candidates[0].content.parts[0].text.trim();
    console.log("Gemini 원본 텍스트:", rawText);

    // JSON 추출 및 파싱
    let jsonText = rawText;
    
    // 마크다운 코드 블록 제거
    if (jsonText.includes('```json')) {
      const match = jsonText.match(/```json\s*([\s\S]*?)\s*```/);
      if (match) {
        jsonText = match[1].trim();
      }
    } else if (jsonText.includes('```')) {
      const match = jsonText.match(/```\s*([\s\S]*?)\s*```/);
      if (match) {
        jsonText = match[1].trim();
      }
    }
    
    // JSON 객체 부분만 추출
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    }

    try {
      const parsed = JSON.parse(jsonText);
      console.log("Gemini JSON 파싱 성공:", parsed);
      return parsed;
    } catch (parseError: any) {
      console.error("JSON 파싱 실패:", parseError);
      console.error("파싱 시도한 텍스트:", jsonText);
      throw new Error(`Gemini 응답의 JSON 파싱에 실패했습니다: ${parseError.message}`);
    }
  };

  // 미션 생성 - Gemini만 사용
  const generateMissions = async () => {
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      return;
    }

    setLoading(true);
    setError("");

    const prompt = `
    오늘 날짜 "${new Date().toLocaleDateString("ko-KR")}"를 기준으로 사용자를 위한 오늘의 미션 5개를 작성해주세요.

    조건:
    - 반드시 한국어로만 작성
    - JSON 형식으로 반환 (missions 배열 안에)
    - 각 미션은 { "title": "", "description": "", "tip": "" } 형식
    - 영어, 중국어 등 다른 언어 절대 사용하지 말 것
    - 실행 가능하고 구체적인 미션으로 작성
    - 건강, 학습, 관계, 취미, 자기계발 등 다양한 영역 포함

    반드시 이 형식으로만 응답해주세요:
    {
      "missions": [
        {
          "title": "물 마시기 챌린지",
          "description": "하루 동안 물 8잔(약 2리터)을 마셔보세요",
          "tip": "물병을 항상 가까이 두고, 시간마다 한 잔씩 마시면 쉽게 달성할 수 있어요"
        },
        {
          "title": "10분 운동하기",
          "description": "간단한 스트레칭이나 맨몸운동을 10분간 해보세요",
          "tip": "유튜브 운동 영상을 따라하거나 좋아하는 음악에 맞춰 움직여보세요"
        }
      ]
    }
    `;

    try {
      console.log("미션 생성 시작...");
      
      const parsed = await generateMissionsWithGemini(prompt);
      console.log("Gemini로 생성된 데이터:", parsed);

      let missionsArray: Mission[] = [];
      
      // missions 배열 추출
      if (parsed.missions && Array.isArray(parsed.missions)) {
        missionsArray = parsed.missions;
      } else if (Array.isArray(parsed)) {
        missionsArray = parsed;
      } else {
        throw new Error("올바른 미션 배열을 찾을 수 없습니다.");
      }

      if (missionsArray.length === 0) {
        throw new Error("생성된 미션이 없습니다.");
      }

      // 미션 데이터 검증
      const validMissions = missionsArray.filter(mission => 
        mission.title && mission.description && 
        mission.title.trim() !== "" && mission.description.trim() !== ""
      );

      if (validMissions.length === 0) {
        throw new Error("유효한 미션이 생성되지 않았습니다.");
      }

      console.log("DB에 미션 저장 중...");

      // 오늘 날짜의 기존 미션 삭제
      const today = new Date().toISOString().split("T")[0];
      const { error: deleteError } = await supabase
        .from("daily_missions")
        .delete()
        .eq("user_email", currentUser.user_email)
        .eq("mission_date", today);

      if (deleteError) {
        console.warn("기존 미션 삭제 중 오류:", deleteError);
      }

      // 새 미션들 DB에 저장
      const insertData = validMissions.map(mission => ({
        user_email: currentUser.user_email,
        mission_title: mission.title || "",
        mission_description: mission.description || "",
        mission_tip: mission.tip || "",
        mission_is_completed: false,
        mission_date: today,
      }));

      const { data, error: insertError } = await supabase
        .from("daily_missions")
        .insert(insertData)
        .select();

      if (insertError) {
        console.error("insert error:", insertError);
        throw new Error(`DB 저장 실패: ${insertError.message}`);
      }

      console.log("미션 생성 완료:", data);

      // 상태 업데이트
      const dbMissions: DBMission[] = insertData.map(item => ({
        mission_title: item.mission_title,
        mission_description: item.mission_description,
        mission_tip: item.mission_tip,
        mission_is_completed: item.mission_is_completed,
      }));

      setMissions(dbMissions);
      alert("미션이 성공적으로 생성되었습니다!");

    } catch (err: any) {
      console.error("mission gen failed:", err);
      const errorMsg = err.message || "알 수 없는 오류가 발생했습니다.";
      setError(`미션 생성 실패: ${errorMsg}`);
      alert(`미션 생성 실패: ${errorMsg}`);
=======
  is_completed?: boolean;
};

export const Missions: React.FC = () => {
  const { currentUser } = useAuth();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(false);

  // DB에서 미션 불러오기
  const fetchMissions = async () => {
    if (!currentUser) return;
    const { data, error } = await supabase
      .from("daily_missions")
      .select("title, description, tip, is_completed")
      .eq("user_id", currentUser.user_email)
      .eq("mission_date", new Date().toISOString().split("T")[0]);

    if (error) {
      console.error("❌ fetch error:", error);
    } else {
      setMissions(data || []);
    }
  };

  // 미션 생성
  const generateMissions = async () => {
    if (!currentUser) return alert("로그인이 필요합니다.");
    setLoading(true);

    try {
      const prompt = `
      "${new Date().toLocaleDateString("ko-KR")}" 오늘 날짜를 기준으로 "${currentUser.user_email}" 사용자를 위한 오늘의 미션 5개를 작성해줘.

      조건:
      - 반드시 한국어로만 작성
      - JSON 배열로 반환
      - 각 미션은 { "title": "", "description": "", "tip": "" } 형식
      - 영어, 중국어 등 다른 언어 절대 사용하지 말 것
      `;

      const res = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      const raw = res.choices[0].message.content ?? "[]";
      const parsed: Mission[] = JSON.parse(raw);

      if (!Array.isArray(parsed)) {
        throw new Error("잘못된 응답 형식");
      }

      // DB 저장
      for (let mission of parsed) {
        const { error } = await supabase.from("daily_missions").insert({
          user_id: currentUser.user_email,
          mission_template_id: null,
          title: mission.title,
          description: mission.description ?? "",
          tip: mission.tip ?? "",
          is_completed: false,
          mission_date: new Date().toISOString().split("T")[0],
        });
        if (error) console.error("❌ insert error:", error);
      }

      setMissions(parsed);
    } catch (err) {
      console.error("❌ mission gen failed:", err);
      alert("미션 생성 실패. 콘솔 확인.");
>>>>>>> 89af60585cdb45c63f4aa665e207511a9695a5c4
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, [currentUser]);

  return (
    <div className="missions-page">
<<<<<<< HEAD
      <h2 style={{ color: "white" }}>오늘의 미션</h2>
      
      {error && (
        <div className="error-message" style={{ 
          color: "#ff6b6b", 
          background: "#2d1f2f", 
          padding: "10px", 
          borderRadius: "8px", 
          margin: "10px 0" 
        }}>
          {error}
        </div>
      )}

      <button
        onClick={generateMissions}
        disabled={loading}
        className="generate-btn"
      >
        {loading ? "생성 중..." : "오늘의 미션 생성"}
      </button>

      <div className="api-info" style={{ 
        fontSize: "12px", 
        color: "#888", 
        marginBottom: "20px" 
      }}>
        * Gemini API를 사용하여 미션을 생성합니다
      </div>

      <div className="missions-list">
        {missions.length === 0 && !loading && (
          <p style={{ color: "#888", textAlign: "center", margin: "20px 0" }}>
            아직 생성된 미션이 없습니다. 위 버튼을 눌러 미션을 생성해보세요!
          </p>
        )}
        
        {missions.map((m, idx) => (
          <div key={idx} className="mission-card">
            <h3 style={{ color: "white" }}>{m.mission_title}</h3>
            <p style={{ color: "white" }}>{m.mission_description}</p>
            {m.mission_tip && <small style={{ color: "#88c999" }}>💡 {m.mission_tip}</small>}
          </div>
        ))}
      </div>

=======
      <h2 style={{ color: "white" }}>오늘의 미션 ⭐</h2>
      <button
        onClick={generateMissions}
        disabled={loading}
        className="generate-btn"
      >
        {loading ? "생성 중..." : "오늘의 미션 생성 🚀"}
      </button>

      <div className="missions-list">
        {missions.map((m, idx) => (
          <div key={idx} className="mission-card">
            <h3 style={{ color: "white" }}>{m.title}</h3>
            <p style={{ color: "white" }}>{m.description}</p>
            {m.tip && <small style={{ color: "white" }}>💡 {m.tip}</small>}
          </div>
        ))}
      </div>

>>>>>>> 89af60585cdb45c63f4aa665e207511a9695a5c4
      <style>
        {`
        .missions-page {
          max-width: 700px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
        .generate-btn {
          background: #6c63ff;
          color: white;
<<<<<<< HEAD
          padding: 12px 20px;
=======
          padding: 10px 16px;
>>>>>>> 89af60585cdb45c63f4aa665e207511a9695a5c4
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin: 10px 0 20px;
<<<<<<< HEAD
          font-size: 16px;
          transition: background 0.2s;
        }
        .generate-btn:hover:not(:disabled) {
          background: #5a52d5;
        }
        .generate-btn:disabled {
          background: #666;
          cursor: not-allowed;
=======
>>>>>>> 89af60585cdb45c63f4aa665e207511a9695a5c4
        }
        .missions-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .mission-card {
          background: #1c1c3c;
          border: 1px solid #444;
<<<<<<< HEAD
          padding: 16px;
          border-radius: 8px;
          text-align: left;
          transition: border-color 0.2s;
        }
        .mission-card:hover {
          border-color: #6c63ff;
        }
        .mission-card h3 {
          margin-top: 0;
          margin-bottom: 8px;
        }
        .mission-card p {
          margin-bottom: 8px;
          line-height: 1.4;
=======
          padding: 12px;
          border-radius: 8px;
          text-align: left;
>>>>>>> 89af60585cdb45c63f4aa665e207511a9695a5c4
        }
      `}
      </style>
    </div>
  );
};

<<<<<<< HEAD
export default Missions;
=======
export default Missions;
>>>>>>> 89af60585cdb45c63f4aa665e207511a9695a5c4
