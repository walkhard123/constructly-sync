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
    <Card className="rounded-2xl border-0 shadow-[0px_2px_8px_rgba(0,0,0,0.08)]">
      <CardHeader className="pb-2 pt-5 px-4">
        <CardTitle className="text-lg font-semibold text-[#1A1A1A]">Recent Activity</CardTitle>
        <CardDescription className="text-sm text-[#6B6B6B]">Latest updates across all projects</CardDescription>
      </CardHeader>
      <CardContent className="pb-5 px-4">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-base text-[#1A1A1A] flex-1 mr-4">{activity.text}</span>
              <span className="text-sm text-[#6B6B6B] whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};