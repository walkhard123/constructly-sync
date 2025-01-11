import { Project } from "../types/project";
import { ProjectCard } from "./ProjectCard";
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface ProjectTabsProps {
  projects: Project[];
  onEditProject: (project: Project) => void;
  onDeleteProject: (projectId: number) => void;
}

export const ProjectTabs = ({
  projects,
  onEditProject,
  onDeleteProject
}: ProjectTabsProps) => {
  const [localProjects, setLocalProjects] = useState(projects);
  const [selectedFilter, setSelectedFilter] = useState<string>("active");
  
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setLocalProjects((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const filterOptions = [
    { label: "Active Projects", value: "active" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Completed", value: "completed" },
    { label: "All Projects", value: "all" },
  ];

  const getFilteredProjects = () => {
    if (selectedFilter === "all") return localProjects;
    return localProjects.filter(p => p.status === selectedFilter);
  };

  const renderProjectList = (filteredProjects: Project[]) => (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={filteredProjects.map(p => p.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEditProject={() => onEditProject(project)}
              onDeleteProject={() => onDeleteProject(project.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-start">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-[200px] justify-between">
              {filterOptions.find(option => option.value === selectedFilter)?.label}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            {filterOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => setSelectedFilter(option.value)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {renderProjectList(getFilteredProjects())}
    </div>
  );
};