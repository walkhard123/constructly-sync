import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ProjectSelectProps {
  value?: string;
  projects: string[];
  onChange: (value: string) => void;
}

export const ProjectSelect = ({ value, projects, onChange }: ProjectSelectProps) => {
  return (
    <div>
      <Label>Project</Label>
      <Select onValueChange={onChange} defaultValue={value}>
        <SelectTrigger>
          <SelectValue placeholder="Select project" />
        </SelectTrigger>
        <SelectContent>
          {projects.map((project) => (
            <SelectItem key={project} value={project}>{project}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};