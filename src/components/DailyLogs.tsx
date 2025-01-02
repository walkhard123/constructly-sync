import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, FileText, Image, Plus, Tag, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export const DailyLogs = () => {
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
      tags: ["@JohnDoe", "@SarahSmith"]
    }
  ]);

  const [newLog, setNewLog] = useState({
    project: "",
    activities: "",
    deliveries: "",
    startTime: "",
    endTime: "",
    tags: ""
  });

  const handleAddLog = () => {
    if (newLog.project && newLog.activities) {
      setLogs([...logs, {
        id: logs.length + 1,
        ...newLog,
        date: new Date().toISOString().split('T')[0],
        attachments: 0,
        tags: newLog.tags.split(',').map(tag => tag.trim())
      }]);
      setNewLog({
        project: "",
        activities: "",
        deliveries: "",
        startTime: "",
        endTime: "",
        tags: ""
      });
    }
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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" /> Add Log Entry
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Daily Log Entry</DialogTitle>
              <DialogDescription>
                Record your daily activities and project updates
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Project</Label>
                <Select onValueChange={(value) => setNewLog({...newLog, project: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Downtown Office Building">Downtown Office Building</SelectItem>
                    <SelectItem value="Residential Complex">Residential Complex</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Time</Label>
                  <Input
                    type="time"
                    value={newLog.startTime}
                    onChange={(e) => setNewLog({...newLog, startTime: e.target.value})}
                  />
                </div>
                <div>
                  <Label>End Time</Label>
                  <Input
                    type="time"
                    value={newLog.endTime}
                    onChange={(e) => setNewLog({...newLog, endTime: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label>Activities</Label>
                <Textarea
                  value={newLog.activities}
                  onChange={(e) => setNewLog({...newLog, activities: e.target.value})}
                  placeholder="Describe today's activities..."
                />
              </div>
              <div>
                <Label>Deliveries</Label>
                <Textarea
                  value={newLog.deliveries}
                  onChange={(e) => setNewLog({...newLog, deliveries: e.target.value})}
                  placeholder="List any deliveries received or ordered..."
                />
              </div>
              <div>
                <Label>Tag Team Members</Label>
                <Input
                  value={newLog.tags}
                  onChange={(e) => setNewLog({...newLog, tags: e.target.value})}
                  placeholder="@JohnDoe, @SarahSmith"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewLog({
                project: "",
                activities: "",
                deliveries: "",
                startTime: "",
                endTime: "",
                tags: ""
              })}>
                Cancel
              </Button>
              <Button onClick={handleAddLog}>Add Log</Button>
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
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{log.startTime} - {log.endTime}</span>
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