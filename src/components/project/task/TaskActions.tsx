import { Button } from "@/components/ui/button";
import { FileEdit, Trash2 } from "lucide-react";

interface TaskActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const TaskActions = ({ onEdit, onDelete }: TaskActionsProps) => {
  return (
    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
      <Button
        variant="ghost"
        size="sm"
        onClick={onEdit}
      >
        <FileEdit className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onDelete}
        className="text-red-500 hover:text-red-600"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};