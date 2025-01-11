import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ProjectHeader } from "./project/ProjectHeader";
import { ProjectDialogForm } from "./project/ProjectDialogForm";
import { ProjectTabs } from "./project/ProjectTabs";
import { Project } from "./types/project";
import { useProjects } from "@/hooks/useProjects";

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
        onSave={() => handleAddProject(newProject, editingProject)}
      />

      <ProjectTabs
        projects={projects}
        onEditProject={handleEditProject}
        onDeleteProject={handleDeleteProject}
      />
    </div>
  );
};