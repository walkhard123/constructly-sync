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

export interface Project {
  id: number;
  name: string;
  phase: string;
  progress: number;
  due: string;
  status: string;
  budget: string;
  risk: string;
  tasks: Task[];
}