export interface ITask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

export interface ICreateTask {
  title: string;
  description?: string;
}

export interface IUpdateTask {
  title?: string;
  description?: string;
  completed?: boolean;
}
