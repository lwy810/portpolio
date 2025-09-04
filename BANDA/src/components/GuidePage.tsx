import './GuidePage.css'
import { useAuth } from '../contexts/AuthContext';
<<<<<<< HEAD
import BandalogoImg from "../images/BANDA_logo115.png";
=======
>>>>>>> 89af60585cdb45c63f4aa665e207511a9695a5c4

function GuidePage() {
  const { currentUser } = useAuth();
  console.log(currentUser)

  return (
    <div className="page-container">
      <div className="stars-background">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            ⭐
          </div>
        ))}
      </div>
      
      <div className="content-wrapper">
        <header className="page-header">
<<<<<<< HEAD
          
           <img src={BandalogoImg} alt="BANDA 로고" className="banda-logo" />
           <h1 className="page-title"> BANDA</h1>
          <p className="page-subtitle">AI와 함께하는 만다라트 가이드</p>
          <br></br>
        </header>

        <div className="guide-container">
        <div className=" guide-section">
          <h2>📋 작성 방법</h2>
=======
          <h1 className="page-title">🌌 MandaAI 가이드</h1>
          <p className="page-subtitle">목표 달성을 위한 만다라트 작성 방법</p>
        </header>

        <div className="guide-container">
        <div className="card guide-section">
          <h2>📋 작성 순서</h2>
>>>>>>> 89af60585cdb45c63f4aa665e207511a9695a5c4
          <div className="step-cards">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>상단 입력란에 핵심 목표 적기</h3>
                <p>중앙에 핵심 목표가 나오면서 AI추천으로 칸이 채워집니다.</p>
                <div className="example-box">
                  <strong>예시:</strong>
                  <ul>
                    <li>"2025년 자기관리 루틴 완성"</li>
                    <li>"올해 10kg 감량"</li>
                    <li>"쇼핑몰 콘텐츠 성장시키기"</li>
                  </ul>
                </div>
              </div>
            </div>

<<<<<<< HEAD
             <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>AI가 채워준 내용 확인하기</h3>
                <p>세부목표를 보고 실천하기</p>
                <div className="example-box">
                  <strong>예시:</strong>
                  <ul>
                    <li>주 3회 헬스장, 하루 30분 독서</li>
                    <li>저녁 7시 이후 금식, 하루 물 2L</li>
                    <li>주 2회 블로그 글, 월 저축 자동이체</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* <div className="step-card">
=======
            <div className="step-card">
>>>>>>> 89af60585cdb45c63f4aa665e207511a9695a5c4
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>주변 4칸에 중간 목표 수정 가능</h3>
                <p>핵심 목표를 이루기 위해 필요한 서브 목표는 수정가능합니다.</p>
                <div className="example-box">
                  <strong>예시:</strong>
                  <ul>
                    <li>운동 --- 재정관리</li>
                    <li>유산소 --- 휴식</li>
                    <li>콘텐츠 제작 --- 수익화</li>
                  </ul>
                </div>
              </div>
<<<<<<< HEAD
            </div> */}

           
          </div>
        </div>
<br></br>
         <div className="guide-section">
          <h2>💡 완성된 예시</h2>
          <div className="example-mandala">
            <div className="example-grid">
              <div className="example-cell subgoal">운동</div>
              <div className="example-cell action">주 3회 헬스장</div>
              <div className="example-cell subgoal">식습관</div>
              <div className="example-cell action">출퇴근 도보</div>                          
              <div className="example-cell goal">올해 10kg 감량</div>
              <div className="example-cell action">PM 7시 이후 금식</div>
              <div className="example-cell subgoal">재정관리</div>
              <div className="example-cell action">하루 30분 독서</div>
              <div className="example-cell subgoal">자기계발</div>
            </div>
          </div>
        </div>
<br></br>
        <div className="guide-section">
=======
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>AI가 채워준 내용 확인하기</h3>
                <p>세부목표를 보고 실천하기</p>
                <div className="example-box">
                  <strong>예시:</strong>
                  <ul>
                    <li>주 3회 헬스장, 하루 30분 독서</li>
                    <li>저녁 7시 이후 금식, 하루 물 2L</li>
                    <li>주 2회 블로그 글, 월 저축 자동이체</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card guide-section">
          <h2>💡 완성된 예시</h2>
          <div className="example-mandala">
            <div className="example-grid">
              <div className="example-cell action">주 3회 헬스장</div>
              <div className="example-cell subgoal">운동</div>
              <div className="example-cell action">출퇴근 도보</div>
              
              <div className="example-cell subgoal">식습관</div>
              <div className="example-cell goal">올해 10kg 감량</div>
              <div className="example-cell subgoal">자기계발</div>
              
              <div className="example-cell action">저녁 7시 이후 금식</div>
              <div className="example-cell subgoal">재정관리</div>
              <div className="example-cell action">하루 30분 독서</div>
            </div>
          </div>
        </div>

        <div className="card guide-section">
>>>>>>> 89af60585cdb45c63f4aa665e207511a9695a5c4
          <h2>🚀 활용 팁</h2>
          <div className="usage-tips">
            <div className="tip-item">
              <span className="tip-check">✅</span>
              <span>완료한 미션에 ⭐ 표시하여 시각적 성취감 얻기</span>
            </div>
            <div className="tip-item">
              <span className="tip-check">✅</span>
<<<<<<< HEAD
              <span>목표달성,AI 미션 수행,출석체크등으로 경험치 획득하면 레벨업!!</span>
            </div>
            <div className="tip-item">
              <span className="tip-check">✅</span>
              <span>레벨 향상에 따른 프로필 아이콘 변경가능</span>
=======
              <span>운동, 독서, 식습관 등 카테고리별로 목표를 세워 균형잡힌 성장</span>
            </div>
            <div className="tip-item">
              <span className="tip-check">✅</span>
              <span>잘 지킨 칸은 완료 클릭! 시각적 성취감 극대화</span>
>>>>>>> 89af60585cdb45c63f4aa665e207511a9695a5c4
            </div>
            <div className="tip-item">
              <span className="tip-check">✅</span>
              <span>전체 달성률을 체크하며 목표 달성 동기 부여</span>
            </div>
          </div>
        </div>
<<<<<<< HEAD
        <div className=" guide-footer">
          <p>이제 만다라트를 작성해보세요!</p>
          
          <button className="button button-primary start-button" onClick={() => window.location.href = '/mandala'}>
          BANDA 시작하기
          </button>
          <br></br>
=======

        <div className="card guide-footer">
          <p>이제 만다라트를 작성해보세요!</p>
          
          <button className="button button-primary start-button" onClick={() => window.location.href = '/mandala'}>
          MandaAI 시작하기
          </button>
>>>>>>> 89af60585cdb45c63f4aa665e207511a9695a5c4
        </div>
      </div>
    </div>
    </div>
  )
}

export default GuidePage 