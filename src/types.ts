export interface TaskData {
  id?: number;
  description: string;
  date: Date;
  order: number;
  done: boolean;
}

export interface RootState {
  tasks: TaskData[];
}
