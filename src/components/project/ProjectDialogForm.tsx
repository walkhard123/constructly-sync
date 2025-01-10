import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Project } from "../types/project";

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
          <DialogDescription>
            {editingProject ? 'Edit the project details below' : 'Fill in the project details below'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={newProject.name}
              onChange={(e) => setNewProject({...newProject, name: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="phase">Phase</Label>
            <Select
              value={newProject.phase}
              onValueChange={(value) => setNewProject({...newProject, phase: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Phase 1">Phase 1</SelectItem>
                <SelectItem value="Phase 2">Phase 2</SelectItem>
                <SelectItem value="Phase 3">Phase 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="due">Due Date</Label>
            <Input
              id="due"
              type="date"
              value={newProject.due}
              onChange={(e) => setNewProject({...newProject, due: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="budget">Budget</Label>
            <Input
              id="budget"
              value={newProject.budget}
              onChange={(e) => setNewProject({...newProject, budget: e.target.value})}
              placeholder="e.g. $1.5M"
            />
          </div>
          <div>
            <Label htmlFor="risk">Risk Level</Label>
            <Select
              value={newProject.risk}
              onValueChange={(value) => setNewProject({...newProject, risk: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
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