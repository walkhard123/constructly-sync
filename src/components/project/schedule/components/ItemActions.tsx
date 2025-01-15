import { Button } from "@/components/ui/button";
import { FileText, MoreHorizontal, Plus, Trash2 } from "lucide-react";

interface ItemActionsProps {
  showActions: boolean;
  filesCount: number;
  onToggleActions: (e: React.MouseEvent) => void;
  onExpand: (e: React.MouseEvent) => void;
  onOpenFileDialog: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

export const ItemActions = ({
  showActions,
  filesCount,
  onToggleActions,
  onExpand,
  onOpenFileDialog,
  onDelete
}: ItemActionsProps) => {
  return (
    <div className="flex items-center gap-1">
      {showActions && (
        <div className="flex gap-1 animate-fade-in">
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onExpand}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenFileDialog}
            className={`h-8 w-8 p-0 ${filesCount > 0 ? 'text-purple-600' : ''}`}
          >
            <FileText className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={onToggleActions}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
};