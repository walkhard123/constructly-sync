import { Project } from "@/components/types/project";
import { useToast } from "@/hooks/use-toast";

export const useProjectActions = (
  projects: Project[],
  setProjects: (projects: Project[]) => void
) => {
  const { toast } = useToast();

  const handleAddProject = async (newProject: Partial<Project>, editingProject: Project | null) => {
    if (!newProject.name?.trim()) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive",
      });
      return;
    }

    if (editingProject) {
      const updatedProjects = projects.map((project) =>
        project.id === editingProject.id
          ? { ...project, ...newProject }
          : project
      );
      setProjects(updatedProjects);
    } else {
      const newProjectData: Project = {
        id: Math.max(0, ...projects.map((p) => p.id)) + 1,
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

      const updatedProjects = [...projects, newProjectData];
      setProjects(updatedProjects);

      // Scroll to the new project after a short delay to ensure the DOM has updated
      setTimeout(() => {
        const projectElements = document.querySelectorAll('[data-project-id]');
        const newProjectElement = projectElements[projectElements.length - 1];
        if (newProjectElement) {
          newProjectElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          newProjectElement.classList.add('animate-fade-in');
        }
      }, 100);
    }
  };

  const handleDeleteProject = (projectId: number) => {
    const updatedProjects = projects.filter((project) => project.id !== projectId);
    setProjects(updatedProjects);
  };

  return {
    handleAddProject,
    handleDeleteProject,
  };
};