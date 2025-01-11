import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Search, Calendar, Clock, Upload, Users, ClipboardList, ListTodo, LayoutDashboard, Settings2, ListChecks, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectManagement } from "@/components/ProjectManagement";
import { TeamMembers } from "@/components/TeamMembers";
import { DailyLogs } from "@/components/DailyLogs";
import { TimeClock } from "@/components/TimeClock";
import { FileUpload } from "@/components/FileUpload";
import { TaskManagement } from "@/components/TaskManagement";
import { Dashboard } from "@/components/Dashboard";
import { LeaveRequests } from "@/components/LeaveRequests";
import { Settings } from "@/components/Settings";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const location = useLocation();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (location.state?.selectedSection) {
      setSelectedSection(location.state.selectedSection);
    }
  }, [location.state]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } else {
      navigate("/auth");
    }
  };

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
      title: "Time Clock",
      description: "Track working hours",
      icon: <Clock className="w-6 h-6" />,
      component: <TimeClock />
    },
    {
      title: "Daily Logs",
      description: "Record and track daily activities",
      icon: <Calendar className="w-6 h-6" />,
      component: <DailyLogs />
    },
    {
      title: "File Upload",
      description: "Manage project documents",
      icon: <Upload className="w-6 h-6" />,
      component: <FileUpload />
    },
    {
      title: "Team Members",
      description: "Manage team and permissions",
      icon: <Users className="w-6 h-6" />,
      component: <TeamMembers />
    },
    {
      title: "Leave Requests",
      description: "Manage time off and leave requests",
      icon: <ListChecks className="w-6 h-6" />,
      component: <LeaveRequests />
    },
    {
      title: "Settings",
      description: "Configure system preferences",
      icon: <Settings2 className="w-6 h-6" />,
      component: <Settings />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full md:max-w-7xl mx-auto px-4 py-4 md:p-8">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            {selectedSection && (
              <Button
                variant="ghost"
                onClick={() => setSelectedSection(null)}
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Main Menu
              </Button>
            )}
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
              ProBuilder 1.0
            </h1>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
        
        {!selectedSection ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {menuItems.map((item) => (
              <Card 
                key={item.title} 
                className="hover:shadow-lg transition-shadow cursor-pointer hover:border-purple-200 w-full"
                onClick={() => setSelectedSection(item.title)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-100 text-purple-600 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-lg truncate">{item.title}</CardTitle>
                      <CardDescription className="text-sm truncate">{item.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="mt-4 md:mt-8 w-full">
            {menuItems.find(item => item.title === selectedSection)?.component}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;