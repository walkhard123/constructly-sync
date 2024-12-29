import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const Index = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const menuItems = [
    {
      title: "Projects Management",
      description: "Manage construction projects and tasks",
      icon: "🏗️",
      content: (
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Projects Management</h2>
          <p>Projects Management functionality will be implemented here.</p>
        </div>
      )
    },
    {
      title: "Team Members",
      description: "Manage team and permissions",
      icon: "👥",
      content: (
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Team Members</h2>
          <p>Team Members management functionality will be implemented here.</p>
        </div>
      )
    },
    {
      title: "Daily Logs",
      description: "Record and track daily activities",
      icon: "📝",
      content: (
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Daily Logs</h2>
          <p>Daily Logs functionality will be implemented here.</p>
        </div>
      )
    },
    {
      title: "Time Clock",
      description: "Track working hours",
      icon: "⏰",
      content: (
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Time Clock</h2>
          <p>Time Clock functionality will be implemented here.</p>
        </div>
      )
    },
    {
      title: "File Upload",
      description: "Manage project documents",
      icon: "📁",
      content: (
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">File Upload</h2>
          <p>File Upload functionality will be implemented here.</p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {selectedSection && (
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => setSelectedSection(null)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Main Menu
          </Button>
        )}
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Construction Project Management
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card key={item.title} className="hover:shadow-lg transition-shadow">
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
                  onClick={() => setSelectedSection(item.title)}
                >
                  Access {item.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedSection && (
          <div className="mt-8">
            {menuItems.find(item => item.title === selectedSection)?.content}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;