import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "../types/project";
import { Button } from "@/components/ui/button";
import { FileEdit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    <Card className="hover:shadow-md transition-all">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{project.address}</p>
        </div>
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
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Type</span>
            <Badge variant="outline" className="capitalize">
              {project.type}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Status</span>
            <Badge 
              variant="outline"
              className={`${
                project.status === 'completed' ? 'bg-green-100 text-green-700' :
                project.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                'bg-yellow-100 text-yellow-700'
              }`}
            >
              {project.status}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Team Member</span>
            <span>{project.teamMember || 'Unassigned'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Start Date</span>
            <span>{project.startDate || 'Not set'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">End Date</span>
            <span>{project.endDate || 'Not set'}</span>
          </div>
          {project.description && (
            <div className="col-span-2">
              <span className="text-muted-foreground block mb-1">Description</span>
              <p className="text-sm line-clamp-2">{project.description}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};