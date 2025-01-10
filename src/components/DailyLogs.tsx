import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, FileText, Image, Plus, Tag, Clock, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const DailyLogs = () => {
  const { toast } = useToast();
  const [logs, setLogs] = useState([
    {
      id: 1,
      project: "Downtown Office Building",
      date: "2024-03-20",
      startTime: "08:00",
      endTime: "17:00",
      activities: "Completed foundation inspection, started electrical work",
      deliveries: "Received steel beams, ordered concrete",
      attachments: 2,
      tags: ["@JohnDoe", "@SarahSmith"],
      photos: []
    }
  ]);

  const [newLog, setNewLog] = useState({
    project: "",
    activities: "",
    deliveries: "",
    startTime: "",
    endTime: "",
    tags: [],
    photos: []
  });

  const [editingLog, setEditingLog] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
          photos: [...prev.photos, ...newPhotos]
        }));
      }
    }
  };

  const handleEditLog = (log) => {
    setEditingLog(log);
    setIsDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingLog.project || !editingLog.activities) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLogs(prevLogs => 
      prevLogs.map(log => 
        log.id === editingLog.id ? { ...editingLog } : log
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

    setLogs([...logs, {
      id: logs.length + 1,
      ...newLog,
      date: new Date().toISOString().split('T')[0],
      attachments: newLog.photos.length,
      tags: Array.isArray(newLog.tags) ? newLog.tags : [newLog.tags]
    }]);

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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex gap-2 flex-1">
          <Input 
            placeholder="Search logs..." 
            className="max-w-sm"
            type="search"
          />
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => {
              setEditingLog(null);
              setNewLog({
                project: "",
                activities: "",
                deliveries: "",
                startTime: "",
                endTime: "",
                tags: [],
                photos: []
              });
            }}>
              <Plus className="mr-2 h-4 w-4" /> Add Log Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingLog ? 'Edit Log Entry' : 'Add Daily Log Entry'}</DialogTitle>
              <DialogDescription>
                {editingLog ? 'Update your log entry details' : 'Record your daily activities and project updates'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Project</Label>
                <Select 
                  onValueChange={(value) => editingLog ? setEditingLog({...editingLog, project: value}) : setNewLog({...newLog, project: value})}
                  defaultValue={editingLog?.project}
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
                    onChange={(e) => editingLog ? 
                      setEditingLog({...editingLog, startTime: e.target.value}) : 
                      setNewLog({...newLog, startTime: e.target.value})}
                  />
                </div>
                <div>
                  <Label>End Time</Label>
                  <Input
                    type="time"
                    value={editingLog ? editingLog.endTime : newLog.endTime}
                    onChange={(e) => editingLog ? 
                      setEditingLog({...editingLog, endTime: e.target.value}) : 
                      setNewLog({...newLog, endTime: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label>Activities</Label>
                <Textarea
                  value={editingLog ? editingLog.activities : newLog.activities}
                  onChange={(e) => editingLog ? 
                    setEditingLog({...editingLog, activities: e.target.value}) : 
                    setNewLog({...newLog, activities: e.target.value})}
                  placeholder="Describe today's activities..."
                />
              </div>
              <div>
                <Label>Deliveries</Label>
                <Textarea
                  value={editingLog ? editingLog.deliveries : newLog.deliveries}
                  onChange={(e) => editingLog ? 
                    setEditingLog({...editingLog, deliveries: e.target.value}) : 
                    setNewLog({...newLog, deliveries: e.target.value})}
                  placeholder="List any deliveries received or ordered..."
                />
              </div>
              <div>
                <Label>Tag Team Members</Label>
                <Select 
                  onValueChange={(value) => {
                    if (editingLog) {
                      setEditingLog({
                        ...editingLog,
                        tags: [...(Array.isArray(editingLog.tags) ? editingLog.tags : []), value]
                      });
                    } else {
                      setNewLog({
                        ...newLog,
                        tags: [...(Array.isArray(newLog.tags) ? newLog.tags : []), value]
                      });
                    }
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
                {((editingLog?.tags && Array.isArray(editingLog.tags) && editingLog.tags.length > 0) || 
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
                {((editingLog?.photos && editingLog.photos.length > 0) || newLog.photos.length > 0) && (
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
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setEditingLog(null);
                setIsDialogOpen(false);
              }}>
                Cancel
              </Button>
              <Button onClick={editingLog ? handleSaveEdit : handleAddLog}>
                {editingLog ? 'Save Changes' : 'Add Log'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {logs.map((log) => (
          <Card key={log.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{log.project}</CardTitle>
                  <CardDescription>{log.date}</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{log.startTime} - {log.endTime}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEditLog(log)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Activities</h4>
                  <p className="text-sm text-gray-600">{log.activities}</p>
                </div>
                {log.deliveries && (
                  <div>
                    <h4 className="font-medium mb-2">Deliveries</h4>
                    <p className="text-sm text-gray-600">{log.deliveries}</p>
                  </div>
                )}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex gap-2">
                    {log.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    <span>{log.attachments} files</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};