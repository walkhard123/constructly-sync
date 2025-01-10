import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Project } from "../../types/project";

interface ProjectTypeSelectProps {
  type: string;
  onTypeChange: (value: Project['type']) => void;
}

export const ProjectTypeSelect = ({
  type,
  onTypeChange,
}: ProjectTypeSelectProps) => {
  return (
    <div>
      <Label htmlFor="type">Project Type</Label>
      <Select
        value={type}
        onValueChange={(value) => onTypeChange(value as Project['type'])}
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
  );
};