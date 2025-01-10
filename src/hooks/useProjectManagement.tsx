import { useState } from "react";
import { Project } from "@/components/types/project";
import { useToast } from "@/hooks/use-toast";

export const useProjectManagement = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([
    { 
      id: 1, 
      name: "Downtown Office Building", 
      address: "123 Main St",
      type: "apartment",
      teamMember: "John Smith",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      description: "Modern office building in downtown area",
      phase: "Phase 1", 
      progress: 65,
      status: "active", 
      budget: "$2.5M", 
      risk: "medium",
      tasks: [
        { 
          id: 1, 
          title: "Foundation inspection", 
          status: "completed", 
          priority: "high", 
          assignee: "John Doe", 
          dueDate: "2024-03-20", 
          project: "Downtown Office Building",
          subTasks: [] 
        },
        { 
          id: 2, 
          title: "Electrical wiring", 
          status: "in-progress", 
          priority: "medium", 
          assignee: "Jane Smith", 
          dueDate: "2024-04-15", 
          project: "Downtown Office Building",
          subTasks: [] 
        }
      ]
    },
    { 
      id: 2, 
      name: "Residential Complex",
      address: "456 Oak Ave",
      type: "townhouse",
      teamMember: "Jane Smith",
      startDate: "2024-02-01",
      endDate: "2025-03-31",
      description: "Modern residential complex with amenities",
      phase: "Phase 2", 
      progress: 30,
      status: "active", 
      budget: "$4.1M", 
      risk: "low",
      tasks: [
        { 
          id: 1, 
          title: "Site preparation", 
          status: "in-progress", 
          priority: "high", 
          assignee: "Mike Johnson", 
          dueDate: "2024-03-25", 
          project: "Residential Complex",
          subTasks: [] 
        }
      ]
    },
    { 
      id: 3, 
      name: "Shopping Mall Renovation",
      address: "789 Market St",
      type: "others",
      teamMember: "Mike Johnson",
      startDate: "2024-03-01",
      endDate: "2024-11-30",
      description: "Complete renovation of existing shopping mall",
      phase: "Phase 1", 
      progress: 85,
      status: "active", 
      budget: "$1.8M", 
      risk: "high",
      tasks: []
    },
  ]);

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
      setProjects(prevProjects => prevProjects.map(project => 
        project.id === editingProject.id 
          ? {
              ...project,
              name: newProject.name!,
              phase: newProject.phase || "Phase 1",
              progress: newProject.progress || 0,
              endDate: newProject.endDate!,
              status: newProject.status || "active",
              budget: newProject.budget!,
              risk: newProject.risk || "low"
            }
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

      setProjects(prevProjects => [...prevProjects, newProjectData]);
      toast({
        title: "Success",
        description: "Project added successfully",
      });
    }
  };

  const handleDeleteProject = (projectId: number) => {
    setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
    toast({
      title: "Success",
      description: "Project deleted successfully",
    });
  };

  return {
    projects,
    handleAddProject,
    handleDeleteProject
  };
};