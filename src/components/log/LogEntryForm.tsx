import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tag, X } from "lucide-react";
import { LogEntry } from "../types/log";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
    const currentTags = Array.isArray(editingLog ? editingLog.tags : newLog.tags) ? 
      (editingLog ? editingLog.tags : newLog.tags) : [];
    const updatedTags = currentTags.filter(tag => tag !== tagToRemove);
    
    if (editingLog) {
      setNewLog({ ...editingLog, tags: updatedTags });
    } else {
      setNewLog({ ...newLog, tags: updatedTags });
    }
  };

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
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !newLog.startTime && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {newLog.startTime ? format(new Date(newLog.startTime), "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={newLog.startTime ? new Date(newLog.startTime) : undefined}
                onSelect={(date) => setNewLog({...newLog, startTime: date?.toISOString() || ""})}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label>Team Member</Label>
          <Select 
            onValueChange={(value) => {
              const currentTags = Array.isArray(newLog.tags) ? newLog.tags : [];
              if (!currentTags.includes(value)) {
                setNewLog({
                  ...newLog,
                  tags: [...currentTags, value]
                });
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select team member" />
            </SelectTrigger>
            <SelectContent>
              {teamMembers.map((member) => (
                <SelectItem key={member} value={member}>{member.replace('@', '')}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
      {((editingLog?.tags && editingLog.tags.length > 0) || 
        (Array.isArray(newLog.tags) && newLog.tags.length > 0)) && (
        <div className="mt-2 flex flex-wrap gap-2">
          {(editingLog ? editingLog.tags : newLog.tags).map((tag, index) => (
            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
              <Tag className="w-3 h-3 mr-1" />
              {tag.replace('@', '')}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 p-0.5 hover:bg-purple-200 rounded-full"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
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