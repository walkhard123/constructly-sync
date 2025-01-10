import { Project, Task } from "@/components/types/project";
import { useProjectState } from "./useProjectState";
import { useProjectActions } from "./useProjectActions";
import { useTaskActions } from "./useTaskActions";
import { useSubTaskActions } from "./useSubTaskActions";

export const useProjects = () => {
  const { projects, setProjects, searchQuery, setSearchQuery } = useProjectState();
  const { handleAddProject, handleDeleteProject } = useProjectActions(projects, setProjects);
  const { handleAddTask, handleToggleTaskStatus, handleDeleteTask } = useTaskActions(projects, setProjects);
  const { handleAddSubTask, handleToggleSubTask } = useSubTaskActions(projects, setProjects);

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
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
    handleToggleSubTask
  };
};