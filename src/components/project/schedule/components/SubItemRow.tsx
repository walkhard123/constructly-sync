import { Input } from "@/components/ui/input";
import { Check, Circle } from "lucide-react";
import { SubScheduleItem } from "../types";
import { DateRangeSelect } from "../DateRangeSelect";
import { DurationInput } from "./DurationInput";
import { StatusSelect } from "./StatusSelect";
import { calculateDuration, calculateEndDate } from "@/utils/dateCalculations";

interface SubItemRowProps {
  subItem: SubScheduleItem;
  onToggle: () => void;
  onUpdate: (field: keyof SubScheduleItem, value: any) => void;
}

export const SubItemRow = ({ subItem, onToggle, onUpdate }: SubItemRowProps) => {
  const handleSubItemUpdate = (field: keyof SubScheduleItem, value: any) => {
    if (field === 'duration') {
      if (subItem.startDate) {
        const startDate = new Date(subItem.startDate);
        const endDate = calculateEndDate(startDate, value);
        onUpdate('endDate', endDate.toISOString());
      }
    } else if (field === 'startDate' || field === 'endDate') {
      const start = field === 'startDate' ? value : subItem.startDate;
      const end = field === 'endDate' ? value : subItem.endDate;
      
      if (start && end) {
        const duration = calculateDuration(new Date(start), new Date(end));
        onUpdate('duration', duration);
      }
    }
    onUpdate(field, value);
  };

  return (
    <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-2 pl-12 items-center bg-gray-50/50 rounded-sm py-1">
      <div className="flex items-center gap-2">
        <button
          onClick={onToggle}
          className="hover:scale-110 transition-transform"
        >
          {subItem.completed ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Circle className="h-4 w-4 text-gray-400" />
          )}
        </button>
        <span className={`text-sm ${subItem.completed ? 'line-through text-gray-500' : ''}`}>
          {subItem.title}
        </span>
      </div>
      <Input
        value={subItem.contractor || ''}
        onChange={(e) => handleSubItemUpdate('contractor', e.target.value)}
        placeholder="Contractor"
        className="h-8"
      />
      <DurationInput
        duration={subItem.duration}
        onDurationChange={(value) => handleSubItemUpdate('duration', value)}
      />
      <DateRangeSelect
        startDate={subItem.startDate ? new Date(subItem.startDate) : undefined}
        endDate={subItem.endDate ? new Date(subItem.endDate) : undefined}
        onStartDateChange={(date) => handleSubItemUpdate('startDate', date?.toISOString())}
        onEndDateChange={(date) => handleSubItemUpdate('endDate', date?.toISOString())}
        onDurationChange={(duration) => handleSubItemUpdate('duration', duration)}
      />
      <StatusSelect
        status={subItem.status || "in-progress"}
        onStatusChange={(value) => handleSubItemUpdate('status', value)}
      />
    </div>
  );
};