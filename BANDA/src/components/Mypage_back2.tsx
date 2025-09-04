import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, StarsBackground } from "./Common";
import type { CoreGoal } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../supabaseClient";
import { openai } from "../openaiClient";

export const MyPage: React.FC = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const [showAttendancePopup, setShowAttendancePopup] = useState(false);
  const [profile, setProfile] = useState<{
    user_level: number;
    user_nickname?: string | null;
    user_current_xp: number;
    user_xp_to_next_level: number;
    user_avatar?: string | './src/images/default.png';
  } | null>(null);

  const [attendanceCount, setAttendanceCount] = useState<number>();

  const [mainGoal, setMainGoal] = useState<string>("발전하는 나");
  const [coreGoals, setCoreGoals] = useState<CoreGoal[]>([]);

  const [dailyQuote, setDailyQuote] = useState<string>("");
  const [quoteAuthor, setQuoteAuthor] = useState<string>("");
  const [quoteLoading, setQuoteLoading] = useState<boolean>(true);

  // XP 진행률
  const xpProgress = useMemo(() => {
    if (!profile) return 0;
    if (!profile.user_xp_to_next_level) return 0;
    return Math.min(
      100,
      Math.max(0, (profile.user_current_xp / profile.user_xp_to_next_level) * 100)
    );
  }, [profile]);

  // 공통: 현재 로그인 사용자 ID
  const getUserId = async () => {
    const { data } = await supabase.auth.getUser();
    return data.user?.email ?? null;
  };

  // 프로필 + 출석 불러오기
  useEffect(() => {
    const loadProfileAndAttendance = async () => {
      const userId = await getUserId();
      if (!userId) return;

      const { data: profileData, error: pErr } = await supabase
        .from("user_profiles")
        .select("user_level, user_nickname, user_current_xp, user_xp_to_next_level, user_avatar")
        .eq("user_email", userId)
        .single();

      if (!pErr && profileData) setProfile(profileData);

      const { data: att, error: aErr } = await supabase
        .from("attendance_logs")
        .select("consecutive_count")
        .eq("user_id", userId)
        .order("attendance_date", { ascending: false })
        .limit(1);

      if (!aErr && att && att.length > 0) {
        setAttendanceCount(att[0].consecutive_count);
      } else {
        setAttendanceCount(0);
      }
    };

    loadProfileAndAttendance();
  }, []);

  // 목표(만다라) 불러오기
  useEffect(() => {
    const loadGoals = async () => {
      const userId = await getUserId();
      console.log(`userId : ${userId}`)
      if (!userId) return;

      const { data: mandala, error: mErr } = await supabase
        .from("mandala_charts")
        .select("mandala_chart_title, mandala_chart_id")
        .eq("user_email", userId)
        .eq("mandala_chart_is_active", true)
        .single();

      if (mErr || !mandala) return;
      setMainGoal(mandala.mandala_chart_title);

      // 코어 목표들
      const { data: cores, error: cErr } = await supabase
        .from("core_goals")
        .select("core_goal_id, core_goal_title")
        .eq("mandala_chart_id", mandala.mandala_chart_id);

        
      if (cErr || !cores) return;

      const results: CoreGoal[] = [];

      // 각 코어 목표의 서브 목표 달성률 계산
      for (const cg of cores) {
        const { data: subs } = await supabase
          .from("sub_goals")
          .select("sub_goal_is_completed")
          .eq("core_goal_id", cg.core_goal_id);

        const total = subs?.length ?? 0;
        const completed = subs?.filter((s) => s.sub_goal_is_completed)?.length ?? 0;
        const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

        results.push({
          name: cg.core_goal_title,
          completed,
          total,
          progress,
        });
      }

      setCoreGoals(results);
    };

    loadGoals();
  }, []);

  // 출석 체크
  const handleAttendance = async () => {
    const userId = await getUserId();
    if (!userId) return;

    const today = new Date();
    // const todayStr = today.toISOString().slice(0, 10);

    // 현재 개수 조회
    const { data: currentData, error: selectError } = await supabase
      .from('user_profiles')
      .select('user_consecutive_days')
      .eq('user_email', userId)
      .single();

    if (selectError) throw selectError;

    const currentCountConsecutiveDays_ = currentData?.user_consecutive_days || 0;

    const { error: exUpdateErr } = await supabase
      .from("user_profiles")
      .update({
        user_consecutive_day_active: true,
        user_consecutive_days: currentCountConsecutiveDays_+1
      })
      .eq("user_email", userId)
      
    if (exUpdateErr) throw exUpdateErr;

    const { data: existing, error: exErr } = await supabase
      .from("attendance_logs")
      .select("user_email")
      .eq("user_email", userId)
      
    if (exErr) throw exErr;

    if (!exErr && existing && existing.length > 0) {
      setShowAttendancePopup(true);
      setTimeout(() => setShowAttendancePopup(false), 1600);
      return;
    }

    // 어제와의 연속 여부 계산
    const y = new Date(today);
    console.log(`y: ${y}`)
    y.setDate(today.getDate() - 1);
    const ymd = y.toISOString().slice(0, 10);
    console.log(`ymd: ${ymd}`)

    const { data: yesterday } = await supabase
      .from("attendance_logs")
      .select("attendance_created_at")
      .eq("user_email", userId)
      .eq("to_char(attendance_created_at, \'YYYY-MM-DD\')'", ymd)
      .single();

    console.log(`yesterday: ${yesterday}`)
    
    const newCount = yesterday ? (currentUser?.user_consecutive_days ?? 0) + 1 : 1;
    console.log(`newCount: ${newCount}`)

    // 출석 기록 저장
    const {error: insErr } = await supabase
      .from("attendance_logs")
      .insert([
        {
          user_email: userId
        },
      ])

    if (insErr) {
      console.error(insErr.message);
      return;
    }

    // 별 로그도 기록 (XP 트리거 발동)
    await supabase.from("star_logs").insert([
      {
        user_email: userId,
        star_earned_count: 1,
        star_earned_created_at: y
      },
    ]);

    // 최신 프로필 재조회 (XP 바 반영)
    const { data: profileData } = await supabase
      .from("user_profiles")
      .select("user_level, user_nickname, user_current_xp, user_xp_to_next_level")
      .eq("user_email", userId)
      .single();

    if (profileData) setProfile(profileData);

    setAttendanceCount(newCount);
    setShowAttendancePopup(true);
    setTimeout(() => setShowAttendancePopup(false), 1600);
  };

  // 오늘의 명언
  useEffect(() => {
    const fetchOrCreateQuote = async () => {
      setQuoteLoading(true);
      try {
        const today = new Date();
        const start = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          0,
          0,
          0
        )
          .toISOString()
          .slice(0, 19);
        const end = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          23,
          59,
          59
        )
          .toISOString()
          .slice(0, 19);

        const { data: existing } = await supabase
          .from("daily_quotes")
          .select("*")
          .gte("created_at", start)
          .lte("created_at", end)
          .limit(1);

        if (existing && existing.length > 0) {
          setDailyQuote(existing[0].quote_text);
          setQuoteAuthor(existing[0].author ?? "");
          return;
        }

        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: 
                    `Return ONE real, verifiable quote by a very famous person (actor/singer/politician/entrepreneur/scientist).
                    Translate BOTH the quote text AND the person's name into Korean.
                    Respond ONLY with strict JSON:
                    {
                      "quote_text": "한국어 번역된 명언",
                      "author": "한국어로 번역된 인물 이름"
                    }`,
            },
          ],
          max_tokens: 150,
          temperature: 0.7,
        });

        const raw = completion.choices[0].message?.content?.trim() ?? "{}";
        const match = raw.match(/\{[\s\S]*\}/);
        if (!match) throw new Error("OpenAI 응답에 JSON이 없습니다.");
        const parsed = JSON.parse(match[0]) as {
          quote_text: string;
          author: string;
        };

        setDailyQuote(parsed.quote_text);
        setQuoteAuthor(parsed.author);

        // 카테고리
        const categories = [
          "motivation",
          "creativity",
          "leadership",
          "perseverance",
          "wisdom",
          "mindfulness",
          "success",
        ];
        const category =
          categories[Math.floor(Math.random() * categories.length)];

        await supabase.from("daily_quotes").insert([
          {
            user_id: await getUserId(),
            quote_text: parsed.quote_text,
            author: parsed.author, 
            category,
          },
        ]);
      } finally {
        setQuoteLoading(false);
      }
    };

    fetchOrCreateQuote();
  }, []);

  // 라우팅 헬퍼
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const GoToInfoUpdate = () => navigate("/settings");
  const AvatarUpdate = () => navigate("/avatarselector");

  const overallProgress = useMemo(() => {
    if (coreGoals.length === 0) return 0;
    return Math.round(
      coreGoals.reduce((sum, g) => sum + g.progress, 0) / coreGoals.length
    );
  }, [coreGoals]);

  return (
    <div className="page-container">
      <StarsBackground count={12} />

      <div className="content-wrapper">
        {/* 정보 수정 */}
        <Button
          onClick={GoToInfoUpdate}
          className="mypage-attendance-button, info_update_button"
        >
          정보 수정 📅
        </Button>

        {/* 프로필 카드 */}
        <Card className="mypage-profile-card">
          <button type="button" className="avatar_update" onClick={AvatarUpdate}>
            +
          </button>
          <div className="mypage-avatar">
            <img
              src={currentUser?.user_avatar|| "./src/images/default.png"}
              width="70"
              height="70"
              alt="아바타"
            />
          </div>

          <h1 className="mypage-level-title">
            {/* display_name 없으면 기존 문구 유지 */}
            Lv.{profile?.user_level ?? 1} {profile?.user_nickname || "우주 탐험가"}
          </h1>

          <div className="mypage-xp-text">
            {profile?.user_current_xp ?? 0}/{profile?.user_xp_to_next_level ?? 100} XP
          </div>

          <div className="mypage-xp-bar">
            <div className="mypage-xp-fill" style={{ width: `${xpProgress}%` }} />
          </div>
        </Card>

        {/* 오늘의 한마디 */}
        <Card className="mypage-quote-card">
          <div className="mypage-quote-icon">💫</div>
          <h2 className="mypage-quote-title">오늘의 한마디</h2>
          {quoteLoading ? (
            <p className="mypage-quote-text">불러오는 중...</p>
          ) : (
            <>
              <p className="mypage-quote-text">"{dailyQuote}"</p>
              {!!quoteAuthor && (
                <p className="mypage-attendance-count">- {quoteAuthor}</p>
              )}
            </>
          )}
        </Card>

        {/* 출석체크 */}
        <Card className="mypage-attendance-card">
          <div className="mypage-attendance-content">
            <div>
              <h3 className="mypage-attendance-title">출석체크</h3>
              <p className="mypage-attendance-count">
                {currentUser?.user_consecutive_days}일 연속 출석 중
              </p>
            </div>
            <Button onClick={handleAttendance} className="mypage-attendance-button">
              출석 체크 📅
            </Button>
          </div>
        </Card>

        {/* 목표 요약 */}
        <Card className="mypage-mymission">
          <h2 className="mypage-goals-title">내 목표 현황</h2>

          <div className="mypage-main-goal">
            <h3 className="mypage-main-goal-text">{mainGoal}</h3>
          </div>

          <div className="mypage-goals-list">
            {coreGoals.map((goal, index) => (
              <div key={index}>
                <div className="mypage-goal-item">
                  <div className="mypage-goal-info">
                    <span className="mypage-goal-name">{goal.name}</span>
                    <span className="mypage-goal-stars">
                      {goal.completed}/{goal.total} ⭐
                    </span>
                  </div>
                  <span className="mypage-goal-progress">{goal.progress}%</span>
                </div>
                <div className="mypage-progress-bars">
                  {Array.from({ length: goal.total }).map((_, i) => (
                    <div
                      key={i}
                      className={`mypage-progress-bar ${
                        i < goal.completed
                          ? "mypage-progress-completed"
                          : "mypage-progress-empty"
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

        <Button className="mypage-logout-button" onClick={handleLogout} type="button">
          로그아웃 🚀
        </Button>
      </div>

      {/* 출석 팝업 */}
      {showAttendancePopup && (
        <div className="popup-overlay">
          <Card className="popup-card">
            <div className="popup-icon">🎉</div>
            <h3 className="popup-title">{attendanceCount}일 연속 출석!</h3>
            <div className="popup-stars">⭐</div>
            <p className="popup-message">보상으로 별 1개를 획득했어요!</p>
          </Card>
        </div>
      )}
    </div>
  );
};
