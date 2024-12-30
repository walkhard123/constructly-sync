import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowLeft, Plus, Search, Calendar, Clock, Upload, Users, ClipboardList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const menuItems = [
    {
      title: "Projects Management",
      description: "Manage construction projects and tasks",
      icon: <ClipboardList className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Input 
              placeholder="Search projects..." 
              className="max-w-sm"
              type="search"
            />
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </div>
          
          <Tabs defaultValue="active" className="w-full">
            <TabsList>
              <TabsTrigger value="active">Active Projects</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>Downtown Office Building - Phase {i}</CardTitle>
                    <CardDescription>Progress: 65% • Due: Dec 2024</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Currently working on floor {i} structural reinforcement
                    </p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      )
    },
    {
      title: "Team Members",
      description: "Manage team and permissions",
      icon: <Users className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Input 
              placeholder="Search team members..." 
              className="max-w-sm"
              type="search"
            />
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Member
            </Button>
          </div>
          
          <div className="grid gap-4">
            {[
              { name: "John Smith", role: "Project Manager", projects: 4 },
              { name: "Sarah Johnson", role: "Site Supervisor", projects: 3 },
              { name: "Mike Williams", role: "Engineer", projects: 5 }
            ].map((member, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Active on {member.projects} projects
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Daily Logs",
      description: "Record and track daily activities",
      icon: <Calendar className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Input 
              type="date" 
              className="max-w-sm"
            />
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Log Entry
            </Button>
          </div>
          
          <div className="space-y-4">
            {[
              { date: "2024-03-20", weather: "Sunny", temp: "72°F", crew: 15 },
              { date: "2024-03-19", weather: "Cloudy", temp: "65°F", crew: 12 },
              { date: "2024-03-18", weather: "Rain", temp: "60°F", crew: 8 }
            ].map((log, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>{new Date(log.date).toLocaleDateString()}</CardTitle>
                  <CardDescription>Weather: {log.weather} • Temperature: {log.temp}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Crew size: {log.crew} workers
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Time Clock",
      description: "Track working hours",
      icon: <Clock className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">
              {new Date().toLocaleTimeString()}
            </div>
            <Button>Clock In/Out</Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Today's Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: "John Smith", status: "Clocked In", time: "07:30 AM" },
                  { name: "Sarah Johnson", status: "Clocked Out", time: "04:30 PM" },
                  { name: "Mike Williams", status: "Clocked In", time: "08:00 AM" }
                ].map((entry, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b">
                    <span>{entry.name}</span>
                    <span className={entry.status === "Clocked In" ? "text-green-500" : "text-red-500"}>
                      {entry.status} at {entry.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      title: "File Upload",
      description: "Manage project documents",
      icon: <Upload className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Input 
              placeholder="Search files..." 
              className="max-w-sm"
              type="search"
            />
            <Button>
              <Upload className="mr-2 h-4 w-4" /> Upload Files
            </Button>
          </div>
          
          <div className="space-y-4">
            {[
              { name: "Site Plans.pdf", size: "2.5 MB", date: "2024-03-20" },
              { name: "Safety Protocol.docx", size: "1.2 MB", date: "2024-03-19" },
              { name: "Budget Report.xlsx", size: "3.8 MB", date: "2024-03-18" }
            ].map((file, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>{file.name}</CardTitle>
                  <CardDescription>Size: {file.size} • Uploaded: {new Date(file.date).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm">Download</Button>
                </CardContent>
              </Card>
            ))}
          </div>
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
        
        {!selectedSection && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <Card 
                key={item.title} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedSection(item.title)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

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