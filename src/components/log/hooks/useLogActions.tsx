import { LogEntry } from "../../types/log";
import { useToast } from "@/hooks/use-toast";

interface UseLogActionsProps {
  logs: LogEntry[];
  setLogs: React.Dispatch<React.SetStateAction<LogEntry[]>>;
  newLog: Partial<LogEntry>;
  setNewLog: React.Dispatch<React.SetStateAction<Partial<LogEntry>>>;
  editingLog: LogEntry | null;
  setEditingLog: React.Dispatch<React.SetStateAction<LogEntry | null>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useLogActions = ({
  logs,
  setLogs,
  newLog,
  setNewLog,
  editingLog,
  setEditingLog,
  setIsDialogOpen
}: UseLogActionsProps) => {
  const { toast } = useToast();

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
    setNewLog(log);
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
        log.id === editingLog.id ? { ...editingLog, ...newLog } : log
      )
    );

    setEditingLog(null);
    setIsDialogOpen(false);
    resetNewLog();

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
    resetNewLog();
    setIsDialogOpen(false);

    toast({
      title: "Success",
      description: "Log entry added successfully"
    });
  };

  const resetNewLog = () => {
    setNewLog({
      project: "",
      activities: "",
      deliveries: "",
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      tags: [],
      photos: []
    });
  };

  return {
    handlePhotoUpload,
    handleEditLog,
    handleSaveEdit,
    handleAddLog,
    resetNewLog
  };
};