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
    return format(date, "MMM dd, yyyy");
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

  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      // Set time to midnight for consistent comparison
      date.setHours(0, 0, 0, 0);
    }
    onStartDateChange(date);
    if (date && endDate) {
      const duration = calculateDuration(date, endDate);
      onDurationChange(duration);
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    if (date) {
      // Set time to midnight for consistent comparison
      date.setHours(0, 0, 0, 0);
    }
    onEndDateChange(date);
    if (startDate && date) {
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
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex gap-2 p-3">
            <div>
              <p className="mb-2 text-sm font-medium">Start Date</p>
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={handleStartDateChange}
                numberOfMonths={1}
                initialFocus
                className="rounded-md border"
              />
            </div>
            <div className="border-l" />
            <div>
              <p className="mb-2 text-sm font-medium">End Date</p>
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={handleEndDateChange}
                numberOfMonths={1}
                disabled={(date) => startDate ? date < startDate : false}
                initialFocus
                className="rounded-md border"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};