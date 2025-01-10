import { Project, Task } from "@/components/types/project";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const useProjectActions = (
  projects: Project[],
  setProjects: (projects: Project[]) => void
) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddProject = (newProject: Partial<Project>, editingProject: Project | null) => {
    if (!newProject.name || !newProject.endDate || !newProject.budget) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (editingProject) {
      setProjects(projects.map(project => 
        project.id === editingProject.id 
          ? { ...project, ...newProject } as Project
          : project
      ));
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
    } else {
      const newProjectData: Project = {
        id: projects.length + 1,
        name: newProject.name,
        address: newProject.address || "",
        type: newProject.type || "house",
        teamMember: newProject.teamMember || "",
        startDate: newProject.startDate || "",
        endDate: newProject.endDate!,
        description: newProject.description || "",
        phase: newProject.phase || "Phase 1",
        progress: newProject.progress || 0,
        status: newProject.status || "active",
        budget: newProject.budget!,
        risk: newProject.risk || "low",
        tasks: []
      };

      setProjects([...projects, newProjectData]);
      toast({
        title: "Success",
        description: "Project added successfully",
      });
    }
  };

  const handleDeleteProject = (projectId: number) => {
    setProjects(projects.filter(project => project.id !== projectId));
    toast({
      title: "Success",
      description: "Project deleted successfully",
    });
  };

  return {
    searchQuery,
    handleSearch,
    handleAddProject,
    handleDeleteProject
  };
};