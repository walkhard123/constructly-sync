import { Input } from "@/components/ui/input";
import { DurationInput } from "./DurationInput";
import { DateRangeSelect } from "../DateRangeSelect";
import { StatusSelect } from "./StatusSelect";
import { useIsMobile } from "@/hooks/use-mobile";

interface ItemFieldsProps {
  title: string;
  contractor: string;
  duration?: number;
  startDate?: string;
  endDate?: string;
  status: "stuck" | "done" | "in-progress";
  onTitleChange: (value: string) => void;
  onContractorChange: (value: string) => void;
  onDurationChange: (value: number) => void;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  onStatusChange: (value: "stuck" | "done" | "in-progress") => void;
}

export const ItemFields = ({
  title,
  contractor,
  duration,
  startDate,
  endDate,
  status,
  onTitleChange,
  onContractorChange,
  onDurationChange,
  onStartDateChange,
  onEndDateChange,
  onStatusChange
}: ItemFieldsProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      <Input
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="h-8"
        placeholder="Enter item"
      />

      {isMobile && <div className="text-xs text-gray-500">Contractor</div>}
      <Input
        value={contractor}
        onChange={(e) => onContractorChange(e.target.value)}
        className="h-8"
        placeholder="Enter contractor"
      />

      {isMobile && <div className="text-xs text-gray-500">Duration (days)</div>}
      <DurationInput
        duration={duration}
        onDurationChange={onDurationChange}
      />

      {isMobile && <div className="text-xs text-gray-500">Timeline</div>}
      <DateRangeSelect
        startDate={startDate ? new Date(startDate) : undefined}
        endDate={endDate ? new Date(endDate) : undefined}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        onDurationChange={onDurationChange}
      />

      {isMobile && <div className="text-xs text-gray-500">Status</div>}
      <StatusSelect
        status={status}
        onStatusChange={onStatusChange}
      />
    </>
  );
};