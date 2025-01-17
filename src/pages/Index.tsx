import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Search, Calendar, Clock, Upload, Users, ClipboardList, ListTodo, LayoutDashboard, Settings2, ListChecks, LogOut, Smartphone, Tablet, Laptop } from "lucide-react";
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
      icon: <Smartphone className="w-6 h-6" />,
      component: <Dashboard />
    },
    {
      title: "Projects",
      description: "Manage construction projects and tasks",
      icon: <Tablet className="w-6 h-6" />,
      component: <ProjectManagement />
    },
    {
      title: "Tasks",
      description: "View and manage all tasks across projects",
      icon: <Laptop className="w-6 h-6" />,
      component: <TaskManagement />
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
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
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
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
        
        {!selectedSection ? (
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
            {menuItems.slice(0, 3).map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => setSelectedSection(item.title)}
              >
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">{item.title}</span>
              </div>
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
