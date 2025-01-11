import { Pencil, Trash } from "lucide-react";

interface TaskActionsProps {
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

export const TaskActions = ({ onEdit, onDelete }: TaskActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onEdit}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Pencil className="w-4 h-4 text-gray-500" />
      </button>
      <button
        onClick={onDelete}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Trash className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
};