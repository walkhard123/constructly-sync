import { Project, Task } from "@/components/types/project";
import { useToast } from "@/hooks/use-toast";

export const useTaskActions = (
  projects: Project[],
  setProjects: (projects: Project[]) => void
) => {
  const { toast } = useToast();

  const handleAddTask = (selectedProject: number | null, newTask: Partial<Task>) => {
    if (!selectedProject || !newTask.title || !newTask.assignee || !newTask.dueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const project = projects.find(p => p.id === selectedProject);
    if (!project) return;

    const newTaskData: Task = {
      id: Math.max(0, ...project.tasks.map(t => t.id), 0) + 1,
      title: newTask.title,
      status: newTask.status || "pending",
      priority: newTask.priority || "medium",
      assignee: newTask.assignee,
      dueDate: newTask.dueDate,
      project: project.name,
      subTasks: []
    };

    setProjects(projects.map((project: Project) => {
      if (project.id === selectedProject) {
        return {
          ...project,
          tasks: [...project.tasks, newTaskData]
        };
      }
      return project;
    }));

    toast({
      title: "Success",
      description: "Task added successfully",
    });
  };

  const handleToggleTaskStatus = (projectId: number, taskId: number) => {
    setProjects(projects.map((project: Project) => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task => {
            if (task.id === taskId) {
              const newStatus = task.status === 'completed' ? 'pending' : 'completed';
              return { ...task, status: newStatus };
            }
            return task;
          })
        };
      }
      return project;
    }));
    toast({
      title: "Success",
      description: "Task status updated",
    });
  };

  const handleDeleteTask = (projectId: number, taskId: number) => {
    setProjects(projects.map((project: Project) => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.filter(task => task.id !== taskId)
        };
      }
      return project;
    }));
    toast({
      title: "Success",
      description: "Task deleted successfully",
    });
  };

  return {
    handleAddTask,
    handleToggleTaskStatus,
    handleDeleteTask
  };
};