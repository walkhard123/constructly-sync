import { Project } from "@/components/types/project";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

    try {
      if (editingProject) {
        // Update existing project in Supabase
        const { error } = await supabase
          .from('projects')
          .update({
            name: newProject.name,
            address: newProject.address || "",
            type: newProject.type || "house",
            team_member: newProject.teamMember ? [newProject.teamMember] : [],
            start_date: newProject.startDate || null,
            end_date: newProject.endDate || null,
            description: newProject.description || "",
            phase: newProject.phase || "Phase 1",
            progress: newProject.progress || 0,
            status: newProject.status || "active",
            budget: newProject.budget || "",
            risk: newProject.risk || "low"
          })
          .eq('id', editingProject.id);

        if (error) throw error;

        const updatedProjects = projects.map((project) =>
          project.id === editingProject.id
            ? { ...project, ...newProject }
            : project
        );
        setProjects(updatedProjects);
      } else {
        // Insert new project into Supabase
        const { data, error } = await supabase
          .from('projects')
          .insert({
            name: newProject.name,
            address: newProject.address || "",
            type: newProject.type || "house",
            team_member: newProject.teamMember ? [newProject.teamMember] : [],
            start_date: newProject.startDate || null,
            end_date: newProject.endDate || null,
            description: newProject.description || "",
            phase: newProject.phase || "Phase 1",
            progress: newProject.progress || 0,
            status: newProject.status || "active",
            budget: newProject.budget || "",
            risk: newProject.risk || "low"
          })
          .select()
          .single();

        if (error) throw error;

        // Add new project at the beginning of the array
        const updatedProjects = [{ ...data, tasks: [] }, ...projects];
        setProjects(updatedProjects);

        // Scroll to the new project after a short delay
        setTimeout(() => {
          const projectElements = document.querySelectorAll('[data-project-id]');
          const newProjectElement = projectElements[0];
          if (newProjectElement) {
            newProjectElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            newProjectElement.classList.add('animate-fade-in');
          }
        }, 100);
      }
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Error",
        description: "Failed to save project. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleDeleteProject = async (projectId: number) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      const updatedProjects = projects.filter((project) => project.id !== projectId);
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    handleAddProject,
    handleDeleteProject,
  };
};