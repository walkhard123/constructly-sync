import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tag } from "lucide-react";
import { LogEntry } from "../types/log";

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
  return (
    <div className="space-y-4">
      <div>
        <Label>Project</Label>
        <Select 
          onValueChange={(value) => setNewLog({...newLog, project: value})}
          defaultValue={editingLog?.project || newLog.project}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project} value={project}>{project}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Start Time</Label>
          <Input
            type="time"
            value={editingLog ? editingLog.startTime : newLog.startTime}
            onChange={(e) => setNewLog({...newLog, startTime: e.target.value})}
          />
        </div>
        <div>
          <Label>End Time</Label>
          <Input
            type="time"
            value={editingLog ? editingLog.endTime : newLog.endTime}
            onChange={(e) => setNewLog({...newLog, endTime: e.target.value})}
          />
        </div>
      </div>
      <div>
        <Label>Activities</Label>
        <Textarea
          value={editingLog ? editingLog.activities : newLog.activities}
          onChange={(e) => setNewLog({...newLog, activities: e.target.value})}
          placeholder="Describe today's activities..."
        />
      </div>
      <div>
        <Label>Deliveries</Label>
        <Textarea
          value={editingLog ? editingLog.deliveries : newLog.deliveries}
          onChange={(e) => setNewLog({...newLog, deliveries: e.target.value})}
          placeholder="List any deliveries received or ordered..."
        />
      </div>
      <div>
        <Label>Tag Team Members</Label>
        <Select 
          onValueChange={(value) => {
            const currentTags = Array.isArray(newLog.tags) ? newLog.tags : [];
            setNewLog({
              ...newLog,
              tags: [...currentTags, value]
            });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select team members" />
          </SelectTrigger>
          <SelectContent>
            {teamMembers.map((member) => (
              <SelectItem key={member} value={member}>{member}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {((editingLog?.tags && editingLog.tags.length > 0) || 
          (Array.isArray(newLog.tags) && newLog.tags.length > 0)) && (
          <div className="mt-2 flex flex-wrap gap-2">
            {(editingLog ? editingLog.tags : newLog.tags).map((tag, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div>
        <Label>Upload Photos</Label>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={handlePhotoUpload}
          className="mt-1"
        />
        {((editingLog?.photos && editingLog.photos.length > 0) || newLog.photos?.length > 0) && (
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(editingLog ? editingLog.photos : newLog.photos).map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Upload preview ${index + 1}`}
                className="w-full h-24 object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>
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