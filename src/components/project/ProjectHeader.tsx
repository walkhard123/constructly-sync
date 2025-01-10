import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListTodo, Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface ProjectHeaderProps {
  onOpenTaskDialog: () => void;
  onOpenProjectDialog: () => void;
  onSearch: (query: string) => void;
}

export const ProjectHeader = ({ onOpenTaskDialog, onOpenProjectDialog, onSearch }: ProjectHeaderProps) => {
  return (
    <div className="flex justify-between items-center gap-4 flex-wrap">
      <div className="flex gap-2 flex-1">
        <Input 
          placeholder="Search projects..." 
          className="max-w-sm"
          type="search"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="bg-purple-100 hover:bg-purple-200"
              onClick={onOpenTaskDialog}
            >
              <ListTodo className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </DialogTrigger>
        </Dialog>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={onOpenProjectDialog}
        >
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>
    </div>
  );
};