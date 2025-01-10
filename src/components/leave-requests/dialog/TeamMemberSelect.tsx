import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TeamMemberSelectProps {
  value: string;
  onChange: (value: string) => void;
  teamMembers: { id: number; name: string; }[];
}

export const TeamMemberSelect = ({ value, onChange, teamMembers }: TeamMemberSelectProps) => {
  return (
    <div>
      <Label>Team Member</Label>
      <Select onValueChange={(value) => onChange(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select team member" />
        </SelectTrigger>
        <SelectContent>
          {teamMembers.map((member) => (
            <SelectItem key={member.id} value={member.name}>
              {member.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};