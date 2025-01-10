import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TeamMemberSelectProps {
  teamMember: string;
  onTeamMemberChange: (value: string) => void;
}

export const TeamMemberSelect = ({
  teamMember,
  onTeamMemberChange,
}: TeamMemberSelectProps) => {
  const teamMembers = [
    { id: 1, name: "John Smith" },
    { id: 2, name: "Sarah Johnson" },
    { id: 3, name: "Mike Williams" }
  ];

  return (
    <div>
      <Label htmlFor="teamMember">Assigned Team Member</Label>
      <Select
        value={teamMember}
        onValueChange={onTeamMemberChange}
      >
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