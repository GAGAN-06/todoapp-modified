// types/tasks.ts
export interface ITask {
  id: string;  // Keep as string to match API response
  title: string;
  description: string;
  status: boolean;
  created_at?: string;
}

export interface ICreateTask {
  title: string;
  description: string;
  status: boolean;
}

export interface IUpdateTask extends ICreateTask {
  id: string;  // Keep as string
}