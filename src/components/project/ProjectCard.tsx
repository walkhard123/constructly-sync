import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileEdit, Trash2, ChevronDown, ChevronUp, User, Calendar } from "lucide-react";
import { ProjectTaskList } from "./ProjectTaskList";
import { useState } from "react";
import { Project } from "../types/project";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ProjectCardProps {
  project: Project;
  onToggleTaskStatus: (projectId: number, taskId: number) => void;
  onEditTask: (projectId: number, taskId: number) => void;
  onDeleteTask: (projectId: number, taskId: number) => void;
  onAddSubTask: (projectId: number, taskId: number, title: string) => void;
  onToggleSubTask: (projectId: number, taskId: number, subTaskId: number) => void;
  onEditProject: () => void;
  onDeleteProject: () => void;
}

export const ProjectCard = ({ 
  project,
  onToggleTaskStatus,
  onEditTask,
  onDeleteTask,
  onAddSubTask,
  onToggleSubTask,
  onEditProject,
  onDeleteProject
}: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card 
      className="hover:shadow-lg transition-shadow touch-none"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <CardHeader className="p-3 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-2 flex-1">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-500 mt-1" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500 mt-1" />
            )}
            <div>
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <CardDescription className="text-sm">
                {project.address}
              </CardDescription>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {project.teamMember}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Due: {project.endDate}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm">
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditProject();
                }}
              >
                <FileEdit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteProject();
                }}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="p-3 pt-0">
          <div>
            <h4 className="font-medium mb-2">Tasks ({project.tasks.length})</h4>
            <ProjectTaskList
              tasks={project.tasks}
              onToggleStatus={(taskId) => onToggleTaskStatus(project.id, taskId)}
              onEditTask={(taskId) => onEditTask(project.id, taskId)}
              onDeleteTask={(taskId) => onDeleteTask(project.id, taskId)}
              onAddSubTask={(taskId, title) => onAddSubTask(project.id, taskId, title)}
              onToggleSubTask={(taskId, subTaskId) => onToggleSubTask(project.id, taskId, subTaskId)}
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
};