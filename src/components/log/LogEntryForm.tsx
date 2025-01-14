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
    const updatedTags = (newLog.tags || []).filter(tag => tag !== tagToRemove);
    setNewLog({ ...newLog, tags: updatedTags });
  };

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto px-4">
      <div className="space-y-4">
        <ProjectSelect
          value={newLog.project || ""}
          projects={projects}
          onChange={(value) => setNewLog({ ...newLog, project: value })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DateSelect
            value={newLog.startTime || new Date().toISOString()}
            onChange={(date) => setNewLog({ ...newLog, startTime: date })}
          />
          <TeamMemberSelect
            teamMembers={teamMembers}
            onSelect={(value) => {
              const currentTags = Array.isArray(newLog.tags) ? newLog.tags : [];
              if (!currentTags.includes(value)) {
                setNewLog({ ...newLog, tags: [...currentTags, value] });
              }
            }}
          />
        </div>

        <div className="space-y-2">
          <Label>Activities</Label>
          <Textarea
            value={newLog.activities || ""}
            onChange={(e) => setNewLog({ ...newLog, activities: e.target.value })}
            placeholder="Describe today's activities..."
            className="min-h-[100px] resize-y"
          />
        </div>

        <div className="space-y-2">
          <Label>Deliveries</Label>
          <Textarea
            value={newLog.deliveries || ""}
            onChange={(e) => setNewLog({ ...newLog, deliveries: e.target.value })}
            placeholder="List any deliveries received or ordered..."
            className="min-h-[100px] resize-y"
          />
        </div>

        <TeamMemberTags
          tags={newLog.tags || []}
          onRemoveTag={handleRemoveTag}
        />

        <PhotoUpload
          onPhotoUpload={handlePhotoUpload}
          photos={newLog.photos || []}
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