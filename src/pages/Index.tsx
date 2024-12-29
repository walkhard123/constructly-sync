import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Projects Management",
      description: "Manage construction projects and tasks",
      icon: "🏗️",
      path: "/projects"
    },
    {
      title: "Team Members",
      description: "Manage team and permissions",
      icon: "👥",
      path: "/team"
    },
    {
      title: "Daily Logs",
      description: "Record and track daily activities",
      icon: "📝",
      path: "/logs"
    },
    {
      title: "Time Clock",
      description: "Track working hours",
      icon: "⏰",
      path: "/time"
    },
    {
      title: "File Upload",
      description: "Manage project documents",
      icon: "📁",
      path: "/files"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Construction Project Management
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card key={item.path} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{item.icon}</span>
                  {item.title}
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full"
                  onClick={() => navigate(item.path)}
                >
                  Access {item.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;