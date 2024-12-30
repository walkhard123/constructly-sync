import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect } from "react";

export const TimeClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [entries] = useState([
    { 
      id: 1,
      name: "John Smith", 
      status: "Clocked In", 
      time: "07:30 AM",
      department: "Management",
      duration: "6h 30m",
      location: "Main Site"
    },
    { 
      id: 2,
      name: "Sarah Johnson", 
      status: "Clocked Out", 
      time: "04:30 PM",
      department: "Operations",
      duration: "8h 00m",
      location: "Block B"
    },
    { 
      id: 3,
      name: "Mike Williams", 
      status: "Clocked In", 
      time: "08:00 AM",
      department: "Engineering",
      duration: "6h 00m",
      location: "Main Site"
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-purple-50">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-purple-900">
                {currentTime.toLocaleTimeString()}
              </h3>
              <p className="text-purple-600">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Clock className="mr-2 h-4 w-4" />
              Clock In/Out
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Today's Activity</CardTitle>
          <CardDescription>Track employee time and attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {entries.map((entry) => (
              <div key={entry.id} className="flex justify-between items-center py-3 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    entry.status === "Clocked In" ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {entry.status === "Clocked In" ? 
                      <CheckCircle className="w-5 h-5" /> : 
                      <XCircle className="w-5 h-5" />
                    }
                  </div>
                  <div>
                    <p className="font-medium">{entry.name}</p>
                    <p className="text-sm text-gray-500">{entry.department}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    entry.status === "Clocked In" ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {entry.status}
                  </p>
                  <p className="text-sm text-gray-500">{entry.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{entry.duration}</p>
                  <p className="text-sm text-gray-500">{entry.location}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};