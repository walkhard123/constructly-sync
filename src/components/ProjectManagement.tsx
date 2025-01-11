import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ProjectHeader } from "./project/ProjectHeader";
import { ProjectDialogForm } from "./project/ProjectDialogForm";
import { ProjectTabs } from "./project/ProjectTabs";
import { Project } from "./types/project";
import { useProjects } from "@/hooks/useProjects";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const ProjectManagement = () => {
  const { toast } = useToast();
  const {
    projects,
    handleSearch,
    handleAddProject,
    handleDeleteProject,
  } = useProjects();

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

  const handleSaveProject = () => {
    if (!newProject.name?.trim()) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive",
      });
      return;
    }

    handleAddProject(newProject, editingProject);
    setIsProjectDialogOpen(false);
    setEditingProject(null);
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
    
    toast({
      title: editingProject ? "Project Updated" : "Project Added",
      description: editingProject 
        ? "Project has been updated successfully"
        : "New project has been added successfully",
    });
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

      <AlertDialog open={deleteProjectId !== null} onOpenChange={() => setDeleteProjectId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project and all its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};