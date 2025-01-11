import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LogHeaderProps {
  onAddNew: () => void;
  teamMembers: string[];
  onTeamMemberFilter: (member: string) => void;
}

export const LogHeader = ({ onAddNew, teamMembers, onTeamMemberFilter }: LogHeaderProps) => {
  return (
    <div className="flex justify-between items-center gap-4 flex-wrap">
      <div className="flex gap-2 flex-1">
        <Input 
          placeholder="Search logs..." 
          className="max-w-sm"
          type="search"
        />
        <Button variant="outline">
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
      </div>
      <Button 
        className="bg-purple-600 hover:bg-purple-700"
        onClick={onAddNew}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Log Entry
      </Button>
    </div>
  );
};