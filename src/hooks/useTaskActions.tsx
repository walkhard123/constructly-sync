import { Project, Task } from "@/components/types/project";
import { useToast } from "@/hooks/use-toast";

export const useTaskActions = (
  projects: Project[],
  setProjects: (projects: Project[]) => void
) => {
  const { toast } = useToast();

  const handleAddTask = (newTask: Partial<Task>, editingTask: Task | null) => {
    if (!newTask.title || !newTask.assignee || !newTask.dueDate || !newTask.project) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setProjects(projects.map(project => {
      if (project.name === newTask.project) {
        if (editingTask) {
          return {
            ...project,
            tasks: project.tasks.map(task =>
              task.id === editingTask.id
                ? { ...task, ...newTask } as Task
                : task
            )
          };
        } else {
          const newTaskData: Task = {
            id: Math.max(0, ...project.tasks.map(t => t.id)) + 1,
            title: newTask.title!,
            status: newTask.status || "pending",
            priority: newTask.priority || "medium",
            assignee: newTask.assignee!,
            dueDate: newTask.dueDate!,
            project: newTask.project!,
            subTasks: []
          };
          return {
            ...project,
            tasks: [...project.tasks, newTaskData]
          };
        }
      }
      return project;
    }));

    toast({
      title: "Success",
      description: editingTask ? "Task updated successfully" : "Task added successfully",
    });
  };

  const handleToggleTaskStatus = (projectId: number, taskId: number) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task => {
            if (task.id === taskId) {
              return {
                ...task,
                status: task.status === 'completed' ? 'pending' : 'completed'
              };
            }
            return task;
          })
        };
      }
      return project;
    }));
  };

  const handleDeleteTask = (projectId: number, taskId: number) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.filter(task => task.id !== taskId)
        };
      }
      return project;
    }));
  };

  const handleAddSubTask = (projectId: number, taskId: number, title: string) => {
    if (!title.trim()) return;

    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task => {
            if (task.id === taskId) {
              const newSubTask = {
                id: (task.subTasks?.length || 0) + 1,
                title: title.trim(),
                completed: false
              };
              return {
                ...task,
                subTasks: [...(task.subTasks || []), newSubTask]
              };
            }
            return task;
          })
        };
      }
      return project;
    }));
  };

  const handleToggleSubTask = (projectId: number, taskId: number, subTaskId: number) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task => {
            if (task.id === taskId) {
              return {
                ...task,
                subTasks: task.subTasks.map(subTask => 
                  subTask.id === subTaskId 
                    ? { ...subTask, completed: !subTask.completed }
                    : subTask
                )
              };
            }
            return task;
          })
        };
      }
      return project;
    }));
  };

  return {
    handleAddTask,
    handleToggleTaskStatus,
    handleDeleteTask,
    handleAddSubTask,
    handleToggleSubTask
  };
};