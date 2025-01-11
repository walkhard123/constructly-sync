import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LogEntry } from "../types/log";
import { ProjectSelect } from "./form/ProjectSelect";
import { DateSelect } from "./form/DateSelect";
import { TeamMemberSelect } from "./form/TeamMemberSelect";
import { TeamMemberTags } from "./form/TeamMemberTags";
import { PhotoUpload } from "./form/PhotoUpload";

interface LogEntryFormProps {
  editingLog: LogEntry | null;
  newLog: Partial<LogEntry>;
  setNewLog: (log: Partial<LogEntry>) => void;
  projects: string[];
  teamMembers: string[];
  handlePhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onSave: () => void;
}

export const LogEntryForm = ({
  editingLog,
  newLog,
  setNewLog,
  projects,
  teamMembers,
  handlePhotoUpload,
  onCancel,
  onSave
}: LogEntryFormProps) => {
  const handleRemoveTag = (tagToRemove: string) => {
    if (editingLog) {
      const updatedTags = editingLog.tags.filter(tag => tag !== tagToRemove);
      setNewLog({ ...editingLog, tags: updatedTags });
    } else {
      const currentTags = Array.isArray(newLog.tags) ? newLog.tags : [];
      const updatedTags = currentTags.filter(tag => tag !== tagToRemove);
      setNewLog({ ...newLog, tags: updatedTags });
    }
  };

  return (
    <div className="space-y-4">
      <ProjectSelect
        value={editingLog?.project || newLog.project}
        projects={projects}
        onChange={(value) => setNewLog(editingLog ? {...editingLog, project: value} : {...newLog, project: value})}
      />

      <div className="grid grid-cols-2 gap-4">
        <DateSelect
          value={editingLog?.startTime || newLog.startTime}
          onChange={(date) => setNewLog(editingLog ? {...editingLog, startTime: date} : {...newLog, startTime: date})}
        />
        <TeamMemberSelect
          teamMembers={teamMembers}
          onSelect={(value) => {
            const currentTags = Array.isArray(editingLog ? editingLog.tags : newLog.tags) ? 
              (editingLog ? editingLog.tags : newLog.tags) : [];
            if (!currentTags.includes(value)) {
              setNewLog(editingLog ? 
                {...editingLog, tags: [...currentTags, value]} : 
                {...newLog, tags: [...currentTags, value]}
              );
            }
          }}
        />
      </div>

      <div>
        <Label>Activities</Label>
        <Textarea
          value={editingLog ? editingLog.activities : newLog.activities}
          onChange={(e) => setNewLog(editingLog ? {...editingLog, activities: e.target.value} : {...newLog, activities: e.target.value})}
          placeholder="Describe today's activities..."
        />
      </div>

      <div>
        <Label>Deliveries</Label>
        <Textarea
          value={editingLog ? editingLog.deliveries : newLog.deliveries}
          onChange={(e) => setNewLog(editingLog ? {...editingLog, deliveries: e.target.value} : {...newLog, deliveries: e.target.value})}
          placeholder="List any deliveries received or ordered..."
        />
      </div>

      <TeamMemberTags
        tags={editingLog ? editingLog.tags : newLog.tags || []}
        onRemoveTag={handleRemoveTag}
      />

      <PhotoUpload
        onPhotoUpload={handlePhotoUpload}
        photos={editingLog ? editingLog.photos : newLog.photos}
      />

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave}>
          {editingLog ? 'Save Changes' : 'Add Log'}
        </Button>
      </div>
    </div>
  );
};