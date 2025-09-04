import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import ProductEdit from './ProductEdit';
import "./InventoryList.css"

// Supabase 클라이언트 설정 (환경변수 사용)
const VITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const VITE_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// Supabase 클라이언트 초기화
const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

// Inventory 데이터의 타입 정의 (실제 데이터베이스 스키마에 맞춰)
interface Inventory {
  inventory_id: number;
  inventory_item_name: string;
  inventory_item_category: string;
  inventory_item_numbers: string;
  inventory_buy_price: string;
  inventory_created_at: string;
  inventory_renewed_at: string;
}

type SortField = keyof Inventory;
type SortDirection = 'asc' | 'desc';

interface InventoryListProps {
  onEdit?: (inventoryId: number) => void;
  onDelete?: (inventoryId: number) => void;
}

function InventoryList({ onEdit, onDelete }: InventoryListProps = {}) {
  // 재고 데이터를 저장할 상태
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [originalInventory, setOriginalInventory] = useState<Inventory[]>([]);
  // 로딩 상태를 관리할 상태
  const [loading, setLoading] = useState<boolean>(true);
  // 에러 메시지를 저장할 상태
  const [error, setError] = useState<string | null>(null);
  // 정렬 상태
  const [sortField, setSortField] = useState<SortField>('inventory_id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  // 내부 수정 모드 상태
  const [editMode, setEditMode] = useState<{
    show: boolean;
    inventoryId: number | null;
  }>({
    show: false,
    inventoryId: null
  });
  // 삭제 확인 모달 상태
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    inventoryId: number | null;
    itemName: string;
  }>({
    show: false,
    inventoryId: null,
    itemName: ''
  });

  // 컴포넌트가 마운트될 때 데이터를 가져오는 useEffect 훅
  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true); // 데이터 로딩 시작
      setError(null); // 이전 에러 초기화

      try {
        // 'inventory' 테이블에서 모든 데이터를 선택하여 가져옵니다.
        const { data, error: supabaseError } = await supabase
          .from('inventory')
          .select('*')
          .order('inventory_id', { ascending: true }); // inventory_id 기준으로 오름차순 정렬

        if (supabaseError) {
          // Supabase에서 에러가 발생한 경우
          throw new Error(supabaseError.message);
        }

        if (data) {
          // 데이터가 성공적으로 로드된 경우
          const inventoryData = data as Inventory[];
          setOriginalInventory(inventoryData);
          setInventory(inventoryData);
        }
      } catch (err: any) {
        // 네트워크 에러 등 다른 종류의 에러 처리
        setError(err.message || '재고 데이터를 가져오는 데 실패했습니다.');
        console.error('Error fetching inventory:', err);
      } finally {
        setLoading(false); // 데이터 로딩 완료 (성공 또는 실패)
      }
    };

    fetchInventory(); // 함수 호출하여 데이터 가져오기 시작
  }, []); // 빈 의존성 배열: 컴포넌트가 처음 마운트될 때 한 번만 실행

  // 한국 원화 포맷팅 함수
  const formatCurrency = (amount: string): string => {
    const numAmount = parseInt(amount);
    return `₩${numAmount.toLocaleString('ko-KR')}`;
  };

  // 정렬 함수
  const handleSort = (field: SortField) => {
    let direction: SortDirection = 'asc';

    if (sortField === field && sortDirection === 'asc') {
      direction = 'desc';
    }

    setSortField(field);
    setSortDirection(direction);

    const sortedData = [...inventory].sort((a, b) => {
      let aValue: any = a[field];
      let bValue: any = b[field];

      // 숫자 필드 처리
      if (field === 'inventory_id') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (field === 'inventory_item_numbers' || field === 'inventory_buy_price') {
        aValue = parseInt(aValue.toString());
        bValue = parseInt(bValue.toString());
      } else if (field === 'inventory_created_at' || field === 'inventory_renewed_at') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else {
        // 문자열 필드는 소문자로 변환하여 비교
        aValue = aValue.toString().toLowerCase();
        bValue = bValue.toString().toLowerCase();
      }

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setInventory(sortedData);
  };

  // 정렬 아이콘 렌더링
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <span style={{ color: '#d1d5db', marginLeft: '8px' }}>↕️</span>;
    }
    return (
      <span style={{ color: '#3b82f6', marginLeft: '8px' }}>
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  // 삭제 확인 모달 열기
  const handleDeleteClick = (inventoryId: number, itemName: string) => {
    setDeleteConfirm({
      show: true,
      inventoryId,
      itemName
    });
  };

  // 삭제 확인 모달 닫기
  const handleDeleteCancel = () => {
    setDeleteConfirm({
      show: false,
      inventoryId: null,
      itemName: ''
    });
  };

  // 실제 삭제 실행
  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.inventoryId) return;

    try {
      const { error: supabaseError } = await supabase
        .from('inventory')
        .delete()
        .eq('inventory_id', deleteConfirm.inventoryId);

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      // 로컬 상태에서 삭제된 항목 제거
      const updatedInventory = inventory.filter(
        item => item.inventory_id !== deleteConfirm.inventoryId
      );
      setInventory(updatedInventory);
      setOriginalInventory(updatedInventory);

      // 모달 닫기
      handleDeleteCancel();

      // 부모 컴포넌트에 삭제 완료 알림 (선택사항)
      if (onDelete) {
        onDelete(deleteConfirm.inventoryId);
      }

    } catch (err: any) {
      setError(err.message || '삭제에 실패했습니다.');
      handleDeleteCancel();
    }
  };

  // 수정 모달 열기
  const handleEditClick = (inventoryId: number) => {
    if (onEdit) {
      // 부모 컴포넌트에서 수정 처리를 원하는 경우
      onEdit(inventoryId);
    } else {
      // 내부에서 수정 처리하는 경우
      setEditMode({
        show: true,
        inventoryId
      });
    }
  };

  // 수정 모달 닫기
  const handleEditCancel = () => {
    setEditMode({
      show: false,
      inventoryId: null
    });
  };

  // 수정 성공 후 데이터 새로고침
  const handleEditSuccess = () => {
    setEditMode({
      show: false,
      inventoryId: null
    });
    // 데이터 새로고침
    const fetchInventory = async () => {
      try {
        const { data, error: supabaseError } = await supabase
          .from('inventory')
          .select('*')
          .order('inventory_id', { ascending: true });

        if (supabaseError) {
          throw new Error(supabaseError.message);
        }

        if (data) {
          const inventoryData = data as Inventory[];
          setOriginalInventory(inventoryData);
          setInventory(inventoryData);
        }
      } catch (err: any) {
        setError(err.message || '데이터를 새로고침하는데 실패했습니다.');
      }
    };
    fetchInventory();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <p className="text-lg font-semibold text-gray-700">재고 데이터를 로딩 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <p className="text-lg text-red-600 font-semibold">오류 발생: {error}</p>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='inventory-card'>
        <h2 className='inventory-title'>재고 목록</h2>
        {inventory.length === 0 ? (
          <p className='empty-message'>등록된 재고가 없습니다.</p>
        ) : (
          <div className='table-container'>
            <table className='inventory-table'>
              <thead className='table-header'>
                <tr>
                  <th
                    onClick={() => handleSort('inventory_id')}
                    style={{color: sortField === 'inventory_id' ? '#3b82f6' : '#6b7280',}}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    ID{renderSortIcon('inventory_id')}
                  </th>
                  <th
                    onClick={() => handleSort('inventory_item_name')}
                    style={{color: sortField === 'inventory_item_name' ? '#3b82f6' : '#6b7280',}}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    재고명{renderSortIcon('inventory_item_name')}
                  </th>
                  <th
                    onClick={() => handleSort('inventory_item_category')}
                    style={{color: sortField === 'inventory_item_category' ? '#3b82f6' : '#6b7280',}}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    구분{renderSortIcon('inventory_item_category')}
                  </th>
                  <th
                    onClick={() => handleSort('inventory_item_numbers')}
                    style={{color: sortField === 'inventory_item_numbers' ? '#3b82f6' : '#6b7280',}}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    수량{renderSortIcon('inventory_item_numbers')}
                  </th>
                  <th
                    onClick={() => handleSort('inventory_buy_price')}
                    style={{color: sortField === 'inventory_buy_price' ? '#3b82f6' : '#6b7280',}}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    단위 원가{renderSortIcon('inventory_buy_price')}
                  </th>
                  <th
                    onClick={() => handleSort('inventory_created_at')}
                    style={{color: sortField === 'inventory_created_at' ? '#3b82f6' : '#6b7280',}}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    생성일{renderSortIcon('inventory_created_at')}
                  </th>
                  <th
                    onClick={() => handleSort('inventory_renewed_at')}
                    style={{color: sortField === 'inventory_renewed_at' ? '#3b82f6' : '#6b7280',}}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    갱신일{renderSortIcon('inventory_renewed_at')}
                  </th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody className='table-body'>
                {inventory.map((item, index) => (
                  <tr key={item.inventory_id} style={{
                    borderBottom: index < inventory.length - 1 ? '1px solid #f3f4f6' : 'none'
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td>{item.inventory_id}</td>
                    <td className='name'>{item.inventory_item_name}</td>
                    <td>{item.inventory_item_category}</td>
                    <td>{item.inventory_item_numbers}</td>
                    <td className='price'>{formatCurrency(item.inventory_buy_price)}</td>
                    <td>{new Date(item.inventory_created_at).toLocaleDateString('ko-KR')}</td>
                    <td>{new Date(item.inventory_renewed_at).toLocaleDateString('ko-KR')}</td>
                    <td style={{
                      padding: '16px 20px',
                      textAlign: 'center'
                    }}>
                      <div className='actions-container'>
                        <button className='edit-button '
                          onClick={() => handleEditClick(item.inventory_id)}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d97706'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}
                        >
                          ✏️ 수정
                        </button>
                        <button className='delete-button'
                          onClick={() => handleDeleteClick(item.inventory_id, item.inventory_item_name)}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                        >
                          🗑️ 삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 내부 수정 모달 */}
        {editMode.show && editMode.inventoryId && (
          <div className='modal-overlay'>
            <div className='edit-modal-content'>
              <ProductEdit
                inventoryId={editMode.inventoryId}
                onBack={handleEditCancel}
                onSuccess={handleEditSuccess}
              />
            </div>
          </div>
        )}

        {/* 삭제 확인 모달 */}
        {deleteConfirm.show && (
          <div className='modal-overlay'>
            <div className='delete-modal-content'>
              <div className='delete-modal-header'>
                <div className='delete-modal-icon'>⚠️</div>
                <h3 className='delete-modal-title'>정말 삭제하시겠습니까?</h3>
                <p className='delete-modal-message'>
                  <strong>"{deleteConfirm.itemName}"</strong> 제품을 삭제합니다.<br />
                  이 작업은 되돌릴 수 없습니다.
                </p>
              </div>

              <div className='delete-modal-actions'>
                <button className='confirm-delete-button'
                  onClick={handleDeleteCancel}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6b7280'}
                >
                  취소
                </button>
                <button className='confirm-delete-button'
                  onClick={handleDeleteConfirm}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                >
                  🗑️ 삭제
                </button>
              </div>

              {/* <div style={{
                marginTop: '24px',
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#475569',
                  marginBottom: '8px',
                  margin: 0
                }}>💾 실행될 SQL 쿼리</h4>
                <code style={{
                  display: 'block',
                  backgroundColor: '#1e293b',
                  color: '#ef4444',
                  padding: '12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontFamily: 'monospace'
                }}>
                  DELETE FROM inventory<br />
                  WHERE inventory_id = {deleteConfirm.inventoryId};
                </code>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InventoryList;