import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Project } from "../types/project";
import { ProjectBasicInfo } from "./form/ProjectBasicInfo";
import { ProjectTypeSelect } from "./form/ProjectTypeSelect";
import { TeamMemberSelect } from "./form/TeamMemberSelect";
import { ProjectDates } from "./form/ProjectDates";
import { ProjectDescription } from "./form/ProjectDescription";
import { ProjectStatusSelect } from "./form/ProjectStatusSelect";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

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
  const { toast } = useToast();

  const handleSave = () => {
    if (!newProject.name || !newProject.address) {
      toast({
        title: "Error",
        description: "Project name and address are required fields",
        variant: "destructive",
      });
      return;
    }
    onSave();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </DialogTitle>
          <DialogDescription className="text-base">
            {editingProject ? 'Edit the project details below' : 'Fill in the project details below'}
            <span className="text-sm text-muted-foreground block mt-1">
              Fields marked with <span className="text-red-500">*</span> are required
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="space-y-6">
              <ProjectBasicInfo
                name={newProject.name || ''}
                address={newProject.address || ''}
                onNameChange={(value) => setNewProject({ ...newProject, name: value })}
                onAddressChange={(value) => setNewProject({ ...newProject, address: value })}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Project Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <ProjectStatusSelect
                status={newProject.status || 'upcoming'}
                onStatusChange={(value) => setNewProject({ ...newProject, status: value })}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
            <ProjectDescription
              description={newProject.description || ''}
              onDescriptionChange={(value) => setNewProject({ ...newProject, description: value })}
            />
          </Card>
        </div>

        <DialogFooter className="pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {editingProject ? 'Update Project' : 'Add Project'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};