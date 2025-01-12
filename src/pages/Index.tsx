import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Bell, Home, Users, ListTodo, LayoutDashboard, Settings2, ListChecks, LogOut, Upload, Clock, Calendar } from "lucide-react";
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
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (location.state?.selectedSection) {
      setSelectedSection(location.state.selectedSection);
    }
    
    // Fetch user profile
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .single();
        
        if (profile?.username) {
          setUsername(profile.username);
        }
      }
    };
    
    fetchProfile();
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
      description: "Overview",
      icon: <LayoutDashboard className="w-6 h-6 text-indigo-500" />,
      component: <Dashboard />,
      items: "5 items"
    },
    {
      title: "Projects",
      description: "Management",
      icon: <ListTodo className="w-6 h-6 text-indigo-500" />,
      component: <ProjectManagement />,
      items: "8 projects"
    },
    {
      title: "Tasks",
      description: "Management",
      icon: <ListTodo className="w-6 h-6 text-indigo-500" />,
      component: <TaskManagement />,
      items: "20 items"
    },
    {
      title: "Time Clock",
      description: "Track time",
      icon: <Clock className="w-6 h-6 text-indigo-500" />,
      component: <TimeClock />,
      items: "Active"
    },
    {
      title: "Daily Logs",
      description: "Records",
      icon: <Calendar className="w-6 h-6 text-indigo-500" />,
      component: <DailyLogs />,
      items: "12 logs"
    },
    {
      title: "Files",
      description: "Documents",
      icon: <Upload className="w-6 h-6 text-indigo-500" />,
      component: <FileUpload />,
      items: "45 files"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full md:max-w-7xl mx-auto px-4 py-4">
        {!selectedSection ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold">Hi, {username || 'User'}</h1>
                <p className="text-gray-500 text-sm">How are you today?</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative">
                  <Bell className="w-6 h-6 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {menuItems.map((item) => (
                <Card 
                  key={item.title} 
                  className="hover:shadow-md transition-all cursor-pointer bg-white border-gray-100"
                  onClick={() => setSelectedSection(item.title)}
                >
                  <CardHeader>
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="p-3 rounded-xl bg-indigo-50">
                        {item.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-indigo-900">{item.title}</CardTitle>
                        <CardDescription className="text-sm text-gray-500">{item.items}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 border-t bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-around py-4">
                  <Button variant="ghost" className="flex flex-col items-center gap-1">
                    <Home className="w-6 h-6 text-indigo-500" />
                    <span className="text-xs text-gray-600">Home</span>
                  </Button>
                  <Button variant="ghost" className="flex flex-col items-center gap-1">
                    <Users className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-400">Team</span>
                  </Button>
                  <Button variant="ghost" className="flex flex-col items-center gap-1">
                    <Settings2 className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-400">Settings</span>
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="pb-20">
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="ghost"
                onClick={() => setSelectedSection(null)}
                className="text-gray-600"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </div>
            {menuItems.find(item => item.title === selectedSection)?.component}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;