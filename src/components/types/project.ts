export interface SubTask {
  id: number;
  title: string;
  dueDate: string;
  assignee: string;
  completed: boolean;
}

export interface Task {
  id: number;
  title: string;
  status: string;
  priority: string;
  assignee: string;
  dueDate: string;
  subTasks: SubTask[];
}

export interface Project {
  id: number;
  name: string;
  address: string;
  type: 'House' | 'Duplex' | 'Townhouse' | 'Apartment' | 'Commercial' | 'Others';
  description: string;
  startDate: string;
  endDate: string;
  dueDate: string;
  assignedTeam: string;
  status: 'Upcoming' | 'Active' | 'Completed';
  tasks: Task[];
}