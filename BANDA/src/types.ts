export interface MandalartData {
  finalGoal: string;
  mandala_chart_id: string;
  coreGoals: CoreGoalProps[];
}

export interface CoreGoalProps {
  core_goal_id: number;
  mandala_chart_id: string;
  core_goal_title: string;
  isCore:boolean;
  subGoals: SubGoalProps[]
}

export interface SubGoalProps {
  sub_goal_id: number;
  core_goal_id: number;
  sub_goal_title: string;
  isCore:boolean;
}

export interface Goal {
  title: string;
  details: string[];
}

export interface MandalaSection {
  mandala_chart_id: string;
  core_goal_id: number;
  core_goal_title: string;
  isCore: boolean;
  subGoals: SubGoalProps[];
}

export interface MandalaData {
  center: {
    text: string;
    isMain: boolean;
  };
  sections: MandalaSection[];
}


export interface Mission {
  id: string;
  title: string;
  description: string;
  tip: string;
  completed: boolean;
}

export interface WeeklyData {
  day: string;
  stars: number;
}


export interface MandalaProps {
  mandala_chart_id: string;
  user_email: string;
  mandala_chart_title: string;
}


export interface CoreGoal {
  name: string;
  completed: number;
  total: number;
  progress: number;
}


export type Screen = 'login' | 'mandala' | 'missions' | 'statistics' | 'mypage' | 'signup';