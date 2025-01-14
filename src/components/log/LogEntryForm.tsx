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
    const currentLog = editingLog || newLog;
    const currentTags = Array.isArray(currentLog.tags) ? currentLog.tags : [];
    const updatedTags = currentTags.filter(tag => tag !== tagToRemove);
    
    if (editingLog) {
      setNewLog({ ...editingLog, tags: updatedTags });
    } else {
      setNewLog({ ...currentLog, tags: updatedTags });
    }
  };

  const currentLog = editingLog || newLog;

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto px-4">
      <div className="space-y-4">
        <ProjectSelect
          value={currentLog.project || ""}
          projects={projects}
          onChange={(value) => setNewLog({ ...currentLog, project: value })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DateSelect
            value={currentLog.startTime || new Date().toISOString()}
            onChange={(date) => setNewLog({ ...currentLog, startTime: date })}
          />
          <TeamMemberSelect
            teamMembers={teamMembers}
            onSelect={(value) => {
              const currentTags = Array.isArray(currentLog.tags) ? currentLog.tags : [];
              if (!currentTags.includes(value)) {
                setNewLog({ ...currentLog, tags: [...currentTags, value] });
              }
            }}
          />
        </div>

        <div className="space-y-2">
          <Label>Activities</Label>
          <Textarea
            value={currentLog.activities || ""}
            onChange={(e) => setNewLog({ ...currentLog, activities: e.target.value })}
            placeholder="Describe today's activities..."
            className="min-h-[100px] resize-y"
          />
        </div>

        <div className="space-y-2">
          <Label>Deliveries</Label>
          <Textarea
            value={currentLog.deliveries || ""}
            onChange={(e) => setNewLog({ ...currentLog, deliveries: e.target.value })}
            placeholder="List any deliveries received or ordered..."
            className="min-h-[100px] resize-y"
          />
        </div>

        <TeamMemberTags
          tags={currentLog.tags || []}
          onRemoveTag={handleRemoveTag}
        />

        <PhotoUpload
          onPhotoUpload={handlePhotoUpload}
          photos={currentLog.photos || []}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            {editingLog ? 'Save Changes' : 'Add Log'}
          </Button>
        </div>
      </div>
    </div>
  );
};