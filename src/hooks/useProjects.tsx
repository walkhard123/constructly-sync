import { Project, Task } from "@/components/types/project";
import { useProjectState } from "./useProjectState";
import { useProjectActions } from "./useProjectActions";
import { useTaskActions } from "./useTaskActions";

export const useProjects = () => {
  const { projects, setProjects, searchQuery, setSearchQuery } = useProjectState();
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
    setProjects(projects.map(project => {
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

  const projectAddSubTask = (projectId: number, taskId: number, title: string) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task => {
            if (task.id === taskId) {
              const newSubTask = {
                id: (task.subTasks?.length || 0) + 1,
                title,
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

  return {
    projects: filteredProjects,
    handleSearch,
    handleAddProject,
    handleDeleteProject,
    handleAddTask,
    handleToggleTaskStatus,
    handleDeleteTask,
    handleAddSubTask: projectAddSubTask,
    toggleSubTask
  };
};