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
}

export const DateRangeSelect = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}: DateRangeSelectProps) => {
  const formatDate = (date: Date) => {
    return format(date, "dd/MM/yy");
  };

  const displayText = () => {
    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
    return "Select timeline";
  };

  return (
    <div className="flex w-[180px]">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal px-2",
              !startDate && !endDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-1 h-4 w-4" />
            {displayText()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-4 p-4" align="start">
          <div>
            <p className="mb-2 text-sm font-medium">Start Date</p>
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={onStartDateChange}
              initialFocus
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">End Date</p>
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={onEndDateChange}
              disabled={(date) => startDate ? date < startDate : false}
              initialFocus
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};