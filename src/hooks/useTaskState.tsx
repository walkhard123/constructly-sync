import { useState } from "react";
import { Task } from "@/components/types/task";
import { useToast } from "@/hooks/use-toast";

export const useTaskState = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: 1, 
      title: "Foundation inspection", 
      status: "completed", 
      priority: "high", 
      assignee: "John Doe", 
      dueDate: "2024-03-20", 
      project: "Downtown Office Building",
      subTasks: []
    },
    { 
      id: 2, 
      title: "Electrical wiring", 
      status: "in-progress", 
      priority: "medium", 
      assignee: "Jane Smith", 
      dueDate: "2024-04-15", 
      project: "Downtown Office Building",
      subTasks: []
    },
    { 
      id: 3, 
      title: "Site preparation", 
      status: "in-progress", 
      priority: "high", 
      assignee: "Mike Johnson", 
      dueDate: "2024-03-25", 
      project: "Residential Complex",
      subTasks: []
    }
  ]);

  const [projects] = useState([
    { id: 1, name: "Downtown Office Building" },
    { id: 2, name: "Residential Complex" },
    { id: 3, name: "Shopping Mall Renovation" },
  ]);

  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newSubTasks, setNewSubTasks] = useState<{ [key: number]: string }>({});
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    priority: "medium",
    assignee: "",
    dueDate: "",
    project: "",
    status: "in-progress",
    subTasks: []
  });

  return {
    tasks,
    setTasks,
    projects,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    isDialogOpen,
    setIsDialogOpen,
    editingTask,
    setEditingTask,
    newSubTasks,
    setNewSubTasks,
    newTask,
    setNewTask,
    toast
  };
};