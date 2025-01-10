import { useState } from "react";
import { Project } from "@/components/types/project";

export const useProjectState = () => {
  const [projects, setProjects] = useState<Project[]>([
    { 
      id: 1, 
      name: "Downtown Office Building",
      address: "123 Main St",
      type: "apartment",
      teamMember: "John Smith",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      description: "Modern office building in downtown area",
      phase: "Phase 1", 
      progress: 65,
      status: "active", 
      budget: "$2.5M", 
      risk: "medium",
      tasks: [
        { 
          id: 1, 
          title: "Foundation inspection", 
          status: "completed", 
          priority: "high", 
          assignee: "John Doe", 
          dueDate: "2024-03-20", 
          project: "Downtown Office Building",
          subTasks: [] 
        },
        { 
          id: 2, 
          title: "Electrical wiring", 
          status: "in-progress", 
          priority: "medium", 
          assignee: "Jane Smith", 
          dueDate: "2024-04-15", 
          project: "Downtown Office Building",
          subTasks: [] 
        }
      ]
    },
    { 
      id: 2, 
      name: "Residential Complex",
      address: "456 Oak Ave",
      type: "townhouse",
      teamMember: "Jane Smith",
      startDate: "2024-02-01",
      endDate: "2025-03-31",
      description: "Modern residential complex with amenities",
      phase: "Phase 2", 
      progress: 30,
      status: "active", 
      budget: "$4.1M", 
      risk: "low",
      tasks: [
        { 
          id: 1, 
          title: "Site preparation", 
          status: "in-progress", 
          priority: "high", 
          assignee: "Mike Johnson", 
          dueDate: "2024-03-25", 
          project: "Residential Complex",
          subTasks: [] 
        }
      ]
    },
    { 
      id: 3, 
      name: "Shopping Mall Renovation",
      address: "789 Market St",
      type: "others",
      teamMember: "Mike Johnson",
      startDate: "2024-03-01",
      endDate: "2024-11-30",
      description: "Complete renovation of existing shopping mall",
      phase: "Phase 1", 
      progress: 85,
      status: "active", 
      budget: "$1.8M", 
      risk: "high",
      tasks: []
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  return {
    projects,
    setProjects,
    searchQuery,
    setSearchQuery
  };
};
