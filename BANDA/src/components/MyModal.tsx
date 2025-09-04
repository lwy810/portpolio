import { useState} from 'react';
import './MyModal.css'; // CSS 파일 임포트

export interface MandalaChartSelect {
    mandala_chart_id: string;
    user_email: string;
    mandala_chart_title: string;
    mandala_chart_created_at?: string;
    mandala_chart_updated_at?: string;
    mandala_chart_is_active: boolean;
  }


export function MyModalComponent() {
  // 🆕 조회용 타입 정의
  

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button className='mandala-list-button' onClick={openModal}>내 BANDA</button>

      {/* isModalOpen 상태에 따라 'active' 클래스만 토글합니다. */}
      {/* 이제 조건부 렌더링( && )이 없으므로 요소는 항상 DOM에 존재합니다. */}
      <div className={`mandala-list-container ${isModalOpen ? 'active' : ''}`}>
        <div className='mandala-list-top'>
          <p>BANDA 목록</p>
          <button onClick={closeModal}>X</button>
        </div>
        <ul className='mandala-list'>
          <li>
            <div className='mandala-icon'></div>
            <div className='mandala-detail'>
              <p>달성률 0%</p>
              <p>반다르트 title</p>
            </div>
            <button type="button">삭제하기</button>
           </li>
          <li>
            <div className='mandala-icon'></div>
            <div className='mandala-detail'>
              <p>달성률 0%</p>
              <p>반다라트 title</p>
            </div>
          </li>
        </ul>
        
      </div>
    </div>
  );
}

export default MyModalComponent;