import { Project } from "@/components/types/project";
import { useToast } from "@/hooks/use-toast";

export const useProjectActions = (
  projects: Project[],
  setProjects: (projects: Project[]) => void
) => {
  const { toast } = useToast();

  const handleAddProject = (newProject: Partial<Project>, editingProject: Project | null) => {
    // Log the newProject object to debug
    console.log('New project data:', newProject);

    // Check only the essential fields that should be required
    if (!newProject.name?.trim()) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive",
      });
      return;
    }

    if (editingProject) {
      setProjects(projects.map((project: Project) => 
        project.id === editingProject.id 
          ? {
              ...project,
              ...newProject,
              phase: newProject.phase || "Phase 1",
              progress: newProject.progress || 0,
              status: newProject.status || "active",
              risk: newProject.risk || "low"
            } as Project
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
        endDate: newProject.endDate || "",
        description: newProject.description || "",
        phase: newProject.phase || "Phase 1",
        progress: newProject.progress || 0,
        status: newProject.status || "active",
        budget: newProject.budget || "",
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
    setProjects(projects.filter((project: Project) => project.id !== projectId));
    toast({
      title: "Success",
      description: "Project deleted successfully",
    });
  };

  return {
    handleAddProject,
    handleDeleteProject
  };
};