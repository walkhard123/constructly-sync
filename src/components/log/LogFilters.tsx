import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { DateRangeDialog } from "./DateRangeDialog";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface LogFiltersProps {
  teamMembers: string[];
  onTeamMemberFilter: (member: string) => void;
  onDateRangeFilter: (range: DateRange | undefined) => void;
}

export const LogFilters = ({ teamMembers, onTeamMemberFilter, onDateRangeFilter }: LogFiltersProps) => {
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);

  return (
    <div className="flex gap-2 flex-1">
      <Input 
        placeholder="Search logs..." 
        className="max-w-sm"
        type="search"
      />
      <Button 
        variant="outline"
        onClick={() => setIsDateRangeOpen(true)}
      >
        <Calendar className="w-4 h-4 mr-2" />
        Date Range
      </Button>
      <Select onValueChange={(value) => onTeamMemberFilter(value === "all" ? "" : value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by member" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Members</SelectItem>
          {teamMembers.map((member) => (
            <SelectItem key={member} value={member}>
              {member}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <DateRangeDialog
        isOpen={isDateRangeOpen}
        onClose={() => setIsDateRangeOpen(false)}
        onDateRangeSelect={onDateRangeFilter}
      />
    </div>
  );
};