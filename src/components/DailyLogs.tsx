import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Cloud, Thermometer, Users, FileEdit, Trash2 } from "lucide-react";
import { useState } from "react";

export const DailyLogs = () => {
  const [logs] = useState([
    { 
      id: 1,
      date: "2024-03-20", 
      weather: "Sunny", 
      temp: "72°F", 
      crew: 15,
      activities: [
        "Foundation work completed on Block A",
        "Electrical wiring inspection passed",
        "Safety meeting conducted"
      ],
      materials: [
        "Concrete: 50 cubic yards",
        "Steel reinforcement: 2 tons",
        "Electrical conduit: 500 ft"
      ],
      incidents: 0,
      delays: "None reported"
    },
    { 
      id: 2,
      date: "2024-03-19", 
      weather: "Cloudy", 
      temp: "65°F", 
      crew: 12,
      activities: [
        "Wall framing in progress",
        "HVAC installation started",
        "Site cleanup completed"
      ],
      materials: [
        "Lumber: 1000 board feet",
        "HVAC units: 2",
        "Insulation: 500 sq ft"
      ],
      incidents: 1,
      delays: "2 hour rain delay"
    }
  ]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex gap-2 flex-1">
          <Input 
            type="date" 
            className="max-w-sm"
          />
          <Button variant="outline">Filter</Button>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="mr-2 h-4 w-4" /> New Log Entry
        </Button>
      </div>
      
      <div className="space-y-4">
        {logs.map((log) => (
          <Card key={log.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{new Date(log.date).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</CardTitle>
                  <CardDescription className="flex gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Cloud className="w-4 h-4" /> {log.weather}
                    </span>
                    <span className="flex items-center gap-1">
                      <Thermometer className="w-4 h-4" /> {log.temp}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" /> {log.crew} workers
                    </span>
                  </CardDescription>
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
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Activities</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {log.activities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Materials Used</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {log.materials.map((material, index) => (
                      <li key={index}>{material}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Safety Incidents</span>
                  <p className={`font-medium ${log.incidents > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {log.incidents} reported
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Delays</span>
                  <p className="font-medium">{log.delays}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};