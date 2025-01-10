import { Task } from "../types/task";

interface TaskFilterProps {
  tasks: Task[];
  searchQuery: string;
  filterStatus: string;
}

export const useTaskFilter = ({ tasks, searchQuery, filterStatus }: TaskFilterProps) => {
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return { filteredTasks };
};