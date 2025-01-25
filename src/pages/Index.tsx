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
    // Reset selectedSection when navigating back to the main page
    if (location.pathname === '/') {
      setSelectedSection('Projects');
    }
  }, [location.pathname]);

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
      title: "Projects",
      description: "Manage construction projects and tasks",
      icon: <ClipboardList className="w-6 h-6" />,
      component: <ProjectManagement key={location.pathname} />
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
      title: "Files",
      description: "Manage project documents",
      icon: <Upload className="w-6 h-6" />,
      component: <FileUpload />
    },
    {
      title: "Team",
      description: "Manage team and permissions",
      icon: <Users className="w-6 h-6" />,
      component: <TeamMembers />
    },
    {
      title: "Leave",
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
          {selectedSection && (
            <Button
              variant="ghost"
              onClick={() => setSelectedSection(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2 ml-auto"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
        
        {!selectedSection ? (
          <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-md mx-auto">
            {menuItems.map((item) => (
              <button
                key={item.title}
                onClick={() => setSelectedSection(item.title)}
                className="flex flex-col items-center gap-2 p-4 transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 transition-colors hover:bg-purple-200">
                  {item.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">
                  {item.title}
                </span>
              </button>
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