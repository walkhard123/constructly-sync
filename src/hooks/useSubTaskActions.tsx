import { Project } from "@/components/types/project";
import { useToast } from "@/hooks/use-toast";

export const useSubTaskActions = (
  projects: Project[],
  setProjects: (projects: Project[]) => void
) => {
  const { toast } = useToast();

  const handleAddSubTask = (projectId: number, taskId: number, title: string) => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Subtask title cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const updatedProjects = projects.map(project => {
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
    });

    setProjects(updatedProjects);
    toast({
      title: "Success",
      description: "Subtask added successfully",
    });
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
    handleAddSubTask,
    handleToggleSubTask
  };
};