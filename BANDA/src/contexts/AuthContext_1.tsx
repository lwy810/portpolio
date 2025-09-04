import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { type ReactNode } from 'react';

// 사용자 타입 정의
export interface User {
  user_email: string;
  user_nickname: string;
  user_mbti: string;
  user_level: number;
  user_total_xp: number;
  user_current_xp: number;
  user_xp_to_next_level: number;
  user_total_stars: number;
  user_consecutive_days: number;
  user_mandala_charts_count: number;
  user_avatar: string;
}

// AuthContext 타입 정의
interface AuthContextType {
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateCurrentUser: (updatedFields: Partial<User>) => void;
  refreshUserFromDB: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🆕 DB에서 최신 사용자 정보 가져오기
  const refreshUserFromDB = async (): Promise<void> => {
    if (!currentUser?.user_email) {
      console.warn('⚠️ 현재 사용자가 없어서 새로고침할 수 없습니다.');
      return;
    }

    try {
      setIsLoading(true);
      console.log('🔄 DB에서 사용자 정보 새로고침 중...');

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_email', currentUser.user_email)
        .single();

      if (error) {
        console.error('❌ 사용자 정보 새로고침 실패:', error);
        return;
      }

      if (data) {
        const updatedUser: User = {
          user_email: data.user_email,
          user_nickname: data.user_nickname,
          user_mbti: data.user_mbti,
          user_mandala_charts_count: data.user_mandala_charts_count,
          user_level: data.user_level,
          user_total_xp: data.user_total_xp,
          user_current_xp: data.user_current_xp,
          user_xp_to_next_level: data.user_xp_to_next_level,
          user_total_stars: data.user_total_stars,
          user_consecutive_days: data.user_consecutive_days,
          user_avatar: data. user_avatar
          // 필요한 다른 필드들...
        };

        setCurrentUser(updatedUser);
        console.log('✅ 사용자 정보 새로고침 완료:', updatedUser);
      }
    } catch (error) {
      console.error('❌ 사용자 정보 새로고침 중 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 🆕 현재 사용자 정보 부분 업데이트
  const updateCurrentUser = (updatedFields: Partial<User>): void => {
    if (!currentUser) {
      console.warn('⚠️ 현재 사용자가 없어서 업데이트할 수 없습니다.');
      return;
    }

    const updatedUser = { ...currentUser, ...updatedFields };
    setCurrentUser(updatedUser);
    console.log('✅ 현재 사용자 정보 업데이트:', updatedFields);
  };

  // 로그인
  const login = (user: User): void => {
    setCurrentUser(user);
    console.log('✅ 로그인 완료:', user);
  };

  // 로그아웃
  const logout = (): void => {
    setCurrentUser(null);
    console.log('✅ 로그아웃 완료');
  };

  // 🆕 페이지 로드 시 세션에서 사용자 정보 복원
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // localStorage나 sessionStorage에서 사용자 정보 복원
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setCurrentUser(parsedUser);
          console.log('🔄 저장된 사용자 정보 복원:', parsedUser);
        }
      } catch (error) {
        console.error('❌ 사용자 정보 복원 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // 🆕 currentUser 변경 시 localStorage에 저장
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const value: AuthContextType = {
    currentUser,
    login,
    logout,
    updateCurrentUser,
    refreshUserFromDB,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};