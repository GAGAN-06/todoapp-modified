export interface ITask {
  id: number;
  title: string;
  description: string;
  status: boolean;
  created_at?: Date;
}

// Add a new interface for creating tasks
export interface ICreateTask {
  title: string;
  description: string;
  status: boolean;
}