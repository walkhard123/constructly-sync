import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { TimeDisplay } from "./time-clock/TimeDisplay";
import { ActivityList } from "./time-clock/ActivityList";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const TimeClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockingIn, setIsClockingIn] = useState(true);
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [lastClockedInMember, setLastClockedInMember] = useState<string>("");
  const { toast } = useToast();

  // Mock data for team members and projects
  const teamMembers = [
    { id: "1", name: "John Smith" },
    { id: "2", name: "Sarah Johnson" },
    { id: "3", name: "Mike Williams" }
  ];

  const projects = [
    { id: "1", name: "Downtown Office Building" },
    { id: "2", name: "Residential Complex" },
    { id: "3", name: "Shopping Mall Renovation" }
  ];

  const [entries, setEntries] = useState([
    { 
      id: 1,
      name: "John Smith", 
      status: "Clocked In", 
      time: "07:30 AM",
      department: "Management",
      duration: "6h 30m",
      location: "Main Site",
      project: "Downtown Office Building"
    },
    { 
      id: 2,
      name: "Sarah Johnson", 
      status: "Clocked Out", 
      time: "04:30 PM",
      department: "Operations",
      duration: "8h 00m",
      location: "Block B",
      project: "Residential Complex"
    },
    { 
      id: 3,
      name: "Mike Williams", 
      status: "Clocked In", 
      time: "08:00 AM",
      department: "Engineering",
      duration: "6h 00m",
      location: "Main Site",
      project: "Shopping Mall Renovation"
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockInOut = () => {
    if (!selectedMember || !selectedProject) {
      toast({
        title: "Error",
        description: "Please select both team member and project before clocking in/out",
        variant: "destructive",
      });
      return;
    }

    if (!isClockingIn && selectedMember !== lastClockedInMember) {
      toast({
        title: "Error",
        description: "You must clock out with the same team member who clocked in",
        variant: "destructive",
      });
      return;
    }

    const currentTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const selectedMemberData = teamMembers.find(m => m.id === selectedMember);
    
    const newEntry = {
      id: entries.length + 1,
      name: selectedMemberData?.name || "Unknown",
      status: isClockingIn ? "Clocked In" : "Clocked Out",
      time: currentTimeStr,
      department: "Engineering",
      duration: "0h 0m",
      location: "Main Site",
      project: projects.find(p => p.id === selectedProject)?.name || "Unknown"
    };

    setEntries([newEntry, ...entries]);
    
    if (isClockingIn) {
      setLastClockedInMember(selectedMember);
    } else {
      setLastClockedInMember("");
    }
    
    setIsClockingIn(!isClockingIn);

    toast({
      title: isClockingIn ? "Clocked In Successfully" : "Clocked Out Successfully",
      description: `Time: ${currentTimeStr} - ${newEntry.project}`,
      variant: "default",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="team-member">Team Member</Label>
          <Select
            value={selectedMember}
            onValueChange={setSelectedMember}
            disabled={!isClockingIn && lastClockedInMember !== ""}
          >
            <SelectTrigger id="team-member">
              <SelectValue placeholder="Select team member" />
            </SelectTrigger>
            <SelectContent>
              {teamMembers.map((member) => (
                <SelectItem key={member.id} value={member.id}>
                  {member.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="project">Project</Label>
          <Select
            value={selectedProject}
            onValueChange={setSelectedProject}
          >
            <SelectTrigger id="project">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <TimeDisplay 
        currentTime={currentTime}
        isClockingIn={isClockingIn}
        onClockInOut={handleClockInOut}
      />
      <ActivityList entries={entries} />
    </div>
  );
};