import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { ArrowLeft, Plus, Search, Calendar, Clock, Upload, Users, ClipboardList, ListTodo, LayoutDashboard, Settings2, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectManagement } from "@/components/ProjectManagement";
import { TeamMembers } from "@/components/TeamMembers";
import { DailyLogs } from "@/components/DailyLogs";
import { TimeClock } from "@/components/TimeClock";
import { FileUpload } from "@/components/FileUpload";
import { TaskManagement } from "@/components/TaskManagement";
import { Dashboard } from "@/components/Dashboard";
import { LeaveRequests } from "@/components/LeaveRequests";

const Index = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const menuItems = [
    {
      title: "Dashboard",
      description: "Overview of all activities and metrics",
      icon: <LayoutDashboard className="w-6 h-6" />,
      component: <Dashboard />
    },
    {
      title: "Projects Management",
      description: "Manage construction projects and tasks",
      icon: <ClipboardList className="w-6 h-6" />,
      component: <ProjectManagement />
    },
    {
      title: "Tasks",
      description: "View and manage all tasks across projects",
      icon: <ListTodo className="w-6 h-6" />,
      component: <TaskManagement />
    },
    {
      title: "Team Members",
      description: "Manage team and permissions",
      icon: <Users className="w-6 h-6" />,
      component: <TeamMembers />
    },
    {
      title: "Daily Logs",
      description: "Record and track daily activities",
      icon: <Calendar className="w-6 h-6" />,
      component: <DailyLogs />
    },
    {
      title: "Time Clock",
      description: "Track working hours",
      icon: <Clock className="w-6 h-6" />,
      component: <TimeClock />
    },
    {
      title: "File Upload",
      description: "Manage project documents",
      icon: <Upload className="w-6 h-6" />,
      component: <FileUpload />
    },
    {
      title: "Leave Requests",
      description: "Manage time off and leave requests",
      icon: <ListChecks className="w-6 h-6" />,
      component: <LeaveRequests />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          {selectedSection && (
            <Button
              variant="ghost"
              onClick={() => setSelectedSection(null)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Main Menu
            </Button>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            ProBuilder 1.0
          </h1>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <Settings2 className="h-5 w-5" />
          </Button>
        </div>
        
        {!selectedSection ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <Card 
                key={item.title} 
                className="hover:shadow-lg transition-shadow cursor-pointer hover:border-purple-200"
                onClick={() => setSelectedSection(item.title)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                      {item.icon}
                    </div>
                    <div>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="mt-8">
            {menuItems.find(item => item.title === selectedSection)?.component}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;