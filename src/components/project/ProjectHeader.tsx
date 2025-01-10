import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileEdit, ListTodo, Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface ProjectHeaderProps {
  onOpenTaskDialog: () => void;
}

export const ProjectHeader = ({ onOpenTaskDialog }: ProjectHeaderProps) => {
  return (
    <div className="flex justify-between items-center gap-4 flex-wrap">
      <div className="flex gap-2 flex-1">
        <Input 
          placeholder="Search projects..." 
          className="max-w-sm"
          type="search"
        />
        <Button variant="outline">
          <FileEdit className="w-4 h-4 mr-2" />
          Filter
        </Button>
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
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>
    </div>
  );
};