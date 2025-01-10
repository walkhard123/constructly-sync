import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProjectDescriptionProps {
  description: string;
  onDescriptionChange: (value: string) => void;
}

export const ProjectDescription = ({
  description,
  onDescriptionChange,
}: ProjectDescriptionProps) => {
  return (
    <div className="col-span-2">
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        className="h-32"
      />
    </div>
  );
};