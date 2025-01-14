import { LogEntry } from "../../types/log";
import { isWithinInterval, parseISO } from "date-fns";
import { DateRange } from "react-day-picker";

interface UseLogFiltersProps {
  logs: LogEntry[];
  selectedTeamMember: string;
  dateRange: DateRange | undefined;
}

export const useLogFilters = ({
  logs,
  selectedTeamMember,
  dateRange
}: UseLogFiltersProps) => {
  const filteredLogs = logs.filter(log => {
    let passes = true;

    if (selectedTeamMember) {
      passes = passes && log.tags.includes(selectedTeamMember);
    }

    if (dateRange?.from && dateRange?.to) {
      const logDate = parseISO(log.date);
      passes = passes && isWithinInterval(logDate, {
        start: dateRange.from,
        end: dateRange.to
      });
    }

    return passes;
  });

  return {
    filteredLogs
  };
};