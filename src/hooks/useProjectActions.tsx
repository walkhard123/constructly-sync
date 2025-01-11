import { Project } from "@/components/types/project";
import { useToast } from "@/hooks/use-toast";

export const useProjectActions = (
  projects: Project[],
  setProjects: (projects: Project[]) => void
) => {
  const { toast } = useToast();

  const handleAddProject = (newProject: Partial<Project>, editingProject: Project | null) => {
    console.log("Adding/Editing project:", newProject);
    
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
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
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

      setProjects([...projects, newProjectData]);
      
      // Enhanced success toast with more descriptive message
      toast({
        title: "Project Added Successfully",
        description: `"${newProjectData.name}" has been added to your projects list`,
        variant: "default",
      });

      // Improved scroll and highlight behavior
      setTimeout(() => {
        const projectElements = document.querySelectorAll('[data-project-id]');
        const newProjectElement = projectElements[projectElements.length - 1];
        if (newProjectElement) {
          newProjectElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Remove any existing highlight classes first
          document.querySelectorAll('.highlight-new-project').forEach(el => {
            el.classList.remove('highlight-new-project');
          });
          // Add the highlight class
          newProjectElement.classList.add('highlight-new-project');
        }
      }, 300); // Increased delay to ensure DOM update
    }
  };

  const handleDeleteProject = (projectId: number) => {
    setProjects(projects.filter((project) => project.id !== projectId));
    toast({
      title: "Success",
      description: "Project deleted successfully",
    });
  };

  return {
    handleAddProject,
    handleDeleteProject,
  };
};