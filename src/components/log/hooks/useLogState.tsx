import { useState } from "react";
import { LogEntry } from "../../types/log";
import { DateRange } from "react-day-picker";

export const useLogState = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 1,
      project: "Downtown Office Building",
      date: "2024-03-20",
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      activities: "Completed foundation inspection, started electrical work",
      deliveries: "Received steel beams, ordered concrete",
      attachments: 2,
      tags: ["@JohnDoe", "@SarahSmith"],
      photos: []
    }
  ]);

  const [newLog, setNewLog] = useState<Partial<LogEntry>>({
    project: "",
    activities: "",
    deliveries: "",
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    tags: [],
    photos: []
  });

  const [editingLog, setEditingLog] = useState<LogEntry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return {
    logs,
    setLogs,
    newLog,
    setNewLog,
    editingLog,
    setEditingLog,
    isDialogOpen,
    setIsDialogOpen,
    selectedTeamMember,
    setSelectedTeamMember,
    dateRange,
    setDateRange
  };
};