import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProjectDatesProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
}

export const ProjectDates = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: ProjectDatesProps) => {
  return (
    <>
      <div>
        <Label htmlFor="startDate">Start Date</Label>
        <Input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="endDate">End Date</Label>
        <Input
          id="endDate"
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
        />
      </div>
    </>
  );
};