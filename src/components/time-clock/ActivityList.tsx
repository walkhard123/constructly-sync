import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityEntry } from "./ActivityEntry";

interface ActivityListProps {
  entries: Array<{
    id: number;
    name: string;
    status: string;
    time: string;
    department: string;
    duration: string;
    location: string;
    project: string;  // Added this line to match ActivityEntry interface
  }>;
}

export const ActivityList = ({ entries }: ActivityListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Activity</CardTitle>
        <CardDescription>Track employee time and attendance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {entries.map((entry) => (
            <ActivityEntry key={entry.id} entry={entry} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};