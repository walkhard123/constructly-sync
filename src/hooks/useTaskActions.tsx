import { Task } from "@/components/types/task";
import { useToast } from "@/hooks/use-toast";

interface UseTaskActionsProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setIsDialogOpen: (open: boolean) => void;
  setNewTask: React.Dispatch<React.SetStateAction<Partial<Task>>>;
  setEditingTask: React.Dispatch<React.SetStateAction<Task | null>>;
}

export const useTaskActions = ({
  tasks,
  setTasks,
  setIsDialogOpen,
  setNewTask,
  setEditingTask
}: UseTaskActionsProps) => {
  const { toast } = useToast();

  const handleAddTask = (newTask: Partial<Task>, editingTask: Task | null) => {
    if (newTask.title && newTask.assignee && newTask.dueDate && newTask.project) {
      if (editingTask) {
        setTasks(tasks.map(task => 
          task.id === editingTask.id 
            ? { 
                ...task, 
                ...newTask, 
                id: task.id,
                subTasks: task.subTasks || []
              } 
            : task
        ));
        toast({
          title: "Success",
          description: "Task updated successfully",
        });
      } else {
        const maxId = Math.max(0, ...tasks.map(t => t.id));
        setTasks([...tasks, { 
          ...newTask as Task, 
          id: maxId + 1,
          subTasks: []
        }]);
        toast({
          title: "Success",
          description: "Task added successfully",
        });
      }
      setIsDialogOpen(false);
      setNewTask({
        title: "",
        priority: "medium",
        assignee: "",
        dueDate: "",
        project: "",
        status: "in-progress",
        subTasks: []
      });
      setEditingTask(null);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      priority: task.priority,
      assignee: task.assignee,
      dueDate: task.dueDate,
      project: task.project,
      status: task.status,
      subTasks: task.subTasks || []
    });
    setIsDialogOpen(true);
  };

  const handleAddSubTask = (taskId: number, newSubTasks: { [key: number]: string }, setNewSubTasks: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>) => {
    if (!newSubTasks[taskId]?.trim()) {
      toast({
        title: "Error",
        description: "Subtask title cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newSubTaskItem = {
          id: (task.subTasks?.length || 0) + 1,
          title: newSubTasks[taskId].trim(),
          completed: false
        };
        return {
          ...task,
          subTasks: [...(task.subTasks || []), newSubTaskItem]
        };
      }
      return task;
    }));
    
    setNewSubTasks(prev => ({ ...prev, [taskId]: '' }));
    toast({
      title: "Success",
      description: "Subtask added successfully",
    });
  };

  const toggleSubTask = (taskId: number, subTaskId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subTasks: (task.subTasks || []).map(subTask => 
            subTask.id === subTaskId 
              ? { ...subTask, completed: !subTask.completed }
              : subTask
          )
        };
      }
      return task;
    }));
  };

  return {
    handleAddTask,
    handleEditTask,
    handleAddSubTask,
    toggleSubTask
  };
};