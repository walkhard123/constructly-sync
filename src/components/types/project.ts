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
  address: string;
  type: "house" | "duplex" | "townhouse" | "apartment" | "others";
  teamMember: string;
  startDate: string;
  endDate: string;
  description: string;
  phase: string;
  progress: number;
  status: string;
  budget: string;
  risk: string;
  tasks: Task[];
}