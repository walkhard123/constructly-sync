import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LogEntry } from "./types/log";
import { LogEntryForm } from "./log/LogEntryForm";
import { LogEntryCard } from "./log/LogEntryCard";
import { LogHeader } from "./log/LogHeader";
import { useLogState } from "./log/hooks/useLogState";
import { useLogActions } from "./log/hooks/useLogActions";
import { useLogFilters } from "./log/hooks/useLogFilters";

export const DailyLogs = () => {
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

  const {
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
  } = useLogState();

  const {
    handlePhotoUpload,
    handleEditLog,
    handleSaveEdit,
    handleAddLog,
    resetNewLog
  } = useLogActions({
    logs,
    setLogs,
    newLog,
    setNewLog,
    editingLog,
    setEditingLog,
    setIsDialogOpen
  });

  const { filteredLogs } = useLogFilters({
    logs,
    selectedTeamMember,
    dateRange
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <LogHeader 
        onAddNew={() => {
          setEditingLog(null);
          resetNewLog();
          setIsDialogOpen(true);
        }}
        teamMembers={teamMembers}
        onTeamMemberFilter={setSelectedTeamMember}
        onDateRangeFilter={setDateRange}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
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
              resetNewLog();
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