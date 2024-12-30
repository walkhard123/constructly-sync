import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Mail, Phone, FileEdit, Trash2 } from "lucide-react";
import { useState } from "react";

export const TeamMembers = () => {
  const [members] = useState([
    { 
      id: 1, 
      name: "John Smith", 
      role: "Project Manager", 
      projects: 4,
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      avatar: "JS",
      activeHours: 156,
      completedTasks: 23,
      status: "active"
    },
    { 
      id: 2, 
      name: "Sarah Johnson", 
      role: "Site Supervisor", 
      projects: 3,
      email: "sarah.j@example.com",
      phone: "+1 (555) 234-5678",
      avatar: "SJ",
      activeHours: 142,
      completedTasks: 18,
      status: "active"
    },
    { 
      id: 3, 
      name: "Mike Williams", 
      role: "Engineer", 
      projects: 5,
      email: "mike.w@example.com",
      phone: "+1 (555) 345-6789",
      avatar: "MW",
      activeHours: 168,
      completedTasks: 31,
      status: "active"
    }
  ]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex gap-2 flex-1">
          <Input 
            placeholder="Search team members..." 
            className="max-w-sm"
            type="search"
          />
          <Button variant="outline">Department</Button>
          <Button variant="outline">Role</Button>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>
      
      <div className="grid gap-4">
        {members.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                    {member.avatar}
                  </div>
                  <div>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </div>
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
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 mt-2">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{member.phone}</span>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Active Projects</span>
                  <p className="font-medium">{member.projects}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Hours This Month</span>
                  <p className="font-medium">{member.activeHours}h</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Completed Tasks</span>
                  <p className="font-medium">{member.completedTasks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};