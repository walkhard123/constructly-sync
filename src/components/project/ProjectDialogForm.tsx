import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Project } from "../types/project";
import { ProjectBasicInfo } from "./form/ProjectBasicInfo";
import { ProjectTypeSelect } from "./form/ProjectTypeSelect";
import { TeamMemberSelect } from "./form/TeamMemberSelect";
import { ProjectDates } from "./form/ProjectDates";
import { ProjectDescription } from "./form/ProjectDescription";

interface ProjectDialogFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingProject: Project | null;
  newProject: Partial<Project>;
  setNewProject: (project: Partial<Project>) => void;
  onSave: () => void;
}

export const ProjectDialogForm = ({
  isOpen,
  onOpenChange,
  editingProject,
  newProject,
  setNewProject,
  onSave
}: ProjectDialogFormProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
          <DialogDescription>
            {editingProject ? 'Edit the project details below' : 'Fill in the project details below'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <ProjectBasicInfo
            name={newProject.name || ''}
            address={newProject.address || ''}
            onNameChange={(value) => setNewProject({ ...newProject, name: value })}
            onAddressChange={(value) => setNewProject({ ...newProject, address: value })}
          />
          
          <ProjectTypeSelect
            type={newProject.type || 'house'}
            onTypeChange={(value) => setNewProject({ ...newProject, type: value })}
          />

          <TeamMemberSelect
            teamMember={newProject.teamMember || ''}
            onTeamMemberChange={(value) => setNewProject({ ...newProject, teamMember: value })}
          />

          <ProjectDates
            startDate={newProject.startDate || ''}
            endDate={newProject.endDate || ''}
            onStartDateChange={(value) => setNewProject({ ...newProject, startDate: value })}
            onEndDateChange={(value) => setNewProject({ ...newProject, endDate: value })}
          />

          <ProjectDescription
            description={newProject.description || ''}
            onDescriptionChange={(value) => setNewProject({ ...newProject, description: value })}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            {editingProject ? 'Update Project' : 'Add Project'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};