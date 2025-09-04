import { supabase } from '../supabaseClient';

// 타입 정의
export interface MandalaChartInsert {
  mandala_chart_id: string;
  user_email: string;
  mandala_chart_title: string;
}

export interface CoreGoalInsert {
  mandala_chart_id: string;
  core_goal_id: number; // number -> string으로 변경
  core_goal_title: string;
}

export interface SubGoalInsert {
  mandala_chart_id: string;
  sub_goal_id: number; // number -> string으로 변경
  core_goal_id: number; // number -> string으로 변경
  sub_goal_title: string;
}

export interface MandalartInsertData {
  mandalaChart: MandalaChartInsert;
  coreGoals: CoreGoalInsert[];
  subGoals: SubGoalInsert[];
}

// DAO 클래스
export class MandalaDAO {
  
  /**
   * RPC 함수를 사용한 트랜잭션 처리로 만다라트 데이터 삽입
   * @param insertData 삽입할 만다라트 데이터
   * @returns 성공 여부와 결과 데이터
   */
  static async insertMandalartWithTransaction(insertData: MandalartInsertData) {
    try {
      // core_goals 데이터를 RPC에 맞는 형태로 변환
      const coreGoalsData = insertData.coreGoals.reduce((acc, coreGoal) => {
        acc.push({
          core_goal_id: `${coreGoal.mandala_chart_id}_${coreGoal.core_goal_id}`,
          core_goal_title: coreGoal.core_goal_title,
          mandala_chart_id: coreGoal.mandala_chart_id
        });
        return acc;
      }, [] as Array<{ core_goal_title: string; core_goal_id: string, mandala_chart_id: string }>);

      // sub_goals 데이터를 RPC에 맞는 형태로 변환
      const subGoalsData = insertData.subGoals.reduce((acc, subGoal) => {
        acc.push({
          sub_goal_id: `${subGoal.mandala_chart_id}_${subGoal.core_goal_id}_${subGoal.sub_goal_id}`,
          core_goal_id: `${subGoal.mandala_chart_id}_${subGoal.core_goal_id}`,
          sub_goal_title: subGoal.sub_goal_title
        });
        return acc;
      }, [] as Array<{ sub_goal_id: string; core_goal_id: string; sub_goal_title: string }>);

      const { data, error } = await supabase.rpc('insert_mandala_with_goals', {
        p_mandala_chart_id: insertData.mandalaChart.mandala_chart_id,
        p_user_email: insertData.mandalaChart.user_email,
        p_mandala_chart_title: insertData.mandalaChart.mandala_chart_title,
        p_core_goals: coreGoalsData,
        p_sub_goals: subGoalsData
      });

      if (error) {
        throw new Error(`RPC 호출 실패: ${error.message}`);
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Transaction failed');
      }

      return { success: true, data };

    } catch (error) {
      console.error('❌ 트랜잭션 실패:', error);
      throw error;
    }
  }

  /**
   * 수동 롤백 방식으로 만다라트 데이터 삽입
   * @param insertData 삽입할 만다라트 데이터
   * @returns 성공 여부와 결과 데이터
   */
  static async insertMandalartWithManualRollback(insertData: MandalartInsertData) {
    let insertedMandalaId: string | null = null;
    let insertedCoreGoals: string[] = []; // number[] -> string[]으로 변경
    
    try {

      // 1. mandala_charts 먼저 삽입
      const { data: mandalaData, error: mandalaError } = await supabase
        .from('mandala_charts')
        .insert([insertData.mandalaChart])
        .select('mandala_chart_id')
        .single();

      if (mandalaError) throw mandalaError;
      
      insertedMandalaId = mandalaData.mandala_chart_id;
      console.log('✅ mandala_charts 삽입 성공:', insertedMandalaId);

      // 2. core_goals 삽입
      const { data: coreGoalsData, error: coreGoalsError } = await supabase
        .from('core_goals')
        .insert(insertData.coreGoals)
        .select('core_goal_id');

      if (coreGoalsError) throw coreGoalsError;
      
      insertedCoreGoals = coreGoalsData?.map(goal => goal.core_goal_id) || [];
      console.log('✅ core_goals 삽입 성공:', insertedCoreGoals);

      // 3. sub_goals 삽입
      if (insertData.subGoals && insertData.subGoals.length > 0) {
        const { error: subGoalsError } = await supabase
          .from('sub_goals')
          .insert(insertData.subGoals);

        if (subGoalsError) throw subGoalsError;
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
  static async getSubGoals(coreGoalId: string) { // number -> string으로 변경
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
  static async updateSubGoalCompletion(coreGoalId: string, subGoalId: string, isCompleted: boolean) { // number -> string으로 변경
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
}