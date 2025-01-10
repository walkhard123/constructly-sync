import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileEdit, Trash2 } from "lucide-react";
import { ProjectTaskList } from "./ProjectTaskList";

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
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{project.name}</CardTitle>
            <CardDescription>{project.phase} • Due: {project.due}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onEditProject}>
              <FileEdit className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-500 hover:text-red-600"
              onClick={onDeleteProject}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
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
          <div className="grid grid-cols-2 gap-4 pt-2">
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
          <div className="mt-4">
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
    </Card>
  );
};