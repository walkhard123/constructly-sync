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
    <Card className="mobile-card">
      <CardHeader>
        <CardTitle className="text-subheading">Recent Activity</CardTitle>
        <CardDescription className="text-caption">Latest updates across all projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-body">{activity.text}</span>
              <span className="text-caption">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};