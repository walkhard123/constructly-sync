import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { TimeDisplay } from "./time-clock/TimeDisplay";
import { ActivityList } from "./time-clock/ActivityList";

export const TimeClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockingIn, setIsClockingIn] = useState(true);
  const { toast } = useToast();
  const [entries, setEntries] = useState([
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

  const handleClockInOut = () => {
    const currentTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newEntry = {
      id: entries.length + 1,
      name: "Current User",
      status: isClockingIn ? "Clocked In" : "Clocked Out",
      time: currentTimeStr,
      department: "Engineering",
      duration: "0h 0m",
      location: "Main Site"
    };

    setEntries([newEntry, ...entries]);
    setIsClockingIn(!isClockingIn);

    toast({
      title: isClockingIn ? "Clocked In Successfully" : "Clocked Out Successfully",
      description: `Time: ${currentTimeStr}`,
      variant: "default",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <TimeDisplay 
        currentTime={currentTime}
        isClockingIn={isClockingIn}
        onClockInOut={handleClockInOut}
      />
      <ActivityList entries={entries} />
    </div>
  );
};