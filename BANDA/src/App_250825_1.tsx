import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react'; // useEffect를 import 합니다.
import { useNavigate } from 'react-router-dom';
import './Styles.css';

// 필요한 컴포넌트들을 import 합니다.
import { LoginScreen } from './components/Login';
import Signup from './components/Signup';
import { MandalaChart } from './components/Mandala';
import { DailyMissions } from './components/Missions';
import { Statistics } from './components/Statistics';
import { MyPage } from './components/Mypage';
import { BottomNavigation } from './components/Navigation';
import GuidePage from './components/GuidePage';
import Settings  from './components/Settings';
import AvatarSelector  from './components/AvatarSelector';


import { AuthProvider, useAuth } from './contexts/AuthContext'; 
import type { Screen } from './types'; // types.ts 파일에서 Screen 타입을 가져옵니다.

// AuthProvider 내에서 Context를 사용하는 AppContent 컴포넌트를 만듭니다.
function AppContent() {
  // useAuth 훅을 사용하여 로그인 상태와 login 함수를 가져옵니다.
  const { isLoggedIn, login, currentUser } = useAuth();

  const navigate = useNavigate();
   // ✅ useLocation 훅을 사용하여 현재 URL 경로를 가져옵니다.
  const location = useLocation();
  
  // ✅ 경로명에서 '/'를 제거하고, Screen 타입으로 캐스팅하여 currentScreen 값을 만듭니다.
  // 예: "/mandala" -> "mandala"
  const currentScreen = location.pathname as Screen;
 
  console.log('현재 화면:', currentScreen);
  
   useEffect(() => {
    // 사용자가 로그인되어 있고 currentUser 데이터가 있을 경우에만 실행
    if (isLoggedIn && currentUser) {
      // ✅ currentUser의 role이 'admin'이고 현재 경로가 'admin'이 아닐 경우
      if (currentUser.user_mandala_charts_count === 0) {
        navigate('/mandala'); // AdminDashboard 페이지로 리디렉션
      } else {
        navigate('/mypage'); // 일반 사용자 페이지로 리디렉션
      }
    }})
  

  return (
    <div className="app-container">
      {isLoggedIn ? (
        // ✅ 로그인된 경우: 메인 페이지들을 보여줍니다.
        <>
          <Routes>
            <Route path="/mandala" element={<MandalaChart />} />
            <Route path="/missions" element={<DailyMissions />} />
            <Route path="/statistics" element={<Statistics />} />
            
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/avatarselector" element={<AvatarSelector />} />
             {/* 로그인 상태에서 루트 경로로 가면 마이페이지로 리디렉션 */}
            <Route path="/" element={<MyPage />} />
            <Route path="*" element={<h2>404 - 페이지를 찾을 수 없습니다!</h2>} />
          </Routes>
         <BottomNavigation currentScreen={currentScreen} />
        </>
      ) : (
        // ✅ 로그아웃된 경우: 로그인 및 회원가입 페이지를 보여줍니다.
        <Routes>
          {/* onLogin prop을 직접 전달합니다. */}
          <Route path="/" element={<LoginScreen onLogin={() => {}} />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          {/* 다른 모든 경로를 로그인 화면으로 리디렉션 */}
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<LoginScreen onLogin={() => {}} />} />
        </Routes>
      )}
    </div>
  );
}

// Router와 AuthProvider를 최상위에서 감싸줍니다.
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;