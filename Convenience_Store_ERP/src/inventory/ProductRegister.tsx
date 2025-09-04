import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import "./ProductRegister.css"

// Supabase 클라이언트 설정
const VITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const VITE_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

interface ProductRegisterProps {
  onBack: () => void;
  onSuccess: () => void;
}

function ProductRegister({ onBack, onSuccess }: ProductRegisterProps) {
  // 카테고리 옵션들
  const categories = [
    '인스턴트',
    '유제품',
    '육류',
    '해산물',
    '채소',
    '과일',
    '곡물',
    '음료',
    '조미료',
    '냉동식품',
    '베이커리',
    '기타'
  ];

  const [formData, setFormData] = useState({
    inventory_item_name: '',
    inventory_item_category: '',
    inventory_item_numbers: '',
    inventory_buy_price: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 카테고리 선택 함수
  const handleCategorySelect = (category: string) => {
    setFormData(prev => ({
      ...prev,
      inventory_item_category: category
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 입력값 검증
    if (!formData.inventory_item_name || !formData.inventory_item_category || 
        !formData.inventory_item_numbers || !formData.inventory_buy_price) {
      setError('모든 필드를 입력해주세요.');
      setLoading(false);
      return;
    }

    try {
      const { error: supabaseError } = await supabase
        .from('inventory')
        .insert([formData])
        .select();

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setSuccess(true);
      setFormData({
        inventory_item_name: '',
        inventory_item_category: '',
        inventory_item_numbers: '',
        inventory_buy_price: ''
      });

      // 성공 메시지 표시 후 2초 뒤에 콜백 실행
      setTimeout(() => {
        onSuccess();
      }, 2000);

    } catch (err: any) {
      setError(err.message || '제품 등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className='success-container'>
        <div className='success-card'>
          <div className='success-icon'>✓</div>
          <h2 className='success-title'>등록 완료!</h2>
          <p className='success-message'>제품이 성공적으로 등록되었습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='product-register-container'>
      <div className='product-register-card'>
        {/* 헤더 */}
        <div className='header'>
          <h2 className='header-title'>제품 등록</h2>
          <button className='back-button'
            onClick={onBack}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6b7280'}
          >
            이전 페이지
          </button>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className='error-message'>
            ⚠️ {error}
          </div>
        )}

        {/* 폼 */}
        <form onSubmit={handleSubmit}>
          <div className='form-grid'>
            {/* 재고명 */}
            <div>
              <label className='form-label'>
                재고명 <span className='required'>*</span>
              </label>
              <input className='form-input'
                type="text"
                name="inventory_item_name"
                value={formData.inventory_item_name}
                onChange={handleInputChange}
                placeholder="예: 라면"
                required
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            {/* 구분 */}
            <div>
              <label className='form-label'>
                구분 <span className='required'>*</span>
              </label>
              <div className='category-grid'>
                {categories.map((category) => (
                  <button className='category-button'
                    key={category}
                    type="button"
                    onClick={() => handleCategorySelect(category)}
                    onMouseEnter={(e) => {
                      if (formData.inventory_item_category !== category) {
                        e.currentTarget.style.backgroundColor = '#f1f5f9';
                        e.currentTarget.style.borderColor = '#cbd5e1';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (formData.inventory_item_category !== category) {
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                        e.currentTarget.style.borderColor = '#e5e7eb';
                      }
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
              {formData.inventory_item_category && (
                <p className='category-selected'>
                  ✓ 선택됨: {formData.inventory_item_category}
                </p>
              )}
            </div>

            {/* 2열 그리드 */}
            <div className='form-row'>
              {/* 재고 수량 */}
              <div>
                <label className='form-label'>
                  재고 수량 <span className='required'>*</span>
                </label>
                <input className='form-input'
                  type="number"
                  name="inventory_item_numbers"
                  value={formData.inventory_item_numbers}
                  onChange={handleInputChange}
                  placeholder="예: 5"
                  required
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              {/* 단위 원가 */}
              <div>
                <label className='form-label'>
                  단위 원가 <span className='required'>*</span>
                </label>
                <input className='form-input'
                  type="number"
                  name="inventory_buy_price"
                  value={formData.inventory_buy_price}
                  onChange={handleInputChange}
                  placeholder="예: 1000"
                  required
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>
          </div>

          {/* 등록 버튼 */}
          <div className='submit-section'>
            <button className='submit-button'
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: loading ? '#9ca3af' : '#3b82f6',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = '#2563eb';
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = '#3b82f6';
              }}
            >
              {loading ? '등록 중...' : '✓ 제품 등록'}
            </button>
          </div>
        </form>

        {/* SQL 미리보기 */}
        {/* <div className='sql-preview' style={{
          marginTop: '32px',
          padding: '20px',
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#475569',
            marginBottom: '12px',
            margin: 0
          }}>💾 실행될 SQL 쿼리</h3>
          <div style={{
            backgroundColor: '#1e293b',
            color: '#10b981',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontFamily: 'monospace',
            overflowX: 'auto',
            lineHeight: '1.5'
          }}>
            INSERT INTO inventory (<br />
            &nbsp;&nbsp;inventory_item_name,<br />
            &nbsp;&nbsp;inventory_item_category,<br />
            &nbsp;&nbsp;inventory_item_numbers,<br />
            &nbsp;&nbsp;inventory_buy_price<br />
            )<br />
            VALUES (<br />
            &nbsp;&nbsp;'{formData.inventory_item_name || '[재고명]'}',<br />
            &nbsp;&nbsp;'{formData.inventory_item_category || '[구분]'}',<br />
            &nbsp;&nbsp;'{formData.inventory_item_numbers || '[수량]'}',<br />
            &nbsp;&nbsp;'{formData.inventory_buy_price || '[원가]'}'<br />
            );
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default ProductRegister;