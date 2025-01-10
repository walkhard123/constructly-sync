import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Project } from "../types/project";
import { ProjectCard } from "./ProjectCard";
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from "react";

interface ProjectTabsProps {
  projects: Project[];
  onToggleTaskStatus: (projectId: number, taskId: number) => void;
  onEditTask: (projectId: number, taskId: number) => void;
  onDeleteTask: (projectId: number, taskId: number) => void;
  onAddSubTask: (projectId: number, taskId: number, title: string) => void;
  onToggleSubTask: (projectId: number, taskId: number, subTaskId: number) => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (projectId: number) => void;
}

export const ProjectTabs = ({
  projects,
  onToggleTaskStatus,
  onEditTask,
  onDeleteTask,
  onAddSubTask,
  onToggleSubTask,
  onEditProject,
  onDeleteProject
}: ProjectTabsProps) => {
  const [localProjects, setLocalProjects] = useState(projects);
  
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

  const renderProjectList = (filteredProjects: Project[]) => (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={filteredProjects.map(p => p.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onToggleTaskStatus={onToggleTaskStatus}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
              onAddSubTask={onAddSubTask}
              onToggleSubTask={onToggleSubTask}
              onEditProject={() => onEditProject(project)}
              onDeleteProject={() => onDeleteProject(project.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );

  return (
    <Tabs defaultValue="active" className="w-full">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="active">Active Projects</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="all">All Projects</TabsTrigger>
      </TabsList>
      <TabsContent value="active" className="space-y-4">
        {renderProjectList(localProjects.filter(p => p.status === 'active'))}
      </TabsContent>
      <TabsContent value="upcoming" className="space-y-4">
        {renderProjectList(localProjects.filter(p => p.status === 'upcoming'))}
      </TabsContent>
      <TabsContent value="completed" className="space-y-4">
        {renderProjectList(localProjects.filter(p => p.status === 'completed'))}
      </TabsContent>
      <TabsContent value="all" className="space-y-4">
        {renderProjectList(localProjects)}
      </TabsContent>
    </Tabs>
  );
};