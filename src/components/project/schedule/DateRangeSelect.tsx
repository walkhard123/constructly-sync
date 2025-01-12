import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DateRangeSelectProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  onDurationChange: (duration: number) => void;
}

export const DateRangeSelect = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onDurationChange
}: DateRangeSelectProps) => {
  const formatDate = (date: Date) => {
    return format(date, "dd/MM/yy");
  };

  const displayText = () => {
    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
    return "Select dates";
  };

  const calculateDuration = (start: Date, end: Date) => {
    let duration = 0;
    let currentDate = new Date(start);
    
    while (currentDate <= end) {
      if (currentDate.getDay() !== 0) { // Skip Sundays
        duration++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return duration;
  };

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    
    date.setHours(0, 0, 0, 0);

    if (!startDate || (startDate && endDate)) {
      onStartDateChange(date);
      onEndDateChange(undefined);
    } else {
      if (date < startDate) {
        onEndDateChange(startDate);
        onStartDateChange(date);
      } else {
        onEndDateChange(date);
      }
      const duration = calculateDuration(startDate, date);
      onDurationChange(duration);
    }
  };

  return (
    <div className="flex">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !startDate && !endDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {displayText()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="start">
          <div>
            <p className="mb-2 text-sm font-medium">
              {!startDate ? "Select start date" : !endDate ? "Select end date" : "Select date range"}
            </p>
            <Calendar
              mode="single"
              selected={endDate || startDate}
              onSelect={handleSelect}
              numberOfMonths={1}
              initialFocus
              className="rounded-md border"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};