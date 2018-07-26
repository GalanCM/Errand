export interface Plan {
  description: string;
  done: boolean;
}

export interface DayPlanner {
  plans: Plan[];
}

export interface Planner {
  day_planners: DayPlanner[];
}
