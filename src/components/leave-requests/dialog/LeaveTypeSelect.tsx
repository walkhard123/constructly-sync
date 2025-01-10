import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LeaveTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const LeaveTypeSelect = ({ value, onChange }: LeaveTypeSelectProps) => {
  return (
    <div>
      <Label>Leave Type</Label>
      <Select onValueChange={(value) => onChange(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select leave type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Annual Leave">Annual Leave</SelectItem>
          <SelectItem value="Sick Leave">Sick Leave</SelectItem>
          <SelectItem value="Personal Leave">Personal Leave</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};