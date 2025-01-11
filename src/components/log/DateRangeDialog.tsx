import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addMonths, subMonths } from "date-fns";

interface DateRangeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDateRangeSelect: (range: DateRange | undefined) => void;
}

export const DateRangeDialog = ({ isOpen, onClose, onDateRangeSelect }: DateRangeDialogProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const today = new Date();
  const defaultMonth = subMonths(today, 1); // Set default to previous month

  const handleSelect = () => {
    onDateRangeSelect(dateRange);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-background">
        <DialogHeader>
          <DialogTitle>Select Date Range</DialogTitle>
        </DialogHeader>
        <div className="py-4 bg-background">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            defaultMonth={defaultMonth}
            className="rounded-md border bg-background"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSelect}>Apply</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};