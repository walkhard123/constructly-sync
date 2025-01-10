import { useState } from "react";
import { Project } from "@/components/types/project";

export const useProjectState = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);

  return {
    projects,
    setProjects,
    searchQuery,
    setSearchQuery,
    selectedProject,
    setSelectedProject,
    isTaskDialogOpen,
    setIsTaskDialogOpen,
    isProjectDialogOpen,
    setIsProjectDialogOpen
  };
};