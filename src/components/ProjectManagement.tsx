import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileEdit, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

export const ProjectManagement = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Downtown Office Building", phase: "Phase 1", progress: 65, due: "Dec 2024", status: "active", budget: "$2.5M", risk: "medium" },
    { id: 2, name: "Residential Complex", phase: "Phase 2", progress: 30, due: "Mar 2025", status: "active", budget: "$4.1M", risk: "low" },
    { id: 3, name: "Shopping Mall Renovation", phase: "Phase 1", progress: 85, due: "Nov 2024", status: "active", budget: "$1.8M", risk: "high" },
  ]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex gap-2 flex-1">
          <Input 
            placeholder="Search projects..." 
            className="max-w-sm"
            type="search"
          />
          <Button variant="outline">
            <FileEdit className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="active">Active Projects</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <CardDescription>{project.phase} • Due: {project.due}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileEdit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all" 
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <span className="text-sm text-gray-500">Budget</span>
                      <p className="font-medium">{project.budget}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Risk Level</span>
                      <p className={`font-medium ${
                        project.risk === 'high' ? 'text-red-500' : 
                        project.risk === 'medium' ? 'text-yellow-500' : 
                        'text-green-500'
                      }`}>
                        {project.risk.charAt(0).toUpperCase() + project.risk.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};