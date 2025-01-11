import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { LogEntry } from "./types/log";
import { LogEntryForm } from "./log/LogEntryForm";
import { LogEntryCard } from "./log/LogEntryCard";
import { LogHeader } from "./log/LogHeader";
import { DateRange } from "react-day-picker";
import { isWithinInterval, parseISO } from "date-fns";

export const DailyLogs = () => {
  const { toast } = useToast();
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

  const [projects] = useState([
    "Downtown Office Building",
    "Residential Complex",
    "Commercial Plaza",
    "Industrial Park"
  ]);

  const [teamMembers] = useState([
    "@JohnDoe",
    "@SarahSmith",
    "@MikeWilson",
    "@EmilyBrown"
  ]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      if (editingLog) {
        setEditingLog({
          ...editingLog,
          photos: [...editingLog.photos, ...newPhotos]
        });
      } else {
        setNewLog(prev => ({
          ...prev,
          photos: [...(prev.photos || []), ...newPhotos]
        }));
      }
    }
  };

  const handleEditLog = (log: LogEntry) => {
    setEditingLog(log);
    setIsDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingLog?.project || !editingLog?.activities) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLogs(prevLogs => 
      prevLogs.map(log => 
        log.id === editingLog.id ? editingLog : log
      )
    );

    setEditingLog(null);
    setIsDialogOpen(false);

    toast({
      title: "Success",
      description: "Log entry updated successfully"
    });
  };

  const handleAddLog = () => {
    if (!newLog.project || !newLog.activities) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const logEntry: LogEntry = {
      id: logs.length + 1,
      date: new Date().toISOString().split('T')[0],
      attachments: newLog.photos?.length || 0,
      project: newLog.project,
      activities: newLog.activities,
      deliveries: newLog.deliveries || "",
      startTime: newLog.startTime || "",
      endTime: newLog.endTime || "",
      tags: Array.isArray(newLog.tags) ? newLog.tags : [],
      photos: newLog.photos || []
    };

    setLogs([...logs, logEntry]);
    setNewLog({
      project: "",
      activities: "",
      deliveries: "",
      startTime: "",
      endTime: "",
      tags: [],
      photos: []
    });
    setIsDialogOpen(false);

    toast({
      title: "Success",
      description: "Log entry added successfully"
    });
  };

  const filteredLogs = logs.filter(log => {
    let passes = true;

    // Filter by team member
    if (selectedTeamMember) {
      passes = passes && log.tags.includes(selectedTeamMember);
    }

    // Filter by date range
    if (dateRange?.from && dateRange?.to) {
      const logDate = parseISO(log.date);
      passes = passes && isWithinInterval(logDate, {
        start: dateRange.from,
        end: dateRange.to
      });
    }

    return passes;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <LogHeader 
        onAddNew={() => {
          setEditingLog(null);
          setNewLog({
            project: "",
            activities: "",
            deliveries: "",
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(),
            tags: [],
            photos: []
          });
          setIsDialogOpen(true);
        }}
        teamMembers={teamMembers}
        onTeamMemberFilter={setSelectedTeamMember}
        onDateRangeFilter={setDateRange}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingLog ? 'Edit Log Entry' : 'Add Daily Log Entry'}</DialogTitle>
            <DialogDescription>
              {editingLog ? 'Update your log entry details' : 'Record your daily activities and project updates'}
            </DialogDescription>
          </DialogHeader>
          <LogEntryForm
            editingLog={editingLog}
            newLog={newLog}
            setNewLog={setNewLog}
            projects={projects}
            teamMembers={teamMembers}
            handlePhotoUpload={handlePhotoUpload}
            onCancel={() => {
              setEditingLog(null);
              setIsDialogOpen(false);
            }}
            onSave={editingLog ? handleSaveEdit : handleAddLog}
          />
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <LogEntryCard
            key={log.id}
            log={log}
            onEdit={handleEditLog}
          />
        ))}
      </div>
    </div>
  );
};