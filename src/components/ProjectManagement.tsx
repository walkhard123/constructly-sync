import { useToast } from "@/hooks/use-toast";
import { ProjectHeader } from "./project/ProjectHeader";
import { ProjectDialogForm } from "./project/ProjectDialogForm";
import { ProjectTabs } from "./project/ProjectTabs";
import { Project } from "./types/project";
import { useProjects } from "@/hooks/useProjects";
import { useProjectDialogState } from "./project/dialog/ProjectDialogState";
import { DeleteProjectDialog } from "./project/dialog/DeleteProjectDialog";
import { useEffect } from "react";

export const ProjectManagement = () => {
  const { toast } = useToast();
  const {
    projects,
    handleSearch,
    handleAddProject,
    handleDeleteProject,
    refreshProjects
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

  // Refresh projects when component mounts or when returning to the page
  useEffect(() => {
    refreshProjects();
  }, []);

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