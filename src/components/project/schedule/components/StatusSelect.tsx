import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScheduleItem } from "../types";

interface StatusSelectProps {
  status: ScheduleItem['status'];
  onStatusChange: (value: ScheduleItem['status']) => void;
  disabled?: boolean;
}

export const StatusSelect = ({ status, onStatusChange, disabled }: StatusSelectProps) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'done':
        return 'bg-[#F2FCE2] text-green-700';
      case 'stuck':
        return 'bg-[#FFDEE2] text-red-700';
      case 'in-progress':
        return 'bg-[#FEF7CD] text-yellow-700';
      default:
        return '';
    }
  };

  return (
    <Select value={status} onValueChange={onStatusChange} disabled={disabled}>
      <SelectTrigger className={`h-8 ${getStatusStyle(status)}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="stuck">Stuck</SelectItem>
        <SelectItem value="done">Done</SelectItem>
        <SelectItem value="in-progress">In Progress</SelectItem>
      </SelectContent>
    </Select>
  );
};