import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Project } from "../../types/project";

interface ProjectStatusSelectProps {
  status: string;
  onStatusChange: (value: Project['status']) => void;
}

export const ProjectStatusSelect = ({
  status,
  onStatusChange,
}: ProjectStatusSelectProps) => {
  return (
    <div>
      <Label htmlFor="status">Project Status</Label>
      <Select
        value={status}
        onValueChange={(value) => onStatusChange(value as Project['status'])}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select project status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="upcoming">Upcoming</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};