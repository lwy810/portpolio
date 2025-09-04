import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
<<<<<<< HEAD
import { useEffect} from 'react'; // useCallback 추가
=======
import { useEffect, useCallback } from 'react'; // useCallback 추가
>>>>>>> 89af60585cdb45c63f4aa665e207511a9695a5c4
import { useNavigate } from 'react-router-dom';
import './Styles.css';

// 필요한 컴포넌트들을 import 합니다.
import { LoginScreen } from './components/Login';
import Signup from './components/Signup';
import { MandalaChart } from './components/Mandala';
<<<<<<< HEAD
import Missions from './components/Missions';
=======
import { Missions } from './components/Missions';
>>>>>>> 89af60585cdb45c63f4aa665e207511a9695a5c4
import { Statistics } from './components/Statistics';
import { MyPage } from './components/Mypage';
import { BottomNavigation } from './components/Navigation';
import GuidePage from './components/GuidePage';
import Settings  from './components/Settings';
import AvatarSelector  from './components/AvatarSelector';

import { AuthProvider, useAuth } from './contexts/AuthContext'; 
import type { Screen } from './types';

function AppContent() {
<<<<<<< HEAD
  const { isLoggedIn, currentUser } = useAuth();
=======
  const { isLoggedIn, login, currentUser } = useAuth();
>>>>>>> 89af60585cdb45c63f4aa665e207511a9695a5c4
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentScreen = location.pathname as Screen;
 
  // 🔧 console.log를 useEffect로 이동
  useEffect(() => {
    console.log('현재 화면:', currentScreen);
  }, [currentScreen]);
  
  // 🔧 useEffect에 정확한 의존성 배열 추가
 useEffect(() => {
    // 로그인 상태가 되었을 때 한 번만 실행 (currentUser가 처음 설정될 때)
    if (isLoggedIn && currentUser) {
      if (currentUser.user_mandala_charts_count === 0) {
        // 만다라 차트가 없으면 /mandala로
        if (location.pathname !== '/mandala') {
          navigate('/mandala');
        }
      } else {
        // 만다라 차트가 있으면 /mypage로
        if (location.pathname !== '/mypage') {
          navigate('/mypage');
        }
      }
    }
  }, [isLoggedIn, currentUser?.user_email]); // 🔧 user_email로 변경 (사용자가 바뀔 때만 실행)

  return (
    <div className="app-container">
      {isLoggedIn ? (
        <>
          <Routes>
            <Route path="/mandala" element={<MandalaChart />} />
            <Route path="/missions" element={<Missions />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/avatarselector" element={<AvatarSelector />} />
            <Route path="/" element={<MyPage />} />
            <Route path="*" element={<h2>404 - 페이지를 찾을 수 없습니다!</h2>} />
          </Routes>
         <BottomNavigation currentScreen={currentScreen} />
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LoginScreen onLogin={() => {}} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<LoginScreen onLogin={() => {}} />} />
        </Routes>
      )}
    </div>
  );
}

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