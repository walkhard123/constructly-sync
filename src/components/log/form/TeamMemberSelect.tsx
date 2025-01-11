import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface TeamMemberSelectProps {
  teamMembers: string[];
  onSelect: (value: string) => void;
}

export const TeamMemberSelect = ({ teamMembers, onSelect }: TeamMemberSelectProps) => {
  return (
    <div>
      <Label>Team Member</Label>
      <Select onValueChange={onSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select team member" />
        </SelectTrigger>
        <SelectContent>
          {teamMembers.map((member) => (
            <SelectItem key={member} value={member}>
              {member.replace('@', '')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};