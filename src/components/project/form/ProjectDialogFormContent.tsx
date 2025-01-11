import { Project } from "@/components/types/project";
import { ProjectBasicInfo } from "./ProjectBasicInfo";
import { ProjectTypeSelect } from "./ProjectTypeSelect";
import { ProjectDates } from "./ProjectDates";
import { ProjectDescription } from "./ProjectDescription";
import { TeamMemberSelect } from "./TeamMemberSelect";
import { ProjectStatusSelect } from "./ProjectStatusSelect";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProjectDialogFormContentProps {
  editingProject: Project | null;
  newProject: Partial<Project>;
  setNewProject: (project: Partial<Project>) => void;
}

export const ProjectDialogFormContent = ({
  editingProject,
  newProject,
  setNewProject,
}: ProjectDialogFormContentProps) => {
  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>
          {editingProject ? "Edit Project" : "Add New Project"}
        </DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 py-4">
        <ProjectBasicInfo
          name={newProject.name || ""}
          address={newProject.address || ""}
          onNameChange={(value) => setNewProject({ ...newProject, name: value })}
          onAddressChange={(value) =>
            setNewProject({ ...newProject, address: value })
          }
        />
        <ProjectTypeSelect
          type={newProject.type || "house"}
          onTypeChange={(value) => setNewProject({ ...newProject, type: value })}
        />
        <ProjectDates
          startDate={newProject.startDate || ""}
          endDate={newProject.endDate || ""}
          onStartDateChange={(value) =>
            setNewProject({ ...newProject, startDate: value })
          }
          onEndDateChange={(value) =>
            setNewProject({ ...newProject, endDate: value })
          }
        />
        <TeamMemberSelect
          teamMember={newProject.teamMember || ""}
          onTeamMemberChange={(value) =>
            setNewProject({ ...newProject, teamMember: value })
          }
        />
        <ProjectStatusSelect
          status={newProject.status || "active"}
          onStatusChange={(value) =>
            setNewProject({ ...newProject, status: value })
          }
        />
        <ProjectDescription
          description={newProject.description || ""}
          onDescriptionChange={(value) =>
            setNewProject({ ...newProject, description: value })
          }
        />
      </div>
    </DialogContent>
  );
};