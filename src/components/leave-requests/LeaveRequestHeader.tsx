import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Plus } from "lucide-react";

interface LeaveRequestHeaderProps {
  onOpenDialog: () => void;
}

export const LeaveRequestHeader = ({ onOpenDialog }: LeaveRequestHeaderProps) => {
  return (
    <div className="flex justify-between items-center gap-4 flex-wrap">
      <div className="flex gap-2 flex-1">
        <Input 
          placeholder="Search requests..." 
          className="max-w-sm"
          type="search"
        />
        <Button variant="outline">
          <CalendarIcon className="w-4 h-4 mr-2" />
          Filter by Date
        </Button>
      </div>
      <Button className="bg-purple-600 hover:bg-purple-700" onClick={onOpenDialog}>
        <Plus className="mr-2 h-4 w-4" /> New Leave Request
      </Button>
    </div>
  );
};