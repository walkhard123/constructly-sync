import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
          <DialogDescription>
            {editingProject ? 'Edit the project details below' : 'Fill in the project details below'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={newProject.name}
              onChange={(e) => setNewProject({...newProject, name: e.target.value})}
            />
          </div>
          
          <div className="col-span-2">
            <Label htmlFor="address">Project Address</Label>
            <Input
              id="address"
              value={newProject.address}
              onChange={(e) => setNewProject({...newProject, address: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="type">Project Type</Label>
            <Select
              value={newProject.type}
              onValueChange={(value) => setNewProject({...newProject, type: value as Project['type']})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="duplex">Duplex</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="teamMember">Assigned Team Member</Label>
            <Input
              id="teamMember"
              value={newProject.teamMember}
              onChange={(e) => setNewProject({...newProject, teamMember: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={newProject.startDate}
              onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={newProject.endDate}
              onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newProject.description}
              onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              className="h-32"
            />
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