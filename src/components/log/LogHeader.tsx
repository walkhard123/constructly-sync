import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { LogFilters } from "./LogFilters";
import { DateRange } from "react-day-picker";

interface LogHeaderProps {
  onAddNew: () => void;
  teamMembers: string[];
  onTeamMemberFilter: (member: string) => void;
  onDateRangeFilter: (range: DateRange | undefined) => void;
}

export const LogHeader = ({ 
  onAddNew, 
  teamMembers, 
  onTeamMemberFilter,
  onDateRangeFilter 
}: LogHeaderProps) => {
  return (
    <div className="flex justify-between items-center gap-4 flex-wrap">
      <LogFilters 
        teamMembers={teamMembers}
        onTeamMemberFilter={onTeamMemberFilter}
        onDateRangeFilter={onDateRangeFilter}
      />
      <Button 
        className="bg-purple-600 hover:bg-purple-700"
        onClick={onAddNew}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Log Entry
      </Button>
    </div>
  );
};