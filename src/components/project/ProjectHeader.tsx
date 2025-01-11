import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface ProjectHeaderProps {
  onOpenProjectDialog: () => void;
  onSearch: (query: string) => void;
}

export const ProjectHeader = ({ 
  onOpenProjectDialog,
  onSearch
}: ProjectHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex-1 w-full sm:w-auto">
        <Input
          placeholder="Search projects..."
          onChange={(e) => onSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Button onClick={onOpenProjectDialog}>
        <Plus className="w-4 h-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
};