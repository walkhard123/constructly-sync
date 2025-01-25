import { Project, Task } from "@/components/types/project";
import { useProjectState } from "./useProjectState";
import { useProjectActions } from "./useProjectActions";
import { useTaskActions } from "./useTaskActions";
import { useToast } from "./use-toast";

export const useProjects = () => {
  const { toast } = useToast();
  const { projects, setProjects, searchQuery, setSearchQuery, refreshProjects } = useProjectState();
  const { handleAddProject, handleDeleteProject } = useProjectActions(projects, setProjects);
  const { handleAddTask, handleEditTask, handleAddSubTask, toggleSubTask } = useTaskActions({
    tasks: projects.flatMap(p => p.tasks),
    setTasks: (updatedTasks) => {
      setProjects(projects.map(p => ({
        ...p,
        tasks: Array.isArray(updatedTasks) 
          ? updatedTasks.filter(t => t.project === p.name)
          : []
      })));
    },
    setIsDialogOpen: () => {},
    setNewTask: () => {},
    setEditingTask: () => {}
  });

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleToggleTaskStatus = (projectId: number, taskId: number) => {
    setProjects(prevProjects => prevProjects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task => {
            if (task.id === taskId) {
              return {
                ...task,
                status: task.status === 'completed' ? 'in-progress' : 'completed'
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
    setProjects(prevProjects => prevProjects.map(project => {
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

  const projectAddSubTask = (projectId: number, taskId: number, title: string) => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Subtask title cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setProjects(prevProjects => {
      const updatedProjects = prevProjects.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            tasks: project.tasks.map(task => {
              if (task.id === taskId) {
                const currentSubTasks = task.subTasks || [];
                const newSubTask = {
                  id: currentSubTasks.length + 1,
                  title: title.trim(),
                  completed: false
                };
                return {
                  ...task,
                  subTasks: [...currentSubTasks, newSubTask]
                };
              }
              return task;
            })
          };
        }
        return project;
      });
      
      return updatedProjects;
    });
    
    toast({
      title: "Success",
      description: "Subtask added successfully",
    });
  };

  const handleToggleSubTask = (projectId: number, taskId: number, subTaskId: number) => {
    setProjects(prevProjects => prevProjects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task => {
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
          })
        };
      }
      return project;
    }));
  };

  return {
    projects: filteredProjects,
    handleSearch,
    handleAddProject,
    handleDeleteProject,
    handleAddTask,
    handleToggleTaskStatus,
    handleDeleteTask,
    handleAddSubTask: projectAddSubTask,
    toggleSubTask: handleToggleSubTask,
    refreshProjects
  };
};