import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import defaultImg from "../images/default.png";
import level1Img from "../images/level1.png";
import level2Img from "../images/level2.png";
import level3Img from "../images/level3.png";
import level4Img from "../images/level4.png";
import "./AvatarSelector.css";

const avatarMap: Record<string, string> = {
  "default.png": defaultImg,
  "level1.png": level1Img,
  "level2.png": level2Img,
  "level3.png": level3Img,
  "level4.png": level4Img,
};

export const AvatarSelector: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [userLevel, setUserLevel] = useState<number>(1);
  const [selected, setSelected] = useState<string>("default.png");

  // 로그인한 ID 가져오기
  const getUserId = async () => {
    const { data } = await supabase.auth.getUser();
    return data.user?.id ?? null;
  };

  // 프로필 불러오기
  useEffect(() => {
    const fetchProfile = async () => {
      const userId = await getUserId();
      if (!userId) return;

      const { data, error } = await supabase
        .from("user_profiles")
        .select("level, selected_avatar")
        .eq("id", userId)
        .single();

      if (error) {
        console.error(error.message);
        return;
      }
      if (data) {
        setUserLevel(data.level);
        setSelected(data.selected_avatar || "default.png");
      }
    };

    fetchProfile();
  }, []);

  const handleSelectAvatar = async (imageName: string) => {
    const userId = await getUserId();
    if (!userId) return;

    await supabase
      .from("user_profiles")
      .update({ selected_avatar: imageName })
      .eq("id", userId);

    setSelected(imageName);
    navigate("/mypage");
  };

  return (
    <div className="avatar-selector-container">
      <h2 className="avatar-selector-title">아바타 선택</h2>
      <div className="avatar-grid">
        {Object.entries(avatarMap).map(([key, src], idx) => {
          const levelRequired = idx + 1;
          const locked = userLevel < levelRequired;

          return (
            <div
              key={key}
              className={`avatar-card ${selected === key ? "selected" : ""} ${
                locked ? "locked" : ""
              }`}
              onClick={() => !locked && handleSelectAvatar(key)}
            >
              <img src={src} alt={key} className="avatar-image" />
              <p>{locked ? `Lv.${levelRequired} 필요` : `Lv.${levelRequired}`}</p>
            </div>
          );
        })}
      </div>

      <button className="close-btn" onClick={() => navigate("/mypage")}>
        닫기
      </button>
    </div>
  );
};

export default AvatarSelector;
