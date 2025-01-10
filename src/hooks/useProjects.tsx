import { Project, Task } from "@/components/types/project";
import { useProjectState } from "./useProjectState";
import { useProjectActions } from "./useProjectActions";
import { useTaskActions } from "./useTaskActions";
import { useSubTaskActions } from "./useSubTaskActions";

export const useProjects = () => {
  const { projects, setProjects, searchQuery, setSearchQuery } = useProjectState();
  const { handleAddProject, handleDeleteProject } = useProjectActions(projects, setProjects);
  const { handleAddTask, handleEditTask, handleAddSubTask, toggleSubTask } = useTaskActions({
    tasks: projects.flatMap(p => p.tasks),
    setTasks: (updatedTasks) => {
      setProjects(projects.map(p => ({
        ...p,
        tasks: updatedTasks.filter(t => t.project === p.name)
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

  return {
    projects: filteredProjects,
    handleSearch,
    handleAddProject,
    handleDeleteProject,
    handleAddTask,
    handleToggleTaskStatus,
    handleDeleteTask,
    handleAddSubTask,
    toggleSubTask
  };
};