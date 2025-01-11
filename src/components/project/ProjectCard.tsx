import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "../types/project";
import { Button } from "@/components/ui/button";
import { FileEdit, Trash2 } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onEditProject: () => void;
  onDeleteProject: () => void;
}

export const ProjectCard = ({
  project,
  onEditProject,
  onDeleteProject
}: ProjectCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">{project.name}</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onEditProject}
          >
            <FileEdit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDeleteProject}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Status</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              project.status === 'completed' ? 'bg-green-100 text-green-700' :
              project.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {project.status}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Progress</span>
            <span className="text-sm">{project.progress}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Budget</span>
            <span className="text-sm">{project.budget}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Risk Level</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              project.risk === 'high' ? 'bg-red-100 text-red-700' :
              project.risk === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>
              {project.risk}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};