import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileEdit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { ProjectTaskList } from "./ProjectTaskList";
import { useState } from "react";

interface SubTask {
  id: number;
  title: string;
  completed: boolean;
}

interface Task {
  id: number;
  title: string;
  status: string;
  priority: string;
  assignee: string;
  dueDate: string;
  subTasks: SubTask[];
}

interface Project {
  id: number;
  name: string;
  phase: string;
  progress: number;
  due: string;
  budget: string;
  risk: string;
  tasks: Task[];
}

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

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="p-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 flex-1">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
            <div>
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <CardDescription className="text-sm">
                {project.phase} • Due: {project.due}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className={`px-2 py-1 rounded-full text-xs ${
                project.risk === 'high' ? 'bg-red-100 text-red-700' : 
                project.risk === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                'bg-green-100 text-green-700'
              }`}>
                {project.risk.charAt(0).toUpperCase() + project.risk.slice(1)}
              </span>
            </div>
            <div className="flex gap-2">
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
        <CardContent className="p-4 pt-0">
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
            <div className="grid grid-cols-2 gap-4">
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
          </div>
        </CardContent>
      )}
    </Card>
  );
};