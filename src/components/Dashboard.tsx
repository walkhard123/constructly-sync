import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Calendar, Clock, ClipboardList, ListTodo, Users, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export const Dashboard = () => {
  // Mock data fetching - in a real app, these would be API calls
  const { data: projectStats } = useQuery({
    queryKey: ['projectStats'],
    queryFn: () => ({
      total: 3,
      active: 2,
      completed: 1,
      upcomingDeadlines: 2
    })
  });

  const { data: taskStats } = useQuery({
    queryKey: ['taskStats'],
    queryFn: () => ({
      total: 4,
      completed: 1,
      inProgress: 2,
      pending: 1
    })
  });

  const { data: teamStats } = useQuery({
    queryKey: ['teamStats'],
    queryFn: () => ({
      totalMembers: 3,
      activeToday: 2,
      averageHours: 7.5
    })
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Projects Summary */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <ClipboardList className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats?.total || 0}</div>
            <div className="text-xs text-muted-foreground">
              {projectStats?.active || 0} Active • {projectStats?.completed || 0} Completed
            </div>
            <div className="mt-4 text-sm text-orange-600">
              {projectStats?.upcomingDeadlines || 0} upcoming deadlines
            </div>
          </CardContent>
        </Card>

        {/* Tasks Summary */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
            <ListTodo className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskStats?.total || 0}</div>
            <div className="text-xs text-muted-foreground">
              {taskStats?.completed || 0} Completed • {taskStats?.inProgress || 0} In Progress
            </div>
            <div className="mt-4 text-sm text-yellow-600">
              {taskStats?.pending || 0} tasks pending
            </div>
          </CardContent>
        </Card>

        {/* Team Summary */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.totalMembers || 0}</div>
            <div className="text-xs text-muted-foreground">
              {teamStats?.activeToday || 0} active today
            </div>
            <div className="mt-4 text-sm text-green-600">
              {teamStats?.averageHours || 0}h avg. working hours
            </div>
          </CardContent>
        </Card>

        {/* Time Tracking */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Tracking</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2/3</div>
            <div className="text-xs text-muted-foreground">
              Team members clocked in
            </div>
            <div className="mt-4 text-sm text-blue-600">
              Current shift: 6h 30m
            </div>
          </CardContent>
        </Card>

        {/* Daily Logs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Logs</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs text-muted-foreground">
              Logs submitted today
            </div>
            <div className="mt-4 text-sm text-purple-600">
              3 requiring review
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <div className="text-xs text-muted-foreground">
              Total documents
            </div>
            <div className="mt-4 text-sm text-indigo-600">
              5 recent uploads
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "2h ago", text: "New task added to Downtown Office Building" },
                { time: "4h ago", text: "Sarah completed site inspection" },
                { time: "Yesterday", text: "Project milestone achieved" },
              ].map((activity, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span>{activity.text}</span>
                  <span className="text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
            <CardDescription>Overall completion status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Downtown Office Building", progress: 65 },
                { name: "Residential Complex", progress: 30 },
                { name: "Shopping Mall Renovation", progress: 85 },
              ].map((project, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{project.name}</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};