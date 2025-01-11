import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, FileText, Tag, Pencil, MessageSquare } from "lucide-react";
import { LogEntry } from "../types/log";
import { useState } from "react";
import { LogComments } from "./LogComments";
import { useAuth } from "@supabase/auth-helpers-react";

interface LogEntryCardProps {
  log: LogEntry;
  onEdit: (log: LogEntry) => void;
}

export const LogEntryCard = ({ log, onEdit }: LogEntryCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const user = useAuth();

  return (
    <Card>
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
              onClick={() => onEdit(log)}
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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="w-4 h-4" />
                <span>{log.attachments} files</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setShowComments(!showComments)}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Comments</span>
              </Button>
            </div>
          </div>
          {showComments && (
            <div className="mt-4 pt-4 border-t">
              <LogComments logId={log.id} user={user} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};