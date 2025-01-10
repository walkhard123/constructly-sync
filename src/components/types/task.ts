export interface SubTask {
  id: number;
  title: string;
  completed: boolean;
}

export interface Task {
  id: number;
  title: string;
  status: string;
  priority: string;
  assignee: string;
  dueDate: string;
  project: string;
  subTasks: SubTask[];
}