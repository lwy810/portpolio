import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { openai } from "../openaiClient";
import { useAuth } from "../contexts/AuthContext";

type Mission = {
  title: string;
  description: string;
  tip?: string;
  is_completed?: boolean;
};

const Missions: React.FC = () => {
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
      "${new Date().toLocaleDateString("ko-KR")}" 오늘 날짜를 기준으로 "${currentUser.id}" 사용자를 위한 오늘의 미션 5개를 작성해줘.

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, [currentUser]);

  return (
    <div className="missions-page">
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
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin: 10px 0 20px;
        }
        .missions-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .mission-card {
          background: #1c1c3c;
          border: 1px solid #444;
          padding: 12px;
          border-radius: 8px;
          text-align: left;
        }
      `}
      </style>
    </div>
  );
};

export default Missions;
