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
      icon: <LayoutDashboard className="w-7 h-7" />,
      component: <Dashboard />,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Projects",
      description: "Manage construction projects and tasks",
      icon: <ClipboardList className="w-7 h-7" />,
      component: <ProjectManagement />,
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Tasks",
      description: "View and manage all tasks across projects",
      icon: <ListTodo className="w-7 h-7" />,
      component: <TaskManagement />,
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      title: "Time Clock",
      description: "Track working hours",
      icon: <Clock className="w-7 h-7" />,
      component: <TimeClock />,
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "Daily Logs",
      description: "Record and track daily activities",
      icon: <Calendar className="w-7 h-7" />,
      component: <DailyLogs />,
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      title: "Files",
      description: "Manage project documents",
      icon: <Upload className="w-7 h-7" />,
      component: <FileUpload />,
      gradient: "from-pink-500 to-pink-600"
    },
    {
      title: "Team",
      description: "Manage team and permissions",
      icon: <Users className="w-7 h-7" />,
      component: <TeamMembers />,
      gradient: "from-cyan-500 to-cyan-600"
    },
    {
      title: "Leave",
      description: "Manage time off and leave requests",
      icon: <ListChecks className="w-7 h-7" />,
      component: <LeaveRequests />,
      gradient: "from-teal-500 to-teal-600"
    },
    {
      title: "Settings",
      description: "Configure system preferences",
      icon: <Settings2 className="w-7 h-7" />,
      component: <Settings />,
      gradient: "from-gray-500 to-gray-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-full md:max-w-7xl mx-auto px-4 py-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          {selectedSection && (
            <Button
              variant="ghost"
              onClick={() => setSelectedSection(null)}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2 ml-auto text-gray-700 hover:text-gray-900 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
        
        {!selectedSection ? (
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {menuItems.map((item) => (
              <button
                key={item.title}
                onClick={() => setSelectedSection(item.title)}
                className="group flex flex-col items-center gap-3 p-4 transition-all"
              >
                <div className={`w-20 h-20 rounded-[24px] bg-gradient-to-br ${item.gradient} 
                  flex items-center justify-center text-white shadow-lg 
                  transform transition-all duration-300 ease-in-out
                  group-hover:scale-105 group-hover:shadow-xl
                  group-active:scale-95`}
                >
                  {item.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 text-center group-hover:text-gray-900 transition-colors">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-4 md:mt-8 w-full animate-fade-in">
            {menuItems.find(item => item.title === selectedSection)?.component}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;