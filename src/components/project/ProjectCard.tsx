import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "../types/project";
import { Button } from "@/components/ui/button";
import { FileEdit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on action buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    navigate(`/project/${project.id}/schedule`);
  };

  return (
    <Card 
      className="hover:shadow-md transition-all cursor-pointer animate-fade-in group"
      onClick={handleCardClick}
      data-project-id={project.id}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 p-4">
        <div className="space-y-1 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-medium truncate">
              {project.name}
            </CardTitle>
            <Badge 
              variant="outline"
              className={`shrink-0 ${
                project.status === 'completed' ? 'bg-green-100 text-green-700' :
                project.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                'bg-yellow-100 text-yellow-700'
              }`}
            >
              {project.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground truncate">{project.address}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0 ml-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onEditProject}
            className="h-8 w-8 p-0"
          >
            <FileEdit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDeleteProject}
            className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Type</span>
            <span className="font-medium capitalize">{project.type}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Team</span>
            <span className="font-medium">{project.teamMember || 'Unassigned'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Start</span>
            <span>{project.startDate || 'Not set'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">End</span>
            <span>{project.endDate || 'Not set'}</span>
          </div>
          {project.description && (
            <div className="col-span-2 mt-2">
              <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};