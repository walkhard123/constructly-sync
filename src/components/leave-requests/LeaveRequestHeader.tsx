import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface LeaveRequestHeaderProps {
  onOpenDialog: () => void;
}

export const LeaveRequestHeader = ({ onOpenDialog }: LeaveRequestHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold tracking-tight">Leave Requests</h2>
      <Button 
        className="bg-purple-600 hover:bg-purple-700"
        onClick={onOpenDialog}
      >
        <Plus className="mr-2 h-4 w-4" /> New Leave Request
      </Button>
    </div>
  );
};