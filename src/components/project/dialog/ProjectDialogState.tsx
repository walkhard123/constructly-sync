import { Project } from "../../types/project";
import { useState } from "react";

export const useProjectDialogState = () => {
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteProjectId, setDeleteProjectId] = useState<number | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: "",
    address: "",
    type: "house",
    teamMember: "",
    startDate: "",
    endDate: "",
    description: "",
    phase: "Phase 1",
    progress: 0,
    status: "active",
    budget: "",
    risk: "low",
    tasks: []
  });

  const resetNewProject = () => {
    setNewProject({
      name: "",
      address: "",
      type: "house",
      teamMember: "",
      startDate: "",
      endDate: "",
      description: "",
      phase: "Phase 1",
      progress: 0,
      status: "active",
      budget: "",
      risk: "low",
      tasks: []
    });
  };

  return {
    isProjectDialogOpen,
    setIsProjectDialogOpen,
    editingProject,
    setEditingProject,
    deleteProjectId,
    setDeleteProjectId,
    newProject,
    setNewProject,
    resetNewProject
  };
};