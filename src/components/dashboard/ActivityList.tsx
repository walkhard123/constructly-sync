import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Activity {
  time: string;
  text: string;
}

interface ActivityListProps {
  activities: Activity[];
}

export const ActivityList = ({ activities }: ActivityListProps) => {
  return (
    <Card className="app-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-gray-800">Recent Activity</CardTitle>
        <CardDescription className="text-sm text-gray-500">Latest updates across all projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="list-item">
              <div className="flex-1">
                <p className="text-gray-700">{activity.text}</p>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};