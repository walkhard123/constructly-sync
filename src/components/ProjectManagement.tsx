import { useToast } from "@/hooks/use-toast";
import { ProjectHeader } from "./project/ProjectHeader";
import { ProjectDialogForm } from "./project/ProjectDialogForm";
import { ProjectTabs } from "./project/ProjectTabs";
import { Project } from "./types/project";
import { useProjects } from "@/hooks/useProjects";
import { useProjectDialogState } from "./project/dialog/ProjectDialogState";
import { DeleteProjectDialog } from "./project/dialog/DeleteProjectDialog";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const ProjectManagement = () => {
  const { toast } = useToast();
  const {
    projects,
    handleSearch,
    handleAddProject,
    handleDeleteProject,
  } = useProjects();

  const {
    isProjectDialogOpen,
    setIsProjectDialogOpen,
    editingProject,
    setEditingProject,
    deleteProjectId,
    setDeleteProjectId,
    newProject,
    setNewProject,
    resetNewProject
  } = useProjectDialogState();

  // Fetch projects when component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Transform the data to match our Project type
        const transformedProjects = data.map(project => ({
          id: project.id,
          name: project.name,
          address: project.address || "",
          type: project.type,
          teamMember: project.team_member?.[0] || "",
          startDate: project.start_date || "",
          endDate: project.end_date || "",
          description: project.description || "",
          phase: project.phase || "Phase 1",
          progress: project.progress || 0,
          status: project.status,
          budget: project.budget || "",
          risk: project.risk || "low",
          tasks: []
        }));

        // Update projects in the state
        handleSearch("");
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: "Error",
          description: "Failed to load projects. Please refresh the page.",
          variant: "destructive",
        });
      }
    };

    fetchProjects();
  }, [toast]);

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setNewProject({
      name: project.name,
      address: project.address,
      type: project.type,
      teamMember: project.teamMember,
      startDate: project.startDate,
      endDate: project.endDate,
      description: project.description,
      phase: project.phase,
      progress: project.progress,
      status: project.status,
      budget: project.budget,
      risk: project.risk,
      tasks: project.tasks
    });
    setIsProjectDialogOpen(true);
  };

  const handleSaveProject = async () => {
    if (!newProject.name?.trim()) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      await handleAddProject(newProject, editingProject);
      setIsProjectDialogOpen(false);
      setEditingProject(null);
      resetNewProject();
      
      toast({
        title: editingProject ? "Project Updated" : "Project Added",
        description: editingProject 
          ? "Project has been updated successfully"
          : "New project has been added successfully",
      });
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Error",
        description: "Failed to save project. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleConfirmDelete = () => {
    if (deleteProjectId) {
      handleDeleteProject(deleteProjectId);
      setDeleteProjectId(null);
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <ProjectHeader 
        onOpenProjectDialog={() => {
          setEditingProject(null);
          resetNewProject();
          setIsProjectDialogOpen(true);
        }}
        onSearch={handleSearch}
      />
      
      <ProjectDialogForm
        isOpen={isProjectDialogOpen}
        onOpenChange={setIsProjectDialogOpen}
        editingProject={editingProject}
        newProject={newProject}
        setNewProject={setNewProject}
        onSave={handleSaveProject}
      />

      <ProjectTabs
        projects={projects}
        onEditProject={handleEditProject}
        onDeleteProject={(projectId) => setDeleteProjectId(projectId)}
      />

      <DeleteProjectDialog
        deleteProjectId={deleteProjectId}
        onOpenChange={() => setDeleteProjectId(null)}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};