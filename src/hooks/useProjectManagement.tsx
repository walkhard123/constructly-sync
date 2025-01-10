import { useState } from "react";
import { Project } from "@/components/types/project";
import { useToast } from "@/hooks/use-toast";

export const useProjectManagement = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([
    { 
      id: 1, 
      name: "Downtown Office Building", 
      phase: "Phase 1", 
      progress: 65, 
      due: "Dec 2024", 
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
      phase: "Phase 2", 
      progress: 30, 
      due: "Mar 2025", 
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
      phase: "Phase 1", 
      progress: 85, 
      due: "Nov 2024", 
      status: "active", 
      budget: "$1.8M", 
      risk: "high",
      tasks: []
    },
  ]);

  const handleAddProject = (newProject: Partial<Project>, editingProject: Project | null) => {
    if (!newProject.name || !newProject.due || !newProject.budget) {
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
              due: newProject.due!,
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
        phase: newProject.phase || "Phase 1",
        progress: newProject.progress || 0,
        due: newProject.due,
        status: newProject.status || "active",
        budget: newProject.budget,
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
