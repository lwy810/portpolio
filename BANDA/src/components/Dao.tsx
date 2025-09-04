import { supabase } from '../supabaseClient';

// 타입 정의
export interface MandalaChartInsert {
  mandala_chart_id: string;
  user_email: string;
  mandala_chart_title: string;
}

export interface CoreGoalInsert {
  mandala_chart_id: string;
  core_goal_id: string; // (mandala_chart_id)_(core_goal_id)_index 형태
  core_goal_title: string;
}

// sub_goals 테이블: mandala_chart_id 컬럼은 없지만, 복합키 생성을 위해 데이터 필요
export interface SubGoalInsert {
  sub_goal_id: string; // (mandala_chart_id)_(core_goal_id)_(sub_goal_id)_index 형태
  core_goal_id: string; // (mandala_chart_id)_(core_goal_id)_index 형태
  sub_goal_title: string;
}

export interface MandalartInsertData {
  mandalaChart: MandalaChartInsert;
  coreGoals: CoreGoalInsert[];
  subGoals: SubGoalInsert[];
}

// 🆕 조회용 타입 정의
export interface MandalaChartSelect {
  mandala_chart_id: string;
  user_email: string;
  mandala_chart_title: string;
  mandala_chart_created_at?: string;
  mandala_chart_updated_at?: string;
  mandala_chart_is_active: boolean;
}

export interface CoreGoalSelect {
  core_goal_id: string;
  mandala_chart_id: string;
  core_goal_title: string;
  core_goal_created_at?: string;
  core_goal_updated_at?: string;
  subGoals: SubGoalSelect[];
}

export interface SubGoalSelect {
  sub_goal_id: string;
  core_goal_id: string;
  sub_goal_title: string;
  sub_goal_is_completed?: boolean;
  sub_goal_completed_at?: string;
  sub_goal_created_at?: string;
  sub_goal_updated_at?: string;
}

export interface MandalaChartWithDetails extends MandalaChartSelect {
  coreGoals: CoreGoalSelect[];
}

// DAO 클래스
export class MandalaDAO {
  
  /**
   * 🆕 사용자의 가장 최신 만다라 차트 조회
   * @param userEmail 사용자 이메일
   * @returns 최신 만다라 차트 데이터 (core_goals와 sub_goals 포함)
   */
  static async getLatestMandalaChart(userEmail: string): Promise<MandalaChartWithDetails | null> {
    try {
      console.log('🔍 최신 만다라 차트 조회 시작:', userEmail);

      const { data, error } = await supabase
        .from('mandala_charts')
        .select(`
          mandala_chart_id,
          user_email,
          mandala_chart_title,
          mandala_chart_created_at,
          mandala_chart_updated_at,
          mandala_chart_is_active,
          core_goals (
            core_goal_id,
            mandala_chart_id,
            core_goal_title,
            core_goal_created_at,
            core_goal_updated_at,
            sub_goals (
              sub_goal_id,
              core_goal_id,
              sub_goal_title,
              sub_goal_is_completed,
              sub_goal_completed_at,
              sub_goal_created_at,
              sub_goal_updated_at
            )
          )
        `)
        .eq('user_email', userEmail)
        .eq('mandala_chart_is_active', true)
        .order('mandala_chart_created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // 데이터가 없는 경우
          console.log('📝 기존 만다라 차트가 없습니다.');
          return null;
        }
        throw error;
      }

      if (!data) {
        console.log('📝 기존 만다라 차트가 없습니다.');
        return null;
      }

      // 데이터 구조 변환
      const result: MandalaChartWithDetails = {
        mandala_chart_id: data.mandala_chart_id,
        user_email: data.user_email,
        mandala_chart_title: data.mandala_chart_title,
        mandala_chart_created_at: data.mandala_chart_created_at,
        mandala_chart_updated_at: data.mandala_chart_updated_at,
        mandala_chart_is_active: data.mandala_chart_is_active,
        coreGoals: (data.core_goals || []).map((coreGoal: any) => ({
          core_goal_id: coreGoal.core_goal_id,
          mandala_chart_id: coreGoal.mandala_chart_id,
          core_goal_title: coreGoal.core_goal_title,
          core_goal_created_at: coreGoal.core_goal_created_at,
          core_goal_updated_at: coreGoal.core_goal_updated_at,
          subGoals: (coreGoal.sub_goals || [])
            .sort((a: any, b: any) => a.sub_goal_id.localeCompare(b.sub_goal_id))
            .map((subGoal: any) => ({
              sub_goal_id: subGoal.sub_goal_id,
              core_goal_id: subGoal.core_goal_id,
              sub_goal_title: subGoal.sub_goal_title,
              sub_goal_is_completed: subGoal.sub_goal_is_completed,
              sub_goal_completed_at: subGoal.sub_goal_completed_at,
              sub_goal_created_at: subGoal.sub_goal_created_at,
              sub_goal_updated_at: subGoal.sub_goal_updated_at,
            }))
        }))
        .sort((a: any, b: any) => a.core_goal_id.localeCompare(b.core_goal_id))
      };

      console.log('✅ 최신 만다라 차트 조회 성공:', result.mandala_chart_id);
      return result;

    } catch (error) {
      console.error('❌ 최신 만다라 차트 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 🆕 사용자의 모든 만다라 차트 목록 조회
   * @param userEmail 사용자 이메일
   * @returns 만다라 차트 목록
   */
  static async getAllMandalaCharts(userEmail: string): Promise<MandalaChartSelect[]> {
    try {
      console.log('🔍 모든 만다라 차트 조회 시작:', userEmail);

      const { data, error } = await supabase
        .from('mandala_charts')
        .select(`
          mandala_chart_id,
          user_email,
          mandala_chart_title,
          mandala_chart_created_at,
          mandala_chart_updated_at,
          mandala_chart_is_active
        `)
        .eq('user_email', userEmail)
        .eq('mandala_chart_is_active', true)
        .order('mandala_chart_created_at', { ascending: false });

      if (error) throw error;

      console.log('✅ 만다라 차트 목록 조회 성공:', data?.length || 0);
      return data || [];

    } catch (error) {
      console.error('❌ 만다라 차트 목록 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 🆕 특정 만다라 차트 상세 조회
   * @param userEmail 사용자 이메일
   * @param mandalaChartId 만다라 차트 ID
   * @returns 만다라 차트 상세 데이터
   */
  static async getMandalaChartById(userEmail: string, mandalaChartId: string): Promise<MandalaChartWithDetails | null> {
    try {
      console.log('🔍 특정 만다라 차트 조회 시작:', mandalaChartId);

      const { data, error } = await supabase
        .from('mandala_charts')
        .select(`
          mandala_chart_id,
          user_email,
          mandala_chart_title,
          mandala_chart_created_at,
          mandala_chart_updated_at,
          mandala_chart_is_active,
          core_goals (
            core_goal_id,
            mandala_chart_id,
            core_goal_title,
            core_goal_created_at,
            core_goal_updated_at,
            sub_goals (
              sub_goal_id,
              core_goal_id,
              sub_goal_title,
              sub_goal_is_completed,
              sub_goal_completed_at,
              sub_goal_created_at,
              sub_goal_updated_at
            )
          )
        `)
        .eq('user_email', userEmail)
        .eq('mandala_chart_id', mandalaChartId)
        .eq('mandala_chart_is_active', true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          console.log('📝 해당 만다라 차트가 없습니다.');
          return null;
        }
        throw error;
      }

      if (!data) {
        console.log('📝 해당 만다라 차트가 없습니다.');
        return null;
      }

      // 데이터 구조 변환
      const result: MandalaChartWithDetails = {
        mandala_chart_id: data.mandala_chart_id,
        user_email: data.user_email,
        mandala_chart_title: data.mandala_chart_title,
        mandala_chart_created_at: data.mandala_chart_created_at,
        mandala_chart_updated_at: data.mandala_chart_updated_at,
        mandala_chart_is_active: data.mandala_chart_is_active,
        coreGoals: (data.core_goals || []).map((coreGoal: any) => ({
          core_goal_id: coreGoal.core_goal_id,
          mandala_chart_id: coreGoal.mandala_chart_id,
          core_goal_title: coreGoal.core_goal_title,
          core_goal_created_at: coreGoal.core_goal_created_at,
          core_goal_updated_at: coreGoal.core_goal_updated_at,
          subGoals: (coreGoal.sub_goals || [])
            .sort((a: any, b: any) => a.sub_goal_id.localeCompare(b.sub_goal_id))
            .map((subGoal: any) => ({
              sub_goal_id: subGoal.sub_goal_id,
              core_goal_id: subGoal.core_goal_id,
              sub_goal_title: subGoal.sub_goal_title,
              sub_goal_is_completed: subGoal.sub_goal_is_completed,
              sub_goal_completed_at: subGoal.sub_goal_completed_at,
              sub_goal_created_at: subGoal.sub_goal_created_at,
              sub_goal_updated_at: subGoal.sub_goal_updated_at,
            }))
        }))
        .sort((a: any, b: any) => a.core_goal_id.localeCompare(b.core_goal_id))
      };

      console.log('✅ 특정 만다라 차트 조회 성공:', result.mandala_chart_id);
      return result;

    } catch (error) {
      console.error('❌ 특정 만다라 차트 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 수동 롤백 방식으로 만다라트 데이터 삽입 (수정된 버전)
   * @param insertData 삽입할 만다라트 데이터
   * @returns 성공 여부와 결과 데이터
   */
  static async insertMandalartWithManualRollback(insertData: MandalartInsertData) {
    let insertedMandalaId: string | null = null;
    let insertedCoreGoals: string[] = [];
    
    try {
      console.log('🔄 데이터 삽입 시작...');

      // 1. mandala_charts 먼저 삽입
      const { data: mandalaData, error: mandalaError } = await supabase
        .from('mandala_charts')
        .insert([insertData.mandalaChart])
        .select('mandala_chart_id')
        .single();

      if (mandalaError) {
        console.error('❌ mandala_charts 삽입 실패:', mandalaError);
        throw mandalaError;
      }
      
      insertedMandalaId = mandalaData.mandala_chart_id;
      console.log('✅ mandala_charts 삽입 성공:', insertedMandalaId);

      // 2. core_goals 삽입 (복합키 생성: mandala_chart_id_core_goal_id_index)
      const coreGoalsWithCompositeKey = insertData.coreGoals.map((coreGoal, index) => ({
        mandala_chart_id: coreGoal.mandala_chart_id,
        core_goal_id: `${coreGoal.mandala_chart_id}_${index + 1}`, // 복합키 생성
        core_goal_title: coreGoal.core_goal_title
      }));

      const { data: coreGoalsData, error: coreGoalsError } = await supabase
        .from('core_goals')
        .insert(coreGoalsWithCompositeKey)
        .select('core_goal_id');

      if (coreGoalsError) {
        console.error('❌ core_goals 삽입 실패:', coreGoalsError);
        throw coreGoalsError;
      }
      
      insertedCoreGoals = coreGoalsData?.map(goal => goal.core_goal_id) || [];
      console.log('✅ core_goals 삽입 성공:', insertedCoreGoals);

      // 3. sub_goals 삽입 (복합키 생성: mandala_chart_id_core_goal_id_sub_goal_id_index)
      if (insertData.subGoals && insertData.subGoals.length > 0) {
        const subGoalsWithCompositeKey = insertData.subGoals.map((subGoal, index) => {
          // 원래 core_goal_id에서 인덱스 추출 (예: 1, 2, 3, 4)
          const coreGoalIndex = Math.floor(index / 5) + 1; // 5개씩 그룹으로 나누어 core_goal 인덱스 계산
          const subGoalIndex = (index % 5) + 1; // 각 그룹 내에서의 인덱스 (1-5)
          
          const coreGoalCompositeId = `${insertData.mandalaChart.mandala_chart_id}_${coreGoalIndex}`;
          const subGoalCompositeId = `${insertData.mandalaChart.mandala_chart_id}_${coreGoalIndex}_${subGoalIndex}`;
          
          return {
            sub_goal_id: subGoalCompositeId,
            core_goal_id: coreGoalCompositeId,
            sub_goal_title: subGoal.sub_goal_title
          };
        });

        console.log('📝 sub_goals 삽입 데이터:', subGoalsWithCompositeKey);

        const { error: subGoalsError } = await supabase
          .from('sub_goals')
          .insert(subGoalsWithCompositeKey);

        if (subGoalsError) {
          console.error('❌ sub_goals 삽입 실패:', subGoalsError);
          throw subGoalsError;
        }
        console.log('✅ sub_goals 삽입 성공');
      }

      console.log('✅ 전체 데이터 삽입 성공');
      return { success: true, mandala_chart_id: insertedMandalaId };

    } catch (error) {
      console.error('❌ 데이터 삽입 실패:', error);
      
      // 롤백: 삽입된 데이터들을 역순으로 삭제
      
      // sub_goals 롤백 (core_goal_id 기준)
      if (insertedCoreGoals.length > 0) {
        try {
          await supabase
            .from('sub_goals')
            .delete()
            .in('core_goal_id', insertedCoreGoals);
          
          console.log('🔄 sub_goals 롤백 완료');
        } catch (rollbackError) {
          console.error('❌ sub_goals 롤백 실패:', rollbackError);
        }
      }

      // core_goals 롤백
      if (insertedCoreGoals.length > 0) {
        try {
          await supabase
            .from('core_goals')
            .delete()
            .in('core_goal_id', insertedCoreGoals);
          
          console.log('🔄 core_goals 롤백 완료');
        } catch (rollbackError) {
          console.error('❌ core_goals 롤백 실패:', rollbackError);
        }
      }

      // mandala_charts 롤백
      if (insertedMandalaId) {
        try {
          await supabase
            .from('mandala_charts')
            .delete()
            .eq('mandala_chart_id', insertedMandalaId);
          
          console.log('🔄 mandala_charts 롤백 완료');
        } catch (rollbackError) {
          console.error('❌ mandala_charts 롤백 실패:', rollbackError);
        }
      }
      
      throw error;
    }
  }

 static async setMandalaChartCountUp(userEmail?: string) {
    try {
      if (!userEmail) {
        throw new Error('사용자 이메일이 필요합니다.');
      }

      // 현재 개수 조회
      const { data: currentData, error: selectError } = await supabase
        .from('user_profiles')
        .select('user_mandala_charts_count')
        .eq('user_email', userEmail)
        .single();

      if (selectError) throw selectError;

      const currentCount = currentData?.user_mandala_charts_count || 0;
      
      // 1 증가시켜 업데이트
      const { data, error } = await supabase
        .from('user_profiles')
        .update({ user_mandala_charts_count: currentCount + 1 })
        .eq('user_email', userEmail)
        .select('user_mandala_charts_count')
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('❌ 만다라 차트 개수 증가 실패:', error);
      return { success: false, error };
    }
  }

  /**
   * 만다라 차트 조회 (core_goals와 sub_goals 포함)
   * @param userEmail 사용자 이메일
   * @param mandalaChartId 만다라 차트 ID (선택)
   * @returns 만다라 차트 데이터
   */
  static async getMandalaChart(userEmail: string, mandalaChartId?: string) {
    try {
      let query = supabase
        .from('mandala_charts')
        .select(`
          *,
          core_goals (
            *,
            sub_goals (*)
          )
        `)
        .eq('user_email', userEmail)
        .eq('mandala_chart_is_active', true);

      if (mandalaChartId) {
        query = query.eq('mandala_chart_id', mandalaChartId);
        const { data, error } = await query.single();
        
        if (error) throw error;
        return { success: true, data };
      } else {
        const { data, error } = await query;
        
        if (error) throw error;
        return { success: true, data };
      }

    } catch (error) {
      console.error('❌ 만다라 차트 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 코어 목표 조회 (sub_goals 포함)
   * @param mandalaChartId 만다라 차트 ID
   * @returns 코어 목표 데이터
   */
  static async getCoreGoals(mandalaChartId: string) {
    try {
      const { data, error } = await supabase
        .from('core_goals')
        .select(`
          *,
          sub_goals (*)
        `)
        .eq('mandala_chart_id', mandalaChartId);

      if (error) throw error;
      
      return { success: true, data };

    } catch (error) {
      console.error('❌ 코어 목표 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 서브 목표 조회
   * @param coreGoalId 코어 목표 ID
   * @returns 서브 목표 데이터
   */
  static async getSubGoals(coreGoalId: string) {
    try {
      const { data, error } = await supabase
        .from('sub_goals')
        .select('*')
        .eq('core_goal_id', coreGoalId)
        .order('sub_goal_id', { ascending: true });

      if (error) throw error;
      
      return { success: true, data };

    } catch (error) {
      console.error('❌ 서브 목표 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 서브 목표 완료 상태 업데이트
   * @param coreGoalId 코어 목표 ID
   * @param subGoalId 서브 목표 ID
   * @param isCompleted 완료 상태
   * @returns 성공 여부
   */
  static async updateSubGoalCompletion(coreGoalId: string, subGoalId: string, isCompleted: boolean) {
    try {
      const updateData: any = {
        sub_goal_is_completed: isCompleted,
        sub_goal_updated_at: new Date().toISOString()
      };

      if (isCompleted) {
        updateData.sub_goal_completed_at = new Date().toISOString();
      } else {
        updateData.sub_goal_completed_at = null;
      }

      const { error } = await supabase
        .from('sub_goals')
        .update(updateData)
        .eq('core_goal_id', coreGoalId)
        .eq('sub_goal_id', subGoalId);

      if (error) throw error;
      
      return { success: true };

    } catch (error) {
      console.error('❌ 서브 목표 완료 상태 업데이트 실패:', error);
      throw error;
    }
  }

  /**
   * 만다라 차트 삭제 (소프트 삭제)
   * @param mandalaChartId 만다라 차트 ID
   * @param userEmail 사용자 이메일 (보안을 위한 확인)
   * @returns 성공 여부
   */
  static async deleteMandalaChart(mandalaChartId: string, userEmail: string) {
    try {
      const { error } = await supabase
        .from('mandala_charts')
        .update({ mandala_chart_is_active: false })
        .eq('mandala_chart_id', mandalaChartId)
        .eq('user_email', userEmail);

      if (error) throw error;
      
      return { success: true };

    } catch (error) {
      console.error('❌ 만다라 차트 삭제 실패:', error);
      throw error;
    }
  }

  /**
   * 사용자의 만다라 차트 개수 조회
   * @param userEmail 사용자 이메일
   * @returns 차트 개수
   */
  static async getMandalaChartCount(userEmail: string) {
    try {
      const { count, error } = await supabase
        .from('mandala_charts')
        .select('*', { count: 'exact', head: true })
        .eq('user_email', userEmail)
        .eq('mandala_chart_is_active', true);

      if (error) throw error;
      
      return { success: true, count: count || 0 };

    } catch (error) {
      console.error('❌ 만다라 차트 개수 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 데이터베이스 스키마 확인을 위한 디버그 메서드
   */
  static async debugTableStructure() {
    try {
      console.log('🔍 테이블 구조 확인 중...');
      
      // sub_goals 테이블의 첫 번째 행을 조회하여 컬럼 구조 확인
      const { data, error } = await supabase
        .from('sub_goals')
        .select('*')
        .limit(1);

      if (error) {
        console.error('❌ sub_goals 테이블 조회 실패:', error);
      } else {
        console.log('✅ sub_goals 테이블 구조:', data);
        if (data && data.length > 0) {
          console.log('📋 사용 가능한 컬럼:', Object.keys(data[0]));
        }
      }

      // core_goals 테이블도 확인
      const { data: coreData, error: coreError } = await supabase
        .from('core_goals')
        .select('*')
        .limit(1);

      if (coreError) {
        console.error('❌ core_goals 테이블 조회 실패:', coreError);
      } else {
        console.log('✅ core_goals 테이블 구조:', coreData);
        if (coreData && coreData.length > 0) {
          console.log('📋 사용 가능한 컬럼:', Object.keys(coreData[0]));
        }
      }

    } catch (error) {
      console.error('❌ 디버그 실패:', error);
    }
  }
}